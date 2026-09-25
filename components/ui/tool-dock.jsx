"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import * as React from "react";
import { cn } from "@/lib/utils";
import "./tool-dock.css";

/** Fixed per position, so the row leans the same way on every render. */
const TILT = [-7, 5, -4, 8, -6, 4, -8, 6, -3, 7, -5, 6];
/** How many tile widths either side of the pointer still swell. */
const REACH = 1.2;
/** How far a fully swollen tile rises, in tile heights. */
const LIFT = 0.19;
/** Quick to settle, with no wobble, so a tile is home right after the pointer moves on. */
const SPRING = { stiffness: 520, damping: 40, mass: 0.5 };

/**
 * How swollen tile `k` is with the pointer at `x`, from 0 to 1. Squared, so
 * the tile under the pointer takes almost all of it and its neighbours only
 * stir.
 */
function swellAt(layout, k, x) {
  if (!layout) return 0;
  const { centers, width } = layout;
  const center = centers[k];
  if (!Number.isFinite(x) || center === undefined || !width) return 0;
  return Math.max(0, 1 - Math.abs(x - center) / width / REACH) ** 2;
}

/**
 * The tiles deal themselves in, left to right, the first time the row is in
 * view: each rises a little and sharpens as it lands. With reduced motion
 * they are simply there. The starting state is the same either way, so
 * server and client render alike.
 */
const deal = {
  hidden: { opacity: 0, y: 12, scale: 0.94, filter: "blur(3px)" },
  shown: ({ index, still }) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: still
      ? { duration: 0 }
      : { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.04 },
    transitionEnd: { filter: "none" },
  }),
};

/**
 * One tile. Everything it does is worked out from the pointer's position
 * along the row against the tile's resting centre, never from what is under
 * the pointer: the tiles swell and overlap, so hit-testing them would change
 * the hovered one as they grew, which is what makes most docks flicker.
 */
const DockTile = React.memo(function DockTile({
  item,
  index,
  count,
  pointer,
  layout,
  still,
  overlap,
  magnification,
  tilt,
}) {
  const lean = tilt ? TILT[index % TILT.length] : 0;
  // A fully swollen tile pushes each neighbour this far, in tile widths: half
  // its own growth, plus the overlap it has to clear or less the gap it has.
  const room = Math.max(0, overlap + magnification / 2);

  const near = useTransform(pointer, (x) =>
    still ? 0 : swellAt(layout.current, index, x),
  );
  // Pushed right by every swollen tile on its left and left by every one on
  // its right, so the row opens up around the pointer like a dock does.
  const push = useTransform(pointer, (x) => {
    if (still) return 0;
    const { centers, width } = layout.current;
    let shift = 0;
    for (let k = 0; k < centers.length; k++) {
      if (k !== index) {
        shift += swellAt(layout.current, k, x) * (k < index ? 1 : -1);
      }
    }
    return shift * width * room;
  });

  const swell = useSpring(near, SPRING);
  const x = useSpring(push, SPRING);
  const scale = useTransform(swell, (v) => 1 + v * magnification);
  const y = useTransform(swell, (v) => -v * LIFT * (layout.current?.width || 56));
  const rotate = useTransform(swell, (v) => lean * (1 - v));

  return (
    <motion.li
      data-slot="tool-dock-item"
      custom={{ index, still }}
      variants={deal}
      className="tool-dock-item"
      style={{
        // At rest each tile covers the one after it.
        zIndex: count - index,
        marginLeft:
          index === 0 ? 0 : `calc(var(--tool-dock-size) * ${-overlap})`,
      }}
    >
      <motion.div
        role="img"
        aria-label={item.label}
        style={{ x, y, scale, rotate }}
        className="tool-dock-motion-box"
      >
        {item.icon}
      </motion.div>
    </motion.li>
  );
});

/**
 * An overlapping, tilted row of tiles that swells around the pointer, with
 * one label that glides to whichever tile is nearest.
 */
export function ToolDock({
  items,
  size = 56,
  overlap = 0.12,
  magnification = 0.28,
  tilt = true,
  label = "Tools",
  className,
  ...props
}) {
  const rail = React.useRef(null);
  const layout = React.useRef({ centers: [], width: 0 });
  const still = useReducedMotion() ?? false;
  // The pointer's position along the row in px, Infinity when elsewhere.
  const pointer = useMotionValue(Number.POSITIVE_INFINITY);
  const [active, setActive] = React.useState(null);
  // Read by the pointer handlers, which can fire twice before a render.
  const current = React.useRef(null);
  // The tooltip glides between tiles, but appears in place when it opens.
  const [glide, setGlide] = React.useState(false);
  const [at, setAt] = React.useState(0);
  // Kept once the pointer leaves, so the text does not blank out mid-fade.
  const [text, setText] = React.useState(items[0]?.label ?? "");

  // Slots never move (only the tiles inside them do), so their centres are
  // measured once and again whenever the row changes size.
  React.useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const measure = () => {
      const slots = [...el.children];
      layout.current = {
        centers: slots.map((li) => li.offsetLeft + li.offsetWidth / 2),
        width: slots[0]?.offsetWidth ?? 0,
      };
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [items.length]);

  const track = (clientX) => {
    const el = rail.current;
    if (!el) return;
    const x = clientX - el.getBoundingClientRect().left;
    pointer.set(x);
    const { centers } = layout.current;
    if (centers.length === 0) return;
    let nearest = 0;
    for (let i = 1; i < centers.length; i++) {
      if (Math.abs(x - centers[i]) < Math.abs(x - centers[nearest])) nearest = i;
    }
    if (nearest === current.current) return;
    setGlide(current.current !== null);
    current.current = nearest;
    setActive(nearest);
    setText(items[nearest].label);
    setAt(centers[nearest]);
  };

  const release = () => {
    pointer.set(Number.POSITIVE_INFINITY);
    current.current = null;
    setActive(null);
  };

  // The row fits its container, `size` or smaller, with room to open up
  // around a swollen tile on either side.
  const span =
    1 +
    (items.length - 1) * (1 - overlap) +
    2 * Math.max(0, overlap + magnification / 2);
  // A swollen tile rises this far above the row; the label sits clear of it.
  const rise = LIFT + magnification;

  return (
    <div
      data-slot="tool-dock"
      className={cn("tool-dock-wrapper", className)}
      {...props}
    >
      <div
        className="tool-dock-inner"
        style={{
          "--tool-dock-size": `min(${size}px, calc((100cqw - 1rem) / ${span}))`,
          "--tool-dock-rise": rise,
        }}
      >
        <span
          aria-hidden
          data-slot="tool-dock-tooltip"
          data-state={active === null ? "closed" : "open"}
          className={cn(
            "tool-dock-tooltip",
            glide
              ? "transition-[translate,opacity] duration-300"
              : "transition-opacity duration-200"
          )}
          style={{ translate: `calc(${at}px - 50%) 0` }}
        >
          {text}
          <span className="tool-dock-tooltip-arrow" />
        </span>

        <motion.ul
          ref={rail}
          role="list"
          aria-label={label}
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.2 }}
          onPointerMove={(event) => track(event.clientX)}
          onPointerDown={(event) => track(event.clientX)}
          onPointerLeave={release}
          onPointerUp={(event) => {
            if (event.pointerType !== "mouse") release();
          }}
          onPointerCancel={release}
          className="tool-dock-list"
        >
          {items.map((item, index) => (
            <DockTile
              key={`${item.label}-${index}`}
              item={item}
              index={index}
              count={items.length}
              pointer={pointer}
              layout={layout}
              still={still}
              overlap={overlap}
              magnification={magnification}
              tilt={tilt}
            />
          ))}
        </motion.ul>
      </div>
    </div>
  );
}

/**
 * An app-icon tile for a logo: a rounded square with a soft lift, a top
 * highlight and a hairline edge that holds on light and dark pages alike.
 * Set its colour with `className`.
 */
export function ToolDockTile({
  className,
  children,
  ...props
}) {
  return (
    <div
      data-slot="tool-dock-tile"
      className={cn("tool-dock-tile", className)}
      {...props}
    >
      {children}
    </div>
  );
}

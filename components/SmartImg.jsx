import { getImageProps } from 'next/image';

// Drop-in <img> replacement: local and Unsplash images are served through the
// Next.js optimizer (resized, AVIF/WebP, srcset); any other URL stays a plain <img>.
// Layout is unchanged because width/height attributes are only kept when passed in.
function canOptimize(src) {
  if (typeof src !== 'string' || !src) return false;
  if (/\.(svg|gif)(\?|$)/i.test(src)) return false;
  return /^\/(?!\/)/.test(src) || src.startsWith('https://images.unsplash.com/');
}

export default function SmartImg({ src, alt = '', sizes = '(max-width: 768px) 100vw, 50vw', priority = false, width, height, style, ...rest }) {
  if (!canOptimize(src)) {
    return <img src={src} alt={alt} width={width} height={height} style={style} {...rest} />;
  }
  const { props } = getImageProps({ src, alt, sizes, priority, width: Number(width) || 1200, height: Number(height) || 800 });
  const { width: _w, height: _h, ...imgProps } = props;
  return (
    <img
      {...imgProps}
      {...(width ? { width } : {})}
      {...(height ? { height } : {})}
      {...rest}
      style={{ ...props.style, ...style }}
    />
  );
}

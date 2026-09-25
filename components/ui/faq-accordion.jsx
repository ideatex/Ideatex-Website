"use client";

import * as React from "react";
import { motion } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import {
  Minus,
  Plus,
  MessageSquare,
  Bot,
  Layers,
  GitBranch,
  Workflow,
  Cpu,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const defaultFaqData = [
  {
    id: 1,
    question: "What can Ideate X build?",
    answer: "We build AI agents, automated workflows, chatbots, custom applications, mobile apps, web applications, SaaS products, and API integrations. We also help businesses with SEO and growth marketing.",
    icon: Bot,
  },
  {
    id: 2,
    question: "Can you build something from scratch?",
    answer: "Yes. We can take a project from an initial idea through planning, development, testing, and launch.",
    icon: Sparkles,
  },
  {
    id: 3,
    question: "Can you work on an existing application?",
    answer: "Yes. We can work with an existing product to add features, improve functionality, integrate systems, or continue development.",
    icon: GitBranch,
  },
  {
    id: 4,
    question: "Can you automate our existing workflows?",
    answer: "Yes. We can look at repetitive processes and identify opportunities to connect tools, automate tasks, and reduce manual work.",
    icon: Workflow,
  },
  {
    id: 5,
    question: "Can you integrate our existing software?",
    answer: "Yes. We can connect APIs, applications, services, and other business systems so they can exchange information and work together.",
    icon: Cpu,
  },
  {
    id: 6,
    question: "How does a project begin?",
    answer: "Start with a conversation. Tell us what you're trying to build, what isn't working today, and where you want to get to. We'll take it from there.",
    icon: MessageSquare,
  },
];

export function FaqAccordion({
  data = defaultFaqData,
  className,
  timestamp = "Every day, 9:01 AM",
  questionClassName,
  answerClassName,
}) {
  const [openItem, setOpenItem] = React.useState(null);

  return (
    <div className={cn("faq-chat-container", className)}>
      {timestamp && (
        <div className="faq-timestamp-wrapper">
          <div className="faq-timestamp">
            {timestamp}
          </div>
        </div>
      )}

      <Accordion.Root
        type="single"
        collapsible
        value={openItem || ""}
        onValueChange={(value) => setOpenItem(value)}
        className="faq-accordion-root"
      >
        {data.map((item, index) => {
          const isZig = index % 2 === 0; // Alternates zig (left) and zag (right) for answers
          const itemId = String(item.id || index + 1);
          const isOpen = openItem === itemId;
          const fallbackIcons = [Bot, Sparkles, GitBranch, Workflow, Cpu, MessageSquare];
          const IconComponent = item.icon || fallbackIcons[index % fallbackIcons.length];

          return (
            <Accordion.Item
              value={itemId}
              key={itemId}
              className="faq-accordion-item"
            >
              <Accordion.Header className="w-full">
                <Accordion.Trigger className="faq-accordion-trigger">
                  <div
                    className={cn(
                      "faq-question-bubble",
                      isOpen ? "faq-question-bubble--open" : "faq-question-bubble--closed",
                      questionClassName
                    )}
                  >
                    <div className="faq-question-left">
                      {IconComponent && (
                        <span className="faq-icon-badge" aria-hidden="true">
                          {typeof IconComponent === "function" || typeof IconComponent === "object" ? (
                            <IconComponent size={15} strokeWidth={1.75} />
                          ) : (
                            IconComponent
                          )}
                        </span>
                      )}
                      <span className="faq-question-text">
                        {item.question}
                      </span>
                    </div>

                    <span
                      className={cn(
                        "faq-toggle-icon",
                        isOpen && "faq-toggle-icon--active"
                      )}
                      aria-hidden="true"
                    >
                      {isOpen ? (
                        <Minus size={16} strokeWidth={1.75} />
                      ) : (
                        <Plus size={16} strokeWidth={1.75} />
                      )}
                    </span>
                  </div>
                </Accordion.Trigger>
              </Accordion.Header>

              <Accordion.Content asChild forceMount>
                <motion.div
                  initial="collapsed"
                  animate={isOpen ? "open" : "collapsed"}
                  variants={{
                    open: { opacity: 1, height: "auto" },
                    collapsed: { opacity: 0, height: 0 },
                  }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden faq-answer-content"
                >
                  {/* Zig-zag alternating container for answers */}
                  <div className={cn("faq-answer-wrapper", isZig ? "answer-wrapper--left" : "answer-wrapper--right")}>
                    <div
                      className={cn(
                        "faq-answer-bubble",
                        isZig ? "answer-bubble--left" : "answer-bubble--right",
                        answerClassName
                      )}
                    >
                      <div className="faq-answer-icon" aria-hidden="true">
                        <MessageSquare size={15} strokeWidth={1.75} />
                      </div>
                      <div className="faq-answer-text">
                        {item.answer}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Accordion.Content>
            </Accordion.Item>
          );
        })}
      </Accordion.Root>
    </div>
  );
}

export default FaqAccordion;

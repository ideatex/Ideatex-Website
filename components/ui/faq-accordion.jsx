"use client";

import * as React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { cn } from "@/lib/utils";
import "../FAQAccordion/faq-ui.css";

export const defaultFaqData = [
  {
    id: 1,
    question: "What can Ideate X build?",
    answer: "We build AI agents, automated workflows, chatbots, custom applications, mobile apps, web applications, SaaS products, and API integrations. We also help businesses with digital marketing, including SEO, ad campaigns and growth marketing.",
  },
  {
    id: 2,
    question: "Can you build something from scratch?",
    answer: "Yes. We can take a project from an initial idea through planning, development, testing, and launch.",
  },
  {
    id: 3,
    question: "Can you work on an existing application?",
    answer: "Yes. We can work with an existing product to add features, improve functionality, integrate systems, or continue development.",
  },
  {
    id: 4,
    question: "Can you automate our existing workflows?",
    answer: "Yes. We can look at repetitive processes and identify opportunities to connect tools, automate tasks, and reduce manual work.",
  },
  {
    id: 5,
    question: "Can you integrate our existing tools?",
    answer: "Yes. We can connect APIs, applications, services, and other business systems so they can exchange information and work together.",
  },
  {
    id: 6,
    question: "How does a project begin?",
    answer: "Start with a conversation. Tell us what you're trying to build, what isn't working today, and where you want to get to. We'll take it from there.",
  },
];

export function FaqAccordion({ data = defaultFaqData, className, defaultOpen = true }) {
  const firstId = data[0] ? String(data[0].id ?? 0) : "";

  return (
    <div className={cn("faq-ui", className)}>
      <Accordion.Root
        type="single"
        defaultValue={defaultOpen ? firstId : undefined}
        collapsible
        className="faq-ui-root"
      >
        {data.map((item, index) => {
          const value = String(item.id ?? index);
          return (
            <Accordion.Item key={value} value={value} className="faq-ui-item">
              <Accordion.Header className="faq-ui-header">
                <Accordion.Trigger className="faq-ui-trigger">
                  <span className="faq-ui-trigger-inner">
                    <span className="faq-ui-number">{index + 1}</span>
                    <span className="faq-ui-title">{item.question}</span>
                  </span>
                </Accordion.Trigger>
              </Accordion.Header>

              <Accordion.Content className="faq-ui-content">
                <div className="faq-ui-content-inner">{item.answer}</div>
              </Accordion.Content>
            </Accordion.Item>
          );
        })}
      </Accordion.Root>
    </div>
  );
}

export default FaqAccordion;

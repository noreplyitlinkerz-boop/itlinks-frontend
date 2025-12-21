"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary depending on the destination. You can calculate shipping costs at checkout.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy for all unused items in their original packaging. If you receive a defective product, we will replace it free of charge or offer a full refund.",
  },
  {
    question: "Are your products covered by warranty?",
    answer:
      "Absolutely. All our products come with a standard 1-year manufacturer warranty. Extended warranty options are also available for select electronic items.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, you will receive a confirmation email with a tracking number. You can use this number on our website to track the real-time status of your delivery.",
  },
  {
    question: "Do you offer technical support?",
    answer:
      "Yes, our team of certified technicians is available to assist you with setup, troubleshooting, and product recommendations. You can reach us via chat or email.",
  },
];

export function FaqSection() {
  return (
    <section className="py-20 bg-accent/10">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Find answers to common questions about our products and services.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

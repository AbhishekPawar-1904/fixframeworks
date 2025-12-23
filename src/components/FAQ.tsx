import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MotionWrapper } from "./MotionWrapper";

const faqs = [
  {
    question: "What programming languages do you support for debugging?",
    answer:
      "We provide debugging and development support for C, C++, Java, Python, JavaScript, TypeScript, and various web technologies including HTML, CSS, React, and Node.js. If you're working with a language not listed, feel free to reach out – we likely can help!",
  },
  {
    question: "How does the Code Mentorship service work?",
    answer:
      "Our Code Mentorship follows a 'White-Box' approach. We don't just fix your code – we walk you through the problem, explain why it occurred, and show you the solution step by step. Sessions can be conducted via screen sharing or detailed written explanations based on your preference.",
  },
  {
    question: "What's your typical turnaround time for debugging requests?",
    answer:
      "For most standard debugging requests, we provide solutions within 24-48 hours. Simple syntax errors or minor bugs are often resolved within a few hours. Complex issues involving architecture or performance optimization may take longer, and we'll provide an estimate upfront.",
  },
  {
    question: "Do you offer support for hardware issues?",
    answer:
      "We specialize in software and non-hardware technical troubleshooting. This includes OS configuration, driver installation, virus/malware removal, and software optimization. For hardware repairs or replacements, we recommend consulting a certified hardware technician.",
  },
  {
    question: "What information do I need to provide for debugging help?",
    answer:
      "To help us diagnose your issue quickly, please provide: the error message (screenshot or text), relevant code snippets, the programming language and version, your development environment details, and steps to reproduce the issue. The more context, the faster we can help!",
  },
  {
    question: "Are your services available for businesses and teams?",
    answer:
      "Absolutely! While we started helping students and individuals, we now work with startups, freelancers, and small businesses. We offer flexible engagement models including one-time fixes, ongoing support packages, and consultation services tailored to your team's needs.",
  },
  {
    question: "How do I get started with FixFrameWorks?",
    answer:
      "Getting started is simple! Fill out our contact form with details about your issue, and we'll get back to you within a few hours with an assessment and quote. For urgent issues, you can also reach out directly to our team members via phone or WhatsApp.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept various payment methods including UPI, bank transfers, and digital wallets. Payment is typically requested after we've provided a solution or completed the agreed-upon work. For larger projects, we may discuss milestone-based payments.",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-40 right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <MotionWrapper className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            Got Questions?
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find answers to common questions about our services, process, and how we can help you.
          </p>
        </MotionWrapper>

        <MotionWrapper delay={0.2} className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-lg transition-shadow"
              >
                <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline py-5 text-base md:text-lg font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </MotionWrapper>

        <MotionWrapper delay={0.4} className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Still have questions? We're here to help!
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Contact Us
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </MotionWrapper>
      </div>
    </section>
  );
};

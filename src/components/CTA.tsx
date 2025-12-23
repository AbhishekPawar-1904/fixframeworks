import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageSquare, ArrowRight } from "lucide-react";
import { MotionWrapper } from "./MotionWrapper";

const CTA = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-tech/10 via-background to-creative/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/10 to-transparent blur-3xl" />
      
      <div className="container relative z-10 px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Content */}
          <MotionWrapper>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Ready to{" "}
              <span className="text-gradient-tech">Fix</span> Your Code or{" "}
              <span className="text-gradient-creative">Frame</span> Your Content?
            </h2>
          </MotionWrapper>
          
          <MotionWrapper delay={0.1}>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Whether you have a syntax error to squash or a video to publish, we're here to help you move forward. Message us to discuss your project needs.
            </p>
          </MotionWrapper>

          {/* CTA Buttons */}
          <MotionWrapper delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <a href="#contact">
                <Button variant="tech" size="lg" className="group min-w-[200px]">
                  <MessageSquare className="w-5 h-5" />
                  Start a Project
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
              <a href="#services">
                <Button variant="hero" size="lg" className="group min-w-[200px]">
                  View Our Services
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
            </div>
          </MotionWrapper>

          {/* Trust Indicators */}
          <MotionWrapper delay={0.3}>
            <motion.div 
              className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-tech" />
                <span>Free Consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-creative" />
                <span>Quick Response</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-foreground/50" />
                <span>No Upfront Payment</span>
              </div>
            </motion.div>
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
};

export default CTA;

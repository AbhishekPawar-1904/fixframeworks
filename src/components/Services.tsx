import { motion } from "framer-motion";
import { Code, Lightbulb, Zap, Film, Palette, Camera, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MotionWrapper, staggerContainer, staggerItem } from "./MotionWrapper";

const techServices = [
  {
    icon: Code,
    title: "Code Debugging & Development",
    description: "Rapid debugging and error resolution for C, C++, Java, Python, and Web Technologies. We analyze your code structure to fix syntax errors, runtime crashes, and logic failures.",
  },
  {
    icon: Lightbulb,
    title: "Code Mentorship & Logic",
    description: "We believe in 'White-Box' solutions. We don't just hand you fixed code; we explain why it broke and how we fixed it. Perfect for students and learners.",
  },
  {
    icon: Zap,
    title: "System Optimization",
    description: "Restore your device's speed with driver installation, OS configuration, virus removal, and software setup to ensure peak performance.",
  },
];

const creativeServices = [
  {
    icon: Film,
    title: "Video Editing",
    description: "Creating engaging Instagram Reels, YouTube Shorts, and TikToks with professional transitions, effects, and storytelling techniques.",
  },
  {
    icon: Palette,
    title: "Visual Polish",
    description: "Professional color grading, audio syncing, and text overlays that transform raw footage into polished, share-worthy content.",
  },
  {
    icon: Camera,
    title: "Photo Editing",
    description: "Expert retouching and enhancement that brings out the best in every image while maintaining a natural, professional look.",
  },
];

const ServiceCard = ({ 
  icon: Icon, 
  title, 
  description, 
  variant 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string; 
  variant: 'tech' | 'creative';
}) => {
  const isTech = variant === 'tech';
  
  return (
    <motion.div 
      variants={staggerItem}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative p-8 rounded-2xl bg-card border border-border/50 hover:border-border transition-all duration-500"
    >
      {/* Glow Effect */}
      <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isTech ? 'glow-tech' : 'glow-creative'}`} />
      
      <div className="relative z-10">
        {/* Icon */}
        <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6 ${isTech ? 'bg-tech/10' : 'bg-creative/10'}`}>
          <Icon className={`w-7 h-7 ${isTech ? 'text-tech' : 'text-creative'}`} />
        </div>
        
        {/* Content */}
        <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

const Services = () => {
  return (
    <section className="py-20 relative overflow-hidden" id="services">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
      
      <div className="container relative z-10 px-6 md:px-8">
        {/* Section Header */}
        <MotionWrapper className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-muted text-sm font-medium text-muted-foreground mb-6">
            Our Services
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Two Worlds. <span className="text-gradient-tech">One</span> <span className="text-gradient-creative">Solution.</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Whether you need code that compiles flawlessly or content that captivates audiences, we deliver excellence in both realms.
          </p>
        </MotionWrapper>

        {/* Technical Services */}
        <div className="mb-16">
          <MotionWrapper className="flex items-center gap-4 mb-12">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-gradient-tech" />
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">Technical Services</h3>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-tech/50 to-transparent" />
          </MotionWrapper>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {techServices.map((service, index) => (
              <ServiceCard key={index} {...service} variant="tech" />
            ))}
          </motion.div>
        </div>

        {/* Creative Services */}
        <div>
          <MotionWrapper className="flex items-center gap-4 mb-12">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-gradient-creative" />
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">Creative Services</h3>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-creative/50 to-transparent" />
          </MotionWrapper>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {creativeServices.map((service, index) => (
              <ServiceCard key={index} {...service} variant="creative" />
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <MotionWrapper className="text-center mt-12" delay={0.2}>
          <Button variant="hero" size="lg" className="group">
            Explore All Services
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </MotionWrapper>
      </div>
    </section>
  );
};

export default Services;

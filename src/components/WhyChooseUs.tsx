import { motion } from "framer-motion";
import { Sparkles, Clock, Award, MessageSquare } from "lucide-react";
import { MotionWrapper, staggerContainer, staggerItem } from "./MotionWrapper";

const reasons = [
  {
    icon: Sparkles,
    title: "Dual Expertise",
    description: "We debug scripts in the morning and edit videos in the afternoon. One partner for all your digital needs.",
    highlight: "Two skills, one invoice",
  },
  {
    icon: Clock,
    title: "Fast Turnaround",
    description: "Quick delivery without compromising quality. Most projects completed within 24-48 hours.",
    highlight: "Speed meets quality",
  },
  {
    icon: Award,
    title: "Professional Standards",
    description: "Industry-level quality for both coding and creative work. No shortcuts, no compromises.",
    highlight: "Excellence guaranteed",
  },
  {
    icon: MessageSquare,
    title: "Clear Communication",
    description: "Student-friendly explanations and regular updates. We make sure you understand every step.",
    highlight: "Always in the loop",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 relative overflow-hidden" id="why-us">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-tech/5 via-transparent to-transparent" />
      
      <div className="container relative z-10 px-6 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <MotionWrapper>
              <span className="inline-block px-4 py-1.5 rounded-full bg-muted text-sm font-medium text-muted-foreground mb-6">
                Why Choose Us
              </span>
            </MotionWrapper>
            <MotionWrapper delay={0.1}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                We Bridge The Gap Between{" "}
                <span className="text-gradient-tech">Logic</span> &{" "}
                <span className="text-gradient-creative">Art</span>
              </h2>
            </MotionWrapper>
            <MotionWrapper delay={0.2}>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Technology should be an enabler, not a roadblock. Whether you're a student stuck on a complex algorithm or need your social media content to look professional, we provide high-quality results for both.
              </p>
            </MotionWrapper>
            
            {/* Code Block Decoration */}
            <MotionWrapper delay={0.3}>
              <div className="bg-card rounded-xl border border-border p-4 font-mono text-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-destructive/80" />
                  <div className="w-3 h-3 rounded-full bg-creative/80" />
                  <div className="w-3 h-3 rounded-full bg-tech/80" />
                </div>
                <div className="space-y-1">
                  <p><span className="text-tech">const</span> <span className="text-creative">solution</span> = <span className="text-muted-foreground">await</span> fixFrameWorks.<span className="text-tech">solve</span>(yourProblem);</p>
                  <p><span className="text-tech">console</span>.<span className="text-creative">log</span>(<span className="text-muted-foreground">'Problem solved!'</span>);</p>
                </div>
              </div>
            </MotionWrapper>
          </div>

          {/* Right Grid */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-border transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-muted mb-4 group-hover:scale-110 transition-transform">
                  <reason.icon className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{reason.title}</h3>
                <p className="text-muted-foreground text-sm mb-3">{reason.description}</p>
                <span className="text-xs font-semibold text-tech">{reason.highlight}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

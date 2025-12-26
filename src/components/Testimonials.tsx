import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { MotionWrapper } from "./MotionWrapper";

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Computer Science Student",
    content: "FixFrameWorks helped me debug a complex data structures assignment that I was stuck on for days. They not only fixed my code but explained exactly why my recursive function was causing a stack overflow. Now I understand recursion so much better!",
    avatar: "RS",
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Freelance Developer",
    content: "My laptop was running incredibly slow, and I thought I needed a new one. The team optimized my system, removed bloatware, and configured my development environment perfectly. It runs like new now!",
    avatar: "PP",
  },
  {
    id: 3,
    name: "Amit Desale",
    role: "Startup Founder",
    content: "We had a critical bug in our production code that was causing intermittent crashes. FixFrameWorks diagnosed the memory leak in our Java application within hours. Professional, fast, and thorough!",
    avatar: "AD",
  },
  {
    id: 4,
    name: "Sneha Kulkarni",
    role: "Web Design Student",
    content: "I was struggling with CSS flexbox and my website layout was a mess. The team not only fixed it but taught me the concepts through a live session. Best learning experience ever!",
    avatar: "SK",
  },
  {
    id: 5,
    name: "Vikram Joshi",
    role: "IT Professional",
    content: "Driver issues were causing my peripherals to malfunction constantly. FixFrameWorks resolved all compatibility issues and set up automatic updates. Haven't had a single problem since!",
    avatar: "VJ",
  },
];

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      if (newDirection > 0) {
        return (prev + 1) % testimonials.length;
      }
      return prev === 0 ? testimonials.length - 1 : prev - 1;
    });
  };

  return (
    <section id="testimonials" className="py-24 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <MotionWrapper className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            Client Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real feedback from students and professionals who trusted us with their technical challenges.
          </p>
        </MotionWrapper>

        <div className="max-w-4xl mx-auto">
          <div className="relative min-h-[350px] flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute w-full"
              >
                <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-xl">
                  <Quote className="w-12 h-12 text-primary/30 mb-6" />
                  <p className="text-foreground text-lg md:text-xl leading-relaxed mb-8">
                    "{testimonials[currentIndex].content}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-lg">
                      {testimonials[currentIndex].avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {testimonials[currentIndex].role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={() => paginate(-1)}
              className="absolute left-0 -translate-x-4 md:-translate-x-16 w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors shadow-lg z-10"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => paginate(1)}
              className="absolute right-0 translate-x-4 md:translate-x-16 w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors shadow-lg z-10"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary w-8"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

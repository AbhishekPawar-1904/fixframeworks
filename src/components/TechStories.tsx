import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Wrench, CheckCircle } from "lucide-react";
import { MotionWrapper } from "./MotionWrapper";

import techBsod from "@/assets/tech-bsod.png";
import techBoot from "@/assets/tech-boot.png";
import techCpu from "@/assets/tech-cpu.png";
import techWifi from "@/assets/tech-wifi.png";
import techBluetooth from "@/assets/tech-bluetooth.png";
import techVirus from "@/assets/tech-virus.png";
import techDataRecovery from "@/assets/tech-data-recovery.png";
import techPrinter from "@/assets/tech-printer.png";
import techWindowsUpdate from "@/assets/tech-windows-update.png";
import techOverheating from "@/assets/tech-overheating.png";

const techStories = [
  {
    id: 1,
    title: "Blue Screen of Death (BSOD)",
    problem: "System crashes with KERNEL_DATA_INPAGE_ERROR causing data loss and frustration.",
    solution: "Diagnosed faulty RAM and corrupted system files. Replaced memory module and repaired Windows installation.",
    image: techBsod,
    category: "System Repair",
  },
  {
    id: 2,
    title: "Slow Boot Time Issues",
    problem: "Computer taking over 2 minutes to start up, affecting productivity.",
    solution: "Optimized startup programs, cleaned registry, and upgraded to SSD. Boot time reduced to 9.8 seconds!",
    image: techBoot,
    category: "Performance",
  },
  {
    id: 3,
    title: "100% CPU Usage",
    problem: "System constantly running at maximum CPU causing overheating and lag.",
    solution: "Identified rogue processes, removed malware, and optimized system services. CPU now runs at healthy levels.",
    image: techCpu,
    category: "Optimization",
  },
  {
    id: 4,
    title: "WiFi Connected But No Internet",
    problem: "Frustrating connectivity issue where WiFi shows connected but no internet access.",
    solution: "Reset network stack, updated network drivers, and configured proper DNS settings. Full connectivity restored!",
    image: techWifi,
    category: "Networking",
  },
  {
    id: 5,
    title: "Missing Bluetooth Device",
    problem: "Bluetooth adapter disappeared from Device Manager, unable to connect wireless devices.",
    solution: "Reinstalled Bluetooth drivers, enabled hidden devices, and updated BIOS. All Bluetooth devices now working perfectly.",
    image: techBluetooth,
    category: "Driver Issues",
  },
  {
    id: 6,
    title: "Virus & Malware Infection",
    problem: "Computer infected with ransomware, files encrypted and system unusable.",
    solution: "Removed malware using advanced tools, recovered encrypted files from backup, and installed robust antivirus protection.",
    image: techVirus,
    category: "Security",
  },
  {
    id: 7,
    title: "Data Recovery Emergency",
    problem: "Accidentally deleted important project files and emptied recycle bin.",
    solution: "Used professional data recovery software to restore all deleted files. Set up automatic cloud backup to prevent future loss.",
    image: techDataRecovery,
    category: "Data Recovery",
  },
  {
    id: 8,
    title: "Printer Not Responding",
    problem: "Printer shows offline status and refuses to print any documents.",
    solution: "Cleared print spooler, updated printer drivers, and reconfigured network settings. Printing works flawlessly now.",
    image: techPrinter,
    category: "Peripherals",
  },
  {
    id: 9,
    title: "Windows Update Failure",
    problem: "Windows updates stuck at 0% or failing with error codes repeatedly.",
    solution: "Reset Windows Update components, cleared update cache, and manually installed pending updates. System now updates normally.",
    image: techWindowsUpdate,
    category: "System Repair",
  },
  {
    id: 10,
    title: "Overheating & Shutdowns",
    problem: "Laptop overheating and shutting down unexpectedly during use.",
    solution: "Cleaned internal fans, replaced thermal paste, and optimized power settings. Temperature now stays within safe limits.",
    image: techOverheating,
    category: "Hardware",
  },
];

export const TechStories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % techStories.length);
    }, 8000);

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
        return (prev + 1) % techStories.length;
      }
      return prev === 0 ? techStories.length - 1 : prev - 1;
    });
  };

  return (
    <section id="tech-stories" className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <MotionWrapper className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            Tech Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Problems We've Solved
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real technical challenges we've fixed for our clients. From blue screens to network issues, we handle it all.
          </p>
        </MotionWrapper>

        <div className="max-w-5xl mx-auto">
          <div className="relative min-h-[500px] flex items-center justify-center">
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
                <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xl">
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Image Section */}
                    <div className="relative h-64 md:h-80 bg-muted/50 flex items-center justify-center">
                      <img
                        src={techStories[currentIndex].image}
                        alt={techStories[currentIndex].title}
                        className="w-full h-full object-contain p-4"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                          {techStories[currentIndex].category}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8 md:p-10 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-4">
                        <Wrench className="w-6 h-6 text-primary" />
                        <h3 className="text-2xl font-bold text-foreground">
                          {techStories[currentIndex].title}
                        </h3>
                      </div>

                      <div className="space-y-6">
                        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                          <p className="text-sm font-medium text-destructive mb-1">The Problem</p>
                          <p className="text-foreground">
                            {techStories[currentIndex].problem}
                          </p>
                        </div>

                        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-1">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <p className="text-sm font-medium text-green-600 dark:text-green-400">Our Solution</p>
                          </div>
                          <p className="text-foreground">
                            {techStories[currentIndex].solution}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={() => paginate(-1)}
              className="absolute left-0 -translate-x-4 md:-translate-x-16 w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors shadow-lg z-10"
              aria-label="Previous story"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => paginate(1)}
              className="absolute right-0 translate-x-4 md:translate-x-16 w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors shadow-lg z-10"
              aria-label="Next story"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {techStories.map((_, index) => (
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
                aria-label={`Go to story ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

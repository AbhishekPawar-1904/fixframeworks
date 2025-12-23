import { motion } from "framer-motion";
import { Phone, User } from "lucide-react";
import { MotionWrapper, staggerContainer, staggerItem } from "./MotionWrapper";

const teamMembers = [
  {
    name: "Tejas Chaudhari",
    phone: "9309371706",
    role: "Developer",
  },
  {
    name: "Abhishek Pawar",
    phone: "9575773155",
    role: "Developer / UI-UX Designer",
  },
  {
    name: "Bhushan Desle",
    phone: "8459067656",
    role: "Video Editor",
  },
];

const TeamContact = () => {
  return (
    <section className="py-16 relative overflow-hidden" id="team">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-tech/5 via-background to-creative/5" />
      
      <div className="container relative z-10 px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <MotionWrapper>
            <span className="inline-block px-4 py-1.5 rounded-full bg-muted text-sm font-medium text-muted-foreground mb-6">
              Contact Us
            </span>
          </MotionWrapper>
          <MotionWrapper delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Get in <span className="text-gradient-tech">Touch</span>
            </h2>
          </MotionWrapper>
          <MotionWrapper delay={0.2}>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              Reach out directly to our team members for quick assistance with your project needs.
            </p>
          </MotionWrapper>

          {/* Team Members Grid */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{member.role}</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-tech/10">
                  <Phone className="w-4 h-4 text-tech" />
                  <span className="text-tech font-medium">{member.phone}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TeamContact;

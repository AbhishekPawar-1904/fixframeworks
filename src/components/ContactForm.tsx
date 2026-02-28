import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Code, Film, Send, Loader2 } from "lucide-react";
import { MotionWrapper } from "./MotionWrapper";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  projectType: z.enum(["technical", "creative"]),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message must be less than 2000 characters"),
});

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "technical",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form data
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      toast({
        title: "Validation Error",
        description: result.error.errors[0].message,
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke("send-contact-email", {
        body: formData,
      });

      if (error) throw error;

      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
      });

      setFormData({ name: "", email: "", projectType: "technical", message: "" });
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <MotionWrapper>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Send className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Get In Touch</span>
            </div>
          </MotionWrapper>
          <MotionWrapper delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Start Your{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Project
              </span>
            </h2>
          </MotionWrapper>
          <MotionWrapper delay={0.2}>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ready to fix your code or frame your content? Send us a message and we'll get back to you within 24 hours.
            </p>
          </MotionWrapper>
        </div>

        {/* Form Card */}
        <MotionWrapper delay={0.3}>
          <motion.div 
            className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 md:p-12"
            whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            transition={{ duration: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name & Email Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground font-medium">
                    Your Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-background/50 border-border/50 focus:border-primary/50 h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-background/50 border-border/50 focus:border-primary/50 h-12"
                  />
                </div>
              </div>

              {/* Project Type */}
              <div className="space-y-4">
                <Label className="text-foreground font-medium">Project Type</Label>
                <RadioGroup
                  value={formData.projectType}
                  onValueChange={(value) => setFormData({ ...formData, projectType: value })}
                  className="grid md:grid-cols-2 gap-4"
                >
                  <Label
                    htmlFor="technical"
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      formData.projectType === "technical"
                        ? "border-primary bg-primary/10"
                        : "border-border/50 bg-background/30 hover:border-primary/30"
                    }`}
                  >
                    <RadioGroupItem value="technical" id="technical" className="sr-only" />
                    <div className={`p-3 rounded-lg ${
                      formData.projectType === "technical" ? "bg-primary/20" : "bg-muted"
                    }`}>
                      <Code className={`w-5 h-5 ${
                        formData.projectType === "technical" ? "text-primary" : "text-muted-foreground"
                      }`} />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Technical</p>
                      <p className="text-sm text-muted-foreground">Code, debugging, optimization</p>
                    </div>
                  </Label>
                  <Label
                    htmlFor="creative"
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      formData.projectType === "creative"
                        ? "border-accent bg-accent/10"
                        : "border-border/50 bg-background/30 hover:border-accent/30"
                    }`}
                  >
                    <RadioGroupItem value="creative" id="creative" className="sr-only" />
                    <div className={`p-3 rounded-lg ${
                      formData.projectType === "creative" ? "bg-accent/20" : "bg-muted"
                    }`}>
                      <Film className={`w-5 h-5 ${
                        formData.projectType === "creative" ? "text-accent" : "text-muted-foreground"
                      }`} />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Creative</p>
                      <p className="text-sm text-muted-foreground">Video, photo editing</p>
                    </div>
                  </Label>
                </RadioGroup>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-foreground font-medium">
                  Project Details
                </Label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your project, timeline, and any specific requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="bg-background/50 border-border/50 focus:border-primary/50 resize-none"
                />
              </div>

              {/* Submit Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </MotionWrapper>
      </div>
    </section>
  );
};

export default ContactForm;

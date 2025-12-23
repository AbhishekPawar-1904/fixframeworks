import { Code, Film, Mail, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16 border-t border-border" id="contact">
      <div className="container px-6 md:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="#" className="inline-flex items-center gap-1 text-2xl font-bold mb-4">
              <span className="text-gradient-tech">Fix</span>
              <span className="text-foreground">Frame</span>
              <span className="text-gradient-creative">Works</span>
            </a>
            <p className="text-muted-foreground mb-6 max-w-md">
              Your one-stop solution for technical fixes and creative polish. We bridge the gap between logic and art.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Technical */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Code className="w-4 h-4 text-tech" />
              Technical Services
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Code Debugging</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Logic Support</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">System Optimization</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Software Setup</a></li>
            </ul>
          </div>

          {/* Creative */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Film className="w-4 h-4 text-creative" />
              Creative Services
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Video Editing</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Color Grading</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Photo Editing</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Social Media Content</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} FixFrameWorks. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built with <span className="text-tech">precision</span> and <span className="text-creative">creativity</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

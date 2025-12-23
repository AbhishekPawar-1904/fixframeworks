import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import TeamContact from "@/components/TeamContact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>FixFrameWorks | Technical Solutions & Creative Excellence</title>
        <meta
          name="description"
          content="Your one-stop solution for code debugging, system optimization, video editing, and creative content. We bridge the gap between logic and art."
        />
        <meta name="keywords" content="code debugging, video editing, photo editing, system optimization, technical support, creative services" />
        <link rel="canonical" href="https://fixframeworks.com" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <Services />
          <WhyChooseUs />
          <Testimonials />
          <FAQ />
          <ContactForm />
          <TeamContact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;

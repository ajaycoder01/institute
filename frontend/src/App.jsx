import { useRef, useState } from 'react';
import './App.css';
import "leaflet/dist/leaflet.css";

import { motion } from "framer-motion";

import Navbar from './component/header/Navbar';
import Banner from './component/banner/Banner';
import Footer from './component/Footer';
import LogoAutoSlider from './component/LogoAutoSlider';
import ContactSection from './component/contact/ContactSection';
import CompanyStats from './component/CompanyStats';
import CoursesPage from "./component/CoursesPage";
import coursesData from "./component/data/coursesData";
import AboutSection from './component/AboutSection';
import CTASection from './component/CTASection';
import Services from './component/Services';
import TestimonialSlider from './component/TestimonialSlider';
import ScrollToTopButton from './component/call_scroll/ScrollToTopButton';
import CallButton from './component/call_scroll/CallButton';
import { Bounce, ToastContainer } from 'react-toastify';


function App() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const serviceRef = useRef(null);

  const scrollToSection = (elementRef) => {
    elementRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>

     <ToastContainer
        position="top-right"
        autoClose={3500}
        transition={Bounce}
      />

      <Navbar
        scrollToHome={() => scrollToSection(homeRef)}
        scrollToAbout={() => scrollToSection(aboutRef)}
        scrollToContact={() => scrollToSection(contactRef)}
        scrollToService={() => scrollToSection(serviceRef)}
        openCoursePage={setSelectedCourse}
        closeCoursePage={() => setSelectedCourse(null)}
      />

      {selectedCourse ? (
        <CoursesPage
          selectedCourse={selectedCourse}
          coursesData={coursesData}
          closeCoursePage={() => setSelectedCourse(null)}
          scrollToContact={() => scrollToSection(contactRef)}
        />
      ) : (
        <>
          {/* Banner */}
          <motion.div
            ref={homeRef}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Banner
              openCoursePage={setSelectedCourse}
              scrollToContact={() => scrollToSection(contactRef)}
            />
          </motion.div>

          {/* Logo Slider */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          >
            <LogoAutoSlider />
          </motion.div>

          {/* About Section */}
          <motion.div
            ref={aboutRef}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <AboutSection />
          </motion.div>

          {/* Company Stats */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          >
            <CompanyStats />
          </motion.div>

          {/* Services */}
          <motion.div
            ref={serviceRef}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          >
            <Services />
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInUp}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
          >
            <CTASection scrollToContact={() => scrollToSection(contactRef)} />
          </motion.div>

            <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          >
            <TestimonialSlider/>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            ref={contactRef}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInUp}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          >
            <ContactSection />
          </motion.div>
          

          {/* Footer */}
          <Footer />
          <CallButton/>
          <ScrollToTopButton/>
        </>
      )}
    </>
  );
}

export default App;
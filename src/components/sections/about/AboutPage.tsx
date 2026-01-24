// src/components/pages/AboutPage.tsx
import AboutHeader from "./AboutHeader";
import AboutTextSection from "./AboutTextSection";
import FounderInfoSection from "./FounderInfo";
import { motion } from "framer-motion";

const sectionFade = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 },
  }),
};

export default function AboutPage() {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Header */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={sectionFade}
        className="mb-12"
      >
        <AboutHeader />
      </motion.div>

      {/* About Text */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionFade}
        className="max-w-3xl mx-auto mb-16"
      >
        <AboutTextSection />
      </motion.div>

      {/* Author Info */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionFade}
        className="mb-16"
      >
        <FounderInfoSection />
      </motion.div>

      {/* Contact Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionFade}
        className="max-w-2xl mx-auto"
      >
        {/* <ContactFormSection /> */}
      </motion.div>
    </section>
  );
}

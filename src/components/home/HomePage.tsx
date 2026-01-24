import Hero from "./Hero";
// import BlogList from "../blog/BlogList";
import Latest from "./Latest";
import EditorsPickSection from "../sections/EditorsPick/EditorsPickSection";
import DeepDiveSection from "../sections/DeepDive/DeepDiveSection";
import SEO from "@components/Seo";
import AIConsultantSection from "./AIConsultantSection";

export default function HomePage() {
  return (
    <>
    <SEO />
      <Hero />
      <Latest />
      <AIConsultantSection />
      <EditorsPickSection />
      <DeepDiveSection />
    </>
  );
}

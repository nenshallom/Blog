import Hero from "./Hero";
// import BlogList from "../blog/BlogList";
import Latest from "./Latest";
import EditorsPickSection from "../sections/EditorsPick/EditorsPickSection";
import DeepDiveSection from "../sections/DeepDive/DeepDiveSection";
import SEO from "@components/Seo";

export default function HomePage() {
  return (
    <>
    <SEO />
      <Hero />
      {/* <BlogList /> */}
      <Latest />
      <EditorsPickSection />
      <DeepDiveSection />
      {/* You can later add <About /> and <Newsletter /> here */}
    </>
  );
}

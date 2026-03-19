// app/page.tsx — Homepage (single-page layout)
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import { fetchFeaturedProjects, type Project } from "@/lib/api";

export default async function HomePage() {
  // Fetch featured projects server-side (ISR — cached at build, revalidated every 60s)
  let featuredProjects: Project[] = [];
  try {
    featuredProjects = await fetchFeaturedProjects();
  } catch {
    // If the API is down, render with empty state — no crash
    console.warn("Could not fetch featured projects from API");
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <Projects projects={featuredProjects} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
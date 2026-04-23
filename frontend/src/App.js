import { useEffect } from "react";
import "@/App.css";
import { Toaster } from "sonner";
import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import Credentials from "@/components/site/Credentials";
import {
  PillarsSection,
  ProgramsSection,
  ModulesSection,
  SchemaSection,
} from "@/components/site/Sections";
import {
  ResearchSection,
  PublicationsSection,
  TeamSection,
  TestimonialsSection,
} from "@/components/site/Sections2";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";

function useFadeUp() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const els = document.querySelectorAll(".fade-up");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function useSmoothScroll() {
  useEffect(() => {
    const handler = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 82;
      window.scrollTo({ top, behavior: "smooth" });
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);
}

function App() {
  useFadeUp();
  useSmoothScroll();

  return (
    <div className="App" data-testid="app-root">
      <Navbar />
      <main>
        <Hero />
        <Credentials />
        <PillarsSection />
        <ProgramsSection />
        <ModulesSection />
        <SchemaSection />
        <ResearchSection />
        <PublicationsSection />
        <TeamSection />
        <TestimonialsSection />
        <Contact />
      </main>
      <Footer />
      <Toaster
        position="top-center"
        theme="dark"
        toastOptions={{
          style: {
            background: "#0E2333",
            border: "1px solid rgba(191,160,106,0.35)",
            color: "#fff",
            borderRadius: 0,
            fontFamily: "DM Sans, sans-serif",
          },
        }}
      />
    </div>
  );
}

export default App;

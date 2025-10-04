import { Hero } from "@/components/hero";
import { FeaturedCourses } from "@/components/FeaturedCourses";
import About from "@/components/About";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedCourses />
      <About />
      <Testimonials />
      <Contact />
    </>
  );
}


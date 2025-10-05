import { Hero } from "@/components/hero";
import { FeaturedCourses } from "@/components/FeaturedCourses";
import About from "@/components/About";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import BlogAndNewsAndEvents from "@/components/BlogAndNewsAndEvents";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedCourses />
      <BlogAndNewsAndEvents/>
      <About />
      <Testimonials />
      <Contact />
    </>
  );
}


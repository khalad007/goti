import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Categories from "@/components/sections/Categories";
import Parts from "@/components/sections/Parts";
import Stats from "@/components/sections/Stats";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main id="top">
      <Hero />
      <Manifesto />
      <Categories />
      <Parts />
      <Stats />
      <Contact />
      <Footer />
    </main>
  );
}
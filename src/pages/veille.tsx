import fs from "fs";
import path from "path";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroOutremer from "@/components/HeroOutremer";
import Footer from "@/components/sections/index/Footer";
import VeilleTechnologique from "@/components/sections/index/VeilleTechnologique";
import { GridPattern } from "@/components/GridPattern";
import type { Article } from "../../typings/article";

export async function getStaticProps() {
  const articlesDir = path.join(process.cwd(), "data", "articles");
  let articles: Article[] = [];

  if (fs.existsSync(articlesDir)) {
    const files = fs.readdirSync(articlesDir).filter((f) => f.endsWith(".json"));
    articles = files
      .map((file) => {
        const raw = fs.readFileSync(path.join(articlesDir, file), "utf8");
        return JSON.parse(raw) as Article;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  return { props: { articles } };
}

export default function Veille({ articles }: { articles: Article[] }) {
  return (
    <>
      <Navbar />
      <HeroOutremer scene="cercles" />
      <main className="relative min-h-screen overflow-x-hidden px-6">
        <GridPattern width={50} height={50} x={-1} y={-1} className="z-[-5]" />
        <div className="pt-24">
          <VeilleTechnologique articles={articles} />
        </div>
        <Footer />
      </main>
    </>
  );
}

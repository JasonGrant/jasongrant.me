import { Hero } from "@/components/home/Hero";
import { NowBlock } from "@/components/home/NowBlock";
import { WorkShelf } from "@/components/home/WorkShelf";
import { WritingShelf } from "@/components/home/WritingShelf";

export default function Home() {
  return (
    <>
      <Hero />
      <NowBlock />
      <WorkShelf />
      <WritingShelf />
    </>
  );
}

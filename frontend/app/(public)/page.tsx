import Navbar from "@/components/Navbar/Navbar";
import { Button } from "@/components/ui/button";
import { features } from "@/data";
import Link from "next/link";



export default function Home() {
  return (
    <>
      <div className="container mx-auto px-4 py-16 bg-background flex flex-col items-center justify-center ">
      <div className="max-w-4xl w-full text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground">
          Welcome to <span className="text-primary">BlogApp</span>
        </h1>

        <p className="text-xl text-muted-foreground">
          Discover amazing stories, insights, and ideas from talented writers around the world.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/blogs">
            <Button size="lg" className="text-lg px-8">
              Explore Blogs
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button size="lg" variant="outline" className="text-lg px-8">
              Start Writing
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16 text-start text-nowrap ">
          {features.map((feature, index) => (
            <div key={index} className="p-4 rounded-lg border bg-card">
              <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-wrap max-w-[50ch]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  
  );
}

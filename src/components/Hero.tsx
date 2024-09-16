import { Button } from "./ui/button";
import { buttonVariants } from "./ui/button";
import { HeroCards } from "./HeroCards";
import { MailPlus, Github } from "lucide-react";

export const Hero = () => {
  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text font-bold">
              DevOps
            </span>{" "}
            &amp; Automation
          </h1>{" "}
          <h2 className="inline">
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text font-bold">
              Engineer
            </span>
          </h2>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          Streamlining workflows and enhancing software delivery with AWS, Kubernetes, and CI/CD expertise.
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Button 
            className="w-full md:w-1/3" 
            onClick={() => window.open('https://github.com/rathodloki', '_blank')}
          >
            View My Work
            <Github className="ml-2 h-5 w-5" strokeWidth={2.5} />
          </Button>

          <a
            href="#contact"
            className={`w-full md:w-1/3 ${buttonVariants({
              variant: "outline",
            })}`}
          >
            Get in Touch
            <MailPlus className="ml-2 h-5 w-5" strokeWidth={2.5} />
          </a>
        </div>
      </div>

      {/* Hero cards sections */}
      <div className="z-10">
        <HeroCards />
      </div>

      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  );
};
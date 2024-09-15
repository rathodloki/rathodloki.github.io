import { Statistics } from "./Statistics";
import pilot from "../assets/pilot.png";

export const About = () => {
  return (
    <section
      id="about"
      className="container py-24 sm:py-32"
    >
      <div className="bg-muted/50 border rounded-lg py-12">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <img
            src="/profile-img.webp"
            alt=""
            className="w-[300px] object-contain rounded-lg"
          />
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                  About{" "}
                </span>
                Me
              </h2>
              <p className="text-xl text-muted-foreground mt-4">
                Experienced IT professional specializing in DevOps Engineering and Software Development. With 5 years of experience, I bring expertise in automating complex systems and full-stack development. Skilled in Python, AWS, Jenkins, GitHub Actions, and Apache. Based in Mumbai, India, I'm always eager to tackle modern solutions and drive innovation in the tech world.
              </p>
            </div>

            <Statistics />
          </div>
        </div>
      </div>
    </section>
  );
};
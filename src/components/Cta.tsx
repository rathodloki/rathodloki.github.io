import { Button } from "./ui/button";

export const Cta = () => {
  return (
    <section
      id="contact"
      className="bg-muted/50 py-16 my-24 sm:my-32"
    >
      <div className="container lg:grid lg:grid-cols-2 place-items-center">
        <div className="lg:col-start-1">
          <h2 className="text-3xl md:text-4xl font-bold">
            Let's
            <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
              {" "}
              Work Together{" "}
            </span>
            on Your Next Project
          </h2>
          <p className="text-muted-foreground text-xl mt-4 mb-8 lg:mb-0">
            I'm always open to new opportunities and collaborations. Whether you have a project in mind or just want to connect, feel free to reach out!
          </p>
        </div>

        <div className="space-y-4 lg:col-start-2">
          <Button className="w-full md:mr-4 md:w-auto" onClick={() => window.location.href = 'mailto:rathodlokendar@gmail.com'}>
            Contact Me
          </Button>
          <Button
            variant="outline"
            className="w-full md:w-auto"
            onClick={() => window.open('https://www.linkedin.com/in/lokendar-singh/', '_blank')}
          >
            Connect on LinkedIn
          </Button>
        </div>
      </div>
    </section>
  );
};
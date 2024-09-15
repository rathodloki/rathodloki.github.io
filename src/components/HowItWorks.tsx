import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { PlanCodeIcon, ToolsIcon, CloudIcon, RobotIcon } from "../components/Icons";

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: <PlanCodeIcon />,
    title: "Plan & Code",
    description:
      "Define project requirements, design architecture, and write efficient, maintainable code.",
  },
  {
    icon: <ToolsIcon />,
    title: "Build & Test",
    description:
      "Implement continuous integration, run automated tests, and ensure code quality.",
  },
  {
    icon: <CloudIcon />,
    title: "Deploy & Monitor",
    description:
      "Utilize continuous deployment, manage infrastructure, and monitor application performance.",
  },
  {
    icon: <RobotIcon />,
    title: "Automate & Optimize",
    description:
      "Implement automation workflows, optimize processes, and continuously improve the DevOps pipeline.",
  },
];

export const HowItWorks = () => {
  return (
    <section
      id="howItWorks"
      className="container text-center py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold ">
        How {" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
        DevOps{" "}
        </span>
        Lifecycle Works
      </h2>
      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
      I always start with this basic overlay of essentials.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon, title, description }: FeatureProps) => (
          <Card
            key={title}
            className="bg-muted/50"
          >
            <CardHeader>
              <CardTitle className="grid gap-4 place-items-center">
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
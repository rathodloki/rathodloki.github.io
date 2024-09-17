import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { MagnifierIcon, WalletIcon, ChartIcon } from "./Icons";

interface ServiceProps {
  title: string;
  description: string;
  icon: JSX.Element;
}

const serviceList: ServiceProps[] = [
  {
    title: "Code Collaboration",
    description:
      "Experienced in DevOps practices, collaborating with large teams through GitHub for efficient version control and seamless code integration.",
    icon: <ChartIcon />,
  },
  {
    title: "Project Management",
    description:
      "Proficient in various project management tools including Jira and Asana, adept at handling sprints, tasks, and epics for optimal project execution.",
    icon: <WalletIcon />,
  },
  {
    title: "Task Automation",
    description:
      "Skilled in automation using Python and Bash scripting to streamline daily activities, user management, and maintenance tasks for improved efficiency.",
    icon: <MagnifierIcon />,
  },
];

export const Services = () => {
  return (
    <section className="container py-24 sm:py-32">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            Professional{" "}
          </span>
          Services
        </h2>

        <p className="text-muted-foreground text-xl whitespace overflow-hidden text-ellipsis">
          Delivering high-quality solutions through expert collaboration, management, and automation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="md:col-start-1">
          <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
            <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
              {serviceList[0].icon}
            </div>
            <div>
              <CardTitle>{serviceList[0].title}</CardTitle>
              <CardDescription className="text-md mt-2">
                {serviceList[0].description}
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
        
        <Card className="md:col-start-2 md:col-end-3 md:row-start-2">
          <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
            <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
              {serviceList[1].icon}
            </div>
            <div>
              <CardTitle>{serviceList[1].title}</CardTitle>
              <CardDescription className="text-md mt-2">
                {serviceList[1].description}
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
        
        <Card className="md:col-start-1 md:col-end-2 md:row-start-3">
          <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
            <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
              {serviceList[2].icon}
            </div>
            <div>
              <CardTitle>{serviceList[2].title}</CardTitle>
              <CardDescription className="text-md mt-2">
                {serviceList[2].description}
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
      </div>
    </section>
  );
};
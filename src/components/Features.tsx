import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

interface FeatureProps {
  title: string;
  description: string;
  image: string;
  githubLink: string;
}

const features: FeatureProps[] = [
  {
    title: "Cloud Automation",
    description:
      "Revolutionize your deployment process in this project where a robust web application will be automatically deployed to AWS, leveraging the power of Terraform, Ansible, and GitHub Actions. No more manual setups-your cloud infrastructure is now just one click away!",
    image: "cloudautomation.webp",
    githubLink: "https://github.com/rathodloki/ec2-auto-creation",
  },
  {
    title: "Devops Tools",
    description:
      "From the Analyzer to the Configuration Drift Detector, Dependency Checker, and Monitor all come into play to enhance your system's reliability. No more manual monitoring required; just a glance will reveal your system's health.",
    image: "devopstools.webp",
    githubLink: "https://github.com/rathodloki/devops_tools",
  },
  {
    title: "Greenstox Automation Project",
    description:
      "Automate your investment strategy with this project that brings together TechnoFunda analysis, Telegram integration, and Smart Equity Execution into a seamless process. Say goodbye to manual trading-your investment decisions are now just a click away!",
    image: "greenstox.webp",
    githubLink: "https://github.com/rathodloki/greenstox_automation_project",
  },
];

const featureList: string[] = [
  "Bash",
  "Python",
  "Ansible",
  "AWS",
  "Kubernetes",
  "Git",
  "Docker",
  "Jira",
  "Terraform",
  "Linux",
];

export const Features = () => {
  return (
    <section
      id="skills"
      className="container py-24 sm:py-32 space-y-8"
    >
      <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
        Key{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Skills & Strengths
        </span>
      </h2>

      <div className="flex flex-wrap md:justify-center gap-4">
        {featureList.map((feature: string) => (
          <div key={feature}>
            <Badge
              variant="secondary"
              className="text-sm"
            >
              {feature}
            </Badge>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(({ title, description, image, githubLink }: FeatureProps) => (
          <Card key={title} className="flex flex-col">
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>

            <CardContent className="flex-grow">{description}</CardContent>

            <CardFooter className="pt-4">
              <div className="w-full aspect-square relative overflow-hidden group">
                <img
                  src={image}
                  alt={`${title} feature`}
                  className="absolute inset-0 w-full h-full object-cover rounded-md transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                <a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <GitHubLogoIcon className="w-12 h-12 text-white" />
                </a>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
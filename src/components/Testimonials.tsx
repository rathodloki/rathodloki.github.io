import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TestimonialProps {
  image: string;
  name: string;
  position: string;
  comment: string;
}

const testimonials: TestimonialProps[] = [
  {
    image: "/recommendation-image/rajashree_roy.webp",
    name: "Rajashree Aditya Roy",
    position: "IO/OT Security Consultant at i2solutions Germany",
    comment: "His technical expertise and dedication make him an ideal DevOps Engineer. A true asset to any team.",
  },
  {
    image: "/recommendation-image/rushabh_modi.webp",
    name: "Rushabh Modi",
    position: "Software Developer at WebMD",
    comment: "Lokendar's automation skills streamlined our processes, saving time and boosting efficiency. A quick learner and invaluable team member.",
  },
  {
    image: "/recommendation-image/Ishwar_singh_panwar.webp",
    name: "Ishwar Singh Panwar",
    position: "Blockchain Consultant",
    comment: "Need a DevOps expert? Lokendar delivers innovative solutions with top-tier technical skills. A collaborative asset to any team!",
  },
  {
    image: "/recommendation-image/thoufeeque_saheer.webp",
    name: "Thoufeeque Saheer",
    position: "CEO & Founder at Archi's Academy",
    comment: "Lokendar, a finalist at Endurance 2021, excelled in DevOps. He's poised for success-an asset to any team.",
  },
];

const TestimonialCard = ({ testimonial }: { testimonial: TestimonialProps }) => (
  <Card className="w-[300px] h-[200px] flex-shrink-0 mx-4">
    <CardHeader className="flex flex-row items-center gap-4">
      <Avatar>
        <AvatarImage alt="" src={testimonial.image} />
        <AvatarFallback>OM</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <CardTitle className="text-sm">{testimonial.name}</CardTitle>
        <CardDescription className="text-xs">{testimonial.position}</CardDescription>
      </div>
    </CardHeader>
    <CardContent className="text-xs">{testimonial.comment}</CardContent>
  </Card>
);

export const Testimonials = () => {
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section id="recommend" className="py-24 sm:py-32 overflow-hidden">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          What
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            {" "}People Say{" "}
          </span>
          About Me
        </h2>
        <p className="text-xl text-muted-foreground mb-8">
          Hear from professionals I've worked with about my skills and contributions
        </p>
      </div>
      
      <div className="relative w-full">
        <div className="absolute w-full h-full bg-gradient-to-r from-background via-transparent to-background z-10 pointer-events-none" />
        <div className="flex animate-carousel">
          {duplicatedTestimonials.map((testimonial, index) => (
            <TestimonialCard key={`${testimonial.name}-${index}`} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};
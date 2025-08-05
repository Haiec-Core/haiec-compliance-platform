import Image from "next/image";
import Container from "@containers/container";
import { Typography } from "../ui/typography";
import { testimonials } from "@/lib/enums";

export default function Testimonials() {
  const getTestimonialDataArr = () => {
    const result = [];
    for (let i in testimonials) {
      if (Array.isArray(testimonials[i])) {
        result.push(...testimonials[i]);
      }
    }
    return result;
  };

  const nestedTestimonialData = getTestimonialDataArr();

  const arr0 = nestedTestimonialData[0] || [];
  const arr1 = nestedTestimonialData[1] || [];

  const combinedResult = [...arr0, ...arr1];

  return (
    <Container className="py-4 md:py-8" id="testimonial">
      <div className="flex flex-col space-y-6 md:space-y-1">
        <div className="flex flex-col items-start md:pl-40 pl-4 space-y-4">
          <Typography
            variant="h3"
            className="font-bold text-yellow-900 md:text-4xl md:leading-[48px]"
          >
            Loved by industry leaders
          </Typography>
          <Typography
            className="text-sm font-normal text-pretty text-secondary"
            variant={"p"}
          >
            Great, now that we have your attention, we will actually{" "}
            <br className="hidden" />
            talk about how we help you
          </Typography>
        </div>
        <div className="flex justify-center gap-8 w-full flex-wrap">
          {combinedResult.slice(0, 4).map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </Container>
  );
}

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="w-full md:w-[20rem] bg-white p-6 shadow-md flex flex-col items-start space-y-4 md:mt-8">
      <blockquote className="text-card-foreground">
        <p>{`“${testimonial.body}”`}</p>
      </blockquote>
      <div className="flex items-center space-x-4">
        <Image
          width={40}
          height={40}
          className="h-10 w-10 rounded-full bg-gray-50"
          src={testimonial.author?.imageUrl}
          alt={testimonial.author?.name}
        />
        <div>
          <div className="font-semibold">{testimonial.author?.name}</div>
          <div className="text-foreground text-xs">{`@${testimonial.author?.handle}`}</div>
        </div>
      </div>
    </div>
  );
};

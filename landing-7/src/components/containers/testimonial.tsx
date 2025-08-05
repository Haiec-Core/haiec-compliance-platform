import React from "react";
import Container from "./container";
import { TESTIMONIES } from "@/lib/enums";
import { Typography } from "../ui/typography";
import { Card, CardContent } from "../ui/card";

const Testimonials = ({}) => {
  return (
    <Container classNames="bg-background py-20">
       <Typography variant={"h2"} className="tracking-tighter mb-3">Loved by industry leaders</Typography>
          <Typography>
          Great, now that we have your attention, we will actually talk about how we help you
          </Typography>
     
      <div className="grid grid-cols-1 gap-8 pt-5 lg:grid-cols-3">
        {TESTIMONIES.map((testimonial) => {
          return (
            <Card key={testimonial.author}>
              <CardContent>
                <Typography className="mb-8 h-40 lg:h-64">
                  {testimonial.review}
                </Typography>
                <Typography variant={"lead"} className="font-semibold pt-10 md:pt-0">
                  {testimonial.author}
                </Typography>
                <Typography className="">{testimonial.role}</Typography>
                <Typography>{testimonial.brand}</Typography>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </Container>
  );
};

export default Testimonials;

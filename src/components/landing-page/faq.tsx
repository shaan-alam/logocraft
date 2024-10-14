import { Accordion, AccordionItem } from "@nextui-org/react";
import { v4 } from "uuid";

import { faqs } from "@/constants";

const FAQ = () => {
  return (
    <div className="container mx-auto my-12">
      <h1 className="mb-8 text-center text-3xl font-bold md:text-4xl lg:text-5xl">
        FAQ
      </h1>

      {faqs.map((faq) => (
        <Accordion
          variant="light"
          key={v4()}
          className="mx-auto my-2 w-full lg:w-1/3"
        >
          <AccordionItem key="1" title={faq.question}>
            <p className="text-default-500">{faq.answer}</p>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};

export default FAQ;

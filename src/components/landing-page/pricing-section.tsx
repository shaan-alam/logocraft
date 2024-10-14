import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { IconCheck, IconSparkles } from "@tabler/icons-react";

import { buyCredits } from "@/utils/buy-credits";

export default function LogoPricingSection() {
  const pricingData = [
    {
      title: "Starter Pack",
      price: "$5.70",
      description: "Ideal for small projects and individuals",
      buttonText: "Get Starter Pack",
      features: [
        "30 Credits (1 credit = 1 logo)",
        "12 Logo Styles",
        "Custom prompt",
        "Custom colors",
      ],
    },
    {
      title: "Standard Pack",
      price: "$19.00",
      description: "Perfect for growing businesses and professionals",
      buttonText: "Get Standard Pack",
      features: [
        "100 Credits (1 credit = 1 logo)",
        "12 Logo Styles",
        "Custom prompt",
        "Custom colors",
        "70 extra logos compared to Starter",
      ],
      recommended: true,
    },
  ];

  return (
    <section className="w-full py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="space-y-10">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl tracking-tighter sm:text-5xl">
              Stunning Logos, Surprisingly Affordable
            </h2>
            <p className="max-w-[900px] font-normal text-default-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Harness the power of AI to create professional logos at a fraction
              of traditional design costs. Perfect for startups, small
              businesses, and enterprises alike.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:gap-12">
            {pricingData.map((plan, index) => (
              <Card key={index} className="relative p-6">
                {plan.recommended && (
                  <div className="absolute right-0 top-0 rounded-bl-lg bg-gradient-to-r from-pink-500 to-purple-500 px-3 py-1 text-xs font-medium text-white">
                    RECOMMENDED
                  </div>
                )}
                <CardHeader className="flex-col items-start pb-0 pt-2">
                  <h4 className="text-2xl">{plan.title}</h4>
                  <h5 className="mt-2 text-4xl font-bold">
                    {plan.price}
                    <span className="text-lg font-normal text-zinc-500">
                      /month
                    </span>
                  </h5>
                  <p className="mt-2 text-sm text-zinc-500">
                    {plan.description}
                  </p>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                  <Button
                    disableRipple
                    onClick={buyCredits}
                    className={`mt-6 w-full ${plan.recommended ? "bg-gradient-to-br from-indigo-500 to-pink-500 text-white shadow-lg" : ""}`}
                    color={plan.recommended ? "secondary" : "primary"}
                  >
                    <IconSparkles className="mr-2 h-4 w-4" />
                    {plan.buttonText}
                  </Button>
                  <Divider className="my-4" />
                  <p className="mb-2 text-xs font-semibold uppercase text-zinc-500">
                    Features
                  </p>
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <IconCheck
                          className={`mr-2 h-4 w-4 ${plan.recommended ? "text-success" : "text-primary"}`}
                        />
                        <span className={plan.recommended ? "font-medium" : ""}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

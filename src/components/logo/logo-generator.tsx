"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Textarea } from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { TwitterPicker } from "react-color";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { useLogo } from "@/hooks/use-logo";
import { buyCredits } from "@/utils/buy-credits";

import LogoBrandIdentitySelector from "./logo-brand-identity-selector";
import LogoColorSelector from "./logo-color-selctor";
import LogoCounter from "./logo-counter";
import LogoGenerationResults from "./logo-generation-results";
import LogoIndustrySelector from "./logo-industry-selector";
import LogoStyleSelector from "./logo-style-selector";

export const formSchema = z.object({
  logo_name: z.string().min(1, { message: "Name cannot be empty" }),
  brand_name: z.string().min(1, { message: "Brand Name cannot be empty" }),
  brand_identity: z.string().min(1),
  industry: z.string().min(1),
  logo_style: z.string().min(1),
  color_scheme: z.string().min(1),
  custom_prompt: z.string().optional(),
  no_of_logos: z.number().min(1).max(3),
});

type FormValues = z.infer<typeof formSchema>;

const LogoGenerator = () => {
  const [industry, setIndustry] = useState("");
  const [primaryColor, setPrimaryColor] = useState("");
  const [secondaryColor, setSecondaryColor] = useState("");

  const queryClient = useQueryClient();

  const {
    mutate: generateLogos,
    isLoading,
    data: logos,
  } = useLogo({
    onSuccess: () => {
      queryClient.refetchQueries(["user"]);
    },
    onError: (err) => {
      if (err.message == "insufficient_credits") {
        toast(
          "You don't have enough credits to generate a logo. Buy more credits to continue.",
          {
            action: {
              label: "Buy credits",
              onClick: buyCredits,
            },
          }
        );
      }
    },
  });

  const {
    getValues,
    setValue,
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      logo_name: "",
      brand_name: "",
      brand_identity: "",
      industry: "",
      logo_style: "",
      color_scheme: "",
      custom_prompt: "",
      no_of_logos: 1,
    },
  });

  const onSubmit = async (data: FormValues) => {
    generateLogos({
      name: data.logo_name,
      brand_identity: data.brand_identity,
      brand_name: data.brand_name,
      color_scheme: data.color_scheme,
      custom_prompt: data.custom_prompt,
      industry: data.industry,
      logo_style: data.logo_style,
      no_of_logos: data.no_of_logos,
    });
  };

  return (
    <div>
      <div className="background">
        <div></div>
        <div></div>
      </div>
      <motion.div
        className="mx-auto mt-12 min-h-[90vh] w-full px-4 md:w-3/4 lg:w-1/2"
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0)" }}
        transition={{ duration: 0.4 }}
      >
        <div id="form" className="w-full">
          <h1 className="mb-2 text-xl font-medium text-primary md:text-2xl">
            Create Your Unique Logo with AI
          </h1>
          <p className="mb-6 text-sm text-default-400 md:text-base">
            Fill in the details below, and let AI craft a professional and
            personalized logo for your brand in seconds!
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input
                size="lg"
                label="Logo Name"
                isInvalid={!!errors.logo_name}
                errorMessage={errors.logo_name?.message}
                placeholder="Logo Name"
                {...register("logo_name")}
              />
            </div>
            <div className="flex w-full flex-col space-y-4 md:flex-row md:space-x-3 md:space-y-0">
              <div className="w-full md:w-1/2">
                <Input
                  size="lg"
                  label="Brand Name"
                  placeholder="Enter Brand Name"
                  isInvalid={!!errors.brand_name}
                  errorMessage={errors.brand_name?.message}
                  {...register("brand_name")}
                />
              </div>
              <div className="w-full md:w-1/2">
                <LogoBrandIdentitySelector
                  onChangeValue={(value) => setValue("brand_identity", value)}
                />
              </div>
            </div>
            <div>
              <LogoIndustrySelector
                onChangeValue={(value) => setValue("industry", value)}
              />
              {watch("industry") === "Other" && (
                <Input
                  label="Enter Industry"
                  placeholder="For ex. Marketing"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="mt-4"
                />
              )}
            </div>
            <div>
              <LogoStyleSelector
                onChangeValue={(value) => setValue("logo_style", value)}
              />
            </div>
            <div>
              <LogoColorSelector
                onChangeValue={(value) => setValue("color_scheme", value)}
              />
            </div>
            {watch("color_scheme") === "Custom" && (
              <div className="flex flex-col space-y-4 md:flex-row md:space-x-3 md:space-y-0">
                <div className="w-full md:w-1/2">
                  <h1 className="text-muted-foreground mb-4 text-sm md:text-base">
                    Primary Color:
                  </h1>
                  <TwitterPicker
                    triangle="hide"
                    color={primaryColor}
                    onChange={(color) => setPrimaryColor(color.hex)}
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <h1 className="text-muted-foreground mb-4 text-sm md:text-base">
                    Secondary Color:
                  </h1>
                  <TwitterPicker
                    triangle="hide"
                    color={secondaryColor}
                    onChange={(color) => setSecondaryColor(color.hex)}
                  />
                </div>
              </div>
            )}
            <div>
              <LogoCounter
                onChangeNumber={(number) => setValue("no_of_logos", number)}
              />
            </div>
            <div>
              <Textarea
                label="Custom Prompt (Optional)"
                placeholder="Enter your custom prompt here"
                {...register("custom_prompt")}
              />
            </div>
            <Button
              color="primary"
              type="submit"
              isLoading={isLoading}
              disableRipple
              fullWidth
            >
              Generate
            </Button>
          </form>
        </div>
        <div className="my-12">
          {logos && (
            <LogoGenerationResults logos={logos} name={getValues().logo_name} />
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default LogoGenerator;

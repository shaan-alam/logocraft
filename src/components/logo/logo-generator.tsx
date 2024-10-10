"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Switch, Textarea, Tooltip } from "@nextui-org/react";
import { IconHelp } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { TwitterPicker } from "react-color";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { generateLogosAction } from "@/actions/logo.action";
import { useServerActionMutation } from "@/hooks/server-action-hooks";

import LogoBrandIdentitySelector from "./logo-brand-identity-selector";
import LogoColorSelector from "./logo-color-selctor";
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
  isPublic: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

const LogoGenerator = () => {
  const [industry, setIndustry] = useState("");
  const [primaryColor, setPrimaryColor] = useState("");
  const [secondaryColor, setSecondaryColor] = useState("");

  const {
    mutate: generateLogos,
    isPending,
    data: logo,
  } = useServerActionMutation(generateLogosAction);

  const {
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
      isPublic: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    const body: FormValues = {
      ...data,
      color_scheme:
        data.color_scheme === "Custom"
          ? [primaryColor, secondaryColor].join(",")
          : data.color_scheme,
      industry: data.industry === "Other" ? industry : data.industry,
      custom_prompt: data.custom_prompt,
      isPublic: data.isPublic,
    };

    generateLogos({ name: data.logo_name, config: body });
  };

  return (
    <motion.div
      className="mx-auto w-1/2"
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{ opacity: 1, filter: "blur(0)" }}
      transition={{ duration: 0.4 }}
    >
      <div id="form" className="w-full">
        <h1 className="mb-2 text-xl font-medium text-primary">
          Create Your Unique Logo with AI
        </h1>
        <p className="mb-6 text-default-400">
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
          <div className="flex w-full space-x-3">
            <div className="w-1/2">
              <Input
                size="lg"
                label="Brand Name"
                placeholder="Enter Brand Name"
                isInvalid={!!errors.brand_name}
                errorMessage={errors.brand_name?.message}
                {...register("brand_name")}
              />
            </div>
            <div className="w-1/2">
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
            <div className="flex space-x-3">
              <div className="w-1/2">
                <h1 className="mb-4 text-default-700">Primary Color:</h1>
                <TwitterPicker
                  triangle="hide"
                  color={primaryColor}
                  onChange={(color) => setPrimaryColor(color.hex)}
                />
              </div>
              <div className="w-1/2">
                <h1 className="mb-4 text-default-700">Secondary Color:</h1>
                <TwitterPicker
                  triangle="hide"
                  color={secondaryColor}
                  onChange={(color) => setSecondaryColor(color.hex)}
                />
              </div>
            </div>
          )}
          <div>
            <Textarea
              label="Custom Prompt (Optional)"
              placeholder="Enter your custom prompt here"
              {...register("custom_prompt")}
            />
          </div>
          <div className="flex items-center space-x-4">
            <label
              htmlFor="visibility-switch"
              className="flex items-center space-x-1 text-default-700"
            >
              <span>Keep it public</span>

              <Tooltip
                showArrow={true}
                content="Your logo will be visible on the Landing Page on Wall of Logos section"
                className="rounded-full p-1"
              >
                <IconHelp className="h-6 w-6 text-default-500" />
              </Tooltip>
            </label>
            <Switch id="visibility-switch" {...register("isPublic")} />
          </div>

          <Button
            color="primary"
            type="submit"
            isLoading={isPending}
            disableRipple
            fullWidth
          >
            Generate
          </Button>
        </form>
      </div>
      <div>{logo && <LogoGenerationResults logo={logo} />}</div>
    </motion.div>
  );
};

export default LogoGenerator;

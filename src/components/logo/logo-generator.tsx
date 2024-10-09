"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { TwitterPicker } from "react-color";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { generateLogosAction } from "@/actions/logo.action";
import { useServerActionMutation } from "@/hooks/server-action-hooks";

import LogoBrandIdentitySelector from "./logo-brand-identity-selector";
import LogoColorSelector from "./logo-color-selctor";
import LogoIndustrySelector from "./logo-industry-selector";
import LogoStyleSelector from "./logo-style-selector";

export const formSchema = z.object({
  brand_name: z.string().min(1),
  brand_identity: z.string().min(1),
  industry: z.string().min(1),
  logo_style: z.string().min(1),
  color_scheme: z.string().min(1),
});

type FormValues = z.infer<typeof formSchema>;

const LogoGenerator = () => {
  const [industry, setIndustry] = useState("");
  const [primaryColor, setPrimaryColor] = useState("");
  const [secondaryColor, setSecondaryColor] = useState("");

  const { mutate: generateLogos, isPending } =
    useServerActionMutation(generateLogosAction);

  const {
    setValue,
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brand_name: "",
      brand_identity: "",
      industry: "",
      logo_style: "",
      color_scheme: "",
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
    };

    console.log(data);
  };

  return (
    <div className="mx-auto w-1/2">
      <div id="form" className="w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
    </div>
  );
};

export default LogoGenerator;

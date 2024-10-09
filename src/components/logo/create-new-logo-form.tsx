"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { createNewLogoAction } from "@/actions/logo.action";
import { useServerActionMutation } from "@/hooks/server-action-hooks";

const formSchema = z.object({
  logoName: z.string().min(3, {
    message: "Logo name must be at least 3 characters.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const CreateNewLogoForm = () => {
  const router = useRouter();

  const { mutate: createLogo, isPending } = useServerActionMutation(
    createNewLogoAction,
    {
      onSuccess: (logo) => {
        router.push(`/dashboard/logo/${logo.id}`);
      },
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      logoName: "",
    },
  });

  function onSubmit(values: FormValues) {
    console.log(values);
    createLogo({ name: values.logoName });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input
          label="Logo Name"
          type="text"
          id="logoName"
          {...register("logoName")}
          placeholder="LogoCraft"
          description="Please enter a name for your logo (minimum 3 characters)."
          isInvalid={!!errors.logoName}
          errorMessage={errors.logoName?.message}
        />
      </div>
      <div className="mt-4 flex justify-end">
        <Button
          type="submit"
          color="primary"
          isLoading={isPending}
          disableRipple
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default CreateNewLogoForm;

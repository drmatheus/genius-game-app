"use client";
import React, { useEffect, useState } from "react";
import { Header } from "../components/header";
import { Input } from "../components/input";
import { FieldError, FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/button";
import { useRouter } from "next/navigation";
import { api } from "../services";
import { FileInput } from "../components/inputFile";

const Register = () => {
  const loginSchema = z
    .object({
      name: z.string({ description: "Informe seu nome" }).refine((name) => {
        return name.split(" ").length >= 2;
      }, "Informe um nome e um sobrenome"),
      password: z
        .string()
        .min(8, "Sua senha deve conter pelo menos 8 caracteres"),
      passwordConfirmation: z
        .string()
        .min(8, "Sua senha deve conter pelo menos 8 caracteres"),
      email: z.string().email("Email invalido"),
      picture: z.string({ description: "Por favor selecione uma imagem" }),
      nickname: z
        .string({ description: "Escolha seu nickname" })
        .min(4, "Seu nickname deve conter pelo menos 8 caracteres"),
    })
    .superRefine(({ passwordConfirmation, password }, ctx) => {
      if (passwordConfirmation !== password) {
        ctx.addIssue({
          path: ["passwordConfirmation"],
          code: "custom",
          message: "As senhas estão diferentes, por favor corrija",
        });
      }
    });

  const [isLoading, setIsLoading] = useState(true);
  const [uniqueError, setUniqueError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const { data: userData } = await api.get("/profile");
        router.push("/");
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    verifyToken();
  }, []);

  const router = useRouter();

  const handleRegister = async (data: FieldValues): Promise<void> => {
    try {
      await api.post("users/", data);
      router.push("/login");
    } catch (e: any) {
      const email = e.response.data.message.split(" ").includes("Email");
      const nick = e.response.data.message.split(" ").includes("nickname");
      if (email && nick) {
        setUniqueError("email e nickname");
      } else if (email) {
        setUniqueError("email");
      } else {
        setUniqueError("nickname");
      }
    }
  };

  return (
    <main className="flex min-h-screen flex-col gap-4 overflow-hidden bg-nature pb-4">
      <Header />
      <h2 className="text-3xl my-4 font-extrabold bg-gray-transparent w-fit p-2 ml-2 rounded">
        Cadastrar
      </h2>

      {!isLoading ? (
        <form
          onSubmit={handleSubmit(handleRegister)}
          className="max-w-xl  py-12 flex flex-col bg-gray-transparent w-[calc(100vw-1rem)] mx-auto rounded p-4 gap-4"
        >
          <Input
            placeholder="Nome completo"
            label="Nome"
            type="text"
            error={errors.name as FieldError}
            register={register}
            registerName="name"
          />

          <Input
            placeholder="Nickname ou gamertag"
            label="Nickname"
            type="text"
            error={errors.nickname as FieldError}
            register={register}
            registerName="nickname"
          />

          <Input
            placeholder="Seu email"
            label="Email"
            type="text"
            error={errors.email as FieldError}
            register={register}
            registerName="email"
          />

          <Input
            placeholder="Senha"
            label="Senha"
            type="password"
            error={errors.password as FieldError}
            register={register}
            registerName="password"
          />

          <Input
            placeholder="Confirmar senha"
            label="Confirmar senha"
            type="password"
            error={errors.passwordConfirmation as FieldError}
            register={register}
            registerName="passwordConfirmation"
          />

          <FileInput
            label="Escolher arquivo"
            registerName="photo"
            type="file"
            register={register}
            setValue={setValue}
          />

          {errors?.picture && <p>{errors.picture.message as String}</p>}

          {uniqueError ? <p>O {uniqueError} está indisponivel</p> : null}

          <Button
            text="Cadastrar"
            className="bg-green-700 text-2xl font-bold h-12 w-full mt-2"
          />
        </form>
      ) : null}
    </main>
  );
};

export default Register;

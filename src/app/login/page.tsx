"use client";

import Cookies from "js-cookie";
import { Input } from "../components/input";
import React, { useEffect, useState } from "react";
import { useForm, FieldValues, FieldError } from "react-hook-form";
import { Button } from "../components/button";
import { Header } from "../components/header";
import { api } from "../services";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const Login = () => {
  const loginSchema = z.object({
    password: z.string(),
    email: z.string().email(),
  });

  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await api.get("/profile");
        router.push("/");
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    verifyToken();
  }, []);

  const router = useRouter();

  const handleLogin = async (data: FieldValues): Promise<void> => {
    try {
      const { data: token }: { data: { token: string } } = await api.post(
        "login/",
        data
      );
      Cookies.set("geniusGame@token", `Baerer ${token.token}`, { expires: 7 });
      router.push("/");
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <main className="flex min-h-screen flex-col gap-4 overflow-hidden bg-nature bg-cover">
      <Header />
      <div className=" flex max-w-xl w-screen mx-auto">
        <h2 className="text-3xl my-4 font-extrabold text-white bg-gray-transparent w-fit p-2 ml-2 rounded">
          Entrar
        </h2>
      </div>

      {!isLoading ? (
        <form
          onSubmit={handleSubmit(handleLogin)}
          className=" py-12 max-w-xl flex flex-col bg-gray-transparent w-[calc(100vw-1rem)] mx-auto rounded p-4 gap-2"
        >
          <Input
            label="Email"
            type="text"
            error={errors.email as FieldError}
            register={register}
            registerName="email"
            placeholder="Seu email"
          />
          <Input
            label="Senha"
            type="password"
            error={errors.password as FieldError}
            register={register}
            registerName="password"
            placeholder="Sua senha"
          />
          <Button
            text="Entrar"
            className="bg-green-700 text-2xl font-bold h-12 w-full mt-2"
          />
        </form>
      ) : null}
    </main>
  );
};

export default Login;

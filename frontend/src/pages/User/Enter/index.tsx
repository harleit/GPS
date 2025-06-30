// src/pages/Auth/LoginPage.tsx (New file)
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "@/services/user.service"; // Import the new login service
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { KeyRound, Mail } from "lucide-react";
import LogoSchedio from "../../../assets/logo-schedio.svg"; // Adjust path as needed
import FormImage from "../../../assets/form-image.png";


const loginSchema = z.object({
  email: z.string().email({ message: "Digite um e-mail válido." }),
  password: z.string().min(1, { message: "Senha obrigatória" }),
});

export function LoginPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      const payload = {
        email: data.email,
        senha: data.password,
      };

      const response = await loginUser(payload);
      const { jwt, message } = response;

      // Store the JWT in local storage or a secure state management solution
      localStorage.setItem("jwtToken", jwt);

      toast("Login bem-sucedido!", {
        description: message,
      });

      // Redirect to a protected route, e.g., projects list
      navigate("/project");
    } catch (error: any) {
      toast.error("Erro no Login", {
        description: error.message || "Verifique suas credenciais e tente novamente.",
      });
      console.error("Login Error:", error);
    }
  };

  return (
    <div>
      <div className="pt-1 pl-5">
        <h1 className="text-[#3B63A8] font-bold text-2xl">Sched<span>io</span></h1>
      </div>
      <div className="flex justify-center items-center h-dvh">
        <div className="flex justify-center p-15 rounded-lg shadow-lg gap-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-1/2"
          >
            <h1 className="text-center text-[#57a5d9] font-semibold text-2xl animate-pulse">Bem-vindo de volta!</h1>
            {/* Email */}
            <div>
              <div className="flex items-center gap-2">
                <Mail size={18} className="text-blue-500" />
                <label htmlFor="email" className="block mb-2">
                  Email
                </label>
              </div>
              <Input
                type="email"
                {...register("email")}
                placeholder="Digite seu Email"
                className="w-full"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            {/* Senha */}
            <div>
              <div className="flex items-center gap-2">
                <KeyRound size={18} className="text-blue-500" />
                <label htmlFor="password" className="block mb-2">
                  Senha
                </label>
              </div>
              <Input
                type="password"
                {...register("password")}
                placeholder="Digite sua senha"
                className="w-full"
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            {/* Botão de submit */}
            <Button className="cursor-pointer bg-blue-500 hover:bg-blue-600 transition-colors ease-in-out" type="submit">
              Entrar
            </Button>
            <div className="flex w-full justify-between">
              Não tem cadastro?
              <Button
                className="bg-blue-500 hover:bg-blue-600 transition-colors ease-in-out cursor-pointer"
                onClick={() => navigate("/")} // Assuming '/' is your registration route
              >
                Cadastre-se
              </Button>
            </div>
          </form>
          <div className="flex flex-col w-1/2 justify-around">
            <div>
              <img
                src={FormImage}
                alt="Imagem de duas pessoas dando mãos"
                className=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUser } from "@/services/user.service";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import FormImage from "../../../assets/form-image.png";
import { useNavigate } from "react-router-dom";
import { KeyRound, Mail, User } from "lucide-react";
import LogoSchedio from "../../../assets/logo-schedio.svg";

const schema = z.object({
  userName: z
    .string()
    .min(3, { message: "O campo deve ter pelo menos 3 caracteres." })
    .max(50, { message: "O campo deve ter no máximo 50 caracteres" }),
  userEmail: z.string().email({ message: "Digite um e-mail válido." }),
  userPassword: z.string().min(1, { message: "Senha obrigatória" }),
});

export function NewUser() {
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof schema>>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      const payload = {
        nomeCompleto: data.userName,
        email: data.userEmail,
        senha: data.userPassword,
      };

      await createUser(payload);

      /* Sucesso */
      toast("Usuário criado!", {
        description: "O usuário foi criado com sucesso!",
      });
      reset();
      navigate("project/new");
    } catch (error) {
      //Erro no envio
      toast.error("Erro ao criar usuário", {
        description: "Verifique os dados e tente novamente.",
      });
      console.error("Erro:", error);
    }
  };

  return (
    <div>
      <div className = "pt-1 pl-5">
        <h1 className = "text-[#3B63A8] font-bold text-2xl">Sched<span>io</span></h1>
      </div>
      <div className="flex justify-center items-center h-dvh">
        <div className="flex justify-center  p-[10px]  rounded-lg shadow-lg gap-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-1/2"
          >
            {/* nome completo */}
            <div>
              <h1 className = "text-center text-[#57a5d9] font-semibold text-2xl animate-pulse">Bem-vindo</h1>
              <div className="flex items-center gap-2">
                <User size={18} className="text-blue-500" />
                <label htmlFor="userName" className="block mb-2">
                  Nome completo
                </label>
              </div>
              <Input
                {...register("userName")}
                placeholder="Digite seu nome completo"
                className="w-full"
              />
              {errors.userName ? (
                <p className="text-sm text-red-500">{errors.userName.message}</p>
              ) : (
                <p className="text-sm text-blue-500">
                  Esse é o seu nome completo
                </p>
              )}
            </div>
            {/* email  */}
            <div>
              <div className="flex items-center gap-2">
                <Mail size={18} className="text-blue-500" />
                <label htmlFor="userEmail" className="block mb-2">
                  Email
                </label>
              </div>
              <Input
                type="email"
                {...register("userEmail")}
                placeholder="Digite seu Email"
                className="w-full"
              />
              {errors.userEmail ? (
                <p className="text-sm text-red-500">{errors.userEmail.message}</p>
              ) : (
                <p className="text-sm text-blue-500">
                  Esse será o seu Email cadastrado
                </p>
              )}
            </div>
            {/* senha */}
            <div>
              <div className="flex items-center gap-2">
                <KeyRound size={18} className="text-blue-500" />
                <label htmlFor="userPassword" className="block mb-2">
                  Senha
                </label>
              </div>
              <Input
                type="password"
                {...register("userPassword")}
                placeholder="Digite sua senha"
                className="w-full"
              />
              {errors.userPassword ? (
                <p className="text-sm text-red-500">
                  {errors.userPassword.message}
                </p>
              ) : (
                <p className="text-sm text-blue-500">Sua senha</p>
              )}
            </div>
            {/* Botão de submit */}
            <Button className="cursor-pointer bg-blue-500 hover:bg-blue-600 transition-colors ease-in-out" type="submit">
              Cadastrar
            </Button>
            <div className="flex w-full justify-between">
              Já possui cadastro?
              <Button
                className="bg-blue-500 hover:bg-blue-600 transition-colors ease-in-out cursor-pointer"
                onClick={() => navigate("project")}
              >
                Entrar
              </Button>
            </div>
          </form>
          <div className="flex flex-col w-1/2 justify-around">
      
            <div>
              <img
                src={FormImage}
                alt="Imagem de duas pessoas dando mãos"
                className = ""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

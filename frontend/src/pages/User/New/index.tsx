import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUser } from "@/services/user.service";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const schema = z.object({
    userName: z.string().min(10, {message: "Nome obrigatório"}),
    userEmail:  z.string().min(20, {message: "Email obrigatório"}),
    userPassword: z.string().min(5, {message: "Senha obrigatória"})
}); 

export function NewUser(){
    const { 
        register, 
        handleSubmit, 
        formState: {errors, isValid},
        reset,
    } = useForm<z.infer<typeof schema>>({
        mode: "onChange",
        resolver: zodResolver(schema)
    }); 

    const onSubmit = async(data: z.infer<typeof schema>) => {
        try{
            const payload = {
                nomeCompleto: data.userName,
                email: data.userEmail,
                senha: data.userPassword
            };

            await createUser(payload); 

            /* Sucesso */
            toast("Usuário criado!",{
                description: "O usuário foi criado com sucesso!",
            });
            reset(); 
        } catch(error){
            //Erro no envio
            toast.error("Erro ao criar usuário", {
                description: "Verifique os dados e tente novamente.",
            });
            console.error("Erro:", error);
        }
    }

    return(
        <div className = "flex justify-center w-1/2 p-[10px] bg-gray-50 rounded-lg shadow-lg">
            <form 
            onSubmit = {handleSubmit(onSubmit)}
            className = "flex flex-col gap-8 w-full">
                {/* nome completo */}
                <div>
                    <label htmlFor="userName"
                    className = "block mb-2">
                        Nome completo
                    </label>
                    <Input
                    {...register("userName")}
                    placeholder = "Digite seu nome completo"
                    className = "w-full"
                    />
                    {errors.userName? (
                        <p className = "text-red-500">{errors.userName.message}</p>
                    ) : (
                        <p className = "text-sm text-gray-500">
                            Esse é o seu nome completo
                        </p>
                    )}

                </div>

                {/* email  */}
                <div>
                    <label htmlFor="userEmail"
                    className = "block mb-2">
                        Email
                    </label>
                    <Input 
                    type = "email"
                    {...register("userEmail")}
                    placeholder = "Digite seu Email"
                    className = "w-full"
                    />
                    {errors.userEmail ? (
                        <p className = "text-red-500">{errors.userEmail.message}</p>
                    ) : (
                        <p className = "text-sm text-gray-500">
                            Esse será o seu Email cadastrado
                        </p>
                    )}
                    
                </div>

                {/* senha */}
                <div>
                    <label htmlFor="userPassword"
                    className = "block mb-2">
                        Senha
                    </label>
                    <Input
                    type = "password"
                    {...register("userPassword")}
                    placeholder = "Digite sua senha"
                    className = "w-full"
                    />
                    {errors.userPassword ? (
                        <p className = "text-red-500">{errors.userPassword.message}</p>
                    ) : (
                        <p className = "text-sm text-gray-500">
                            Sua senha 
                        </p>
                    )}

                </div>

                {/* Botão de submit */}
                <Button className = "cursor-pointer"
                type = "submit">Cadastrar</Button>

            </form>
            
        </div>
    )
}
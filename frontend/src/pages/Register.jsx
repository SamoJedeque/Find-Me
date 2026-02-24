import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register(){
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) =>{
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    const validate = () => {
        if(form.password.length <= 6){
            return "A senha é muito fraca"
        }

        if(form.confirmPassword !== form.password){
            return "As senhas são diferentes.";
        }

        return null;
    };


    const handleSubmit =  async (e) => {
        e.preventDefault();
        setError("");

        const validationError = validate();

        if(validationError){
            setError(validationError);
            return;
        }

        // const response = await  fetch("http://localhost:3000/api/auth/register", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "aplication/json"
        //     },
        //     body: JSON.stringify(from)
        // });
        
        try {

            setLoading(true);

            await api.post("/create/register", {
                name: form.name,
                email: form.email,
                password: form.password,
                latitude: 10.5,
                longitude: 20.3
            });

            alert("Conta criada com sucesso!");
            navigate("/");
            
        } catch (err) {
            setError(
                err.response?.data?.error || "Erro ao criar conta."
            );
        }finally{
            setLoading(false);
        }

    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-96">

                <h2 className="text-2xl font-bold mb-6 text-center">
                    Criar Conta
                </h2>

                { error && (
                    <div className="bg-red-100 text-red-600 p-2 mb-4 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    <input type="text" 
                    name="name"
                    placeholder="Nome"
                    className="w-full p-2 border rounded"
                    value={form.name}
                    onChange={handleChange}
                    />

                    <input type="email" 
                    name="email"
                    placeholder="Email"
                    className="w-full p-2 border rounded"
                    value={form.email}
                    onChange={handleChange}
                    />

                    <input type="password" 
                    name="password"
                    placeholder="Senha"
                    className="w-full p-2 border rounded"
                    value={form.password}
                    onChange={handleChange}
                    />

                    <input type="password" 
                    name="confirmPassword"
                    placeholder="Confirmar a senha"
                    className="w-full p-2 border rounded"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    />

                    <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
                    disabled={loading}
                    >
                        {loading ? "Criando a conta.." : "Registrar"}
                    </button>
                </form>

                <p className="text-sm mt-4 text-center">
                    Já tem conta?{" "}
                    <span
                    style={{color: "blue", cursor: "pointer"}}
                    onClick={() => navigate("/")}
                    >
                        Fazer Login
                    </span>
                </p>
            </div>
        </div>
    );
}
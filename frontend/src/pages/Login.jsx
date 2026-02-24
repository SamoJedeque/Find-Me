import { useState } from "react";
import ReactDOM from "react-dom";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import HelloWorld from "../components/HelloWorld";

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    

    const handleLogin = async (e) =>{
        e.preventDefault();

        const res = await api.post("/auth/login", {
            email,
            password,
        });

        localStorage.setItem("token", res.data.token);

        navigate("/dashboard");
    };

    return (
        <div>
            <HelloWorld/>
            <form onSubmit={handleLogin}>
            <input type="email" 
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            />
            <input type="password"
             onChange={(e) => setPassword(e.target.value)} 
             />

             <button>Login</button>
             <p>
                Não tem conta? {""}
                <span onClick={() => navigate("/register")} style={{color: "blue", cursor: "pointer"}}>
                    Cria Conta
                </span>
             </p>
        </form>
        </div>
    );
}
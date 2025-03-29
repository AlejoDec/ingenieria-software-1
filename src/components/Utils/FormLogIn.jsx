import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FormLogIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes agregar la lógica para manejar el inicio de sesión
        console.log("Email:", email);
        console.log("Password:", password);
        // Redirigir a otra página después del inicio de sesión exitoso
        navigate("/home");
    };
    
    return (
        <form onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center bg-gray-900 p-4 rounded-xl shadow-md"
        >
            <label className="flex flex-col">
                Email:
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border border-gray-300 rounded p-2"
                />
            </label>
            <br />
            <label className="flex flex-col">
                Password:
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border border-gray-300 rounded p-2"
                />
            </label>
            <br />
            <button type="submit">Log In</button>
        </form>
    );
}

export default FormLogIn;

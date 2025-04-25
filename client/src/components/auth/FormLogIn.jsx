import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import axiosInstance from "../../api/axiosInstance.js";
import "./FormLogIn.css";

const FormLogIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await axiosInstance.post('/login', { email, contraseña: password });
            login(res.data.token, res.data.usuario);
            navigate("/home");
        } catch (error) {
            console.error(error);
            setError('Credenciales incorrectas');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2>Iniciar Sesión</h2>
            
            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ingresa tu email"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Ingresa tu contraseña"
                        required
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Cargando...' : 'Iniciar Sesión'}
                </button>
            </form>
        </div>
    );
}

export default FormLogIn;
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post(
                "/auth/login",
                formData
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            navigate("/dashboard");

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Login failed"
            );
        }
    };

    return (
        <main className="auth-page">
            <section className="auth-aside">
                <div className="brand"><span className="brand-mark">T</span> Taskspace</div>
                <div className="aside-copy">
                    <p className="eyebrow">A calmer way to work</p>
                    <h1>Make room for meaningful progress.</h1>
                    <p>Keep the important work visible, organized, and moving forward.</p>
                </div>
                <p className="aside-footer">Personal productivity, thoughtfully arranged.</p>
            </section>
            <section className="auth-main">
                <div className="auth-card">
                    <p className="eyebrow">Welcome back</p>
                    <h1>Sign in</h1>
                    <p className="auth-subtitle">Pick up where you left off.</p>

                    {error && <p className="auth-error">{error}</p>}

                    <form onSubmit={handleSubmit}>
                        <div className="form-field">
                            <label htmlFor="login-email">Email address</label>
                            <input id="login-email" type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required />
                        </div>

                        <div className="form-field">
                            <label htmlFor="login-password">Password</label>
                            <input id="login-password" type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} required />
                        </div>

                        <button className="primary-button" type="submit">Sign in to Taskspace</button>
                    </form>

                    <p className="auth-switch">New to Taskspace? <Link to="/register">Create an account</Link></p>
                </div>
            </section>
        </main>
    );
}

export default Login;
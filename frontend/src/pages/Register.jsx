import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
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
                "/auth/register",
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
                "Registration failed"
            );
        }
    };

    return (
        <main className="auth-page">
            <section className="auth-aside">
                <div className="brand"><span className="brand-mark">T</span> Taskspace</div>
                <div className="aside-copy">
                    <p className="eyebrow">Build your rhythm</p>
                    <h1>Small steps. Clear direction.</h1>
                    <p>Turn open loops into a simple, satisfying plan for the day ahead.</p>
                </div>
                <p className="aside-footer">Personal productivity, thoughtfully arranged.</p>
            </section>
            <section className="auth-main">
                <div className="auth-card">
                    <p className="eyebrow">Get started</p>
                    <h1>Create account</h1>
                    <p className="auth-subtitle">A focused space for everything you want to finish.</p>

                    {error && <p className="auth-error">{error}</p>}

                    <form onSubmit={handleSubmit}>
                        <div className="form-field">
                            <label htmlFor="register-name">Your name</label>
                            <input id="register-name" type="text" name="name" placeholder="Alex Morgan" value={formData.name} onChange={handleChange} required />
                        </div>

                        <div className="form-field">
                            <label htmlFor="register-email">Email address</label>
                            <input id="register-email" type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required />
                        </div>

                        <div className="form-field">
                            <label htmlFor="register-password">Password</label>
                            <input id="register-password" type="password" name="password" placeholder="Choose a secure password" value={formData.password} onChange={handleChange} required />
                        </div>

                        <button className="primary-button" type="submit">Create my workspace</button>
                    </form>

                    <p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>
                </div>
            </section>
        </main>
    );
}

export default Register;
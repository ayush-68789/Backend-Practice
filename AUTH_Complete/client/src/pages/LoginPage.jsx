import React from 'react'
import { useState } from 'react';

const Login = () => {
    const [formData, setFormData] = useState({
        identifier: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5050/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            console.log(data);
        } catch (error) {
            console.log("LOGIN ERROR:", error);
        }
    };
    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    name="identifier"
                    placeholder="Username or Email"
                    value={formData.identifier}
                    onChange={handleChange}
                />

                <br />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <br />

                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login
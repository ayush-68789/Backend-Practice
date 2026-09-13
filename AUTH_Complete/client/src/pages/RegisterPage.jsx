import React, { useState } from 'react'

const register = () => {
    const [formData , setFormData] = useState({
        username : "" ,
        email : "" , 
        password : ""
    }) 

    const handleChange = (e) => {
        setFormData({
            ...formData ,
            [e.target.name] : e.target.value
        })
    }

    const handleRegister = async(e) => {
        e.preventDefault() ;
        const response = await fetch("http://localhost:5050/register", {
            method : 'POST',
            headers : {
                "Content-Type" : "application/json"
            },
            credentials : "include" ,
            body : JSON.stringify(formData)
        });
        const data = await response.json() ;
        console.log(data) ;
    }
    return (
        <div>
            <h1>Register</h1>

            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default register
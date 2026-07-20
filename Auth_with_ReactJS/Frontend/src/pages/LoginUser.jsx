import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
const LoginUser = () => {
    const [formData, setFormData] = useState({
        identifier : "" ,
        password : "" 
    })

    const navigate = useNavigate() ; 
    const loginUser = async() => {
        const response = await fetch ('http://localhost:5050/login',{
            method : "POST", 
            credentials : "include" , // for authentication as we send cookies
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(formData)
        })
        const data = await response.json();
        console.log(data);
    }

    const submitHandler = async(e) => {
        e.preventDefault() ; 
        await loginUser() ; 
        setFormData({
            identifier: "",
            password: "",
        });
        navigate('/products')
    }

    const inputChange = (e) => {
        setFormData({
            ...formData ,
            [e.target.name] : e.target.value 
        })
    }

    return (
        <div>
            <form
                onSubmit={submitHandler}
                className="flex justify-center h-full w-full"
            >
                <div className="flex flex-col  mt-50 w-80 ">
                    <section className="mb-5">
                        <TextField
                            label="Username or Email"
                            type="text"
                            name="identifier"
                            value={formData.identifier}
                            onChange={inputChange}
                            className="w-80"
                        />
                    </section>
                    <section className="mb-5">
                        <TextField
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            name="password"
                            value={formData.password}
                            onChange={inputChange}
                            className="w-80"
                        />
                    </section>
                    <Button variant="contained" color="success" type="submit">
                        Login
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default LoginUser
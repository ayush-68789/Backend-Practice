import React, { useState } from 'react'
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
const RegisterUser = () => {
    const [formData, setFormData] = useState({
        username : "" , 
        email : "" ,
        password : "" 
    })

    const regUser = async() => {
        const response = await fetch ('http://localhost:5050/register',{
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
        await regUser() ; 
        setFormData({
            username : "" , 
            email : "" , 
            password : ""
        })
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
                <div className="flex flex-col mt-50 w-80 ">
                    <section className="mb-5">
                        <TextField
                            label="Username"
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={inputChange}
                            className="w-80"
                        />
                    </section>
                    <section className="mb-5">
                        <TextField
                            label="Email"
                            type="email"
                            name="email"
                            value={formData.email}
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
                        Register
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default RegisterUser
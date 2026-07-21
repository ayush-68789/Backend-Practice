import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const [formData  , setFormData] = useState({
        name : ""
    })

    const navigate = useNavigate() ;

    const addProd = async() => {
        const response = await fetch('http://localhost:5050/products', {
            credentials : "include" ,
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            } ,
            body : JSON.stringify(formData) 
        })
        const data = await response.json() ;
        console.log(data) ; 
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        await addProd();
        setFormData({
            name : ""
        });
        navigate("/create-product");
    };

    const inputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div>
            <form
                onSubmit={submitHandler}
                className="flex justify-center h-full w-full"
            >
                <div className="flex flex-col mt-50 w-80 ">
                    <section className="mb-5">
                        <TextField
                            label="Name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={inputChange}
                            className="w-80"
                        />
                    </section>
                    <Button variant="contained" color="success" type="submit">
                        Add Product
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default AddProduct ; 
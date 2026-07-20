import React, { useEffect, useState } from 'react'

const ViewProducts = () => {
    const [products , setProducts] = useState([]) ;
    
    const fetchProducts = async () =>{
        let response = await fetch("http://localhost:5050/products", {
            credentials: "include",
        });
        let data = await response.json() ;
        setProducts(data.products) ; 
    }

    useEffect(()=> {
        fetchProducts() ; 
    }, []) ; 

    return (
    <div>
        {products.map((elem)=>{
            return (
                <div>
                    {elem.name} and Developed By : {elem.devBy.username}
                </div>
            )
        })}
    </div>
    )
}

export default ViewProducts ; 
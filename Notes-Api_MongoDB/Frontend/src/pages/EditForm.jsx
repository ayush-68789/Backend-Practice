import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

const EditForm = () => {
    const [notes, setNote] = useState({
        title : '', 
        desc : '' 
    })
    const params = useParams() ; 
    const navigate = useNavigate() ; 
    let id = params.id ;

    const prefetchData = async (id)=>{
        const response = await fetch(`http://localhost:5050/notes/${id}`) ;
        const data = await response.json() ;
        setNote({
            title : data.data.title ,
            desc : data.data.desc
        })
    }

    useEffect(()=>{
        prefetchData(id) ; 
    }, [id])

    const inputChange = async (e) => {
        setNote({
            ...notes, 
            [e.target.name] : e.target.value 
        })
    }

    const updateNote = async (id) => {
        const response = await fetch(`http://localhost:5050/notes/${id}`,
            {
                method : "PUT",
                headers : {
                    "Content-Type" : "application/json"
                }, 
                body : JSON.stringify(notes) 
            }
        )
        const data = await response.json() ; 
        console.log(data) ; 
    }

    const submitHandler = async(e) => {
        e.preventDefault() ; 
        await updateNote(id) ; 
        navigate('/notes') ; 
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <input type="text" name="title" value={notes.title} onChange={inputChange} />
                <input type="text" name="desc" value={notes.desc} onChange={inputChange} />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default EditForm
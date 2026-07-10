const CreatePost = () => {

    const submitHandler = async(e) => {
        e.preventDefault() ;
    }
  return (
    <div className="flex justify-center">
        <div >
            <h1 className="text-5xl font-bold p-10 ml-20">
                Create Post
            </h1>
            <form action="" method="post" className="bg-gray-200 p-20">
                <div className="text-2xl p-2">
                    Image : 
                    <input type="text" name="img" placeholder="Enter Image link" className="border text-2xl p-2 rounded ml-4 "/>
                </div>

                <div className="text-2xl p-2">
                    Caption : 
                    <input type="text" name="caption" placeholder="Enter Caption for post" className="border text-2xl p-2 rounded ml-4"/>
                </div>
                <button type="submit" className="border bg-green-400 px-5 py-2 text-white active:scale-95 text-2xl ml-30 mt-5 rounded hover:cursor-pointer">Submit</button>
            </form>
        </div>
    </div>
  )
}

export default CreatePost
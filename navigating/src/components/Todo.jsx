import React, { useEffect, useState } from 'react'
import { toast, Bounce } from 'react-toastify';
import { getDatabase, ref, set, push, onValue, limitToFirst } from "firebase/database";




const Todo = () => {
    const [task, setTask] = useState("")
    const [data, setData] = useState([])
    const notify = () => {
        task == "" ?
            toast.error('404 error!!!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            }) : toast.success('Successfully submitted', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
    }

    function handleClick(e) {
        e.preventDefault()
        const db = getDatabase();
        const TodoDb = ref(db, 'Todos/')
        push(TodoDb, { todoName: task }).then(() => {
            notify();
            setTask("")
        })
    }

    useEffect(() => {
        const db = getDatabase();
        const TodoRef = ref(db, 'Todos/')
        onValue(TodoRef, (item1) => {
            const myArr = [];
            // console.log(item.val())
            item1.forEach((item2) => {
                myArr.push(item2.val())
                // console.log(item2)
            })
            setData(myArr)
        })
    }, [])

    return (
        <>

            <form className="rounded-2xl w-100 mx-auto bg-teal-700 py-5">
                <h1 className='text-2xl text-white text-center'>Todo list</h1>
                <div className="my-3 px-5">
                    <label htmlFor="text" className="block mb-2.5 text-lg font-lg text-heading"></label>
                    <input value={task} type="text" id="text" className="rounded-full mx-auto block border px-10 py-2.5 text-white placeholder:text-white" placeholder="Your task" onChange={(e) => setTask(e.target.value)} />
                </div>
                <button className='bg-sky-300 block py-2 px-18 rounded-full mx-auto cursor-pointer ' onClick={handleClick}>Submit</button>

                <ul className='m-3 rounded-2xl bg-green-300'>{
                    data.map((item3) => {
                        return (
                            <li className='px-2 '>{item3.todoName}</li>
                        )
                    })
                }</ul>
            </form>


        </>
    )
}

export default Todo

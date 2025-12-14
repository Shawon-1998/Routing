import React, { useEffect, useState } from 'react'
import { toast, Bounce } from 'react-toastify';
import { getDatabase, ref, set, push, onValue, remove } from "firebase/database";
import { FaRegTrashCan } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";

const TodoTwo = () => {
  const [task, setTask] = useState("")
  const [array, setArray] = useState([])
  const [edit, setEdit] = useState(true)
  const [value, setValue] = useState("")
  const [id, setId] = useState("")
  const notify = () => {
    task == "" ?
      toast.error('errror', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      }) : toast.success('succeed', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
  }

  const handleClick = (e) => {
    e.preventDefault()
    setTask(task)
    const db = getDatabase();
    const todoTask = ref(db, 'TodoList/')
    push(todoTask,
      {
        TodoName: task
      }).then(() => {
        notify();
        setTask("")
      });
  }
  useEffect(() => {
    const db = getDatabase();
    const todoRef = ref(db, 'TodoList/')
    onValue(todoRef, (snapshot) => {
      const Arr = []
      snapshot.forEach((item) => {
        //  Arr.push(item.val())
        Arr.push({
          id: item.key,
          value: item.val()
        });
      })
      setArray(Arr)

    })
  }, [])

  const handleDelete = (id) => {

    const db = getDatabase();
    const todoRef = ref(db, 'TodoList/' + id)
    remove(todoRef)
  }
  
  const handleEdit = (e ,id,value) => {
    e.preventDefault()
    setEdit(!edit)
    setId(id)
    setValue(value)
  }

  return (
    <>
      <form className="rounded-2xl w-100 mx-auto bg-purple-700 py-5">
        <h1 className='text-2xl text-white text-center'>Todo list</h1>
        <div className="my-3 px-5">
          <label htmlFor="text" className="block mb-2.5 text-lg font-lg text-heading"></label>
          {edit ?
            <input value={task} type="text" id="text" className="rounded-full mx-auto block border px-10 py-2.5 text-white placeholder:text-white" placeholder="Your task" onChange={(e) => setTask(e.target.value)} /> :
            <input value={task} type="text" id="text" className="rounded-full mx-auto block border px-10 py-2.5 text-white placeholder:text-white" placeholder="Update Your task" onChange={(e) => setTask(e.target.value)} />
          }
        </div>
        {
          edit ? 
          <button className='bg-sky-300 block py-2 px-18 rounded-full mx-auto cursor-pointer' onClick={handleClick}>Submit</button> :          
        <button className='bg-green-300 block py-2 px-18 rounded-full mx-auto cursor-pointer' onClick={handleClick}>Update</button>
          }

        <ul className='m-3 rounded-2xl bg-gray-300'>
          {
            array.map((item) => {
              return (
                <li className='px-5 flex justify-between bg-gray-900 text-white'>
                  {item.value.TodoName}
                  <div className='flex gap-4'>
                    <button className='text-2xl text-green-400' type='submit' onClick={()=>handleEdit(item.value.TodoName,item.id)}>
                      <CiEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      type='submit'>
                      <FaRegTrashCan className='text-red-500 cursor-pointer' />
                    </button>
                  </div>
                </li>
              )
            })
          }

        </ul>
      </form>
    </>
  )
}

export default TodoTwo

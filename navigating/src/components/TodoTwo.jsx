import React, { useEffect, useState } from 'react'
import { toast, Bounce } from 'react-toastify';
import { getDatabase, ref, set, push, onValue, remove,update } from "firebase/database";
import { BsTrash3Fill } from "react-icons/bs";
import { RiEdit2Fill } from "react-icons/ri";

const TodoTwo = () => {
  const [task, setTask] = useState("")
  const [edit, setEdit] = useState(true)
  const [id, setId] = useState("")
  const [editValue, setEditValue] = useState("")
  const [array, setArray] = useState([])
  const notify = () => {
    task == "" ?
      toast.error('errror', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      }) : toast.success('succeed', {
        position: "top-right",
        autoClose: 1000,
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
      // console.log(Arr)

    })
  }, [])

  const handleDlt = (id) => {
    const db = getDatabase();
    const todoRef = ref(db, 'TodoList/' + id)
    remove(todoRef).then(()=>{
       toast.error('remove', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      })
    })
  }
  const handleEdit = (value, id) => {
    setEdit(!edit)
    setId(id)
    setEditValue(value)
  }
 const handleUpdate =(e)=>{
  e.preventDefault()
   const db = getDatabase();
   const todoTask= ref(db, 'TodoList/'+id)
    update(todoTask,
      {
        TodoName: editValue
      }).then(() => {
      setEdit(!edit)
      });
 }

  return (
    <>
      <form className="rounded-2xl w-100 mx-auto bg-gray-700 py-5">
        <h1 className='text-2xl text-white text-center'>Todo list</h1>
        <div className="my-3 px-5">
          <label htmlFor="text"
            className="block mb-2.5 text-lg  font-lg text-heading">
          </label>
          {
            edit ?
              <input value={task} type="text" id="text" className="rounded-full mx-auto block border px-19 py-2 text-white placeholder:text-white" placeholder="Your task" onChange={(e) => setTask(e.target.value)} />
              :
              <input value={editValue} type="text" id="text" className="rounded-full mx-auto block border px-19 py-2 text-white placeholder:text-white" placeholder=" Update Your task" onChange={(e) => setEditValue(e.target.value)} />
              }
        </div>
        {
          edit ?
            <button className='bg-sky-300 block py-2 px-18 rounded-full mx-auto cursor-pointer' onClick={handleClick}>Submit</button>
            :
            <button className='bg-red-300 block py-2 px-18 rounded-full mx-auto cursor-pointer' onClick={handleUpdate}>Update</button>
        }
        <ul className='rounded-2xl '>
          {
            array.map((item) => {
              return (
                <li className='px-5 flex justify-between p-1 m-2  bg-blue-400 text-white rounded-2xl'>
                  {item.value.TodoName}
                  <div className='text-2xl cursor-pointer flex gap-5'>
                    <button className='' onClick={(e) => {
                      e.preventDefault()
                      handleEdit(item.value.TodoName, item.id)
                    }} type='submit'>
                      <RiEdit2Fill />
                    </button>
                    <button className=' text-red-700 cursor-pointer'
                      onClick={(e) => {
                        e.preventDefault()
                        handleDlt(item.id)
                      }}>
                      <BsTrash3Fill />
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

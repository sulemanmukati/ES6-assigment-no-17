import {  addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { FaPencilAlt ,FaPlus, FaTrash } from "react-icons/fa";
import db from './firebase';


const App = () => {
const [todos,SetTodos] =useState([])
const [input, setInput] = useState("")
const [editIndex, setEditIndex] = useState(-1)
const[refresh,setRefresh] =useState(false)


// useEffect(()=>{
//   const unsubscribe = onSnapshot(collection(db, 'todos'), (snapshot) => {
//     SetTodos(snapshot.docs.map((doc) => ({id: doc.id, ...doc.data().todo })))
//   })

//   return ()=> unsubscribe
// },[])

useEffect(()=>{
  getData();
},[refresh])

const getData =async ()=>{
  try{
      const arr =[]
      const querySnapshot = await getDocs(collection(db, "todos"));
      querySnapshot.forEach((doc) => {
          arr.push({...doc.data(),id:doc.id})
      })
      SetTodos(arr)
      setRefresh(!refresh)
  }catch(error){
      console.log(error)
  }
}



const setEdit =(index) =>{
  setInput(todos[index].todo)
  setEditIndex(index)
}

const addTodo =async ()=>{
  try {
    if(input.trim() !== ''){
      // SetTodos([...todos,{id: new Date(), todo:input}])
      await addDoc(collection(db, 'todos'), { todo: input })
      setInput('')
    }
    setRefresh(!refresh)
  } catch (error) {
    console.log(error)
  }
}



const removeTodo =async (id)=>{
  // let filteredTodos = todos.filter((todo)=> todo.id !== id)
  // console.log(filteredTodos)
  // SetTodos(filteredTodos)
try {
  await deleteDoc(doc(db,'todos',id))
  setRefresh(!refresh)
} catch (error) {
  console.log(error)
}
}


const updateTodo =async ()=>{
  try {
    if(input.trim() !== ''){
    // const updatedTodos = [...todos];
    // updatedTodos[editIndex].todo = input;
    // SetTodos(updatedTodos);
    const todoDocref = doc(db,'todos', todos[editIndex].id)
    await updateDoc(todoDocref, {todo:input})
    setEditIndex(-1)
    setInput('')
    }
  } catch (error) {
    console.log(error)
  }
}

  return (
    <div className='min-h-screen flex flex-col items-center justify-center gap-4 p-4'>
    <div className='bg-gray-100 p-6 rounded shadow-md w-full max-w-lg lg:w-1/4'>
      <h1 className='text-3xl font-bold text-center mb-3'>Todo App</h1>
   <div className='flex'>
    <input type="text"
     placeholder='Add a Todo' 
     className='py-2 px-4 border w-full focus:outline-none mr-2'
     value={input}
     onChange={(e) => setInput(e.target.value)}
     />
   <button onClick={editIndex === -1 ? addTodo : updateTodo} className='bg-gradient-to-r from-blue-400 to-blue-600 text-white py-2 px-4 rounded'> 
   {editIndex === -1 ? <FaPlus /> : <FaPencilAlt />}
   </button>
   </div>
    </div>
    {
      todos.length > 0 &&(
        <div className=' bg-gray-100 p-6 rounded shadow-md w-full max-w-lg lg:w-1/4'>
     <ul>
      {todos.map((e, index) => (
        <li key={index} className='flex items-center justify-between bg-white p-3 rounded shadow-md mb-3'>
        <span className='text-lg'>{e.todo}</span>
     <div>
    <button onClick={()=> setEdit(index)} className='mr-2 p-2 bg-gradient-to-r from-gray-600  to-gray-400 text-white rounded hover:from-gray-500 hover:to-gray-700'> <FaPencilAlt /></button>
        <button onClick={()=>removeTodo(e.id)} className='p-2 bg-gradient-to-r from-red-400  to-red-200 text-white rounded hover:from-red-500 hover:to-red-700'><FaTrash /></button>
     </div>
      </li> 

      ))}
     </ul>
    </div>
      )
    }
    </div>
  )
}

export default App

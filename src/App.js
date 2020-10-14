import React, { useState, useRef, useEffect } from 'react';
import ToDoList from './ToDoList'
import {v4 as uuidv4} from 'uuid'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef();


  //get todos
  useEffect(() =>{
    const storedTOdos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTOdos) setTodos(storedTOdos)
  }, [])
  //store todos
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  //to edit the todos

  function toggleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(event) {
    const name = todoNameRef.current.value
    if (name === '') return
    console.log(name)
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name: name, complete: false }]
    })
    todoNameRef.current.value = null;

  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }
  //printed to screen
  return (
    <h1>
  <ToDoList todos={todos} toggleTodo={toggleTodo} />
  <input ref={todoNameRef} type="text" />
  <button onClick={handleAddTodo}>Add Todo</button>
  <button onClick={handleClearTodos}>Clear Completed Todos</button>
  <div>{todos.filter(todo => !todo.complete).length} left to do</div>
  </h1>
  )
}


export default App;


// example todo { id: 1, name: 'Email about passport', complete: false }
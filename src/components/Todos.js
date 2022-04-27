import React, { useCallback, useContext, useEffect, useState } from "react";
import CredentialsContext from "../store/CredentialsContext";

const Todos = () => {
  const [todos, setTodos] = useState('');
  const [todoText, setTodoText] = useState('')
  const credentialsCtx = useContext(CredentialsContext)
  const {username, password} = credentialsCtx.credentialsState;

  const persist = (newTodos) => {
    fetch(`http://localhost:4000/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${username}:${password}`
        },
        body: JSON.stringify(newTodos),
      });
  }

  const fetchData =  useCallback( async () => {
    try {
      const response = await fetch(`http://localhost:4000/todos`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${username}:${password}`
        },
      });
      const data = await response.json()
      setTodos(data)
    } catch (error) {
      console.log(error)
    }
  })

  useEffect(() => {
    fetchData()
  },[fetchData, username, password])


  const addTodo = (e) => {
      e.preventDefault();
      if(todoText.trim() === ''){
          return
      }
      const newTodo = {checked: false, text: todoText}
      const newTodos = [...todos, newTodo];
      setTodos(newTodos)
      console.log(newTodos)
      setTodoText('')
      persist(newTodos)
  }

  const toggleTodo = (index) => {
    const newTodoList = [...todos]
    newTodoList[index].checked = !newTodoList[index].checked
    setTodos(newTodoList)
  }


  return (
    <div>
        {todos.length > 0 ? todos.map((todo, index) => (
        <div key={index}>
          <input onChange={() => toggleTodo(index)} id="checkbox1" type="checkbox" />
          <label htmlFor="checkbox1">{todo.text}</label>
        </div>
      )) : ''}
      <br />
      <form onSubmit={addTodo}>
      <input value={todoText} onChange={(e) => setTodoText(e.target.value)} type="text"></input>
      <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default Todos;

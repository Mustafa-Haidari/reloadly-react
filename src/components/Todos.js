import React, { useCallback, useContext, useEffect, useState, useRef } from "react";
import CredentialsContext from "../store/CredentialsContext";
import { v4 as uuidv4 } from 'uuid';

const Todos = () => {
  const [todos, setTodos] = useState('');
  const [todoText, setTodoText] = useState('')
  const credentialsCtx = useContext(CredentialsContext)
  const {username, password} = credentialsCtx.credentialsState;
  const [filter, setFilter] = useState('Uncompleted')
  const taskRef = useRef()

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

  const fetchData = useCallback( async () => {
    const response = await fetch(`http://localhost:4000/todos`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${username}:${password}`
        },
      });
      const data = await response.json()
      setTodos(data)
  }, [username, password])

  useEffect(() => {
    fetchData()
  },[fetchData])


  const addTodo = (e) => {
      e.preventDefault();
      if(todoText.trim() === ''){
          return
      }
      const newTodo = {id: uuidv4(), checked: false, text: todoText}
      const newTodos = [...todos, newTodo];
      setTodos(newTodos)
      setTodoText('')
      persist(newTodos)
  }

  const toggleTodo = (id) => {
    const newTodoList = [...todos]
    const todoItem = newTodoList.find((todo) => todo.id === id)
    todoItem.checked = !todoItem.checked;
    setTodos(newTodoList)
    persist(newTodoList)
  }

  const getTodo = () => {
    const filteredData = todos.filter(todo => filter === 'Completed' ? todo.checked : !todo.checked);
    // console.log(filteredData)
    return filteredData
  }

  const changeFilter = (newFilter) => {
    setFilter(newFilter)
  }


  return (
    <div>
      <select onChange={(e) => changeFilter(e.target.value)} value={filter}>
        <option value='Completed'>Completed</option>
        <option value='Uncompleted'>Uncompleted</option>
      </select>

        {todos.length > 0 ? getTodo().map((todo) => (
        <div key={todo.id}>
          <input checked={todo.checked} onChange={() => toggleTodo(todo.id)} id="checkbox1" type="checkbox" />
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

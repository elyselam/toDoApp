import React from 'react';
//set up state and when to trigger it
import {useState, useEffect} from 'react';

import ToDoIndex from './ToDoIndex'

function ToDoClient() {
  //set up 'todos' default empty array 
  //setTodos: setter for todos
  //useState is a func that returns an array of funcs
  const [todos, setTodos] = useState([]);

  //the trigger, callback function for after the component renders html
  useEffect(() => {
    //returns the response.json() as resp
    fetchTodos().then ( (resp)=> {
      //extract todos in resp obj
      let todos = resp.todos
      //set state
      setTodos(todos)
    })
  }, []);

  return (
    <div className="ToDoClient">
      {/* name of property to be sent to child*/}
      <ToDoIndex fakeTodos={todos} />
    </div>
  );
}
//helper function to fetch from backend
export const fetchTodos = () => {
  const apiUrl = 'http://localhost:6969/api/todos';
  return fetch(apiUrl)
    .then( (response) => response.json())
};

export default ToDoClient;
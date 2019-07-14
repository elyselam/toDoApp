import React from 'react';

function ToDoIndex (props) {
	// todos extracts data from props pass in
    let todos = props.fakeTodos

	//iterate through object and make an array of items. return titles of todos as a list
    let toDoItems = todos.map( (todo) => {
        return <li>{todo.title}</li>
    })
	//parses array into html
	return <ul>
        {toDoItems}
    </ul>
}

export default ToDoIndex
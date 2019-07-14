import React from 'react'
//we're using state, so we have to get this too from react
import {useState} from 'react';

function ToDoForm () {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
	
	//event change handlers
	//setTitle is a function that grabs value inputted and set ToDoForm's state
	const handleTitleChange = (event) => setTitle(event.target.value);
	const handleDescriptionChange = (event) =>  setDescription(event.target.value);

	//submitt button: submit event
    const handleSubmit = (event) => {
        //this stops the page from refreshing after hitting the submit button
        event.preventDefault()
        //this is tricky, but the "title" and "description" on the right are actually the ToDoForm's state values
        //React just magically grabs them from the state
        const newTitle = title
        const newDescription = description

        //this sets up the "payload", which is like the "body" stuff in the Postman. 
        const data = { title: newTitle, description: newDescription }

        //post to back-end using helper code below
        return postTodo(data).then((res)=>{

            // at this point it returns the server response and thats it, nothing more happens
            // it's a success call back where it goes like "cool it worked"
            console.log(res.todo)
        })
    }
	//event delegation: need to put onSubmit on parent element
	return <form onSubmit={handleSubmit}><h3>New ToDo</h3>
        <label>
            <div>Title</div>
			{/* onChange is an event that fires when text changes into React component */}
            <input name="toDoTitle" value={title} onChange={handleTitleChange} />
        </label>

        <label>
            <div>Description</div>
            <input name="toDoDescription" value={description} onChange={handleDescriptionChange}/>
        </label>

        <div>
            <input type="submit"/>
        </div>
    </form>
}
//data = { title: newTitle, description: newDescription }
export const postTodo = (data) => {
    const apiUrl = 'http://localhost:6969/api/todos'
    return fetch(apiUrl, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then( (response) => response.json())
};


export default ToDoForm
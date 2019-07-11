import express from 'express';
import dataArray from './db/db';
import bodyParser from 'body-parser';

const app = express();
// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// get all todos
app.get('/api/todos', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'todos retrieved successfully',
    todos: dataArray
  })
});

app.post('/api/todos', (req, res) => {
	const todo = {
	  id: dataArray.length + 1,
	  title: req.body.title,
	  description: req.body.description
	}
	//validate that user inputs both title and description
	//if not, returns this error without pushing input to db
	if (!req.body.title) {
        return res.status(400).send({
        success: 'false',
        message: 'title is required'
        });
    } else if(!req.body.description) {
        return res.status(400).send({
        success: 'false',
        message: 'description is required'
        });
    }
	dataArray.push(todo);
	return res.status(201).send({
	  success: 'true',
	  message: 'todo added successfully',
	  todo: todo
	})
 });

const PORT = 6969;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});

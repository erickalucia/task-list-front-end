import React from 'react';
import { useState, useEffect } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import axios from 'axios';

// const TASKS = [
//   {
//     id: 1,
//     title: 'Mow the lawn',
//     isComplete: false,
//   },
//   {
//     id: 2,
//     title: 'Cook Pasta',
//     isComplete: true,
//   },
// ];

const App = () => {
  const [tasks, setTasks] = useState([]);

  const loadTasks = () => {
    axios
      .get('https://task-list-api-c17.onrender.com/tasks')
      // .get('https://my-task-list-api.onrender.com/tasks')
      .then((response) => {
        // const initialTaskData = [];
        // response.data.forEach((task) => {
        //   initialTaskData.push(task);
        const initialTaskData = response.data.map((task) => {
          return { ...task, isComplete: task.is_complete };
        });
        console.log(initialTaskData);
        setTasks(initialTaskData);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const updateComplete = (taskToComplete) => {
    const updateTasks = tasks.map((task) => {
      if (task.id === taskToComplete.id) {
        return taskToComplete;
      }
      return task;
    });
    setTasks(updateTasks);
  };

  return (
    <section className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <section>
          {' '}
          <TaskList tasks={tasks} updateComplete={updateComplete} />
        </section>
      </main>
    </section>
  );
};

export default App;

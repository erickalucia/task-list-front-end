import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import TaskList from './components/TaskList.js';
import NewTaskForm from './components/NewTaskForm';

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
      // .get('https://task-list-api-c17.onrender.com/tasks')
      .get('https://my-task-list-api.onrender.com/tasks')
      .then(response => {
        const initialTaskData = response.data.map(task => {
          return { ...task, isComplete: task.is_complete };
        });
        console.log(initialTaskData);
        setTasks(initialTaskData);
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const setTaskCompleteRequest = (taskId, taskCompleteStatus) => {
    let patchURL = null;
    if (taskCompleteStatus) {
      patchURL = `https://my-task-list-api.onrender.com/tasks/${taskId}/mark_complete`;
    } else
      patchURL = `https://my-task-list-api.onrender.com/tasks/${taskId}/mark_incomplete`;
    axios
      .patch(patchURL)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const updateComplete = taskToComplete => {
    const updateTasks = tasks.map(task => {
      if (task.id === taskToComplete.id) return taskToComplete;
      setTaskCompleteRequest(taskToComplete.id, taskToComplete.isComplete);
      return task;
    });
    setTasks(updateTasks);
  };

  const deleteTaskRequest = taskId => {
    axios
      .delete(`https://my-task-list-api.onrender.com/tasks/${taskId}`)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const deleteTask = taskToDelete => {
    const newTasks = tasks.filter(task => task.id !== taskToDelete.id);
    deleteTaskRequest(taskToDelete.id);
    setTasks(newTasks);
  };

  const taskPostRequest = taskToAdd => {
    axios
      .post('https://my-task-list-api.onrender.com/tasks', {
        title: taskToAdd.title,
        description: taskToAdd.description,
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.data);
      });
  };

  const getOneTaskRequest = taskId => {
    axios
      .get(`https://my-task-list-api.onrender.com/tasks/${taskId}`)
      .then(response => {
        return { ...response.data };
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  const addTask = taskToAdd => {
    taskPostRequest(taskToAdd);
    const newTask = { ...getOneTaskRequest(taskToAdd.id), isComplete: false };
    setTasks([...tasks, newTask]);
  };

  return (
    <section className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <section>
          <TaskList
            tasks={tasks}
            updateComplete={updateComplete}
            deleteTask={deleteTask}
          />
          <NewTaskForm addTask={addTask} />
        </section>
      </main>
    </section>
  );
};

export default App;

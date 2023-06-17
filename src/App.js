import React from 'react';
import { useState } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';

const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];

const App = () => {
  const [tasks, setTasks] = useState(TASKS);

  const updateComplete = (taskToComplete) => {
    const updateTasks = tasks.map((task) => {
      if (task.id === taskToComplete.id) {
        console.log('after the change', taskToComplete.isComplete);
        return taskToComplete;
      }
      return task;
    });
    console.log(tasks);
    setTasks(updateTasks);
    console.log(tasks);
  };

  return (
    <section className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <section>
          {' '}
          <TaskList tasks={TASKS} updateComplete={updateComplete} />
        </section>
      </main>
    </section>
  );
};

export default App;

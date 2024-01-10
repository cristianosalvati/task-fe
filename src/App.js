import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import TaskPage from './components/pages/TaskPage';

function App() {

  return (
    <div className="App">
      <section id="App-header">
        <h1>Keep employees busy</h1>
      </section>
      <section id="Task-list">
        <TaskPage/> 
      </section>
    </div>
  );
}

export default App;

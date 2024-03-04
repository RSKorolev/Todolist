import { useState } from "react";
import "./App.css";
import { TaskType, TodoList } from "./TodoList";

function App() {
  const todoListTitle = "What to lean";

  const [tasks, setTasks] = useState<TaskType[]>([
    { id: 1, title: "HTML & CSS", isDone: true },
    { id: 2, title: "JS & TS", isDone: true },
    { id: 3, title: "React & Redux", isDone: false },
  ]);
  const removeTask = (taskId: number) => {
    const filteredTask = tasks.filter((task) => {
      return task.id !== taskId;
    });
    setTasks(filteredTask);
  };

  return (
    <div className="App">
      <TodoList title={todoListTitle} tasks={tasks} removeTask={removeTask} />
    </div>
  );
}

export default App;

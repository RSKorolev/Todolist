import React from 'react';
import './App.css';
import { TodoList, TaskType } from './TodoList';
import { v1 } from 'uuid';

export type FilterValueType = 'all' | 'active' | 'complete';

function App() {
    const todoListTitle = 'What to learn';
    const initState: Array<TaskType> = [
        { id: v1(), title: 'HTML & CSS', isDone: true },
        { id: v1(), title: 'JS & TS', isDone: true },
        { id: v1(), title: 'React & Redux', isDone: true },
    ];

    const [tasks, setTasks] = React.useState(initState);
    const [filter, setFilter] = React.useState<FilterValueType>('all');

    const removeTask = (taskId: string) => {
        const updateState = tasks.filter((task) => task.id !== taskId);
        setTasks(updateState);
    };
    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title,
            isDone: false,
        };
        const updateState = [newTask, ...tasks];
        setTasks(updateState);
    };

    const changeTodolistFilter = (filter: FilterValueType) => {
        setFilter(filter);
    };

    const getFilteredTask = (
        allTasks: Array<TaskType>,
        currentFilter: FilterValueType
    ): Array<TaskType> => {
        switch (currentFilter) {
            case 'active':
                return allTasks.filter((t) => t.isDone === false);
            case 'complete':
                return allTasks.filter((t) => t.isDone === true);
            default:
                return allTasks;
        }
    };
    const filteredTasks = getFilteredTask(tasks, filter);
    const changeTaskStatus = (taskId: string) => {
        const updateTask = tasks.map((task) => {
            if (task.id === taskId) {
                return { ...task, isDone: !task.isDone };
            }
            return task;
        });
        setTasks(updateTask);
    };

    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={filteredTasks}
                addTask={addTask}
                removeTask={removeTask}
                changeTodolistFilter={changeTodolistFilter}
                changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;

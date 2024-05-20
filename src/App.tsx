import React, { useState } from 'react';
import './App.css';
import { TodoList, TaskType } from './TodoList';
import { v1 } from 'uuid';

export type FilterValueType = 'all' | 'active' | 'complete';

export type TodolistType = {
    id: string;
    title: string;
    filter: FilterValueType;
};

function App() {
    const initState: Array<TaskType> = [
        { id: v1(), title: 'HTML & CSS', isDone: false },
        { id: v1(), title: 'JS & TS', isDone: false },
        { id: v1(), title: 'React & Redux', isDone: false },
    ];

    let [todolists, setTodolists] = useState<TodolistType[]>([
        { id: v1(), title: 'What to learn', filter: 'all' },
        { id: v1(), title: 'What to buy', filter: 'all' },
    ]);

    const [tasks, setTasks] = React.useState(initState);
    // const [filter, setFilter] = React.useState<FilterValueType>('all');

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
        //setFilter(filter);
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
    const changeTaskStatus = (taskId: string, newIsDoneValue: boolean) => {
        const updateTask = tasks.map((task) =>
            task.id === taskId ? { ...task, isDone: newIsDoneValue } : task
        );
        setTasks(updateTask);
    };

    return (
        <div className="App">
            {todolists.map((el) => {
                return (
                    <TodoList
                        key={el.id}
                        filter={el.filter}
                        title={el.title}
                        tasks={filteredTasks}
                        addTask={addTask}
                        removeTask={removeTask}
                        changeTodolistFilter={changeTodolistFilter}
                        changeTaskStatus={changeTaskStatus}
                    />
                );
            })}
        </div>
    );
}

export default App;

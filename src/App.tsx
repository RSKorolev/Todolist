import React from 'react';
import './App.css';
import { TodoList, TaskType } from './TodoList';

export type FilterValueType = 'all' | 'active' | 'complete';

function App() {
    const todoListTitle = 'What to learn';
    const initState: Array<TaskType> = [
        { id: 1, title: 'HTML & CSS', isDone: true },
        { id: 2, title: 'JS & TS', isDone: true },
        { id: 3, title: 'React & Redux', isDone: false },
    ];

    const [tasks, setTasks] = React.useState(initState);
    const [filter, setFilter] = React.useState<FilterValueType>('all');

    const removeTask = (taskId: number) => {
        const updateState = tasks.filter((task) => task.id !== taskId);
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
    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={filteredTasks}
                removeTask={removeTask}
                changeTodolistFilter={changeTodolistFilter}
            />
        </div>
    );
}

export default App;

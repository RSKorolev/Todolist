import { Button } from './Button';
import { TodoListHeader } from './TodoListHeader';
import { FilterValueType } from './App';
import React from 'react';

export type TodoListPropsType = {
    title: string;
    tasks: TaskType[];
    removeTask: (taskId: string) => void;
    changeTodolistFilter: (filter: FilterValueType) => void;
    addTask: (title: string) => void;
};
export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};
export const TodoList = ({
    title,
    tasks,
    addTask,
    removeTask,
    changeTodolistFilter,
}: TodoListPropsType) => {
    const taskTaskTitle = React.useRef<HTMLInputElement>(null);
    const taskList =
        tasks.length === 0 ? (
            <span>No tasks</span>
        ) : (
            tasks.map((task) => {
                return (
                    <li key={task.id}>
                        <input type="checkbox" checked={task.isDone} />
                        <span>{task.title}</span>
                        <Button
                            title="x"
                            onClickHandler={() => removeTask(task.id)}
                        />
                    </li>
                );
            })
        );

    const addNewTask = () => {
        if (taskTaskTitle.current) {
            addTask(taskTaskTitle.current.value);
            taskTaskTitle.current.value = '';
        }
    };

    return (
        <div className="Todolist">
            <TodoListHeader title={title} />
            <div>
                <input ref={taskTaskTitle} />
                <Button title={'+'} onClickHandler={addNewTask} />
            </div>
            <ul>{taskList}</ul>
            <div>
                <Button
                    title={'All'}
                    onClickHandler={() => changeTodolistFilter('all')}
                />
                <Button
                    title={'Active'}
                    onClickHandler={() => changeTodolistFilter('active')}
                />
                <Button
                    title={'Completed'}
                    onClickHandler={() => changeTodolistFilter('complete')}
                />
            </div>
        </div>
    );
};

import { Button } from './Button';
import { TodoListHeader } from './TodoListHeader';
import { FilterValueType } from './App';
import { ChangeEvent, KeyboardEvent } from 'react';
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
    const [taskTitle, setTaskTitle] = React.useState(' ');
    console.log(taskTitle);
    const taskList =
        tasks.length === 0 ? (
            <span>No tasks</span>
        ) : (
            tasks.map((task) => {
                const removeTaskHandler = () => removeTask(task.id);
                return (
                    <li key={task.id}>
                        <input type="checkbox" checked={task.isDone} />
                        <span>{task.title}</span>
                        <Button title="x" onClickHandler={removeTaskHandler} />
                    </li>
                );
            })
        );

    const addNewTaskHandler = () => {
        if (taskTitle.length < 15) {
            addTask(taskTitle);
            setTaskTitle('');
        }
    };
    const onKeyDownNewTaskHendler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && taskTitle.length > 0) {
            addNewTaskHandler();
        }
    };
    const setTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value);
    };
    const changeTodolistFilterHandlerCreator =
        (filter: FilterValueType) => () =>
            changeTodolistFilter(filter);

    const macTitleLength = 15;
    const isAddTaskPossible =
        taskTitle.length && taskTitle.length <= macTitleLength;
    return (
        <div className="Todolist">
            <TodoListHeader title={title} />
            <div>
                <input
                    onChange={setTaskTitleHandler}
                    value={taskTitle}
                    onKeyDown={onKeyDownNewTaskHendler}
                />
                <Button
                    title={'+'}
                    onClickHandler={addNewTaskHandler}
                    isDisabled={!isAddTaskPossible}
                />
                {!taskTitle.length && <div>Please, enter title</div>}
                {taskTitle.length > macTitleLength && (
                    <div>Task title is to long</div>
                )}
            </div>
            <ul>{taskList}</ul>
            <div>
                <Button
                    title={'All'}
                    onClickHandler={changeTodolistFilterHandlerCreator('all')}
                />
                <Button
                    title={'Active'}
                    onClickHandler={changeTodolistFilterHandlerCreator(
                        'active'
                    )}
                />
                <Button
                    title={'Completed'}
                    onClickHandler={changeTodolistFilterHandlerCreator(
                        'complete'
                    )}
                />
            </div>
        </div>
    );
};

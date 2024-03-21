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
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean) => void;
    filter: FilterValueType;
};
export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};
export const TodoList = ({
    title,
    tasks,
    filter,
    addTask,
    removeTask,
    changeTodolistFilter,
    changeTaskStatus,
}: TodoListPropsType) => {
    const [taskTitle, setTaskTitle] = React.useState('');
    console.log(taskTitle);
    const taskList =
        tasks.length === 0 ? (
            <span>No tasks</span>
        ) : (
            tasks.map((task) => {
                const removeTaskHandler = () => removeTask(task.id);
                const changeTaskStatusHandler = (
                    e: ChangeEvent<HTMLInputElement>
                ) => changeTaskStatus(task.id, e.currentTarget.checked); //
                return (
                    <li key={task.id}>
                        <input
                            type="checkbox"
                            checked={task.isDone}
                            onChange={changeTaskStatusHandler}
                        />
                        <span
                            className={
                                task.isDone ? 'task-done' : 'task-not-done'
                            }
                        >
                            {task.title}
                        </span>
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
    const onKeyDownNewTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
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

    const maxTitleLength = 15;
    const isAddTaskPossible =
        taskTitle.length && taskTitle.length <= maxTitleLength;
    return (
        <div className="Todolist">
            <TodoListHeader title={title} />
            <div>
                <input
                    onChange={setTaskTitleHandler}
                    value={taskTitle}
                    onKeyDown={onKeyDownNewTaskHandler}
                />
                <Button
                    title={'+'}
                    onClickHandler={addNewTaskHandler}
                    isDisabled={!isAddTaskPossible}
                />
                {!taskTitle.length && <div>Please, enter title</div>}
                {taskTitle.length > maxTitleLength && (
                    <div>Task title is to long</div>
                )}
            </div>
            <ul>{taskList}</ul>
            <div>
                <Button
                    classes={filter === 'all' ? 'btn-activ' : ''}
                    title={'All'}
                    onClickHandler={changeTodolistFilterHandlerCreator('all')}
                />
                <Button
                    classes={filter === 'active' ? 'btn-activ' : ''}
                    title={'Active'}
                    onClickHandler={changeTodolistFilterHandlerCreator(
                        'active'
                    )}
                />
                <Button
                    classes={filter === 'complete' ? 'btn-activ' : ''}
                    title={'Completed'}
                    onClickHandler={changeTodolistFilterHandlerCreator(
                        'complete'
                    )}
                />
            </div>
        </div>
    );
};

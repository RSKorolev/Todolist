import { Button } from './Button';
import { TodoListHeader } from './TodoListHeader';
import { FilterValueType } from './App';

export type TodoListPropsType = {
    title: string;
    tasks: TaskType[];
    removeTask: (taskId: number) => void;
    changeTodolistFilter: (filter: FilterValueType) => void;
};
export type TaskType = {
    id: number;
    title: string;
    isDone: boolean;
    id: number;
    title: string;
    isDone: boolean;
};
export const TodoList = ({
    title,
    tasks,
    removeTask,
    changeTodolistFilter,
}: TodoListPropsType) => {
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

    return (
        <div className="Todolist">
            <TodoListHeader title={title} />
            <div>
                <input />
                <Button title={'+'} />
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

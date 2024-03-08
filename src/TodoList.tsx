import { Button } from './Button';

export type TodoListPropsType = {
    title: string;
    tasks: TaskType[];
    removeTask: (taskId: number) => void;
};

export type TaskType = {
    id: number;
    title: string;
    isDone: boolean;
};

export const TodoList = ({ title, tasks, removeTask }: TodoListPropsType) => {
    const tasksList =
        tasks.length === 0 ? (
            <span>Нет задач</span>
        ) : (
            tasks.map((task) => {
                return (
                    <li key={task.id}>
                        <input type="checkbox" checked={task.isDone} />
                        <span>{task.title}</span>
                        <button onClick={() => removeTask(task.id)}>x</button>
                    </li>
                );
            })
        );
    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input />
                <Button title={'+'} />
            </div>
            <ul>{tasksList}</ul>
            <div>
                <Button title={'All'} />
                <Button title={'Active'} />
                <Button title={'Completed'} />
            </div>
        </div>
    );
};

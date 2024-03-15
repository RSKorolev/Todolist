import { Button } from './Button';
type TodoListHeaderPropsType = {
    title: string;
};

export const TodoListHeader = ({ title }: TodoListHeaderPropsType) => {
    return (
        <div className="CardTitle">
            <h3>{title}</h3>
            <div className="ButtonTitle">
                <Button title={'x'} />
            </div>
        </div>
    );
};

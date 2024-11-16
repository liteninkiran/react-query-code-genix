import { SubmitHandler, useForm } from 'react-hook-form';
import { useCreateTodo, useUpdateTodo } from '../services/mutations';
import { useTodos, useTodosIds } from '../services/queries';
import { Todo } from '../types/todo';

export const Todos = () => {
  const todosIdsQuery = useTodosIds();
  const todosQueries = useTodos(todosIdsQuery.data ?? []);

  const createTodoMutation = useCreateTodo();
  const updateTodoMutation = useUpdateTodo();

  const { register, handleSubmit } = useForm<Todo>();

  const handleCreateTodoSubmit: SubmitHandler<Todo> = (data) => {
    createTodoMutation.mutate(data);
  };

  const handleMarkAsDoneSubmit = (data: Todo | undefined) => {
    if (data) {
      updateTodoMutation.mutate({ ...data, checked: true });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleCreateTodoSubmit)}>
        <h4>New todo:</h4>
        <input placeholder="Title" {...register('title')} />
        <br />
        <input placeholder="Description" {...register('description')} />
        <br />
        <input
          type="submit"
          disabled={createTodoMutation.isPending}
          value={createTodoMutation.isPending ? 'Creating...' : 'Create todo'}
        />
      </form>
      <ul>
        {todosQueries.map(
          ({ data }) =>
            data && (
              <li key={`li-${data?.id}`}>
                <div>ID: {data?.id}</div>
                <span>
                  <strong>Title:</strong> {data?.title},{' '}
                  <strong>Description:</strong> {data?.description},{' '}
                </span>
                <div>
                  <button
                    onClick={() => handleMarkAsDoneSubmit(data)}
                    disabled={data?.checked}
                  >
                    {data?.checked ? 'Done' : 'Mark as done'}
                  </button>
                </div>
              </li>
            )
        )}
      </ul>
    </>
  );
};

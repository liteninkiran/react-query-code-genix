import { SubmitHandler, useForm } from 'react-hook-form';
import {
  useCreateTodo,
  useDeleteTodo,
  useUpdateTodo,
} from '../services/mutations';
import { useTodos, useTodosIds } from '../services/queries';
import { Todo } from '../types/todo';

export const Todos = () => {
  const todosIdsQuery = useTodosIds();
  const todosQueries = useTodos(todosIdsQuery.data ?? []);

  const createTodo = useCreateTodo();
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();

  const { register, handleSubmit } = useForm<Todo>();

  const handleDelete = async (id: number) => await deleteTodo.mutateAsync(id);
  const handleCreate: SubmitHandler<Todo> = (data) => createTodo.mutate(data);
  const handleMarkAsDone = (data: Todo | undefined) => {
    if (data) {
      updateTodo.mutate({ ...data, checked: true });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleCreate)}>
        <h4>New todo:</h4>
        <input placeholder="Title" {...register('title')} />
        <br />
        <input placeholder="Description" {...register('description')} />
        <br />
        <input
          type="submit"
          disabled={createTodo.isPending}
          value={createTodo.isPending ? 'Creating...' : 'Create todo'}
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
                    onClick={() => handleMarkAsDone(data)}
                    disabled={data?.checked}
                  >
                    {data?.checked ? 'Done' : 'Mark as done'}
                  </button>
                  {data && data.id && (
                    <button onClick={() => handleDelete(data.id!)}>
                      Delete
                    </button>
                  )}
                </div>
              </li>
            )
        )}
      </ul>
    </>
  );
};

import { useTodos, useTodosIds } from '../services/queries';

export const Todos = () => {
  const todosIdsQuery = useTodosIds();
  const todosQueries = useTodos(todosIdsQuery.data ?? []);

  return (
    <>
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
              </li>
            )
        )}
      </ul>
    </>
  );
};

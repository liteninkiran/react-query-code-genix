import { useTodosIds } from '../services/queries';

export const Todos = () => {
  const todosIdsQuery = useTodosIds();

  return (
    <>
      <p>Query Function Status: {todosIdsQuery.fetchStatus}</p>
      <p>Query Function Status: {todosIdsQuery.status}</p>
      {todosIdsQuery.data?.map((id) => (
        <p key={id}>{id}</p>
      ))}
    </>
  );
};

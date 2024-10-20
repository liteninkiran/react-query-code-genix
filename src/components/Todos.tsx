import { useIsFetching } from '@tanstack/react-query';
import { useTodosIds } from '../services/queries';

export const Todos = () => {
  const todosIdsQuery = useTodosIds();
  const isFetching = useIsFetching();

  return (
    <>
      <p>Query Function Status: {todosIdsQuery.fetchStatus}</p>
      <p>Query Function Status: {todosIdsQuery.status}</p>
      <p>Global isFetching: {isFetching}</p>
      {todosIdsQuery.data?.map((id) => (
        <p key={id}>{id}</p>
      ))}
    </>
  );
};

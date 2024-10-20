import { useTodosIds } from '../services/queries';

export const Todos = () => {
  const todosIdsQuery = useTodosIds();
  console.log(todosIdsQuery.data);
  if (todosIdsQuery.isPending) {
    return <span>Loading...</span>;
  }

  if (todosIdsQuery.isError) {
    return <span>Error!</span>;
  }

  return (
    <>
      {todosIdsQuery.data.map((id) => (
        <p key={id}>{id}</p>
      ))}
    </>
  );
};

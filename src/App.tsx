import axios from 'axios';
import { useEffect, useState } from 'react';

const App = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:8080/todos')
      .then((res) => setData(res.data))
      .catch(console.log);
  }, []);
  return <div>{JSON.stringify(data)}</div>;
};

export default App;

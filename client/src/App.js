import logo from "./logo.svg";
import { gql, useQuery } from "@apollo/client";

const query = gql`
 query GetTodos($getUserId: ID!) {
  getTodos {
    title,
    completed,
    user {
      name
    }
  }
  getUser(id: $getUserId) {
    email
  }
}
`;

function App() {
  const { data, loading } = useQuery(query,{
  variables: { getUserId: 1 },
});

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="App">
      <table>
        <tbody>
          {data.getTodos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.title}</td>
              <td>{todo.user?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

import "./App.css";
import { gql, useQuery } from "@apollo/client";

const GET_TODOS = gql`
  query GetTodos{
    getTodos {
      id
      title
      completed
      user {
        name
      }
    }
  }
`;

function App() {
  const { data, loading, error } = useQuery(GET_TODOS);

  if (loading)
    return <div className="loader">Loading todos...</div>;

  if (error)
    return <div className="error">Error: {error.message}</div>;

  return (
    <div className="container">
      <h1 className="title">📝 Todo Dashboard</h1>

      <div className="card">
        <table className="todo-table">
          <thead>
            <tr>
              <th>Todo</th>
              <th>User</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {data.getTodos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.title}</td>
                <td>{todo.user?.name}</td>
                <td>
                  <span
                    className={`status ${
                      todo.completed ? 'done' : 'pending'
                    }`}
                  >
                    {todo.completed ? "Completed" : "Pending"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
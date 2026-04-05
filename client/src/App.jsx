import { useEffect, useState } from "react";
import Todo from "./todo";

export default function App() {

  const [todos, setTodos] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    async function getTodos() {
      try {
        const res = await fetch("/api/todos");
        const data = await res.json();
        if (data.todos) {
          setTodos(data.todos);
        } else {
          console.error("Failed to fetch todos:", data);
        }
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    }
    getTodos();
  }, []);

  const createNewTodo = async (e) => {
    e.preventDefault();
    if (content.length > 3) {
      const res = await fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify({ todo: content }),
        headers: {
          "content-type": "application/json",
        },
      });
      const newTodo = await res.json();
      console.log("New todo added:", newTodo);

      setContent("");
      setTodos([...todos, newTodo]);
    }
  }

  return (
    <main className="container">
      <h1 className="title">Awesome Todos</h1>
      <form className="form" onSubmit={createNewTodo}>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter a new todo......"
          className="form__input"
          required
        />
        <button type="submit" className="form__button">Create todos</button>
      </form>
      <div className="todos">
        {(todos.length > 0) &&
          todos.map((todo) => (
            <Todo key={todo._id} todo={todo} setTodos={setTodos} />
          ))
        }
      </div>
    </main>
  );
}


import { useEffect, useState } from "react";
import { ToDoProvider } from "./contexts";
import ToDoForm from "./components/ToDoForm";
import ToDoItem from "./components/ToDoItem";

function App() {

  const [todos, setToDos] = useState([]);

  const addToDo = (todo) => {
    setToDos((prev) => [{id: Date.now(), ...todo}, ...prev]);
  }
  
  const updateToDo = (id, todo) => {
    setToDos((prev) => prev.map((prevToDo) => prevToDo.id === id ? todo : prevToDo));
  }

  const deleteToDo = (id) => {
    setToDos((prev) => prev.filter((prevToDo) => prevToDo.id !== id));
  }

  const toggleComplete = (id) => {
    setToDos((prev) => prev.map((prevToDo) => prevToDo.id === id ? {...prevToDo, completed: !prevToDo.completed} : prevToDo));
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length>0) {
      setToDos(todos);
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])

  return (
    <ToDoProvider value={{todos, addToDo, updateToDo, deleteToDo, toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
            <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
            <div className="mb-4">
                <ToDoForm/>
            </div>
            <div className="flex flex-wrap gap-y-3">
              {todos.map((todo) => (
                <div key={todo.id} className='w-full'>
                  <ToDoItem todo={todo} />
                </div>
              ))}
            </div>
        </div>
      </div>
    </ToDoProvider>
  )
}

export default App;

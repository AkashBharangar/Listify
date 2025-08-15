import { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineDone, MdModeEditOutline } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { FaTrash } from "react-icons/fa6";
import { BsStars } from "react-icons/bs";

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Reusable function to add a single task to the state
  const addTask = async (text) => {
    if (!text.trim()) return;
    try {
      const response = await axios.post("/api/todos", { text });
      setTodos((prevTodos) => [...prevTodos, response.data]);
    } catch (error) {
      console.log("Error adding todo:", error);
    }
  };

  // Handles the manual form submission
  const handleAddTask = async (e) => {
    e.preventDefault();
    await addTask(newTodo);
    setNewTodo("");
  };

  // Handles the AI generation button click
  const handleGenerateWithAi = async () => {
    if (!newTodo.trim()) return;
    setIsAiLoading(true);
    try {
      const response = await axios.post("/api/ai/generate-todos", { prompt: newTodo });
      response.data.todos.forEach((todoText) => {
        addTask(todoText);
      });
      setNewTodo("");
    } catch (error) {
      console.error("Error generating AI to-dos:", error);
    } finally {
      setIsAiLoading(false);
    }
  };

  // Functions for fetching, editing, deleting, and toggling todos

  const fetchTodos = async () => {
    try {
      const response = await axios.get("/api/todos");
      setTodos(response.data);
    } catch (error) {
      console.log("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const startEditing = (todo) => {
    setEditingTodo(todo._id);
    setEditedText(todo.text);
  };

  const saveEdit = async (id) => {
    try {
      const response = await axios.patch(`/api/todos/${id}`, { text: editedText });
      setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
      setEditingTodo(null);
    } catch (error) {
      console.log("Error updating todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.log("Error deleting todo:", error);
    }
  };

  const handleClearAll = async () => {
    try {
      await axios.delete("/api/todos");
      setTodos([]);
    } catch (error) {
      console.error("Error clearing todos:", error);
    }
  };

  const toggleTodo = async (id) => {
    try {
      const todo = todos.find((t) => t._id === id);
      const response = await axios.patch(`/api/todos/${id}`, { completed: !todo.completed });
      setTodos(todos.map((t) => (t._id === id ? response.data : t)));
    } catch (error) {
      console.log("Error toggling todo:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Listify<span className="text-sm text-black-100">AI</span> ✨
        </h1>
        <p className="text-center" >Lists made lively with AI.</p>

        <form
          onSubmit={handleAddTask}
          className="flex items-center gap-2 shadow-sm border border-gray-200 p-2 rounded-lg"
        >
          <input
            className="flex-1 outline-none px-3 py-2 text-gray-700 placeholder-gray-400"
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a task or prompt the AI..."
            required
          />
          <button
            type="submit"
            disabled={isAiLoading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium cursor-pointer disabled:bg-blue-300"
          >
            Add Task
          </button>
          <button
            type="button"
            onClick={handleGenerateWithAi}
            disabled={isAiLoading}
            className="bg-purple-500 hover:bg-purple-600 text-white p-3 rounded-md font-medium cursor-pointer disabled:bg-purple-300 flex items-center justify-center h-[42px] w-[42px]"
          >
            {isAiLoading ? <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div> : <BsStars />}
          </button>
        </form>

        <div className="mt-4">
          {todos.length === 0 ? (
            <div className="text-center text-gray-500 py-4">Your list is empty.</div>
          ) : (
            <div className="flex flex-col gap-4">
              {todos.length > 0 && (
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleClearAll}
                    className="text-sm font-medium text-red-500 hover:text-red-700 hover:bg-red-50 py-2 px-4 rounded-lg duration-200 cursor-pointer"
                  >
                    Clear All Tasks
                  </button>
                </div>
              )}
              {todos.map((todo) => (
                <div key={todo._id}>
                  {editingTodo === todo._id ? (
                    <div className="flex items-center gap-x-3">
                      <input
                        className="flex-1 p-3 border rounded-lg border-gray-200 outline-none focus:ring-2 focus:ring-blue-300 text-gray-700 shadow-inner"
                        type="text"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                      />
                      <div className="flex gap-x-2">
                        <button
                          onClick={() => saveEdit(todo._id)}
                          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 cursor-pointer"
                        >
                          <MdOutlineDone />
                        </button>
                        <button
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 cursor-pointer"
                          onClick={() => setEditingTodo(null)}
                        >
                          <IoClose />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-x-4 min-w-0">
                          <button
                            onClick={() => toggleTodo(todo._id)}
                            className={`flex-shrink-0 h-6 w-6 border rounded-full flex items-center justify-center ${todo.completed
                                ? "bg-green-500 border-green-500"
                                : "border-gray-300 hover:border-blue-400"
                              }`}
                          >
                            {todo.completed && <MdOutlineDone />}
                          </button>
                          <span className="text-gray-800 font-medium break-words">
                            {todo.text}
                          </span>
                        </div>
                        <div className="flex gap-x-2">
                          <button
                            className="p-2 text-blue-500 hover:text-blue-700 rounded-lg hover:bg-blue-50 duration-200"
                            onClick={() => startEditing(todo)}
                          >
                            <MdModeEditOutline />
                          </button>
                          <button
                            onClick={() => deleteTodo(todo._id)}
                            className="p-2 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 duration-200"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default App;
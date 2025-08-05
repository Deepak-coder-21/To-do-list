import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
// import { setMaxListeners } from '../../../backend/Models/User';
function Home({ setIsAuthenticated }) {
  const [loggedInUser, setLoggedInUser] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    setLoggedInUser(localStorage.getItem('name'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('name');
    setIsAuthenticated(false);
    handleError("You have been logged out");
    
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => setTodo(e.target.value);

  const handleSave = () => {
    if (todo.trim() === '') return;
    if (editIndex !== null) {
      const updatedTodos = todos.map((item, idx) =>
        idx === editIndex ? { ...item, todo } : item
      );
      setTodos(updatedTodos);
      setEditIndex(null);
    } else {
      setTodos([...todos, { todo, isCompleted: false }]);
    }
    setTodo('');
  };

  const handleDelete = (idx) => {
    setTodos(todos.filter((_, i) => i !== idx));
  };

  const handleEdit = (idx) => {
    setTodo(todos[idx].todo);
    setEditIndex(idx);
  };

  const handleCheckbox = (idx) => {
    setTodos(
      todos.map((item, i) =>
        i === idx ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  return (
    <>
      <div className="container  my-5 mx-1 w-[98%] min-h-[80%] bg-violet-200 rounded-2xl">
        <h1 className="text-3xl font-bold underline text-center p-4">Welcome {loggedInUser}</h1>
        <div className="flex flex-wrap gap-2 justify-center items-center p-4 w-full">
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            placeholder="Enter your task...."
            className="bg-white px-2 py-1 rounded-smw-full sm:w-auto max-w-full min-w-0 flex-1 "
          />
          <button
            onClick={handleSave}
            className=" bg-violet-800 hover:bg-violet-950 text-white font-bold rounded-sm px-2 w-full sm:w-auto"
          >
            {editIndex !== null ? 'Update' : 'Save'}
          </button>
        </div>

        <h2 className="text-3xl underline font-bold flex justify-center">My Tasks</h2>
        <div className="todos">
          {todos.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center p-2 bg-violet-300 rounded-md my-2 w-full"
            >
              <input
                onChange={() => handleCheckbox(idx)}
                type="checkbox"
                checked={item.isCompleted}
              />
              <div
                className={`${
                  item.isCompleted ? 'line-through' : ''
                    } break-words w-0 flex-1`}
                    >
                      {item.todo}
               </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(idx)}
                  className="bg-violet-800 hover:bg-violet-950 text-white px-2 rounded-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(idx)}
                  className="bg-violet-800 hover:bg-violet-950 text-white px-2 rounded-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center position-relative bottom-0 right-0 left-0 p-4">
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-black-950 text-white px-2 py-1 rounded-md"
        >
          Logout
        </button>
      </div>
      <ToastContainer />
    </>



  );
}

export default Home;

import axios from 'axios';
import { useEffect, useState } from 'react';

function Todo() {
  let [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = () => {
    axios
      .get('/users')
      .then((res) => {
        setUsers(res.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const addUser = (event) => {
    event.preventDefault();
    let todoObject = {
      email: event.target.email.value,
      password: event.target.password.value,
      userinfo: event.target.userinfo.value,
      dob: event.target.dob.value,
    };
    axios
      .post('/users', todoObject)
      .then((res) => {
        getUsers();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteUser = (id) => {
    axios
      .delete('/users/' + id)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    getUsers();
  };
  const deleteAll = () => {
    axios.get('/users/deleteall').then((res) => {
      console.log(res.data);
    });
    getUsers();
  };
  return (
    <div className="card-container">
      <h1>User Form</h1>
      <form onSubmit={addUser} className="box">
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          className="todo-user-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          className="todo-user-input"
        />
        <input
          type="text"
          name="userinfo"
          placeholder="Enter userinfo"
          className="todo-user-input"
        />
        <input type="date" name="dob" className="todo-user-input" />
        <button>Add</button>
      </form>

      <button
        onClick={() => {
          deleteAll();
        }}
      >
        Delete all
      </button>
      <div>
        <h1>todos</h1>
        {users.map((val, index) => (
          <div>
            <div className="card">
              <h3>{val.email}</h3>
              <p>{val.password}</p>
              <p>{val.userinfo}</p>
              <p>{val.dob}</p>
              <button
                className="delete"
                onClick={() => {
                  deleteUser(val.id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Todo;

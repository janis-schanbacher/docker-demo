import React, { useEffect, useState } from "react";
import axios from "axios";
import NewTaskDialog from "./NewTaskDialog";
import { StyledCard, ListHeader, ListTitle } from "./styles/TodoList.styles";
import Task from "./Task";
import { apiUrl } from "../helper/url";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get(`${apiUrl}/tasks`)
      .then((res) => {
        const { data } = res;
        setTasks(Object.keys(data).map(key => data[key]));
      });
  }, []);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <StyledCard>
      <ListHeader>
        <ListTitle variant="h5" component="h2">
          ToDo List
        </ListTitle>
        <NewTaskDialog addTask={addTask} />
      </ListHeader>
      {tasks.map(task => (
        <Task key={task.id} taskId={task.id} description={task.description} done={task.done} removeTask={removeTask} />
      ))}
    </StyledCard>
  );
};

export default TodoList;

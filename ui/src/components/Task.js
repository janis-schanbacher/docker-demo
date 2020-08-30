import React, { useEffect, useState } from "react";
import Axios from "axios";
import PropTypes from "prop-types";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  IconButton, TextField, Checkbox,
} from "@material-ui/core";

import { TaskWrapper, TextFieldWrapper, CheckboxWrapper } from "./styles/Task.styles";
import { apiUrl } from "../helper/url";

const Task = ({ taskId, description, done, removeTask }) => {
  const [checked, setChecked] = useState(done);
  const [text, setText] = useState(description);

  const handleToggle = () => {
    setChecked(!checked);
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  useEffect(() => {
    // TODO: debounce
    Axios.put(`${apiUrl}/tasks/${taskId}`, { id: taskId, description: text, done: checked });
  }, [text, checked, taskId]);

  const handleDelete = () => {
    Axios.delete(`${apiUrl}/tasks/${taskId}`);
    removeTask(taskId);
  };

  return (
    <TaskWrapper key={taskId} button>
      <CheckboxWrapper>
        <Checkbox
          onChange={handleToggle}
          checked={checked}
          inputProps={{ "aria-labelledby": taskId }}
        />
      </CheckboxWrapper>
      <TextFieldWrapper>
        <TextField
          id="filled-name"
          value={text}
          onChange={handleChange}
          fullWidth
        />
      </TextFieldWrapper>
      <IconButton aria-label="delete" onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
    </TaskWrapper>

  );
};

Task.propTypes = {
  taskId: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  done: PropTypes.bool,
  removeTask: PropTypes.func.isRequired,
};

Task.defaultProps = {
  done: false,
};

export default Task;

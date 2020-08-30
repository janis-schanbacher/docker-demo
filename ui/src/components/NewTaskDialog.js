import React, { useState } from "react";
import Axios from "axios";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { Dialog } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";

import { StyledTextField, CloseButton } from "./styles/Dialog.styles";
import { apiUrl } from "../helper/url";

const NewTaskDialog = ({ addTask }) => {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = () => {
    handleClose();
    const task = { description, done: false };
    Axios.post(`${apiUrl}/tasks`, task)
      .then((res) => {
        task.id = res.data.id;
        addTask(task);
      });
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <AddIcon />
      </IconButton>
      <Dialog
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="xs"
        fullWidth
        open={open}
        onChange={handleChange}
      >
        <MuiDialogTitle id="form-dialog-title" disableTypography>
          <Typography variant="h6">Add Task</Typography>
          <CloseButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </CloseButton>
        </MuiDialogTitle>
        <MuiDialogContent dividers>
          <StyledTextField id="standard-basic" label="Description" autoFocus />
        </MuiDialogContent>
        <MuiDialogActions>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </MuiDialogActions>
      </Dialog>
    </div>
  );
};

NewTaskDialog.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default NewTaskDialog;

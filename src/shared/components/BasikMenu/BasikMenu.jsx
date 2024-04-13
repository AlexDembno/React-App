import * as React from "react";
import { useDispatch } from "react-redux";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Edit from "@mui/icons-material/Edit";
import Add from "@mui/icons-material/Add";
import Delete from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { deleteTask } from "../../../redux/tasks/tasksSlice";
import { TaskListContext } from "../../../components/Main/Main";
import { deleteListTask } from "../../../redux/taskList/taskListSlice";
import useModal from "../../hooks/useModal";
import Modal from "../Modal/Modal";
import CreateNewTask from "../../../components/CreateNewTask/CreateNewTask";

export default function BasicMenu({ name, taskId, handleAddTaskList }) {
  const { isOpen, openModal, closeModal } = useModal();

  const handleAddTask = () => {
    openModal();
  };

  const handlCloseModal = () => {
    closeModal();
  };
  // Компонент, использующий контекст
  const taskListData = React.useContext(TaskListContext);

  // Используйте данные из контекста здесь

  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleAdd = () => {
    handleAddTaskList();
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleAddTask();
    console.log("taskId", taskId);
    setAnchorEl(null);
  };

  const handleDelete = () => {
    if (taskListData && !taskId) {
      dispatch(deleteListTask(taskListData));
      setAnchorEl(null);
    }
    if (taskId && taskListData) {
      dispatch(deleteTask(taskId));
      setAnchorEl(null);
    }
  };

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        edge="end"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {name && (
          <MenuItem onClick={handleEdit}>
            <Edit />
            Edit
          </MenuItem>
        )}
        {!name && (
          <MenuItem onClick={handleAdd}>
            <Add />
            Add new list
          </MenuItem>
        )}
        <MenuItem onClick={handleDelete}>
          <Delete />
          Delete
        </MenuItem>
      </Menu>
      {isOpen && (
        <Modal closeModal={handlCloseModal}>
          <CreateNewTask
            closeModal={handlCloseModal}
            name={"Edit Task"}
            taskId={taskId}
          />
        </Modal>
      )}
    </div>
  );
}

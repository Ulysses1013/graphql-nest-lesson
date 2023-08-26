import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation } from "@apollo/client";
import { DELETE_TASK } from "../mutations/taskMutations";
import { GET_TASKS } from "../queries/taskQueries";
import { useNavigate } from "react-router-dom";
const DeleteTask = ({ id, userId }: { id: number; userId: number }) => {
  const [deleteTask] = useMutation<{ deleteTask: number }>(DELETE_TASK);
  const navigate = useNavigate();

  const handleDeleteTask = async () => {
    try {
      await deleteTask({
        variables: { id },
        refetchQueries: [{ query: GET_TASKS, variables: { userId } }],
      });
      alert("Task has been deleted");
    } catch (error: any) {
      if (error.message === "Unauthorized") {
        localStorage.removeItem("token");
        alert("Token expired. Return to sign-in screen.");
        navigate("/signin");
        return;
      }
      alert("Failed to delete task");
    }
  };
  return (
    <>
      <Tooltip title="delete">
        <IconButton onClick={handleDeleteTask}>
          <DeleteIcon color="action" />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default DeleteTask;

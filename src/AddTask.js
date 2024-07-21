import { FaPlus } from "react-icons/fa";
import { useRef } from "react";
const AddTask = ({ newTask, setNewTask, handleSubmit }) => {
  const inputRef = useRef();
  return (
    <form className="addtaskbox" onSubmit={handleSubmit}>
      <input
        autoFocus
        ref={inputRef}
        className="inputtask"
        type="text"
        placeholder="Add Task"
        required
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button
        className="faplusbutton"
        type="submit"
        onClick={() => inputRef.current.focus()}
      >
        <FaPlus />
      </button>
    </form>
  );
};

export default AddTask;

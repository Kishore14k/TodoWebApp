import React from "react";
import { FaTrash } from "react-icons/fa";
const Tasklists = ({ tasks, handleDelete, handleCheckbox }) => {
  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li className="task" key={task.id}>
            <input
              onChange={() => handleCheckbox(task.id)}
              type="checkbox"
              className="checkpotti"
              checked={task.checked}
            />
            <label
              style={task.checked ? { textDecoration: "line-through" } : null}
              onDoubleClick={() => handleDelete(task.id)}
            >
              {task.task}
            </label>
            <FaTrash
              role="button"
              className="trash"
              onClick={() => handleDelete(task.id)}
              tabIndex="0"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Tasklists;

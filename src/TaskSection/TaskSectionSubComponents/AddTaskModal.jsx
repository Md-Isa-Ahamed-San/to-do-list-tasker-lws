/* eslint-disable react/prop-types */
import { useState } from "react";

const AddTaskModal = ({ onSave, onCloseTaskClick, taskToUpdate }) => {
  const taskData = {
    id: crypto.randomUUID(),
    title: "",
    description: "",
    priority: "",
    tags: [],
    isFavourite: false,
  };
  // console.log("tasktoupdate : ",taskToUpdate)
  const [task, setTask] = useState(taskToUpdate || taskData);
  const [isAdding, setIsAdding] = useState(Object.is(taskToUpdate, null));
  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === "tags") {
      value = value.split(",");
    }
    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault(); // Prevents the form from reloading
    onSave(task, isAdding);
  };

  return (
    <form className="mx-auto my-10 shadow-2xl shadow-gray-700 w-full max-w-[740px] rounded-xl border absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:my-20 lg:p-11">
      <h2 className="mb-9 text-center text-2xl font-bold text-white lg:mb-11 lg:text-[28px]">
        {taskToUpdate ? "Update Task" : "Add Task"}
      </h2>

      <div className="space-y-9 text-white lg:space-y-10">
        <div className="space-y-2 lg:space-y-3">
          <label htmlFor="title">Title</label>
          <input
            className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
            type="text"
            name="title"
            id="title"
            value={task.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2 lg:space-y-3">
          <label htmlFor="description">Description</label>
          <textarea
            className="block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-[180px]"
            type="text"
            name="description"
            id="description"
            value={task.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20">
          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="tags">Tags (e.g: Web,JS,Python)</label>
            <input
              className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
              type="text"
              name="tags"
              id="tags"
              value={task.tags}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="priority">Priority</label>
            <select
              className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5"
              name="priority"
              id="priority"
              value={task.priority}
              onChange={handleChange}
              required
            >
              <option value="">Select Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-16 flex gap-8 lg:mt-20">
        <button
          type="submit"
          className="rounded bg-green-600 px-4 py-2 text-white transition-all hover:opacity-80"
          onClick={handleSave}
        >
          {isAdding ? "Add Task" : "Update Task"}
        </button>
        <button
          className="rounded bg-red-400 px-4 py-2 text-white transition-all hover:opacity-80"
          onClick={onCloseTaskClick}
        >
          Close
        </button>
      </div>
    </form>
  );
};

export default AddTaskModal;

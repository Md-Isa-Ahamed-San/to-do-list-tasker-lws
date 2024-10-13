import { useState } from "react";
import AddTaskModal from "./TaskSectionSubComponents/AddTaskModal";
import SearchBox from "./TaskSectionSubComponents/SearchBox";
import TaskActionComponent from "./TaskSectionSubComponents/TaskActionComponent";
import TaskList from "./TaskSectionSubComponents/TaskList";
import NoTaskFound from "./TaskSectionSubComponents/NoTaskFound";
const TaskSection = () => {
  const defaultTasks = [
    {
      id: crypto.randomUUID(),
      title: "Learn React",
      description:
        "Connect an existing API to a third-party database using secure methods and handle data exchange efficiently.",
      tags: ["web", "react", "Javascript"],
      priority: "High",
      isFavourite: true,
    },
    {
      id: crypto.randomUUID(),
      title: "Master Redux",
      description:
        "Learn how to manage state efficiently in React applications using Redux and middleware for asynchronous actions.",
      tags: ["state management", "redux", "javascript"],
      priority: "Medium",
      isFavourite: false,
    },
    {
      id: crypto.randomUUID(),
      title: "Build a Portfolio",
      description:
        "Create a personal portfolio website using modern web technologies, showcasing your skills and projects.",
      tags: ["web", "portfolio", "html", "css", "javascript"],
      priority: "Low",
      isFavourite: false,
    },
    {
      id: crypto.randomUUID(),
      title: "Explore Next.js",
      description:
        "Dive into Next.js to build server-side rendered applications and explore its routing and data fetching methods.",
      tags: ["web", "nextjs", "javascript"],
      priority: "High",
      isFavourite: true,
    },
  ];

  // console.log(tasks);

  const [tasks, setTasks] = useState(defaultTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);
  const handleAddTask = (newTask, isAdding) => {
    if (isAdding) {
      const newTaskList = [...tasks, newTask];
      setTasks(newTaskList);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }
          return task;
        })
      );
      setTaskToUpdate(null);
    }

    setIsModalOpen(false);
  };
  const handleOpenModalToEditTask = (task) => {
    setTaskToUpdate(task);
    setIsModalOpen(true);
  };
  const handleDeleteTask = (_id) => {
    // console.log("deleting a task",id);
    setTasks(tasks.filter((task) => task.id !== _id));
  };
  const handleDeleteAllTask = () => {
    tasks.length = 0;
    setTasks([...tasks]);
  };
  const handleCloseModal = () => {
    setTaskToUpdate(null);
    setIsModalOpen(false);
  };
  const handleFavouriteTask = (taskId) => {
    console.log(taskId);
    const dataAfterToggleFav = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isFavourite: !task.isFavourite };
      }
      return task;
    });
    setTasks(dataAfterToggleFav);

    // const indexOfTaskId = tasks.findIndex(task=>task.id===taskId)
    // const newData = [...tasks]
    // newData[indexOfTaskId].isFavourite = !newData[indexOfTaskId].isFavourite
    // setTasks(newData)
  };
  const handleSearchTask = (keyWords) => {
    // console.log(keyWords);
    setTasks(
      tasks.filter((task) =>
        task.title.toLowerCase().includes(keyWords.toLowerCase())
      )
    );
  };
  return (
    <section className="mb-20" id="tasks">
      <div className="container">
        <SearchBox onSearch={handleSearchTask} />
        <div className="relative  rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskActionComponent
            onAddTaskClick={() => setIsModalOpen(true)}
            onDeleteAllClick={handleDeleteAllTask}
          />
          {tasks?.length > 0 ? (
            <TaskList
              tasks={tasks}
              onEdit={handleOpenModalToEditTask}
              onDelete={handleDeleteTask}
              onFav={handleFavouriteTask}
            />
          ) : (
            <NoTaskFound />
          )}
          {isModalOpen && (
            <AddTaskModal
              onSave={handleAddTask}
              taskToUpdate={taskToUpdate}
              onCloseTaskClick={handleCloseModal}
            ></AddTaskModal>
          )}
        </div>
      </div>
    </section>
  );
};

export default TaskSection;

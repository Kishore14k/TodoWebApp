import Tasklists from "./Tasklists";
const Content = ({ tasks, handleDelete, handleCheckbox }) => {
  return (
    <>
      <main className="tasks">
        {tasks.length ? (
          <Tasklists
            tasks={tasks}
            handleCheckbox={handleCheckbox}
            handleDelete={handleDelete}
          />
        ) : (
          <p>#Winning You have completed all of your tasks</p>
        )}
      </main>
      </>
  );
};

export default Content;

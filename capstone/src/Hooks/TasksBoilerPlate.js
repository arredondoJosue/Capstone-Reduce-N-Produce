const [tasks, setTasks] = useState([]);
const dispatch = useDispatch();
const userInfo = useSelector((state) => state.globalStore.userInfo);
const taskStore = useSelector((state) => state.globalStore.tasks);

console.log(userInfo);
console.log(taskStore);
console.log(tasks);

useEffect(() => {
  axios
    .get(`http://localhost:5000/api/v1/tasks/${userInfo.user_id}`)
    .then((res) => {
      setTasks(res.data);
    });
}, [taskStore]);

// Filter tasks that are overdue
const overdueTasks = tasks.filter((task) => {
  if (task.due_date < Date.now()) {
    return task;
  }
});

// Filter tasks that are due today
const todayTasks = tasks.filter((task) => {
  if (task.due_date > Date.now() && task.due_date < Date.now() + 86400000) {
    return task;
  }
});

// Filter tasks that are due within the next 7 days
const next7Tasks = tasks.filter((task) => {
  if (task.due_date > Date.now() && task.due_date < Date.now() + 604800000) {
    return task;
  }
});

// Filter the tasks by due date
let sortedTasks = tasks.sort((a, b) => {
  return new Date(a.task_due) - new Date(b.task_due);
});

// Sorts the tasks by their id
let sortedByID = tasks.sort((a, b) => {
  return a.task_id - b.task_id;
});

let sortedByPriority = tasks.sort((a, b) => {
  return a.task_priority - b.task_priority;
});

let sortedByStatus = tasks.sort((a, b) => {
  return a.task_status - b.task_status;
});

let sortedByAssigned = tasks.sort((a, b) => {
  return a.task_assigned_to - b.task_assigned_to;
});

<nav className="callings-nav">
  <select
    onChange={(e) => {
      if (e.target.value === "created") {
        let taskList = sortedByID.map((task, i) => {
          return (
            <TaskList
              key={i}
              taskId={task.task_id}
              taskisComplete={task.task_isComplete}
              taskDescription={task.task_description}
              taskDue={task.task_due}
              handleChangeChecked={handleChangeChecked}
              handleTaskEdit={handleTaskEdit}
              setTasks={setTasks}
            />
          );
        });
        return taskList;
      } else if (e.target.value === "due") {
        let taskList = sortedTasks.map((task, i) => {
          return (
            <TaskList
              key={i}
              taskId={task.task_id}
              taskisComplete={task.task_isComplete}
              taskDescription={task.task_description}
              taskDue={task.task_due}
              handleChangeChecked={handleChangeChecked}
              handleTaskEdit={handleTaskEdit}
              setTasks={setTasks}
            />
          );
        });
        return taskList;
      } else if (e.target.value === "priority") {
        let taskList = sortedByPriority.map((task, i) => {
          return (
            <TaskList
              key={i}
              taskId={task.task_id}
              taskisComplete={task.task_isComplete}
              taskDescription={task.task_description}
              taskDue={task.task_due}
              handleChangeChecked={handleChangeChecked}
              handleTaskEdit={handleTaskEdit}
              setTasks={setTasks}
            />
          );
        });
        return taskList;
        // setTasks(sortedByPriority);
      } else if (e.target.value === "status") {
        let taskList = sortedByStatus.map((task, i) => {
          return (
            <TaskList
              key={i}
              taskId={task.task_id}
              taskisComplete={task.task_isComplete}
              taskDescription={task.task_description}
              taskDue={task.task_due}
              handleChangeChecked={handleChangeChecked}
              handleTaskEdit={handleTaskEdit}
              setTasks={setTasks}
            />
          );
        });
        return taskList;
        // setTasks(sortedByStatus);
      } else {
        setTasks(tasks);
      }
    }}
    className="callings-nav-selection"
  >
    <option value="">--Sort by--</option>
    <option value="created">Created Date</option>
    <option value="due">Due Date</option>
    <option value="priority">Priority</option>
    <option value="status">Status</option>
  </select>
</nav>;

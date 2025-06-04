import { useState } from "react";
import { Link } from "react-router-dom";
import type { Task } from "src/api/tasks";
import { updateTask } from "src/api/tasks";
import { CheckButton } from "src/components";
import styles from "src/components/TaskItem.module.css";
import { UserTag } from "src/components/UserTag";

export interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task: initialTask }: TaskItemProps) {
  const [task, setTask] = useState<Task>(initialTask);
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleToggleCheck = () => {
    setLoading(true);

    updateTask({
      ...task,
      isChecked: !task.isChecked,
      assignee: task.assignee?._id,
    })
      .then((result) => {
        if (result.success) {
          setTask(result.data);
        } else {
          alert(result.error); // If result has an error, alert the user
        }
      })
      .catch((error) => {
        alert("An error occurred while updating the task.");
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false); // Reset the loading state
      });
  };
  const textContainerClass = task.isChecked
    ? `${styles.textContainer} ${styles.checked}`
    : styles.textContainer;
  return (
    <div>
      <div className={styles.item}>
        <CheckButton checked={task.isChecked} disabled={isLoading} onPress={handleToggleCheck} />
        <div className={textContainerClass}>
          <Link to={`/task/${task._id}`} className={styles.title}>
            {task.title || "Task Item Title"}
          </Link>
          {task.description && <span className={styles.description}>{task.description}</span>}
        </div>
        <div className={styles.userTagContainer}>
          {task.assignee ? (
            <UserTag user={task.assignee} />
          ) : (
            <span className={styles.notAssigned}>Not assigned</span>
          )}
        </div>
      </div>
    </div>
  );
}

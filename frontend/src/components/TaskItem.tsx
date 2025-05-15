import { useState } from "react";
import { updateTask, type Task } from "src/api/tasks";
import { CheckButton } from "src/components";
import styles from "src/components/TaskItem.module.css";

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
    })
      .then((result) => {
        if (result.success) {
          setTask(result.data); // Assuming result.data is the updated task
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
          <span className={styles.title}>{task.title || "Task Item Title"}</span>
          {task.description && <span className={styles.description}>{task.description}</span>}
        </div>
      </div>
    </div>
  );
}

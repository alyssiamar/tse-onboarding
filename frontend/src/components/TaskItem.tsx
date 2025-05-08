import React from "react";
import type { Task } from "src/api/tasks";
import { CheckButton } from "src/components";
import styles from "src/components/TaskItem.module.css";

export interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
  const textContainerClass = task.isChecked
    ? `${styles.textContainer} ${styles.checked}`
    : styles.textContainer;
  return (
    <div>
      <div className={styles.item}>
        <CheckButton checked={task.isChecked} disabled={false} />
        <div className={textContainerClass}>
          <span className={styles.title}>{task.title || "Task Item Title"}</span>
          {task.description && (
            <span className={styles.description}>{"Task Item Description"}</span>
          )}
        </div>
      </div>
    </div>
  );
}

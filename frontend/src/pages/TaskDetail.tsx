import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { Task, getTask } from "src/api/tasks";
import { HeaderBar, Page, UserTag, TaskForm } from "src/components";
import styles from "src/pages/TaskDetail.module.css";

export function TaskDetail() {
  const [task, setTask] = useState<Task | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchTask = async () => {
      if (id) {
        try {
          const result = await getTask(id);

          // Check if the result is successful
          if (result.success) {
            setTask(result.data); // Use result.data, not the whole result
          } else {
            console.error("Error fetching task:", result.error);
            // Handle error case - maybe set task to null or show error message
            setTask(null);
          }
        } catch (error) {
          console.error("Error fetching task:", error);
          setTask(null);
        }
      }
    };

    fetchTask();
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleFormSubmit = (updatedTask: Task) => {
    setTask(updatedTask);
    setIsEditing(false);
  };

  if (!task) {
    return (
      <Page>
        <Helmet>
          <title>not found</title>
        </Helmet>
        <p>
          <Link to="/">Back to Home</Link>
        </p>
        <div className={styles.Unknowntitle}>This task doesn&apos;t exist!</div>
      </Page>
    );
  }

  return (
    <div>
      <HeaderBar />
      <div className={styles.container}>
        <Helmet>
          <title>{task.title}</title>
        </Helmet>

        <div className={styles.header}>
          <Link to="/" className={styles.backLink}>
            Back to home
          </Link>
        </div>

        {isEditing ? (
          <TaskForm mode="edit" task={task} onSubmit={handleFormSubmit} />
        ) : (
          <>
            <div className={styles.titleRow}>
              <h1 className={styles.title}>{task.title}</h1>
              <button onClick={handleEditClick} className={styles.editButton}>
                Edit task
              </button>
            </div>

            <p className={styles.description}>{task.description || "(No description)"}</p>

            <div className={styles.details}>
              <div className={styles.detailRow}>
                <span className={styles.label}>Assignee</span>
                <span className={styles.value}>
                  {task.assignee ? <UserTag user={task.assignee} /> : "Not assigned"}
                </span>
              </div>

              <div className={styles.detailRow}>
                <span className={styles.label}>Status</span>
                <span className={styles.value}>{task.isChecked ? "Done" : "Not done"}</span>
              </div>

              <div className={styles.detailRow}>
                <span className={styles.label}>Date created</span>
                <span className={styles.value}>
                  {new Date(task.dateCreated).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

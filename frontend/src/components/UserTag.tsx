import { User } from "src/api/users.ts";
import styles from "src/components/UserTag.module.css";

export const UserTag = ({ user }: { user: User }) => {
  return (
    <div className={styles.userTag}>
      <img
        src={user.profilePictureURL || "/userDefault.svg"}
        alt={user.name}
        className={styles.profilePicture}
      />
      <span className={styles.userName}>{user.name}</span>
    </div>
  );
};

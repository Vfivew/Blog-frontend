import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserInfo.module.scss";

export const UserInfo = ({ avatarUrl, fullName, additionalText, userId }) => {
  const navigate = useNavigate();
  const fullAvatarUrl = avatarUrl
    ? `${process.env.REACT_APP_URL}${avatarUrl}`
    : "/noavatar.png";

  const handleClick = () => {
    navigate(`/posts/user/${userId}`);
  };

  return (
    <div
      className={styles.root}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <img className={styles.avatar} src={fullAvatarUrl} alt={fullName} />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
};

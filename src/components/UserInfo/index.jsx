import React from 'react';
import styles from './UserInfo.module.scss';

export const UserInfo = ({ avatarUrl, fullName, additionalText }) => {
  const fullAvatarUrl = avatarUrl ? `${process.env.REACT_APP_URL}${avatarUrl}` : '/noavatar.png';

  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={fullAvatarUrl} alt={fullName} />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
};

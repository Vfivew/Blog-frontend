import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "../../axios";
import { Post } from "../Post";
import styles from "./UserPost.module.scss";

const UserPost = () => {
    const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/posts/user/${userId}`);
        setPosts(response.data);

        const firstPost = response.data[0];
        if (firstPost) {
          setUser({
            avatarUrl: firstPost.user.avatarUrl,
            email: firstPost.user.email,
            fullName: firstPost.user.fullName,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <section>
      <h2 className={styles["title"]}>
        {" "}
        Профіль: {user ? user.fullName : "user"}
      </h2>
      <div className={styles["user-info"]}>
        {user && (
          <div className={styles["user-info-container"]}>
            <div>
              <img
                src={`${process.env.REACT_APP_URL}${user.avatarUrl}`}
                alt={user.fullName}
                className={styles.avatar}
              />
            </div>
            <div>{user.fullName}</div>
          </div>
        )}
      </div>
      {posts.map((post) => (
        <Post
          key={post._id}
          id={post._id}
          title={post.title}
          createdAt={post.createdAt}
          imageUrl={
            post.imageUrl ? `${process.env.REACT_APP_URL}${post.imageUrl}` : ""
          }
          user={post.user}
          viewsCount={post.viewsCount}
          commentsCount={post.comments.length}
          tags={post.tags}
          userId={post.user._id}
        />
      ))}
    </section>
  );
};

export default UserPost;

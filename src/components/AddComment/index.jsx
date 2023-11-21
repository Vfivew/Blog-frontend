import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { fetchAddComment } from "../../redux/slices/posts";
import { useParams } from "react-router-dom";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

export const Index = ({fetchPostData}) => {
  const [commentText, setCommentText] = useState(""); 
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { id } = useParams();

  const handleCommentSubmit = async () => {
    if (!userData) {
      alert('Ви не зареєстровані');
      return;
    }
   await dispatch(
      fetchAddComment({
        postId: id, 
        commentData: {
          user: userData._id,
          text: commentText,
          fullName: userData.fullName,
          avatarUrl: userData.avatarUrl,
        }
      })
   );
    fetchPostData();
    setCommentText('')
  };

  console.log(userData)

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src={userData?`${process.env.REACT_APP_URL}${userData.avatarUrl}`:null}
        />
        <div className={styles.form}>
          <TextField
            label="Написати коментар"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <Button variant="contained" onClick={handleCommentSubmit}>
            Отправить
          </Button>
        </div>
      </div>
    </>
  );
};

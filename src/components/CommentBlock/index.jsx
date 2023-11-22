import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";
import { IconButton } from "@mui/material";
import { Favorite } from "@mui/icons-material";

import { SideBlock } from "../SideBlock";
import { fetchLike } from "../../redux/slices/posts";
import styles from "./CommentBlock.module.scss";

export const CommentsBlock = ({ items, children, isLoading = true, fetchPostData  }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(items)
  const onClickLike = async (commentId) => {
    if (!userData) {
      alert('Ви не зареєстровані');
      return;
    }

    const { _id: userId } = userData;
    const postId = id;

    try {
      await dispatch(fetchLike({ postId, commentId, userId }));
      fetchPostData();
    } catch (error) {
      console.warn(error);
      alert(`Помилка ${error.message}. Cпробуйте пізніше`);
    }
  };

  return (
    <SideBlock title="Коментарі">
      <List className={styles.root}>
        {(isLoading ? [...Array(5)] : items).map((comment, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start">
            <ListItemAvatar className={styles.avatar}>
              {isLoading ? (
                <Skeleton variant="circular" width={40} height={40} />
              ) : (
                <Avatar
                  alt={comment.fullName}
                  src={`${process.env.REACT_APP_URL}${comment.avatarUrl}`}
                  onClick={() => navigate(`/posts/user/${comment.user}`)}
                />
              )}
            </ListItemAvatar>
              {isLoading ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Skeleton variant="text" height={25} width={120} />
                  <Skeleton variant="text" height={18} width={230} />
                </div>
              ) : (
                <ListItemText className={styles.listText}
                  primary={comment.fullName}
                  secondary={<span className={styles.text}>{comment.text}</span>}
                />
              )}
              <IconButton
                onClick={() => onClickLike(comment._id)}
                color="secondary"
              >
                {comment.likesCount ? comment.likesCount.length : 0}
                <Favorite />
              </IconButton>
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
      {children}
    </SideBlock>
  );
};

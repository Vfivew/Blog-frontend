import React, {useState, useEffect} from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';

import axios from '../axios';
import { Post } from '../components/Post';
import { Index } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentBlock';

export const FullPost = () => {
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();

  const fetchPostData = async () => {
    try {
      const response = await axios.get(`/posts/${id}`);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.warn(error);
      alert(`Помилка при отриманні статті! ${error.message}`);
    }
  };

  useEffect(() => {
    fetchPostData();
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `${process.env.REACT_APP_URL}${data.imageUrl}` : ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={data.comments.length}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock
        items={data.comments}
        isLoading={isLoading}
        fetchPostData={fetchPostData}
      >
      <Index
        fetchPostData={fetchPostData}
      />
      </CommentsBlock>
    </>
  );
};
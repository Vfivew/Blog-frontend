import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Post } from '../Post';
import { fetchTagPost } from '../../redux/slices/tags'; 

import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import styles from './FilterTags.module.scss';

const FilterTags = () => {
    const { tag } = useParams();
    const { posts } = useSelector((state) => state.tags);
    const [filter, setFilter] = useState('new');
    const dispatch = useDispatch();
    const isPostsLoading = posts.status === 'loading';

    useEffect(() => {
        dispatch(fetchTagPost({ tag, filter }));
    }, [filter]);

    const handleTabChange = (event, newValue) => {
        setFilter(newValue);
    };
    console.log(posts)
    return (
        <div>
        <h2>Пости по тегу #{tag}</h2>
        <Tabs className={styles.tabs}
            style={{ marginBottom: 15 }}
            value={filter}
            onChange={handleTabChange}
            aria-label="basic tabs example"
            >
            <Tab label="Нові" className={`${styles.tab}`} value="new" />
            <Tab label="Популярні" className={`${styles.tab}`} value="views" />
        </Tabs>
        <Grid xs={8} item >
            {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
            isPostsLoading ? (
                <Post key={index} isLoading={true} />
            ) : (
                <Post key={obj._id}
                id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl ? `${process.env.REACT_APP_URL}${obj.imageUrl}` : ''}
                user={obj.user.fullName}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={3}
                tags={obj.tags}
                avatarUrl={obj.user.avatarUrl}
                userId={obj.user._id}
                />
            ),
            )}
        </Grid>
    </div>
    );
};

export default FilterTags;

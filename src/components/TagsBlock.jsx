// TagsBlock.jsx

import React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import TagIcon from '@mui/icons-material/Tag';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';

import { SideBlock } from './SideBlock';
import styles from './TagsBlock.module.scss';

export const TagsBlock = ({ items, isLoading = true }) => {
  return (
    <SideBlock title="Теги">
      <List>
        {(isLoading ? [...Array(5)] : items).map((name, i) => (
          <a key={i} className={styles.tagItem} href={`posts/tags/filter/${name}`}>
            <ListItem key={i} disablePadding>
              <ListItemButton className={styles.button}>
                <ListItemIcon className={styles.tagIcon}>
                  <TagIcon />
                </ListItemIcon>
                {isLoading ? <Skeleton width={100} /> : <ListItemText className={styles.tagText} primary={name} />}
              </ListItemButton>
            </ListItem>
          </a>
        ))}
      </List>
    </SideBlock>
  );
};

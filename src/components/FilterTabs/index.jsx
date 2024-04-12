import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchFilter } from '../../redux/slices/posts';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import styles from './FilterTabs.module.scss';

const FilterTabs = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('new');

  const handleTabChange = async (event, newValue) => {
    try {
      setValue(newValue);
      dispatch(fetchFilter(newValue));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Tabs className={styles.tabs}
      style={{ marginBottom: 15 }}
      value={value}
      onChange={handleTabChange}
      aria-label="basic tabs example"
    >
      <Tab className={`${styles.tab} Mui-selected`} label="Нові" value="new" />
      <Tab className={`${styles.tab} Mui-selected`} label="Популярні" value="views" />
    </Tabs>
  );
};

export default FilterTabs;

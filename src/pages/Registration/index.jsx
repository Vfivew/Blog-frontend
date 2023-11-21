import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import styles from './Login.module.scss';

import { fetchAuth, fetchRegister, selectIsAuth } from '../../redux/slices/auth';

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: 'Ім\'я Фамілія',
      email: 'example@gmail.com',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append('fullName', values.fullName);
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('avatar', values.avatar[0]); 

    const data = await dispatch(fetchRegister(formData));

    if (!data.payload) {
      return alert('Не вдалось зареєструватись!');
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Створення аккаунту
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register('fullName', {
            required: "Вкажіть повне ім'я",
            minLength: { value: 2, message: 'Ім\'я повинне містити принаймні 2 символи' },
          })}
          className={styles.field}
          label="Повне ім'я"
          fullWidth
        />
        <TextField
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type="email"
          {...register('email', { required: 'Вкажіть пошту' })}
          className={styles.field}
          label="E-Mail"
          fullWidth
        />
        <TextField
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          type="password"
          {...register('password', {
            required: 'Вкажіть пароль',
            minLength: { value: 8, message: 'Мінімальна довжина пароля - 8 символів' },
          })}
          className={styles.field}
          label="Пароль"
          fullWidth
        />
        <InputLabel htmlFor="avatar">Оберіть аватар (не обов'язково)</InputLabel>
        <Input
          id="avatar"
          type="file"
          {...register('avatar')}
          accept="image/*"
          className={styles.field}
        />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Зареєструватись
        </Button>
      </form>
    </Paper>
  );
};
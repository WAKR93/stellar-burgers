import { FC, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { registerUser, clearError } from '../../services/slices/authSlice';
import { RegisterUI } from '@ui-pages';
import { useForm } from '../../hooks/useForm';

export const Register: FC = () => {
  const [form, handleChange] = useForm({
    userName: '',
    email: '',
    password: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((store) => store.auth);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      registerUser({
        name: form.userName,
        email: form.email,
        password: form.password
      })
    )
      .unwrap()
      .then(() => {
        navigate('/');
      })
      .catch(() => {});
  };

  return (
    <RegisterUI
      errorText={error || ''}
      email={form.email}
      userName={form.userName}
      password={form.password}
      setEmail={(value) =>
        handleChange({ target: { name: 'email', value } } as any)
      }
      setPassword={(value) =>
        handleChange({ target: { name: 'password', value } } as any)
      }
      setUserName={(value) =>
        handleChange({ target: { name: 'userName', value } } as any)
      }
      handleSubmit={handleSubmit as any}
    />
  );
};

import { FC, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { loginUser, clearError } from '../../services/slices/authSlice';
import { LoginUI } from '@ui-pages';
import { useForm } from '../../hooks/useForm';

export const Login: FC = () => {
  const [form, handleChange] = useForm({ email: '', password: '' });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error } = useSelector((store) => store.auth);
  const from = location.state?.from || '/';

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser(form))
      .unwrap()
      .then(() => {
        navigate(from, { replace: true });
      })
      .catch(() => {});
  };

  return (
    <LoginUI
      errorText={error || ''}
      email={form.email}
      setEmail={(value) =>
        handleChange({ target: { name: 'email', value } } as any)
      }
      password={form.password}
      setPassword={(value) =>
        handleChange({ target: { name: 'password', value } } as any)
      }
      handleSubmit={handleSubmit as any}
    />
  );
};

import { FC, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { resetPasswordApi } from '@api';
import { ResetPasswordUI } from '@ui-pages';
import { useForm } from '../../hooks/useForm';

export const ResetPassword: FC = () => {
  const navigate = useNavigate();
  const [form, handleChange] = useForm({ password: '', token: '' });
  const [error, setError] = useState<Error | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    resetPasswordApi({ password: form.password, token: form.token })
      .then(() => {
        localStorage.removeItem('resetPassword');
        navigate('/login');
      })
      .catch((err) => setError(err));
  };

  useEffect(() => {
    if (!localStorage.getItem('resetPassword')) {
      navigate('/forgot-password', { replace: true });
    }
  }, [navigate]);

  return (
    <ResetPasswordUI
      errorText={error?.message}
      password={form.password}
      token={form.token}
      setPassword={(value) =>
        handleChange({ target: { name: 'password', value } } as any)
      }
      setToken={(value) =>
        handleChange({ target: { name: 'token', value } } as any)
      }
      handleSubmit={handleSubmit as any}
    />
  );
};

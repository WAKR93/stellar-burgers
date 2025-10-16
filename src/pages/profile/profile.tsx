import { ProfileUI } from '@ui-pages';
import { FC, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { updateUser, clearError } from '../../services/slices/authSlice';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const { user, error } = useSelector((store) => store.auth);

  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormChanged) {
      dispatch(updateUser(formValue));
      setFormValue((prev) => ({ ...prev, password: '' }));
    }
  };

  const handleCancel = (e: FormEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit as any}
      handleInputChange={handleInputChange}
      updateUserError={error || ''}
    />
  );
};

import { useState, ChangeEvent } from 'react';

export function useForm<T extends { [key: string]: string }>(baseForm: T) {
  const [form, setForm] = useState<T>(baseForm);
  //e: ChangeEvent<HTMLInputElement>
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const element = e.target;
    setForm((pastForm) => ({ ...pastForm, [element.name]: element.value }));
  }

  return [form, handleChange] as const;
}

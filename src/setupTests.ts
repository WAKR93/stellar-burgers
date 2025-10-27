import '@testing-library/jest-dom';

Object.defineProperty(global, 'crypto', {
  value: {
    randomUUID: () => Math.random().toString(36).substring(2, 11)
  }
});

import { rootReducer } from './rootReducer';

describe('rootReducer', () => {
  it('should return initial state', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(initialState).toEqual({
      ingredients: expect.any(Object),
      burgerConstructor: expect.any(Object),
      order: expect.any(Object),
      auth: expect.any(Object),
      feed: expect.any(Object)
    });
  });
});

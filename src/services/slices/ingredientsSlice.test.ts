import ingredientsReducer, {
  fetchIngredients,
  initialState
} from './ingredientsSlice';
import { TIngredient } from '@utils-types';

const mockIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Test Ingredient 1',
    type: 'bun',
    proteins: 10,
    fat: 10,
    carbohydrates: 10,
    calories: 100,
    price: 100,
    image: 'image1.png',
    image_mobile: 'image1-mobile.png',
    image_large: 'image1-large.png'
  },
  {
    _id: '2',
    name: 'Test Ingredient 2',
    type: 'main',
    proteins: 5,
    fat: 5,
    carbohydrates: 5,
    calories: 50,
    price: 50,
    image: 'image2.png',
    image_mobile: 'image2-mobile.png',
    image_large: 'image2-large.png'
  }
];

describe('ingredients reducer', () => {
  it('should handle initial state', () => {
    expect(ingredientsReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('should handle fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: null
    });
  });

  it('should handle fetchIngredients.fulfilled', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const state = ingredientsReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      loading: false,
      ingredients: mockIngredients
    });
  });

  it('should handle fetchIngredients.rejected', () => {
    const action = {
      type: fetchIngredients.rejected.type,
      error: { message: 'Failed to fetch' }
    };
    const state = ingredientsReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: 'Failed to fetch'
    });
  });
});

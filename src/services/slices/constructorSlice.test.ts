import constructorReducer, {
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
  initialState
} from './constructorSlice';
import { TIngredient } from '@utils-types';

const mockBun: TIngredient = {
  _id: '1',
  name: 'Test Bun',
  type: 'bun',
  proteins: 10,
  fat: 10,
  carbohydrates: 10,
  calories: 100,
  price: 100,
  image: 'image.png',
  image_mobile: 'image-mobile.png',
  image_large: 'image-large.png'
};

const mockIngredient: TIngredient = {
  _id: '2',
  name: 'Test Ingredient',
  type: 'main',
  proteins: 5,
  fat: 5,
  carbohydrates: 5,
  calories: 50,
  price: 50,
  image: 'image.png',
  image_mobile: 'image-mobile.png',
  image_large: 'image-large.png'
};

describe('constructor reducer', () => {
  it('should handle initial state', () => {
    expect(constructorReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('should handle addBun', () => {
    const actual = constructorReducer(initialState, addBun(mockBun));
    expect(actual.bun).toEqual(mockBun);
    expect(actual.ingredients).toHaveLength(0);
  });

  it('should handle addIngredient', () => {
    const action = addIngredient(mockIngredient);
    const actual = constructorReducer(initialState, action);

    expect(actual.ingredients).toHaveLength(1);
    expect(actual.ingredients[0]).toMatchObject(mockIngredient);
    expect(actual.ingredients[0]).toHaveProperty('id');
  });

  it('should handle removeIngredient', () => {
    // Создаем состояние с ингредиентом
    const action = addIngredient(mockIngredient);
    const stateWithIngredient = constructorReducer(initialState, action);
    const ingredientId = stateWithIngredient.ingredients[0].id;

    // Удаляем ингредиент
    const actual = constructorReducer(
      stateWithIngredient,
      removeIngredient(ingredientId)
    );

    expect(actual.ingredients).toHaveLength(0);
  });

  it('should handle moveIngredient', () => {
    const ingredient1 = { ...mockIngredient, _id: '1' };
    const ingredient2 = { ...mockIngredient, _id: '2' };

    // Добавляем два ингредиента
    let state = constructorReducer(initialState, addIngredient(ingredient1));
    state = constructorReducer(state, addIngredient(ingredient2));

    // Меняем их местами
    const movedState = constructorReducer(
      state,
      moveIngredient({
        fromIndex: 0,
        toIndex: 1
      })
    );

    expect(movedState.ingredients[0]._id).toBe('2');
    expect(movedState.ingredients[1]._id).toBe('1');
  });

  it('should handle clearConstructor', () => {
    const stateWithItems = constructorReducer(
      constructorReducer(initialState, addBun(mockBun)),
      addIngredient(mockIngredient)
    );

    const actual = constructorReducer(stateWithItems, clearConstructor());

    expect(actual).toEqual(initialState);
  });
});

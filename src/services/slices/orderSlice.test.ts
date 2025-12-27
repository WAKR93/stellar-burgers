import orderReducer, { createOrder, initialState } from './orderSlice';
import { TOrder } from '@utils-types';

const mockOrder: TOrder = {
  _id: '1',
  ingredients: ['ingredient1', 'ingredient2'],
  status: 'done',
  name: 'Test Order',
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z',
  number: 12345
};

describe('order reducer', () => {
  it('should handle initial state', () => {
    expect(orderReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle createOrder.pending', () => {
    const action = { type: createOrder.pending.type };
    const state = orderReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      orderRequest: true,
      error: null
    });
  });

  it('should handle createOrder.fulfilled', () => {
    const action = {
      type: createOrder.fulfilled.type,
      payload: mockOrder
    };
    const state = orderReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      orderRequest: false,
      order: mockOrder,
      orderModalData: mockOrder,
      error: null
    });
  });

  it('should handle createOrder.rejected', () => {
    const errorMessage = 'Failed to create order';
    const action = {
      type: createOrder.rejected.type,
      error: { message: errorMessage }
    };
    const state = orderReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      orderRequest: false,
      error: errorMessage
    });
  });

  it('should handle clearOrder', () => {
    const stateWithOrder = {
      ...initialState,
      order: mockOrder,
      orderModalData: mockOrder
    };

    const action = { type: 'order/clearOrder' };
    const state = orderReducer(stateWithOrder, action);

    expect(state).toEqual({
      ...stateWithOrder,
      order: null,
      orderModalData: null
    });
  });
});

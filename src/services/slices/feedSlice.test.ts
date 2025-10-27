import feedReducer, {
  fetchFeeds,
  fetchUserOrders,
  initialState
} from './feedSlice';
import { TOrder } from '@utils-types';

const mockOrders: TOrder[] = [
  {
    _id: '1',
    ingredients: ['ingredient1', 'ingredient2'],
    status: 'done',
    name: 'Test Order 1',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
    number: 1
  }
];

const mockFeedsResponse = {
  orders: mockOrders,
  total: 100,
  totalToday: 10
};

describe('feed reducer', () => {
  it('should handle initial state', () => {
    expect(feedReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle fetchFeeds.pending', () => {
    const action = { type: fetchFeeds.pending.type };
    const state = feedReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: null
    });
  });

  it('should handle fetchFeeds.fulfilled', () => {
    const action = {
      type: fetchFeeds.fulfilled.type,
      payload: mockFeedsResponse
    };
    const state = feedReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      loading: false,
      orders: mockOrders,
      total: 100,
      totalToday: 10
    });
  });

  it('should handle fetchFeeds.rejected', () => {
    const action = {
      type: fetchFeeds.rejected.type,
      error: { message: 'Failed to fetch feeds' }
    };
    const state = feedReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: 'Failed to fetch feeds'
    });
  });

  it('should handle fetchUserOrders.pending', () => {
    const action = { type: fetchUserOrders.pending.type };
    const state = feedReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: null
    });
  });

  it('should handle fetchUserOrders.fulfilled', () => {
    const action = {
      type: fetchUserOrders.fulfilled.type,
      payload: mockOrders
    };
    const state = feedReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      loading: false,
      userOrders: mockOrders
    });
  });
});

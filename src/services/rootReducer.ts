import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredients/ingredientsSlice';
import userReducer from './slices/user/userSlice';
import feedReducer from './slices/feed/feedSlice';
import profileOrdersReducer from './slices/profileOrders/profileOrdersSlice';
import constructorItemsReducer from './slices/constructorItems/constructorItemsSlice';
import orderReducer from './slices/order/orderSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  user: userReducer,
  feed: feedReducer,
  profileOrders: profileOrdersReducer,
  constructorItems: constructorItemsReducer,
  order: orderReducer
});

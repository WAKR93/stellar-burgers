import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeed } from '../../services/slices/feed/feedSlice';
import { fetchIngredients } from '../../services/slices/ingredients/ingredientsSlice';
export const Feed: FC = () => {
  const dispatch = useDispatch();

  const orders: TOrder[] = useSelector((state) => state.feed.orders);
  const isLoading = useSelector((state) => state.feed.isLoading);
  const ingredientsLoaded = useSelector(
    (state) => state.ingredients.dataCards.length > 0
  ); // проверка

  useEffect(() => {
    if (!ingredientsLoaded) {
      dispatch(fetchIngredients());
    }
    dispatch(fetchFeed());
  }, [dispatch, ingredientsLoaded]);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchFeed())} />
  );
};

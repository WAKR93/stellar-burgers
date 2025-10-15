import { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  useParams
} from 'react-router-dom';

import '../../index.css';
import styles from './app.module.css';

import { useSelector, useDispatch } from '../../services/store';
import { fetchUser } from '../../services/slices/user/userSlice';
import { fetchIngredients } from '../../services/slices/ingredients/ingredientsSlice';
import { Preloader, ModalUI, IngredientDetailsUI, OrderDetailsUI } from '@ui';

import { AppHeader, ProtectedRoute } from '@components';
import {
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404,
  ConstructorPage
} from '@pages';

const IngredientPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const ingredients = useSelector((state: any) => state.ingredients.items);
  const isLoading = useSelector((state: any) => state.ingredients.isLoading);

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length]);

  const ingredient = ingredients.find((item: any) => item._id === id);

  if (isLoading || !ingredients.length) return <Preloader />;
  if (!ingredient)
    return (
      <div className='text text_type_main-medium mt-10 mb-10'>
        Ингредиент не найден
      </div>
    );

  return (
    <div className='pt-30 pb-30'>
      <IngredientDetailsUI ingredientData={ingredient} />
    </div>
  );
};

const IngredientModal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const ingredients = useSelector((state: any) => state.ingredients.items);
  const ingredient = ingredients.find((item: any) => item._id === id);

  if (!ingredient) return null;

  return (
    <ModalUI title='Детали ингредиента' onClose={() => navigate(-1)}>
      <IngredientDetailsUI ingredientData={ingredient} />
    </ModalUI>
  );
};

const OrderInfoModal = () => {
  const navigate = useNavigate();
  const orderModalData = useSelector(
    (state: any) => state.order.orderModalData
  );

  if (!orderModalData || !orderModalData.order) return null;

  return (
    <ModalUI title='' onClose={() => navigate(-1)}>
      <OrderDetailsUI orderNumber={orderModalData.order.number} />
    </ModalUI>
  );
};

const AppRoutes = () => {
  const location = useLocation();
  // @ts-ignore
  const background = location.state && location.state.background;

  return (
    <>
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={<ProtectedRoute onlyUnAuth element={<Login />} />}
        />
        <Route
          path='/register'
          element={<ProtectedRoute onlyUnAuth element={<Register />} />}
        />
        <Route
          path='/forgot-password'
          element={<ProtectedRoute onlyUnAuth element={<ForgotPassword />} />}
        />
        <Route
          path='/reset-password'
          element={<ProtectedRoute onlyUnAuth element={<ResetPassword />} />}
        />
        <Route
          path='/profile'
          element={<ProtectedRoute element={<Profile />} />}
        />
        <Route
          path='/profile/orders'
          element={<ProtectedRoute element={<ProfileOrders />} />}
        />
        <Route path='/ingredients/:id' element={<IngredientPage />} />
        <Route path='/feed/:number' element={<OrderInfoModal />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route path='/ingredients/:id' element={<IngredientModal />} />
          <Route path='/feed/:number' element={<OrderInfoModal />} />
          <Route
            path='/profile/orders/:number'
            element={<ProtectedRoute element={<OrderInfoModal />} />}
          />
        </Routes>
      )}
    </>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const isUserLoaded = useSelector((state: any) => state.user.isUserLoaded);

  useEffect(() => {
    // fetchUser всегда вызывается при старте, даже если нет токена
    // он сам корректно выставит isUserLoaded
    if (!isUserLoaded) {
      dispatch(fetchUser());
    }
  }, [dispatch, isUserLoaded]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <AppRoutes />
    </div>
  );
};

export default App;

import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { setupStore } from './store';

import CartPage from '../pages/CartPage';

import HomePage from '../pages/HomePage';
import Page from '../pages/Page';
import { fetchCart } from '../slices/cartSlice';
import { fetchCatalog } from '../slices/catalogSlice';

import './styles.scss';

const store = setupStore();

store.dispatch(fetchCatalog());
store.dispatch(fetchCart());

function App() {
  return (
    <Provider store={store}>
      <Page>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </BrowserRouter>
      </Page>
    </Provider>
  );
}

export default App;

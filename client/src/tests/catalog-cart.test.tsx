import '@testing-library/jest-dom';
import { screen, within } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';

import { BrowserRouter } from 'react-router-dom';

import { getHandlers, renderWithProviders } from './test-utils';

import Cart from '../components/Cart';
import Catalog from '../components/Catalog';
import minPrice from '../helpers/minPrice';
import { fetchCart } from '../slices/cartSlice';
import { fetchCatalog } from '../slices/catalogSlice';
import { ICatalogPizza } from '../types/Pizza';

const catalogPizzas: ICatalogPizza[] = [
  {
    id: '1',
    name: 'Чизбургер-пицца',
    imgUrl: './pizzas/cheeseburger_pizza.png',
    types: {
      thin: {
        inStock: true,
        price: 50,
      },
      traditional: {
        inStock: true,
        price: 75,
      },
    },
    sizes: {
      S: {
        inStock: true,
        price: 30,
      },
      M: {
        inStock: true,
        price: 40,
      },
      L: {
        inStock: true,
        price: 45,
      },
    },
    categories: ['meat', 'grill'],
  },
  {
    id: '2',
    name: 'Сырная',
    imgUrl: './pizzas/cheese.png',
    types: {
      thin: {
        inStock: true,
        price: 45,
      },
      traditional: {
        inStock: false,
        price: 0,
      },
    },
    sizes: {
      S: {
        inStock: true,
        price: 100,
      },
      M: {
        inStock: false,
        price: 0,
      },
      L: {
        inStock: false,
        price: 0,
      },
    },
    categories: ['vegetarian'],
  },
];

const server = setupServer(...getHandlers(catalogPizzas));

beforeAll(() => server.listen());

afterEach(() => server.restoreHandlers());

afterAll(() => server.close());

function getApp(): JSX.Element {
  const app = (
    <BrowserRouter>
      <Catalog />
      <Cart />
    </BrowserRouter>
  );

  return app;
}

describe('Проверка работы каталога и корзины', () => {
  test('При добавлении пиццы определенного типа и размера, она появляется в корзине', async () => {
    const catalogPizza = catalogPizzas[0];

    const app = getApp();

    const { store } = renderWithProviders(app);

    store.dispatch(fetchCatalog());
    store.dispatch(fetchCart());

    const grid = await screen.findByRole('grid');
    const card = await within(grid).findByTestId(catalogPizza.id);
    const addBtn = await within(card).findByTestId('cart-add-button');

    userEvent.click(addBtn);

    const cart = await screen.findByRole('list');
    const bar = await within(cart).findByRole('listitem');
    const title = await within(bar).findByText(catalogPizza.name);

    expect(bar).toContainElement(title);
  });

  test('При добавлении нескольких пицц корректно подсчитывается сумма', async () => {
    const app = getApp();

    const { store } = renderWithProviders(app);

    store.dispatch(fetchCatalog());
    store.dispatch(fetchCart());

    const grid = await screen.findByRole('grid');
    const card1 = await within(grid).findByTestId(catalogPizzas[0].id);
    const card2 = await within(grid).findByTestId(catalogPizzas[1].id);

    const addBtn1 = await within(card1).findByTestId('cart-add-button');
    const addBtn2 = await within(card2).findByTestId('cart-add-button');

    userEvent.click(addBtn1);
    userEvent.click(addBtn2);

    const cart = await screen.findByTestId('cart');
    const cartPrice = await within(cart).findByTestId('cart-price');

    const price = minPrice(catalogPizzas[0]) + minPrice(catalogPizzas[1]);

    expect(cartPrice.textContent).toContain(price.toString());
  });
});

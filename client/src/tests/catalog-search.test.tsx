import '@testing-library/jest-dom';
import { screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';

import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';

import { getHandlers, renderWithProviders } from './test-utils';

import Catalog from '../components/Catalog';
import Search from '../components/Search';
import config from '../config';
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
  {
    id: '3',
    name: 'Креветки по-азиатски',
    imgUrl: './pizzas/asian_shrimp.png',
    types: {
      thin: {
        inStock: true,
        price: 33,
      },
      traditional: {
        inStock: false,
        price: 0,
      },
    },
    sizes: {
      S: {
        inStock: false,
        price: 0,
      },
      M: {
        inStock: true,
        price: 48,
      },
      L: {
        inStock: true,
        price: 60,
      },
    },
    categories: ['meat', 'grill', 'spicy'],
  },
  {
    id: '4',
    name: 'Сырный цыпленок',
    imgUrl: './pizzas/cheese_chicken.png',
    types: {
      thin: {
        inStock: true,
        price: 11,
      },
      traditional: {
        inStock: true,
        price: 20,
      },
    },
    sizes: {
      S: {
        inStock: true,
        price: 15,
      },
      M: {
        inStock: true,
        price: 18,
      },
      L: {
        inStock: true,
        price: 20,
      },
    },
    categories: ['meat'],
  },
  {
    id: '5',
    name: 'Цыпленок барбекю',
    imgUrl: './pizzas/barbecue_chicken.jpeg',
    types: {
      thin: {
        inStock: true,
        price: 30,
      },
      traditional: {
        inStock: true,
        price: 40,
      },
    },
    sizes: {
      S: {
        inStock: true,
        price: 40,
      },
      M: {
        inStock: true,
        price: 45,
      },
      L: {
        inStock: true,
        price: 55,
      },
    },
    categories: ['meat', 'grill'],
  },
];

const server = setupServer(...getHandlers(catalogPizzas));

beforeAll(() => server.listen());

afterEach(() => server.restoreHandlers());

afterAll(() => server.close());

function getApp(): JSX.Element {
  const app = (
    <BrowserRouter>
      <Search />
      <Catalog />
    </BrowserRouter>
  );

  return app;
}

describe('Проверка работы каталога и поиска', () => {
  test('При вводе ключевого слова в поиск отобразятся только соответствующие пиццы', async () => {
    const app = getApp();

    const { store } = renderWithProviders(app);

    store.dispatch(fetchCatalog());

    const search = await screen.findByRole('search');

    userEvent.type(search, 'сыр');

    await waitFor(() => {
      return new Promise((res) => setTimeout(res, config.searchDelay * 2));
    });

    const filteredPizzas = await screen.findAllByRole('gridcell');

    expect(filteredPizzas.length).toBe(2);
  });
});

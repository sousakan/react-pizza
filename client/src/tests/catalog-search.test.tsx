import '@testing-library/jest-dom';
import { screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';

import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';

import { catalogSearchData as catalogPizzas } from './data';
import { getHandlers, renderWithProviders } from './test-utils';

import Catalog from '../components/Catalog';
import Search from '../components/Search';
import config from '../config';
import { fetchCatalog } from '../features/catalog/asyncActions';

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

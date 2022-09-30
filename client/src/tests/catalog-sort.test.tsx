import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';

import { BrowserRouter } from 'react-router-dom';

import { catalogSortData as catalogPizzas } from './data';
import { getHandlers, renderWithProviders } from './test-utils';

import Catalog from '../components/Catalog';
import Dropdown from '../components/Dropdown';
import { fetchCatalog } from '../features/catalog/asyncActions';

const server = setupServer(...getHandlers(catalogPizzas));

beforeAll(() => server.listen());

afterEach(() => server.restoreHandlers());

afterAll(() => server.close());

function getApp(): JSX.Element {
  const app = (
    <BrowserRouter>
      <Dropdown />
      <Catalog />
    </BrowserRouter>
  );

  return app;
}

describe('Проверка работы каталога и сортировки', () => {
  test('При нажатии на кнопку сортировки по цене, самая первая пицца в каталоге будет самой дешевой', async () => {
    const app = getApp();

    const { store } = renderWithProviders(app);

    store.dispatch(fetchCatalog());

    const sortByPriceBtn = await screen.findByText('по цене');

    userEvent.click(sortByPriceBtn);

    const children = await screen.findAllByRole('gridcell');
    const lowestPriceCard = children[0];

    expect(lowestPriceCard).toHaveAttribute('data-testid', '4');
  });
});

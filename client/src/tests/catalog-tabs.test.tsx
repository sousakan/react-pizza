import '@testing-library/jest-dom';
import { screen, within } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';

import { BrowserRouter } from 'react-router-dom';

import { catalogTabsData as catalogPizzas } from './data';
import { getHandlers, renderWithProviders } from './test-utils';

import Catalog from '../components/Catalog';
import Tabs from '../components/Tabs';
import { fetchCatalog } from '../features/catalog/asyncActions';
import { pizzaCategoriesText } from '../types/Pizza';

const server = setupServer(...getHandlers(catalogPizzas));

beforeAll(() => server.listen());

afterEach(() => server.restoreHandlers());

afterAll(() => server.close());

function getApp(): JSX.Element {
  const app = (
    <BrowserRouter>
      <Tabs />
      <Catalog />
    </BrowserRouter>
  );

  return app;
}

describe('Проверка работы каталога и табов', () => {
  test('При нажатии на таб для выбора категории в каталоге должны остаться только пиццы из данной категории', async () => {
    const app = getApp();

    const { store } = renderWithProviders(app);

    store.dispatch(fetchCatalog());

    const grillTab = await screen.findByText(pizzaCategoriesText['grill']);

    userEvent.click(grillTab);

    const grid = await screen.findByRole('grid');
    const children = await within(grid).findAllByRole('gridcell');

    const card1 = await screen.findByTestId('1');
    const card2 = await screen.findByTestId('3');
    const card3 = await screen.findByTestId('5');

    expect(grid).toContainElement(card1);
    expect(grid).toContainElement(card2);
    expect(grid).toContainElement(card3);
    expect(children.length).toBe(3);
  });
});

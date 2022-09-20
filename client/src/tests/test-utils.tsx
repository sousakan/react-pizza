import { render } from '@testing-library/react';
import { rest } from 'msw';
import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

import { setupStore } from '../app/store';
import config from '../config';
import { ICatalogPizza } from '../types/Pizza';

export function renderWithProviders(
  ui: React.ReactElement,
  store = setupStore(),
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <React.StrictMode>
        <Provider store={store}>{children}</Provider>
      </React.StrictMode>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper }) };
}

export const getHandlers = (catalogPizzas: ICatalogPizza[]) => [
  rest.get(`${config.baseURL}/catalog`, (req, res, ctx) => {
    return res(ctx.json(catalogPizzas));
  }),
  rest.get(`${config.baseURL}/cart`, (req, res, ctx) => {
    return res(ctx.json([]));
  }),
  rest.post(`${config.baseURL}/cart`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.put(`${config.baseURL}/goods/:id`, (req, res, ctx) =>
    res(ctx.status(200)),
  ),
];

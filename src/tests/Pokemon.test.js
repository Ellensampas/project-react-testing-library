import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

it('Testa o componente Pokemon', () => {
  const pokes = 'Electric';
  const { render } = renderWithRouter(<App />);

  const detalhesButt = screen.getByText('More details');
  userEvent.click(detalhesButt);

  const buttFavor = screen.getByText('Pokémon favoritado?');
  userEvent.click(buttFavor);

  screen.getByAltText(/Pikachu is marked as favorite/i);
  const image = render.querySelector('img');
  const icon = render.querySelector('.favorite-icon');

  expect(screen.getByText(pokes)).toBeInTheDocument();
  expect(image.alt).toContain('Pikachu sprite');
  expect(image.src).toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  expect(icon.src).toContain('/star-icon.svg');
});

import { screen } from '@testing-library/react';
import { NotFound } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('testando o componente NotFound', () => {
  it('testando se existe um h2', () => {
    renderWithRouter(<NotFound />);

    const not = screen.getByRole('heading', { name: /requested not found/i, level: 2 });
    expect(not).toBeInTheDocument();
  });
  it('testando se mostra uma imagem', () => {
    renderWithRouter(<NotFound />);

    const image = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i });

    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});

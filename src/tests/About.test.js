import { screen } from '@testing-library/react';
import { About } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('testando se contem infos sobre a Pokédex', () => {
  it('testando se existe um h2', () => {
    renderWithRouter(<About />);

    const about = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
    expect(about).toBeInTheDocument();
  });
  it('testando se existem dois paragraph', () => {
    renderWithRouter(<About />);

    const paragra = screen.getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémons');
    expect(paragra).toBeInTheDocument();

    const paragraf = screen.getByText('One can filter Pokémons by type, and see more details for each one of them');
    expect(paragraf).toBeInTheDocument();
  });
  it('testando se existe uma img', () => {
    renderWithRouter(<About />);

    const image = screen.getByRole('img', {
      name: /pokédex/i });

    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

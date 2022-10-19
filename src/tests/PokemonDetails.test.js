import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('testando componente PokemonDetails', () => {
  it('testando se mostra detalhes na tela', () => {
    renderWithRouter(<App />);

    const detalhes = screen.getByRole('link', { name: /more Details/i });
    userEvent.click(detalhes);
    const det = screen.getByText(/pikachu Details/i);
    expect(det).toBeInTheDocument();
    expect(detalhes).not.toBeInTheDocument();
    const headi = screen.getByRole('heading', { name: /summary/i, level: 2 });
    expect(headi).toBeInTheDocument();
    const para = screen.getByText(/This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat/i);
    expect(para).toBeInTheDocument();
  });
  it('testa se existe um mapa', () => {
    renderWithRouter(<App />);

    const detalhes = screen.getByRole('link', { name: /more Details/i });
    userEvent.click(detalhes);

    screen.getByRole('heading', { name: /game locations of pikachu/i, level: 2 });
    screen.getByText(/Kanto Viridian Forest/i);
    screen.getByText(/Kanto Power Plant/i);

    const imagens = screen.getAllByRole('img', {
      name: /pikachu location/i,
    });
    expect(imagens[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(imagens[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
  it('testa se o usuario pode favoritar um pokemon na pagina de detalhes', () => {
    renderWithRouter(<App />);

    const detalhes = screen.getByRole('link', { name: /more Details/i });
    userEvent.click(detalhes);
    const checked = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(checked);
    expect(checked.checked).toBe(true);
    userEvent.click(checked);
    expect(checked.checked).toBe(false);
  });
});

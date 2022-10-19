import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { FavoritePokemons } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('testando o componente FavoritePokemons', () => {
  it('testa se exibe "No favorite Pokemon found"', () => {
    renderWithRouter(<FavoritePokemons />);

    const noFavorite = screen.getByText(/no favorite pokemon found/i);
    expect(noFavorite).toBeInTheDocument();
  });
  it('testa se exibe todos os cards favoritados', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => history.push('/pokemons/25'));
    const checa = await screen.findByRole('checkbox', { name: /pokémon favoritado\?/i,
    });
    expect(checa).toBeInTheDocument();
  });
});

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('testando o componente pokedex', () => {
  it('verifica se redenriza encountered pokemons', () => {
    renderWithRouter(<App />);

    const encounter = screen.getByRole('heading', { name: /encountered pokémons/i, level: 2 });
    expect(encounter).toBeInTheDocument();
  });
  it('verifica se exibe o proximo pokemon', () => {
    renderWithRouter(<App />);

    const primeiroPoke = screen.getByText(/pikachu/i);
    expect(primeiroPoke).toBeInTheDocument();

    const segundoPoke = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(segundoPoke).toBeInTheDocument();
    userEvent.click(segundoPoke);

    const pokem = screen.getByText(/charmander/i);
    expect(pokem).toBeInTheDocument();
  });
  it('Testa se tem botoes de filtro', () => {
    renderWithRouter(<App />);

    const tyButto = screen.getAllByTestId('pokemon-type-button');

    tyButto.map((elem) => screen.getByRole('button', { name: elem.innerHTML }));

    expect(tyButto).toHaveLength(7);
  });
  it('Verifica se aparece pokemons do mesmo tipo', () => {
    renderWithRouter(<App />);

    const butTypes = screen.getByRole('button', { name: /all/i });
    const butPsy = screen.getByRole('button', { name: /psychic/i });
    const butDrag = screen.getByRole('button', { name: /dragon/i });
    const butNext = screen.getByRole('button', { name: /próximo pokémon/i });

    userEvent.click(butPsy);
    const poke1 = screen.getByText(/alakazam/i);
    expect(poke1).toBeInTheDocument();
    userEvent.click(butNext);
    const poke2 = screen.getByText(/mew/i);
    expect(poke2).toBeInTheDocument();
    expect(butTypes).toBeInTheDocument();

    userEvent.click(butDrag);
    const poke3 = screen.getByText(/dragonair/i);
    expect(poke3).toBeInTheDocument();
    expect(butNext).toHaveAttribute('disabled');
    expect(butTypes).toBeInTheDocument();
  });

  it('Verifica contem botao reset de filtro', () => {
    renderWithRouter(<App />);

    const butType = screen.getByRole('button', { name: /all/i });
    const buttPsy = screen.getByRole('button', { name: /psychic/i });

    userEvent.click(buttPsy);
    const butPsy = screen.getByText('Alakazam');
    expect(butPsy).toHaveAttribute('data-testid', 'pokemon-name');
    expect(butPsy).toBeInTheDocument();

    userEvent.click(butType);
    const poke1 = screen.getByText('Pikachu');
    expect(poke1).toHaveAttribute('data-testid', 'pokemon-name');
    expect(poke1).toBeInTheDocument();
  });

  it('Verifica inicia com o filtro All', () => {
    renderWithRouter(<App />);

    const proximoPoke = screen.getByRole('button', { name: /próximo pokémon/i });

    userEvent.click(proximoPoke);
    const fire = screen.getByText('Charmander');
    expect(fire).toBeInTheDocument();
  });
});

import Styles from '@/styles/Home.module.css';
import Link from 'next/link';
import { useState } from 'react';

export async function getServerSideProps() {
  try {
    const data = await fetch('https://pokeapi.co/api/v2/pokemon');
    const pokemons = await data.json();

    const promises = await pokemons.results.map(async (pokemon) => {
      const dataPokemon = await fetch(`${pokemon.url}`);
      const pokemonDetail = await dataPokemon.json();
      return {
        name: pokemonDetail.name,
        id: pokemonDetail.id,
        image: pokemonDetail.sprites.front_default,
      };
    });

    const details = await Promise.all(promises);

    return {
      props: {
        details,
        next: pokemons.next,
        previous: pokemons.previous,
      },
    };
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error);
    return {
      props: {
        details: [],
        next: null,
        previous: null,
      },
    };
  }
}

export default function Home({
  details: initialDetails,
  next: initialNext,
  previous: initialPrevious,
}) {
  const [details, setNewDetails] = useState(initialDetails);
  const [nextPage, setNextPage] = useState(initialNext);
  const [backDetails, setPrevious] = useState(initialPrevious);

  const callPage = async (url) => {
    try {
      const data = await fetch(url);
      const pokemons = await data.json();

      const promises = await pokemons.results.map(async (pokemon) => {
        const dataPokemon = await fetch(`${pokemon.url}`);
        const pokemonDetail = await dataPokemon.json();
        return {
          name: pokemonDetail.name,
          id: pokemonDetail.id,
          image: pokemonDetail.sprites.front_default,
        };
      });
      const arrayDetails = await Promise.all(promises);
      setNewDetails(arrayDetails);
      setNextPage(pokemons.next);
      setPrevious(pokemons.previous);
    } catch (error) {
      console.error('Erro ao buscar dados da API:', error);
    }
  };

  return (
    <div className={Styles.background}>
      <section className={Styles.pokeContent}>
        <h1> PokeDex </h1>
        <div className={Styles.layout}>
          <ul className={Styles.ulPoke}>
            {details.map((pokemon) => (
              <li className={Styles.liPoke} key={`${pokemon.id}`}>
                <Link href={`/pokemon/${pokemon.id}`} aria-label={pokemon.name}>
                  <img
                    src={`${pokemon.image}`}
                    width={130}
                    height={130}
                    alt={`${pokemon.name} Image`}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={Styles.buttons}>
          {backDetails && (
            <button
              onClick={() => callPage(backDetails)}
              className={Styles.PokeButton}
              title="Return list Pokemons"
            >
              Return list
            </button>
          )}
          {nextPage && (
            <button
              onClick={() => callPage(nextPage)}
              className={Styles.PokeButton}
              title="More Pokemons"
            >
              More Pokemons
            </button>
          )}
        </div>
      </section>
    </div>
  );
}

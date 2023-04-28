import Styles from '@/styles/Home.module.css'
import Link from 'next/link'
import { useState } from 'react';

export async function getServerSideProps() {
  const data = await fetch('https://pokeapi.co/api/v2/pokemon');
  const pokemons = await data.json();

  const details = [];
  for(let e of pokemons.results) {
    const dataPokemon = await fetch(`${e.url}`);
    const pokemon = await dataPokemon.json();

    details.push({
      name: pokemon.name,
      id: pokemon.id,
      image: pokemon.sprites.front_default
    })
  }

  return {
    props: {
      details,
      next: pokemons.next,
      previous: pokemons.previous,
    },
  }
}

export default function Home({ details: initialDetails, next: initialNext, previous: initialPrevious }) {
  const [details, setNewDetails] = useState(initialDetails);
  const [nextPage, setNextPage] = useState(initialNext);
  const [backDetails, setPrevious] = useState(initialPrevious);

  const callPage = async (url) => {
    console.log(url)
    const data = await fetch(url);
    const pokemons = await data.json();
    const arrayDetails = [];

    for (let e of pokemons.results) {
      const dataPokemon = await fetch(`${e.url}`);
      const pokemon = await dataPokemon.json();
      arrayDetails.push({
        name: pokemon.name,
        id: pokemon.id,
        image: pokemon.sprites.front_default
      })
    }
    setNewDetails(arrayDetails);
    setNextPage(pokemons.next);
    setPrevious(pokemons.previous);
  }

  return (
    <div className={Styles.background}>
      <section className={Styles.pokeContent}>
        <h1> PokeDex </h1>
        <div className={Styles.layout}>
          <ul className={Styles.ulPoke}>
            {details.map((pokemon) => (
              <li className={Styles.liPoke} key={`${pokemon.id}`}>
                <Link href={`/pokemon/${pokemon.id}`} aria-label={pokemon.name}>
                  <img src={`${pokemon.image}`}
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
            <button onClick={() => callPage(backDetails)} className={Styles.PokeButton} title="Return list Pokemons" >
              Return list
            </button>
          )}
          {nextPage && (
            <button onClick={() => callPage(nextPage)} className={Styles.PokeButton} title="More Pokemons" >
              More Pokemons
            </button>
          )}
        </div>
      </section>
    </div>
  )
}

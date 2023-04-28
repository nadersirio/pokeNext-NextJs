import Styles from '../../styles/Pokedex.module.css'
import Link from 'next/link'
import { Background } from './Style'
import { getID, getTypeName } from './Helpers';

export async function getServerSideProps(context) {
  const { pokemonId } = context.params;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  const data = await res.json();

  return {
    props: { pokemon: {
      name: data.name,
      id: data.id,
      image: data.sprites.front_default,
      weight: data.weight,
      type: data.types,
    } },
  }
}

export default function Pokemon({ pokemon }) {
  const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  return (
      <Background type={getTypeName(pokemon.type)}>
        <section className={Styles.pokeContent}>
          <h1>{name}</h1>
          <div className={Styles.layout}>
            <img
              src={pokemon.image}
              width={300}
              height={300}
              alt={name}
            />
            <h2>Weight: {parseFloat(pokemon.weight / 10)} Kg</h2>
            <div className={Styles.typeLayout}>
              <h2>Type: </h2> {TypeRender(pokemon.type)}
            </div>
            <Link href={`/pokemon/${pokemon.id}/pokeDetails/${getID(pokemon.type)}`} title="More Details">
              <p>More Details...</p>
            </Link>
            <Link href="/" className={Styles.returnButton} title="Return to Home Page">
              Return
            </Link>
          </div>
        </section>
      </Background>
  )
}

export function TypeRender(types) {
  return (
    types.map((type) => (
      <img
        src={`/images/types/${type.type.name}.png`}
        width={60}
        height={30}
        alt={`${type.type.name} Type Image`}
      />
    ))
  )
}
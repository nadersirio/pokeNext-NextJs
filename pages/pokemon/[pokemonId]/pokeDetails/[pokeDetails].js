import Styles from '../../../../styles/pokeDetails.module.css'
import Link from 'next/link'

export async function getServerSideProps(context) {
  const { pokemonId } = context.params;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  const data = await res.json();

  let props = {
    details: {
      name: data.name,
      id: data.id,
      image: data.sprites.other['official-artwork'].front_default,
      shiny: data.sprites.other['official-artwork'].front_shiny,
      ability: data.abilities,
      weaknesses: [],
      strengths: [],
    },
  }

  const { pokeDetails } = context.params;
  const id = pokeDetails.split(',');
  for(const e of id) {
    const restype = await fetch(`https://pokeapi.co/api/v2/type/${e}`);
    const datatype = await restype.json();
    props.details.weaknesses.push(...datatype.damage_relations.double_damage_from);
    props.details.strengths.push(...datatype.damage_relations.double_damage_to);
  }

  return { props }
}

export default function Details({ details }) {
  const name = details.name.charAt(0).toUpperCase() + details.name.slice(1);

  return (
    <>
      <div className={Styles.background}>
        <div className={Styles.contentFather}>
          <h1>{name}</h1>
            <section className={Styles.detailsContent}>
              <img
                src={details.image}
                width={200}
                height={200}
                alt={`${details.name} Image`}
              />
              <div className={Styles.typesContent}>
                <section className={Styles.typeContentChild}>
                  <p>Weaknesses: </p>
                  {Loopstypes(details.weaknesses)}
                </section>
                <section className={Styles.typeContentChild}>
                  <p>Strengths: </p>
                  {Loopstypes(details.strengths)}
                </section>
              </div>
            </section>
            <section className={Styles.shinyLayout}>
              <img
                src={details.shiny}
                width={150}
                height={150}
                alt={`${details.name} Shiny Image`}
              />
              <h2>{name} Shiny Version</h2>
            </section>
          <Link href={`/pokemon/${details.id}`} className={Styles.returnButton} title="Return to Basic Pokemon info">
            Return
          </Link>
        </div>
      </div>
    </>
  )
}

export function Loopstypes( types ) {
  return (
    <ul key="oie" className={Styles.typesLayout}>
      {types.map((type) => {
        return (
          <li key={`${type.url}`}>
            <img
            src={`/images/types/${type.name}.png`}
            width={60}
            height={30}
            alt={`${type.name} Type Image`}
            />
          </li>
        )
      })}
    </ul>
  )
}
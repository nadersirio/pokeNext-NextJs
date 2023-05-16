import Link from "next/link"
import Image from "next/image"
import Styles from "../styles/Navbar.module.css"

export default function Navbar() {
  return (
    <nav className={Styles.navContent}>
      <div className={Styles.navLayout}>
        <Image src="/images/pokeball.png" width="100" height="100" alt="Pokeball Image"/>
        <h1>PokeNext</h1>
      </div>
      <ul className={Styles.navBar}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
      </ul>
    </nav>
  )
}
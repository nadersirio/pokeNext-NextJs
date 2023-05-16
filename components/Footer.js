import Styles from "../styles/Footer.module.css"

export default function Footer() {
  return (
    <footer className={Styles.footer}>
      <p><span className={Styles.footerText}>PokeNext</span> &copy; 2023</p>
    </footer>
  )
}
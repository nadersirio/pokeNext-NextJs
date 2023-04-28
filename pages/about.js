import Link from "next/link"
import Image from "next/image"
import Styles from "../styles/About.module.css"

export default function About() {
  return(
    <>
      <div className={Styles.background}>
        <section className={Styles.aboutContent}>
          <h1>About This Page</h1>
          <section className={Styles.aboutData}>
            <Image src="/images/charizard.png" width="200" height="200" alt="Charizard Image" /> <br />
            <h2>That Site has been created by Náder W. S. Sírio, with the purpose of learning the functionality of NextJS.</h2>
            <section className={Styles.accountsLayout}>
              <p>Here are my social networks: </p> <br />
              <a href="https://github.com/nadersirio" target="_blank">GitHub <img width={20} height={20} src="https://cdn-icons-png.flaticon.com/512/25/25231.png"></img></a>
              <a href="https://www.linkedin.com/mwlite/in/náder-wilk-silva-sírio-618334214" target="_blank">Linkedin <img width={20} height={20} src="https://www.pngmart.com/files/21/Linkedin-In-Logo-PNG-Isolated-Image.png" /></a>
              <a href="https://www.instagram.com/naderzyn/" target="_blank">Instagram <img width={20} height={20} src="https://www.pngmart.com/files/13/Instagram-Logo-PNG-Pic.png" /></a>
            </section>
            <Link href="/" className={Styles.returnButton} title="Return to Home Page">
              Return
            </Link>
          </section>
        </section>
      </div>
    </>
  )
}
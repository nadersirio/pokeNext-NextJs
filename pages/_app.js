import '@/styles/reset-css.css'
import '@/styles/global.css'
import Head from 'next/head'
import Layout from "./components/Layout"

export default function App({ Component, pageProps}) {
  return (
    <>
      <Head>
        <title>PokeNext Page</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
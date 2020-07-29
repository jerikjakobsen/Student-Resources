import '../styles/main.css'
import Navbar from '../components/navbar'
import Head from "next/head"

function MyApp({ Component, pageProps }) {
    return (
        <div style={{height: "100%"}}>
            <Head>
                    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap" rel="stylesheet" />
            </Head>
            <Navbar loggedIn = {false} accountName = {'go4johne'} userID = {1234} />
            <Component {...pageProps} /> 
            <style global jsx>
                {`
                    html,
                    body,
                    body > div:second-child,
                    div#__next,
                    div#__next > div,
                    div#__next > div > div {
                      height: 100%;
                    }
                `}
            </style>
        </div>

    )
  }
  
  export default MyApp
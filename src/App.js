
import './App.css';
import HomePage from './pages'
import "antd/dist/antd.dark.css"
import Helmet from "react-helmet";
function App() {
  return (
    <div className="App">
      <SEO/>
      <HomePage/>
    </div>
  );
}




const SEO=() => (

    <Helmet>
    <title>Covid Dashboard</title>

    {/* For Favicon */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
      href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColoir" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
   
   {/* Preloading */}
    <meta name="title" content="Coronavirus Outbreak around world: Latest Map and Case Count"/>
    <meta name="description" content="A volunteer-driven crowdsourced effort to track the coronavirus around world. A detailed country map shows the extent of the coronavirus outbreak, with data being avaliable from various date range for all countries" />
    <meta name="keywords" content="covid, covid19, covid-19, covid19india, coronavirus, corona, india, virus, pandemic, disease, carona, karona, korona"/>

    <link rel="preload" href="/fonts/archia-regular-webfont.ttf" as="font" type="font/ttf" crossorigin=""></link>
    <link rel="preload" href="/fonts/archia-regular-webfont.woff" as="font" type="font/woff" crossorigin=""></link>
    <link rel="preload" href="/fonts/archia-regular-webfont.woff2" as="font" type="font/woff2" crossorigin=""></link>

      
    {/* For Google Optimization */}
    <meta property="og:type" content="website"/>
    <meta property="og:url" content="https://bvn-covid19.netlify.app/"/>
    <meta property="og:title" content="Coronavirus Outbreak around world: Latest Map and Case Count"></meta>
    <meta property="og:description" content="A volunteer-driven crowdsourced effort to track the coronavirus around world. A detailed country map shows the extent of the coronavirus outbreak, with data being avaliable from various date range for all countries" />
    <meta property="og:keywords" content="covid, covid19, covid-19, covid19india, coronavirus, corona, india, virus, pandemic, disease, carona, karona, korona" />

    </Helmet>
  );

export default App;

import type { NextPage } from "next";
import Head from "next/head";
// import Link from 'next/link'
// import Image from 'next/image'

import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>another-pokedex</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main></main>
    </div>
  );
};

export default Home;

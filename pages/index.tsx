'use client;'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import ResponsiveAppBar from './components/appbar/appbar'
import RecipeReviewCard from './components/card/card'
import TemporaryDrawer from './components/drawer/drawer'
import AlignItemsList from './components/list/list'
import CardList from './components/cardList/cardList'
import Footer from './components/footer/footer'
import FixedBottomNavigation from './components/buttomNavigation/buttonNavigation'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>ちいかわかわいすぎぃぃぃぃ</title>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="theme-color" content="#a8a6a3" />
      </Head>
      <TemporaryDrawer></TemporaryDrawer>
      <ResponsiveAppBar></ResponsiveAppBar>
      <CardList></CardList>
      <FixedBottomNavigation></FixedBottomNavigation>
      <Footer></Footer>
      {/* <AlignItemsList></AlignItemsList> */}
    </div>
  )
}

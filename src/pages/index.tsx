import { useRef } from "react";
import Head from "next/head";
import Map from "ol/Map";
import styles from "@/styles/Home.module.css";
import { useMap } from "@/hooks/useMap";

const DISTANCE_TRAVELLED_IN_METERS = 3175718.52;

export default function Home() {
  const mapRef = useRef<null | Map>(null);
  useMap(mapRef, DISTANCE_TRAVELLED_IN_METERS);

  return (
    <>
      <Head>
        <title>Torchbox Treks</title>
        <meta
          name="description"
          content="A visualization of how far Torchbox has travelled this month."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Torchbox Treks 2023</h1>
          <p className={styles.stravaLink}>
            <strong>1973.3</strong> miles travelled.{" "}
            <a href="https://www.strava.com/clubs/torchboxtreks">
              View team on Strava
            </a>
          </p>
        </div>

        <div className={styles.map} id="mapDiv"></div>
      </main>
    </>
  );
}

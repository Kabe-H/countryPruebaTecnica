"use client";
import Search from "@/app/components/Search/Search";
import { useCountryData } from "@/hooks/useCountryData";
import { ICountry } from "@/models/interfaceCountyLocal";
import Typography from "@mui/material/Typography";
import dynamic from "next/dynamic";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const { paisesFiltrados } = useCountryData();
  const [filteredCountries, setFilteredCountries] = useState<ICountry[]>([]);
  const [bandera, setBandera] = useState<boolean>(false);

  const LazyMap = dynamic(() => import("@/app/components/Maps/Maps"), {
    ssr: false,
    loading: () => <p>Loading...</p>,
  });

  function handleSearch(value: string) {
    const normalizedValue = value.toLowerCase().trim();
    const filtered = paisesFiltrados?.filter((country: any) => {
      if (normalizedValue.length === 2) {
        return country.code.toLowerCase().includes(normalizedValue);
      } else {
        return (
          country.name.toLowerCase().includes(normalizedValue) ||
          country.continent.toLowerCase().includes(normalizedValue)
        );
      }
    });

    if (filtered?.length) {
      setFilteredCountries(filtered);
      setBandera(false);
    } else {
      setBandera(true);
    }
  }

  return (
    <main className={styles.componentePrincipal}>
      <Typography variant="h4" className={styles.tituloSecundario}>
        Prueba Tecnica de Paises
      </Typography>
      <section className={styles.sectionSecond}>
        <Search
          onSearch={handleSearch}
          filteredCountries={filteredCountries}
          bandera={bandera}
        />
      </section>
      <section className={styles.sectionSecond}>
        <Typography variant="h5" className={styles.tituloSecundario}>
          Mapa Interactivo
        </Typography>
        <LazyMap
          countries={
            filteredCountries.length > 0 ? filteredCountries : paisesFiltrados
          }
        />
      </section>
    </main>
  );
}

"use client";
import Search from "@/app/components/Search/Search";
import { useCountryData } from "@/hooks/useCountryData";
import { ICountry } from "@/models/interfaceCountyLocal";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Maps from "./components/Maps/Maps";
import styles from "./page.module.css";

export default function Home() {
  const { paisesFiltrados } = useCountryData();
  const [filteredCountries, setFilteredCountries] = useState<ICountry[]>([]);

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
    }
  }

  return (
    <main className={styles.componentePrincipal}>
      <Typography variant="h4" className={styles.tituloSecundario}>Prueba Tecnica de Paises</Typography>
      <section className={styles.sectionSecond}>
        <Search onSearch={handleSearch} />
      </section>
      <section className={styles.sectionSecond}>
        <Typography variant="h5" className={styles.tituloSecundario}>
          Mapa Interactivo
        </Typography>
        <Maps
          countries={
            filteredCountries.length > 0 ? filteredCountries : paisesFiltrados
          }
        />
      </section>
    </main>
  );
}

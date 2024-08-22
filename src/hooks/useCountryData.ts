import { useState, useEffect } from "react";
import { fetchData } from "@/api/countriesServices";
import countriesData from "@/json/countries.json";
import { ICountryAPI } from "@/models/interfaceCountryAPI";
import { ICountry } from "@/models/interfaceCountyLocal";

export function useCountryData() {
  const [paises, setPaises] = useState<ICountryAPI[]>([]);
  const [paisesFiltrados, setPaisesFiltrados] = useState<ICountry[]>([]);

  useEffect(() => {
    const getCountries = async () => {
      const getPaises = await fetchData();
      setPaises(getPaises);
    };
    getCountries();
  }, []);

  useEffect(() => {
    const array2Lookup = countriesData.reduce((acc: any, item: any) => {
      acc[item["ISO Code"]] = {
        Latitude: item.Latitude,
        Longitude: item.Longitude,
      };
      return acc;
    }, {});
    const combinedArray: ICountry[] = paises
      ?.map((item: any) => {
        const coordinates = array2Lookup[item.code] || {};
        return {
          name: item.name,
          code: item.code,
          continent: item.continent.name,
          Latitude: coordinates.Latitude,
          Longitude: coordinates.Longitude,
        };
      })
      .filter(
        (item: any) =>
          item.Latitude !== undefined && item.Longitude !== undefined
      );
    setPaisesFiltrados(combinedArray);
  }, [paises]);

  return { paisesFiltrados };
}

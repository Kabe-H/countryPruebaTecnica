import { GET_COUNTRIES } from "@/graphql/querys";
import { ICountryAPI } from "@/models/interfaceCountryAPI";

export const fetchData = async (): Promise<ICountryAPI[]> => {
  try {
    const response = await fetch("https://countries.trevorblades.com/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: GET_COUNTRIES }),
    });

    if (!response.ok) {
      throw new Error("Error al hacer fetch data desde la API");
    }

    const { data } = await response.json();
    return data.countries;
  } catch (error) {
    console.error("Error al hacer fetch data:", error);
    throw error;
  }
};

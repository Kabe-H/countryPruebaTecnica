interface IContinent {
  name: string;
}

export interface ICountryAPI {
  name: string;
  code: string;
  continent: IContinent;
}



import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import styles from "./Search.module.css";

interface SearchProps {
  onSearch: (value: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }: SearchProps) => {
  const [query, setQuery] = useState<string>("");

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <Grid
      container
      spacing={2}
      component="section"
      className={styles.containerPrincipaSearch}
    >
      <Grid item xs={12}>
        <TextField
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ingrese búsqueda..."
          className={styles.textfieldSearch}
        />
      </Grid>
      <Grid item xs={12} component="section">
        <Button variant="contained" onClick={handleSearch}>
          Buscar
        </Button>
      </Grid>
    </Grid>
  );
};

export default Search;

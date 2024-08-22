import { ICountry } from "@/models/interfaceCountyLocal";
import { IDialog } from "@/models/interfaceMiDialog";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import MiDialog from "../MiDialog/MiDialog";
import styles from "./Search.module.css";

interface SearchProps {
  onSearch: (value: string) => void;
  filteredCountries: ICountry[];
  bandera: boolean
}

const Search: React.FC<SearchProps> = ({
  onSearch,
  filteredCountries,
  bandera
}: SearchProps) => {
  const [query, setQuery] = useState<string>("");
  const [viewQuery, setViewQuery] = useState<string>("");
  const [openDialog, setOpenDialog] = useState<IDialog>({
    open: false,
    title: "",
    message: "",
    typeMessage: "alert",
    action: [],
  });

  useEffect(() => {
    if (bandera) {
      setOpenDialog({
        open: true,
        title: "Error",
        message: "No se encontro código, país o continete.",
        action: [
          {
            text: "Aceptar",
            color: "primary",
            variant: "contained",
            onClick: () => {
              setOpenDialog({ ...openDialog, open: false });
            },
          },
        ],
      });
    }
  }, [bandera]);

  const onClickSearch = () => {
    onSearch(query);
    setViewQuery(query);
    setQuery("");
  };

  const onClickViewAll = () => {
    onSearch("");
    setViewQuery("");
  };

  return (
    <Grid
      container
      spacing={2}
      component="section"
      className={styles.containerPrincipaSearch}
    >
      <MiDialog
        open={openDialog.open}
        typeMessage={openDialog.typeMessage}
        title={openDialog.title}
        message={openDialog.message}
        actions={openDialog.action}
      />
      <Grid item xs={12}>
        <TextField
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ingrese búsqueda..."
          className={styles.textfieldSearch}
        />
      </Grid>
      {viewQuery && (
        <Grid item xs={12}>
          <Typography>Usted busco: {viewQuery}</Typography>
        </Grid>
      )}
      <Grid item xs={6} component="section">
        <Button variant="contained" onClick={onClickSearch} disabled={!query}>
          Buscar
        </Button>
      </Grid>
      <Grid item xs={6} component="section">
        <Button variant="contained" onClick={onClickViewAll}>
          Ver Todos
        </Button>
      </Grid>
    </Grid>
  );
};

export default Search;

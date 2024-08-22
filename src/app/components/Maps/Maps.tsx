import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ICountry } from "@/models/interfaceCountyLocal";
import styles from "./Maps.module.css";

const Maps = (props: { countries?: ICountry[] }) => {
  const myIcon = L.icon({
    iconUrl: "pin.png",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  return (
    <section className={styles.containerPrincipalMap}>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        className={styles.containerMap}
        dragging={false}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {props.countries?.map((country) => (
          <Marker
            key={country.code}
            position={[country.Latitude, country.Longitude]}
            icon={myIcon}
          >
            <Popup>{country.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </section>
  );
};

export default Maps;

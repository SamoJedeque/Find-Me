import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { io } from "socket.io-client";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import api from "../services/api";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL(
    "leaflet/dist/images/marker-icon-2x.png",
    import.meta.url
  ).href,
  iconUrl: new URL(
    "leaflet/dist/images/marker-icon.png",
    import.meta.url
  ).href,
  shadowUrl: new URL(
    "leaflet/dist/images/marker-shadow.png",
    import.meta.url
  ).href,
});

const myIcon = new L.Icon({
  iconUrl: "/user.png",
  iconSize: [30, 30],
  iconAnchor: [20, 20],
  popupAnchor: [0, -40]
});

const otherIcon = new L.Icon({
  iconUrl: "/other.png",
  iconSize: [30, 30],
  iconAnchor: [20, 20],
  popupAnchor: [0, -40]
});

const socket = io("http://localhost:3000"); // URL do backend

export default function Dashboard() {

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [myPosition, setMyPosition] = useState(null);
  const [myId, setMyId] = useState(null);
  

  useEffect(() => {

    socket.on("conetar", () =>{
      setMyId(socket.id);
    });

  if (!navigator.geolocation) {
    console.log("Geolocalização não suportada");
    return;
  }

  const watchId = navigator.geolocation.watchPosition(
    (position) => {

      const coords = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };

      console.log("Localização:", coords);

      setMyPosition([coords.latitude, coords.longitude]);

      socket.emit("updateLocation", coords);
      console.log(coords)
    },
    (error) => {
      console.error("Erro de geolocalização:", error);
    }
  );

  async function  loadUser() {
    try {
      const response = await api.get("/user/me");
      setUser(response.data);
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        
      }
    } catch (error) {
      console.log(error)
    }
  }

  socket.on("usersLocations", (data) => {
    setUsers(
      Object.entries(data)
      .filter(([id]) => id !== socket.id)
      .map(([_, user]) => user)
    );
  });

  return () => {
    navigator.geolocation.clearWatch(watchId);
    socket.off("usersLocations");
  };

  loadUser();

  console.log(user.name);

}, []);

  if (!myPosition) {
    return <p>Carregando mapa...</p>;
  }

  return (
    <div style={{ height: "100vh" }}>
      <MapContainer
      key={myPosition?.join(",")}
        center={myPosition}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Sua posição */}
        <Marker position={myPosition} icon={myIcon}>
          <Popup> latitude {myPosition[0]}, longetude{myPosition[1]}</Popup>
          
        </Marker>

        {/* Outros usuários */}
        {users.map((user, index) => (
          <Marker
            key={index}
            position={[user.latitude, user.longitude]}
            icon={otherIcon}
          >
            <Popup>latitude {position[0]}, longetude{position[1]}</Popup>
          </Marker>
        ))}

      </MapContainer>
    </div>
  );
}
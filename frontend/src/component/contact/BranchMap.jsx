

import { MapContainer, TileLayer, Marker, Popup, Polyline, Tooltip, useMap, LayersControl, useMapEvents } from "react-leaflet";
import { useState, useEffect } from "react";
import { getDistance } from "geolib";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FaLocationDot } from "react-icons/fa6";

// --- CUSTOM ICONS ---
const branchIcon = new L.DivIcon({
  className: "custom-branch-icon",
  html: `
    <div class="relative flex items-center justify-center">
      <span class="absolute w-10 h-10 bg-blue-400 rounded-full animate-ping opacity-40"></span>
      <img src="https://cdn-icons-png.flaticon.com/512/2776/2776067.png" class="w-9 h-9 animate-bounce drop-shadow-xl" />
    </div>
  `,
  iconSize: [38, 38],
  iconAnchor: [19, 38],
});

const userIcon = new L.DivIcon({
  className: "custom-user-icon",
  html: `
    <div class="relative flex items-center justify-center">
      <span class="absolute w-8 h-8 bg-red-500 rounded-full animate-ping opacity-50"></span>
    <img 
      src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
      class="w-7 h-7 drop-shadow-lg"
      style="filter:hue-rotate(200deg) saturate(3);"
      />
    </div>
  `,
  iconSize: [35, 35],
  iconAnchor: [17, 35],
});


// --- BRANCHES ---


const branches = [
  {
    name: "Webtech - Bhayander", address: "Near Bhayander Railway Station", lat: 19.307873804399,
    lng: 72.84968324913149
  },
  {
    name: "Uttan Village Branch", address: "Uttan, Thane, Mumbai", lat: 19.280443728850532,
    lng: 72.78591547161655
  },
];

// --- FLY TO NEAREST ---
function FlyToNearest({ positions }) {
  const map = useMap();
  useEffect(() => {
    if (positions?.length) {
      map.fitBounds(positions, { padding: [70, 70], animate: true, duration: 1.5 });
    }
  }, [positions, map]);
  return null;
}

function FlyToAllMarkers({ userPosition }) {
  const map = useMap();
  useEffect(() => {
    const positions = branches.map(b => [b.lat, b.lng]);
    if (userPosition) positions.push(userPosition);
    if (positions.length) {
      map.fitBounds(positions, { padding: [50, 50], animate: true });
    }
  }, [userPosition, map]);
  return null;
}

// --- MAP CLICK HANDLER ---
function MapClick({ onClick }) {
  useMapEvents({
    click: (e) => {
      onClick(e.latlng);
    },
  });
  return null;
}

// --- MAIN COMPONENT ---
export default function BranchMap() {
  const [userPosition, setUserPosition] = useState(null);
  const [nearestBranch, setNearestBranch] = useState(null);

  // --- FIND NEAREST BRANCH ---
  const findNearestBranch = (lat, lng) => {
    const distances = branches.map(branch => ({
      ...branch,
      distance: (getDistance({ latitude: lat, longitude: lng }, { latitude: branch.lat, longitude: branch.lng }) / 1000).toFixed(2)
    }));
    setNearestBranch(distances.sort((a, b) => a.distance - b.distance)[0]);
  };

  // --- MAP CLICK HANDLER ---
  const handleMapClick = ({ lat, lng }) => {
    setUserPosition([lat, lng]);
    findNearestBranch(lat, lng);
  };


  const openDirections = (lat, lng) => {

    if (userPosition) {

      const [userLat, userLng] = userPosition;

      const url = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${lat},${lng}&travelmode=driving`;

      window.open(url, "_blank");

    } else {

      // branch location proper pin ke sath open hogi
      const url = `https://www.google.com/maps/place/${lat},${lng}`;

      window.open(url, "_blank");
    }
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto bg-white sm:bg-gray-50 p-4 rounded-2xl shadow-2xl border border-gray-200 font-sans">

      {/* Header / Instruction */}
      <div className="flex flex-col mb-4 gap-2 bg-white p-4 rounded-xl shadow-sm border border-gray-100 ">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-900 flex items-center uppercase  gap-2">
          <span className="animate-pulse ">*</span> Find Nearest Institute
        </h2>
        <p className="text-green-950 text-sm sm:text-base font-semibold">
          Select your location by clicking on the map. Your nearest branch will be shown instantly.
        </p>
      </div>

      {/* Map */}
      <div className="relative w-full overflow-hidden rounded-2xl border-4 border-white shadow-2xl">
        <MapContainer center={[19.311, 72.8536]} zoom={12.4} minZoom={10} className="w-full h-[400px] z-10">
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="Standard Map">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="© Map" />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Satellite View">
              <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
            </LayersControl.BaseLayer>
          </LayersControl>

          {/* Map click */}
          <MapClick onClick={handleMapClick} />

          {/* Branch Markers */}
          {branches.map((b, i) => (
            <Marker key={i} position={[b.lat, b.lng]} icon={branchIcon}>
              <Popup>
                <strong>{b.name}</strong><br />{b.address}<br />
                <button
                  onClick={() => openDirections(b.lat, b.lng)}
                  className="mt-2  text-blue-900   text-sm cursor-pointer"
                >
                  {userPosition ? " Get Directions" : " View Location"}
                </button>
                {/* <a href={`https://www.google.com/maps/dir/?api=1&destination=${b.lat},${b.lng}`} target="_blank" rel="noreferrer" className="block mt-1 text-blue-600">Get Directions</a> */}
              </Popup>
              <Tooltip>{b.name}</Tooltip>
            </Marker>
          ))}

          {/* User Marker & Polyline */}
          {userPosition && (
            <>
              <Marker position={userPosition} icon={userIcon}>
                <Popup>Your location</Popup>
              </Marker>

              {nearestBranch && (
                <>
                  <Polyline positions={[userPosition, [nearestBranch.lat, nearestBranch.lng]]} color="blue" dashArray="10,10" weight={4} />
                  {userPosition && <FlyToAllMarkers userPosition={userPosition} />}
                  <FlyToNearest positions={[userPosition, [nearestBranch.lat, nearestBranch.lng]]} />
                </>
              )}
            </>
          )}
        </MapContainer>

        {/* Floating Info */}
        {nearestBranch && (
          <div className="absolute bottom-4 left-2 right-2 sm:left-6 sm:right-auto z-[100] bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-2xl border-l-8 border-green-500">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg text-xl">🏛️</div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Nearest Location</p>
                <h3 className="text-sm sm:text-lg font-extrabold text-gray-800">{nearestBranch.name}</h3>
                {/* <p className="text-blue-600 font-black text-xs sm:text-base">{nearestBranch.distance} km from you</p> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
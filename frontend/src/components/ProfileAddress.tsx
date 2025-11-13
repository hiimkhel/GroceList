import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { getUserId } from "../utils/authUtils";

const API_BASE = import.meta.env.VITE_API_BASE;

// Fix for missing marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const ProfileAddress: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [address, setAddress] = useState("");
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const defaultPosition: [number, number] = [14.5995, 120.9842]; // Manila

  const userId = getUserId();

  // Geocode text → coordinates
  const geocodeAddress = async (query: string) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        query
      )}`
    );
    const data = await res.json();
    if (data.length > 0) {
      const { lat, lon, display_name } = data[0];
      setPosition([parseFloat(lat), parseFloat(lon)]);
      setAddress(display_name);
    } else {
      alert("Address not found. Try refining your input.");
    }
  };

  // Reverse geocode coordinates → address
  const reverseGeocode = async (lat: number, lon: number) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
    );
    const data = await res.json();
    if (data.display_name) setAddress(data.display_name);
  };

  // Send to backend
  const saveAddress = async () => {
    if (!address || !position) {
      alert("Please select a valid address and location on the map.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `${API_BASE}/api/users/${userId}/address`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            // Add Authorization header if your route is protected
            // Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            address,
            latitude: position[0],
            longitude: position[1],
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setMessage("✅ Address updated successfully!");
        setIsEditing(false);
      } else {
        setMessage(`❌ ${data.message || "Failed to update address"}`);
      }
    } catch (error) {
      setMessage("⚠️ Network error — please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Marker interactions
  function LocationMarker() {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        reverseGeocode(e.latlng.lat, e.latlng.lng);
      },
    });

    return position ? (
      <Marker
        position={position}
        draggable={true}
        eventHandlers={{
          dragend: (e) => {
            const latlng = e.target.getLatLng();
            setPosition([latlng.lat, latlng.lng]);
            reverseGeocode(latlng.lat, latlng.lng);
          },
        }}
      />
    ) : null;
  }

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-xl font-semibold mb-3">📍 Address</h2>

      {!isEditing ? (
        <div className="flex flex-col flex-1">
          <p className="text-gray-700 flex-1">
            {address || "No address added yet."}
          </p>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 self-start"
          >
            Edit Address
          </button>
        </div>
      ) : (
        <div className="flex flex-col flex-1">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter address"
            className="border px-3 py-2 rounded-lg mb-3"
          />
          <button
            onClick={() => geocodeAddress(address)}
            className="mb-3 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 self-start"
          >
            Search
          </button>

          <div className="flex-1 mb-3">
            <MapContainer
              center={position || defaultPosition}
              zoom={13}
              style={{
                height: "300px",
                width: "100%",
                borderRadius: "0.75rem",
              }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <LocationMarker />
            </MapContainer>
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={saveAddress}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>

          {message && <p className="mt-3 text-sm text-gray-700">{message}</p>}
        </div>
      )}
    </div>
  );
};

export default ProfileAddress;

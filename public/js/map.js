// GeoJSON → Leaflet (lat, lng)
const lat = coordinates[1];
const lng = coordinates[0];

const map = L.map("map").setView([lat, lng], 10);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

L.marker([lat, lng]).addTo(map).bindPopup("Listing Location").openPopup();

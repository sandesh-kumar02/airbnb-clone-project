// import fetch from "node-fetch";

const geoCode = async (location) => {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    location
  )}`;

  const res = await fetch(url, {
    headers: {
      "User-Agent": "your-app-name",
    },
  });

  const data = await res.json();

  if (!data || data.length === 0) {
    throw new Error("Location not found");
  }

  const lat = parseFloat(data[0].lat);
  const lng = parseFloat(data[0].lon);

  return [lng, lat]; // MongoDB format
};

export default geoCode;

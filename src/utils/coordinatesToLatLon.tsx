function coordinatesToLatLon(coordinates: string) {
  const latLng = coordinates?.split(',');
  if (latLng.length > 0) {
    return { lat: Number(latLng[0]), lon: Number(latLng[1]) };
  }
  return { lat: null, lon: null };
}

export default coordinatesToLatLon;

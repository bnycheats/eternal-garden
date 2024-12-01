import { LatLngLiteral } from 'leaflet';
import { computeDestinationPoint } from 'geolib';

// Helper function to convert degrees to radians
const toRadians = (degrees: number): number => (degrees * Math.PI) / 180;

// Helper function to rotate a point around a center
const rotatePoint = (point: LatLngLiteral, center: LatLngLiteral, angle: number): LatLngLiteral => {
  const angleRad = toRadians(angle);

  // Convert lat/lng to Cartesian coordinates relative to the center
  const x = point.lng - center.lng;
  const y = point.lat - center.lat;

  // Apply the rotation matrix
  const xRotated = x * Math.cos(angleRad) - y * Math.sin(angleRad);
  const yRotated = x * Math.sin(angleRad) + y * Math.cos(angleRad);

  // Convert back to lat/lng
  return {
    lat: center.lat + yRotated,
    lng: center.lng + xRotated,
  };
};

// Function to create a rotated bounding box
const createBoundsFromCenter = (
  center: LatLngLiteral,
  length: number,
  width: number,
  angle: number,
): LatLngLiteral[] => {
  // Calculate the north and south points (vertical direction)
  const north = computeDestinationPoint({ latitude: center.lat, longitude: center.lng }, length / 2, 0); // 0° (north)
  const south = computeDestinationPoint({ latitude: center.lat, longitude: center.lng }, -length / 2, 0); // 180° (south)

  // Calculate the east and west points (horizontal direction)
  const northeast = computeDestinationPoint(north, width / 2, 90); // 90° (east)
  const northwest = computeDestinationPoint(north, -width / 2, 90); // 270° (west)
  const southeast = computeDestinationPoint(south, width / 2, 90); // 90° (east)
  const southwest = computeDestinationPoint(south, -width / 2, 90); // 270° (west)

  // Rotate all points around the center by the specified angle
  const rotatedBounds = [
    rotatePoint({ lat: northwest.latitude, lng: northwest.longitude }, center, angle),
    rotatePoint({ lat: northeast.latitude, lng: northeast.longitude }, center, angle),
    rotatePoint({ lat: southeast.latitude, lng: southeast.longitude }, center, angle),
    rotatePoint({ lat: southwest.latitude, lng: southwest.longitude }, center, angle),
  ];

  return rotatedBounds;
};

export default createBoundsFromCenter;

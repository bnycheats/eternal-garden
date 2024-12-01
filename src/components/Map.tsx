import createBoundsFromCenter from '@/utils/createBoundsFromCenter';
import { LatLngTuple, PathOptions } from 'leaflet';
import { MapContainer, TileLayer, Polygon } from 'react-leaflet';

export function Map(props: MapProps) {
  const { center = [7.31805, 125.662755], positions } = props;

  return (
    <MapContainer center={center} zoom={19} scrollWheelZoom={true} className="h-full w-full">
      <TileLayer
        attribution='<a href="https://github.com/tomchadwin/qgis2web" target="_blank">qgis2web</a> &middot; <a href="https://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> &middot; <a href="https://qgis.org">QGIS</a>'
        url="http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}"
        maxZoom={19}
      />
      {positions.map((item, index) => {
        if (!item.coordinates || !item.length || !item.width) return null;
        const position = item.coordinates.split(',');
        return (
          <Polygon
            key={index}
            positions={createBoundsFromCenter(
              { lat: Number(position[0]), lng: Number(position[1]) },
              item.length ?? 0,
              item.width ?? 0,
              item.angle ?? 0,
            )}
            pathOptions={item.pathOptions}
          />
        );
      })}
    </MapContainer>
  );
}

type MapProps = {
  center?: LatLngTuple;
  positions: Array<Position>;
};

type Position = {
  id: string;
  coordinates: string | null;
  pathOptions: PathOptions;
  length: number;
  width: number;
  angle: number;
};

export default Map;

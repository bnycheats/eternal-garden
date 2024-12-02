import coordinatesToLatLon from '@/utils/coordinatesToLatLon';
import createBoundsFromCenter from '@/utils/createBoundsFromCenter';
import { latLngBounds, LatLngExpression, LatLngTuple, LeafletEventHandlerFnMap, PathOptions } from 'leaflet';
import { memo, useEffect } from 'react';
import { MapContainer, TileLayer, Polygon, useMap } from 'react-leaflet';

export function Map(props: MapProps) {
  const { center = [7.31805, 125.662755], positions } = props;
  return (
    <MapContainer className="h-full w-full" center={center} zoom={21} scrollWheelZoom={true}>
      <TileLayer
        attribution='<a href="https://github.com/tomchadwin/qgis2web" target="_blank">qgis2web</a> &middot; <a href="https://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> &middot; <a href="https://qgis.org">QGIS</a>'
        url="http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}"
        maxZoom={21}
      />
      {positions.map((item, index) => {
        if (!item.coordinates || !item.length || !item.width) return null;
        const latLon = coordinatesToLatLon(item.coordinates);
        const { lat, lon } = latLon;
        if (!lat || !lon) return null;
        return (
          <Polygon
            key={index}
            positions={createBoundsFromCenter({ lat, lng: lon }, item.length ?? 0, item.width ?? 0, item.angle ?? 0)}
            pathOptions={item.pathOptions}
            eventHandlers={item.eventHandlers}
          />
        );
      })}
      <FitBounds
        positions={positions?.reduce((newItem: Array<LatLngExpression>, item) => {
          const latLon = coordinatesToLatLon(item.coordinates ?? '');
          const { lat, lon } = latLon;
          if (!lat || !lon) return newItem;
          return [...newItem, { lat, lng: lon }];
        }, [])}
      />
    </MapContainer>
  );
}

const FitBounds = (props: FitBoundsProps) => {
  const { positions } = props;
  const map = useMap();

  useEffect(() => {
    if (positions.length) {
      const bounds = latLngBounds(positions);
      map.fitBounds(bounds, { padding: [100, 100] });
    }
  }, [positions]);

  return null;
};

type MapProps = {
  center?: LatLngTuple;
  positions: Array<Position>;
};

type Position = {
  id: string;
  coordinates: string | null;
  length: number;
  width: number;
  angle: number;
  pathOptions: PathOptions;
  eventHandlers?: LeafletEventHandlerFnMap;
};

type FitBoundsProps = {
  positions: Array<LatLngExpression>;
};

export default memo(Map);

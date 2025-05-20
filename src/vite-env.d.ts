
/// <reference types="vite/client" />

// Explicitly declare module types for leaflet and react-leaflet
declare module 'leaflet' {
  export * from 'leaflet';
}

declare module 'react-leaflet' {
  import * as L from 'leaflet';
  
  export interface MapContainerProps extends React.HTMLAttributes<HTMLElement> {
    center: L.LatLngExpression;
    zoom: number;
    style?: React.CSSProperties;
    [key: string]: any;
  }
  
  export const MapContainer: React.FC<MapContainerProps>;
  export const TileLayer: React.FC<any>;
  export const Marker: React.FC<any>;
  export const Popup: React.FC<any>;
}

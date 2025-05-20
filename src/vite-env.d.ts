
/// <reference types="vite/client" />

// Explicitly declare module types for leaflet
declare module 'leaflet' {
  const icon: (options: any) => any;
  interface Marker {
    prototype: {
      options: {
        icon: any;
      };
    };
  }
  const Marker: Marker;
  export { icon, Marker };
  export * from 'leaflet';
}

// Declare react-leaflet module
declare module 'react-leaflet' {
  import { FC, HTMLAttributes } from 'react';
  import * as L from 'leaflet';
  
  export interface MapContainerProps extends HTMLAttributes<HTMLElement> {
    center: L.LatLngExpression;
    zoom: number;
    style?: React.CSSProperties;
    [key: string]: any;
  }
  
  export const MapContainer: FC<MapContainerProps>;
  export const TileLayer: FC<any>;
  export const Marker: FC<any>;
  export const Popup: FC<any>;
}

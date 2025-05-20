
/// <reference types="vite/client" />

// Make TypeScript aware of Leaflet module
declare module 'leaflet' {
  export * from 'leaflet';
}

// Make TypeScript aware of react-leaflet module
declare module 'react-leaflet' {
  export * from 'react-leaflet';
}

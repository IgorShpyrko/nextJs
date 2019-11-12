import React, { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';

import mapService from '../../services/maps';

// @ts-ignore
const TilesMap: React.ComponentType<{style}> = dynamic(() => import('./Mapbox').then(mod => mod.default), {
  loading: () => <div>loading...</div>,
  ssr: false,
});

// @ts-ignore
const Marker: React.ComponentType<{style, coordinates, key?}> = dynamic(() => import('./Mapbox').then(mod => mod.Marker), {
  loading: () => <div>loading...</div>,
  ssr: false,
});

const Cluster: React.ComponentType<any> = dynamic(() => import('./Mapbox').then(mod => mod.Cluster), {
  loading: () => <div>loading...</div>,
  ssr: false,
});

const ZoomControl: React.ComponentType<{position, className}> = dynamic(() => import('./Mapbox').then(mod => mod.ZoomControl), {
  loading: () => <div>loading...</div>,
  ssr: false,
});

const Map = () => {
  const featuresRef = useRef(null);
  const mapStylesRef = useRef(null);
  useEffect(
    () => {
      mapService.getStyles()
        .then(data => {
          console.log('data :', data);
          mapStylesRef.current = data.data
        })
    },
    []
  );

  const clusterMarker = (coordinates) => (
    <Marker coordinates={coordinates} style={{ zIndex: 9 }}>
      <div>C</div>
    </Marker>
  );

  if (!mapStylesRef.current || mapStylesRef.current === null) return null;

  return (
    <div style={{width: '300px', height: '300px'}}>
      <TilesMap style={mapStylesRef.current}>
        <ZoomControl position="bottom-right" className="map-tiles-zoom-control" />
        <Cluster ClusterMarkerFactory={clusterMarker}>
          {
            featuresRef
            && featuresRef !== null
            && featuresRef.current
            && featuresRef.current !== 'undefined'
            && Array.isArray(featuresRef.current)
            && featuresRef.current.map((feature, key) =>
              <Marker
                key={key}
                style={{ zIndex: 9 }}
                coordinates={feature.geometry.coordinates}
                // onClick={onMarkerClick(feature.geometry.coordinates)}
              >
                <div>M</div>
              </Marker>
            )
          }
        </Cluster>
      </TilesMap>
    </div>
  )
};

export default Map;

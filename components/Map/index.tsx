import React, { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Marker, Cluster, ZoomControl } from "react-mapbox-gl";

// @ts-ignore
const TilesMap = dynamic(() => import('./Mapbox'), {
  loading: () => <div>loading...</div>,
  ssr: false,
});

const Map = () => {
  const featuresRef = useRef(null);
  const mapRef = useRef(null);
  useEffect(
    () => {
      if (window && mapRef.current === 'undefined') {
        mapRef.current = TilesMap;
      }
    },
    []
  );

  const clusterMarker = (coordinates) => (
    <Marker coordinates={coordinates} style={{ zIndex: 9 }}>
      <div>C</div>
    </Marker>
  );

  return (
    <div style={{width: '300px', height: '300px'}}>
      <TilesMap style='https://map.roomster.com/styles/osm-bright/style.json?key=oxQ5YeTFJ13jkTv9eIN9pB67cKSSFhsV'>
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

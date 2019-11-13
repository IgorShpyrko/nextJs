import React, { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import useStyles from './styles';

import mapService, { Sort, ServiceType } from '../../services/maps';

// @ts-ignore
const TilesMap: React.ComponentType<{style, className}> = dynamic(() => import('./Mapbox').then(mod => mod.default), {
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
  const classes = useStyles({});
  const mapStylesRef = useRef(null);
  const mapMarkersRef = useRef(null);
  const [, setTmp] = useState(0);

  const forseUpdate = () => {
    setTmp(i => i + 1);
  };

  useEffect(
    () => {
      mapService.getStyles()
        .then(data => {
          if (!mapStylesRef.current || mapStylesRef.current === null) {
            mapStylesRef.current = data;
            forseUpdate();
          }
        })
    },
    []
  );

 

  useEffect(
    () => {
       // Hardcoded for now
      const search_params = {
        page_number: 1,
        service_type: ServiceType.haveShare,
        sort: Sort.lastActivity,
        age: {
          min: 18,
        }
      }

      mapService.getMarkers({search_params})
        .then(data => {
          mapMarkersRef.current = data;
          forseUpdate();
        })
    },
    [{/* listen to map location change*/}]
  )

  const clusterMarker = (coordinates) => (
    <Marker coordinates={coordinates} style={{ zIndex: 9 }}>
      <div>C</div>
    </Marker>
  );

  if (!mapStylesRef.current || mapStylesRef.current === null) return null;

  
  return (
    <div id="container" style={{width: '300px', height: '300px'}}>
      <TilesMap
        className={classes.root}
        style={mapStylesRef.current.data}>
        <ZoomControl position="bottom-right" className="map-tiles-zoom-control" />
        {/* <Cluster ClusterMarkerFactory={clusterMarker}> */}
          {/* {
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
          } */}
        {/* </Cluster> */}
      </TilesMap>
    </div>
  )
};

export default Map;

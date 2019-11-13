import React, { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import useStyles from './styles';
import { Map as ReactMapboxGlMap, Marker as ReactMapboxGlMarker} from 'react-mapbox-gl';

import mapService, { Sort, ServiceType } from '../../services/maps';

// @ts-ignore
const TilesMap: ReactMapboxGlMap = dynamic(() => import('./Mapbox').then(mod => mod.default), {
  loading: () => <div>loading...</div>,
  ssr: false,
});

// @ts-ignore
const Marker: ReactMapboxGlMarker = dynamic(() => import('./Mapbox').then(mod => mod.Marker), {
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

  const forceUpdate = () => {
    setTmp(i => i + 1);
  };

  useEffect(
    () => {
      if (!mapStylesRef.current || mapStylesRef.current === null) {
        mapService.getStyles()
          .then(data => {
            if (!mapStylesRef.current || mapStylesRef.current === null) {
              mapStylesRef.current = data;
              forceUpdate();
            }
          })
      }
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
        },
        page_size: 50
      }
      if (!mapMarkersRef.current || mapMarkersRef.current === null) {
      console.log('fetch markers')
        mapService.getMarkers({search_params})
          .then(data => {
            mapMarkersRef.current = data;
            forceUpdate();
          })

      }
    },
    []
  )

  const clusterClick = (coordinates, pointCount, getLeaves) => {
    console.log('coordinates :', coordinates);
    console.log('pointCount :', pointCount);
    console.log('getLeaves :', getLeaves);
  }

  const clusterMarker = (
    coordinates: GeoJSON.Position,
    pointCount: number,
    getLeaves: (
      limit?: number,
      offset?: number
    ) => Array<React.ReactElement<any>>
  ) => {
    return (
      <Marker
        key={coordinates.toString()}
        coordinates={coordinates}
        style={{ zIndex: 9, width: '20px', height: '20px', backgroundColor: '#F00'}}
        onClick={() => clusterClick(coordinates, pointCount, getLeaves)}
      >
        <div>{'pointCount'}</div>
      </Marker>
    )
  };

  const onMarkerClick = (coordinates) => {
    console.log('coordinates :', coordinates);
  }

  if (!mapStylesRef.current || mapStylesRef.current === null) return null;
  if (!mapMarkersRef.current || mapMarkersRef.current === null) return null;

  console.log('mapMarkersRef.current :', mapMarkersRef.current);
  return (
    <div id="container" style={{width: '300px', height: '300px'}}>
      <TilesMap
        className={classes.root}
        style={mapStylesRef.current.data}
        zoom={[3]}
        >
        <ZoomControl position="bottom-right" className="map-tiles-zoom-control" />
        <Cluster ClusterMarkerFactory={clusterMarker} radius={32}>
          {
            mapMarkersRef.current && 
            mapMarkersRef.current.data && 
            mapMarkersRef.current.data.items.map((feature, key) =>
              <Marker
                key={key}
                style={{ zIndex: 9, width: '20px', height: '20px', backgroundColor: '#F00'}}
                coordinates={[feature.listing.geo_location.lng, feature.listing.geo_location.lat]}
                onClick={() => onMarkerClick([feature.listing.geo_location.lng, feature.listing.geo_location.lat])}
              >
                <div>M</div>
              </Marker>
            )
          }
        </Cluster>
        {/* {
          mapMarkersRef.current && 
          mapMarkersRef.current.data && 
          mapMarkersRef.current.data.items.map((feature, key) => {
            console.log('feature.listing.geo_location :', feature.listing.geo_location);
            return (
              <Marker
                key={key}
                style={{ zIndex: 9, width: '20px', height: '20px', backgroundColor: '#F00'}}
                coordinates={{lat: feature.listing.geo_location.lat, lng: feature.listing.geo_location.lng}}
                // onClick={onMarkerClick(feature.geometry.coordinates)}
              >
                <div>M</div>
              </Marker>
            )
          })
        } */}
      </TilesMap>
    </div>
  )
};

export default Map;

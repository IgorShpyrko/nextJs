import React from 'react';
import dynamic from 'next/dynamic';

// @ts-ignore:
const TilesMap = dynamic(import('../../config/mapbox'), {
  ssr: false,
  loading: () => <div>loading...</div>
});

const Map = () => {
  if (!TilesMap) return null;

  return (
    <div style={{width: '300px', height: '300px'}}>
      <TilesMap style='https://map.roomster.com/styles/osm-bright/style.json?key=oxQ5YeTFJ13jkTv9eIN9pB67cKSSFhsV'/>
    </div>
  )
};

export default Map;

import React from 'react';
import Link from 'next/link';

import Map from '../../components/Map';

const MapContainer = () => {
  return (
    <>
      <Link href="/about">
        <a title="about">About</a>
      </Link>
      <br />
      <Link href="/map">
        <a title="map">Map</a>
      </Link>
      <Map />
    </>
  )
};

export default MapContainer;

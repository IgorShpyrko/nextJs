import React from 'react';

import Link from 'next/link';

const AppContainer = () => {
  return (
    <>
      <Link href="/about">
        <a title="about">About</a>
      </Link>
      <Link href="/map">
        <a title="map">Map</a>
      </Link>
      <p>Hello Next.js</p>
    </>
  );
};

export default AppContainer;

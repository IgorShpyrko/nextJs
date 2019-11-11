import ReactMapboxGl from 'react-mapbox-gl';

const openMapTiles = {
  apiUrl: 'https://map.roomster.com/data/v3',
  accessToken: 'oxQ5YeTFJ13jkTv9eIN9pB67cKSSFhsV',
  styleUrl: 'https://map.roomster.com/styles/osm-bright/style.json'
}

export default ReactMapboxGl({
  apiUrl: `${openMapTiles.apiUrl}/?key=${openMapTiles.accessToken}`,
  accessToken: 'pk.eyJ1Ijoicm9vbXN0ZXIiLCJhIjoiY2phbG5xbmU1MnQ5eTJxcGxldDU0dmJ4NiJ9.1GHso01jofvmWImm0_Nmow',
  interactive: false
});

import { axiosApi } from '../utils/axios';

import { prepareSearchParams } from '../helpers/prepareSearchParams';

export default {
  getMarkers: ({ search_params }: GetMarkers) => {
    return axiosApi.get(`https://www.roomster.com/api/search?${prepareSearchParams(search_params)}`);
  },
  getStyles: () => {
    return axiosApi.get('https://map.roomster.com/styles/osm-bright/style.json?key=oxQ5YeTFJ13jkTv9eIN9pB67cKSSFhsV');
  }
};

interface GetMarkers {
  search_params: { 
    page_number?: string | number;                // Ex: search_params.page_number=1
    page_size?: string | number;         // Ex: page_size=100
    sort?: Sort;
    service_type?: ServiceType;
    geo?: {
      lat_sw?: string | number;          // Ex: lng_sw=-77.23116191834784
      lng_sw?: string | number;          // Ex: lat_sw=42.67226390074177
      lat_ne?: string | number;          // Ex: lat_ne=43.08076475440515
      lng_ne?: string | number;          // Ex: lng_ne=-76.06359992830119
      radius_scale?: string | number;    // Ex: radius_scale=1
      country_code?: string | number;    // (overrides lat/lng)  // Ex: 
      // savedCenter?: {
      //   lng?: string | number;           // Ex: lng=-76.64738092332902
      //   lat?: string | number;           // Ex: lat=42.876852358000576
      // };
      // savedZoom?: string | number;       // Ex: savedZoom=8.69252023533569
      // savedLocation?: string | number;   // Ex: savedLocation=anywhere
      // changeByDrag?: boolean;
    };
    budget?: {
      min?: string | number;             // Ex: min=100
      max?: string | number;             // Ex: max=300
    };
    age?: {
      min?: string | number;             // Ex: min=18
      max?: string | number;             // Ex: max=25
    };
    household_sex?: Sex;
    sex?: Sex;
    zodiac?: ZodiacCategory;
    my_pets?: Pets;
    pets_preference?: Pets
    bedrooms?: Bedrooms;
    bathrooms?: string;                  // 1 | 1.5 | 2 | 2.5 | 3 | 3.5 +
    amenities?: Amenities;
    bookmark?: Bookmark;
    calendar?: {
      date_in?: Date;
      date_out?: Date;
    };
    skip_user?: boolean;
    skip_listing_extras?: boolean;
    include_total_count?: boolean;
    map_data_only?: boolean;
    Currency?: string;                   // Ex: Currency=USD
    Locale?: string;                     // Ex: Locale=en-US
    // searchLocation?: string;             // Ex: searchLocation=anywhere
    // pathname?: string;                   // Ex: pathname=%252Fhaveshare%252Fanywhere
    // withoutPush?: boolean;
  }
}


export enum Sort {
  lastActivity= 'LastActivity',
  newest = 'Newest',
  monthlyRent = 'MonthlyRent'
}

export enum ServiceType {
  undefined = 'Undefined',
  needRoom = 'NeedRoom',
  haveShare = 'HaveShare',
  needApartment = 'NeedApartment',
  haveApartment = 'HaveApartment'
}

enum Sex {
  male = 'Male',
  female = 'Female'
}

enum Bedrooms {
  one = '1 bedroom',
  two = '2 bedrooms',
  three = '3 bedrooms',
  four = '4 bedrooms',
  five = '5 bedrooms',
}

enum Amenities {
  highRise = 'High-rise',
  lowRise = 'Low-rise',
  disabilityAccess = 'Disability Access',
  doorman = 'Doorman',
  elevator = 'Elevator',
  walkup = 'Walkup',
  healthClub = 'Health Club',
  laundromat = 'Laundromat',
  coveredParking = 'Covered Parking',
  garage = 'Garage',
  parkingLot = 'Parking Lot',
  streetParking = 'Street Parking',
  nearBusStop = 'Near Bus Stop',
  nearSubway = 'Near Subway',
  electronicSecurity = 'Electronic Security',
  security = 'Security',
  swimmingPool = 'Swimming Pool',
  internet = 'Internet',
  wirelessInternet = 'Wireless Internet'
}

enum Bookmark {
  bookmarked = 'Bookmarked',
  viewed = 'Viewed',
  mailed = 'Mailed'
}

enum ZodiacCategory {
  capricorn = 'Capricorn',
  aquarius = 'Aquarius',
  pisces = 'Pisces',
  aries = 'Aries',
  taurus = 'Taurus',
  gemini = 'Gemini',
  cancer = 'Cancer',
  leo = 'Leo',
  virgo = 'Virgo',
  libra=  'Libra',
  scorpio = 'Scorpio',
  sagitarius = 'Sagittarius',
}

enum Pets {
  cats = 'Cats',
  dogs = 'Dogs',
  smallPets='Small Pets',
  birds = 'Birds',
  fish='Fish',
  reptiles = 'Reptiles'
}
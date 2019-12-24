import {
  IMultiTripsType,
  ISingleTripType,
  IMultiTripsAndTagsType
} from "./types";

// 0.01 KM

const tags = [
  {
    id: 1,
    name: "tag1"
  },
  {
    id: 2,
    name: "tag2"
  },
  {
    id: 3,
    name: "tag3"
  },
  {
    id: 4,
    name: "tag4"
  },
  {
    id: 5,
    name: "tag5"
  }
];

export const templateTrips: IMultiTripsType = {
  trips: [
    {
      id: 1,
      location: "Zlotow",
      begin: "10-02-2020",
      end: "11-02-2020",
      maxPeople: 10,
      price: 300,
      priceType: "pln",
      inSearch: 0,
      lat: 52.279986,
      lon: 17.3522939,
      radius: 0.1,
      tags: [tags[0]]
    },
    {
      id: 2,
      location: "Zlotow",
      begin: "10-02-2020",
      end: "11-02-2020",
      maxPeople: 10,
      price: 300,
      priceType: "pln",
      inSearch: 0,
      lat: 52.279986,
      lon: 17.3522939,
      radius: 0.5,
      tags: [tags[0], tags[1]]
    },
    {
      id: 3,
      location: "Zlotow",
      begin: "10-02-2020",
      end: "11-02-2020",
      maxPeople: 10,
      price: 300,
      priceType: "pln",
      inSearch: 0,
      lat: 52.279986,
      lon: 17.3522939,
      radius: 0.1,
      tags: [tags[0], tags[1], tags[2]]
    },
    {
      id: 4,
      location: "Torino",
      begin: "10-02-2020",
      end: "11-02-2020",
      maxPeople: 10,
      price: 300,
      priceType: "pln",
      inSearch: 0,
      lat: 0,
      lon: 0,
      radius: 10,
      tags: [tags[4], tags[3]]
    },
    {
      id: 5,
      location: "Toronto",
      begin: "10-02-2020",
      end: "11-02-2020",
      maxPeople: 10,
      price: 300,
      priceType: "pln",
      inSearch: 0,
      lat: 0,
      lon: 0,
      radius: 10,
      tags: [tags[3]]
    },
    {
      id: 6,
      location: "Krakow",
      begin: "10-02-2020",
      end: "11-02-2020",
      maxPeople: 10,
      price: 300,
      priceType: "pln",
      inSearch: 0,
      lat: 0,
      lon: 0,
      radius: 10,
      tags: []
    },
    {
      id: 7,
      location: "Krakow",
      begin: "10-02-2020",
      end: "11-02-2020",
      maxPeople: 10,
      price: 300,
      priceType: "pln",
      inSearch: 0,
      lat: 0,
      lon: 0,
      radius: 10,
      tags: []
    },
    {
      id: 8,
      location: "Krakow",
      begin: "10-02-2020",
      end: "11-02-2020",
      maxPeople: 10,
      price: 300,
      priceType: "pln",
      inSearch: 0,
      lat: 0,
      lon: 0,
      radius: 10,
      tags: []
    }
  ]
};

export const templateCities = [
  "Torun",
  "Krakow",
  "Lipka",
  "Zlotow",
  "Toronto",
  "Torino"
];

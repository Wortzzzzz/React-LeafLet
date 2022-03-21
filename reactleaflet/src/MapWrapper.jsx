import React from 'react';

import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import icon from "./components/constants";
import {
  MapContainer,
  Polygon,
  TileLayer,
  useMap, Pane, Rectangle
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { statesData } from './data';
import './App.css';
import { useEffect, useState, useRef } from 'react';
import '../node_modules/leaflet-geosearch/dist/geosearch.css';


// const [center, setCenter] = useState([39.612620714012586, -100.59092163446248]);
// const [coordinate, setCoordinate] = useState("");
const outer = [
  [50.505, -29.09],
  [52.505, 29.09],
]
const inner = [
  [49.505, -2.09],
  [51.505, 2.09],
]
function BlinkingPane() {
  const [render, setRender] = useState(true)
  const timerRef = useRef()
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setRender((r) => !r)
    }, 5000)
    return () => {
      clearInterval(timerRef.current)
    }
  }, [])

  return render ? (
    <Pane name="cyan-rectangle" style={{ zIndex: 500 }}>
      <Rectangle bounds={outer} pathOptions={{ color: 'cyan' }} />
    </Pane>
  ) : null
}
const center22 = [10.039462555191648, 105.77845815144285];
// function ChangeMapView({ coords }) {
//   const map = useMap();
//   map.setView(coords, 5);
//   return null;
// }
function LeafletgeoSearch() {
  const map = useMap();
  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider,
      marker: {
        icon
      }
    });

    map.addControl(searchControl);

    return () => map.removeControl(searchControl);
  }, []);

  return null;
}
class MapWrapper extends React.Component {
  render(){
    const coords =[
        {lat: 24.9946436,lng: 87.20163200000002},
        {lat: 28.7041, lng: 77.1025},
        {lat: 23.4567, lng: 75.2345},
        {lat: 28.4567, lng: 100.2345}
      ]
  return (
    <div id="mapid">
    <MapContainer
      center={center22}
      zoom={13}
      scrollWheelZoom={true}
      style={{ width: '100vw', height: '100vh' }}
    > 
    {/* <form className='search'>
      <label>
        Coordinate:
        <input type="text" name="coordinate" onChange={(event) => {
            setCoordinate(event.target.value)
          }}/>
      </label>
      <button type='submit' value='Submit' onClick={(e) => {
        e.preventDefault();
        // Convert to string
        var currentCoordinate = coordinate.toString();
        // Split string
        var theCoordinate = currentCoordinate.split(',');
        console.log(theCoordinate[0], theCoordinate[1]);
        console.log(center);
        // Set coordinates
        setCenter([theCoordinate[0], theCoordinate[1]])
      }}>Submit</button>
    </form> */}
      <TileLayer
        url='https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=tieW3Zf6xOZOJKZ7qork'
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      />
      
    {
      statesData.features.map((state) => {
        const coordinates = state.geometry.coordinates[0].map((item) => [item[1], item[0]]);

        return (<Polygon
            pathOptions={{
              fillColor: '#FD8D3C',
              fillOpacity: 0.7,
              weight: 2,
              opacity: 1,
              dashArray: 3,
              color: 'white'
            }}
            positions={coordinates}
            eventHandlers={{
              mouseover: (e) => {
                const layer = e.target;
                layer.setStyle({
                  fillOpacity: 0.7,
                  width: 2,
                  dashArray: "3",
                  color: '#666'
                })
              },
              mouseout: (e) => {
                const layer = e.target;
                layer.setStyle({
                  fillOpacity: 0.7,
                  width: 2,
                  dashArray: "3",
                  color: 'white'
                })
              },
              click: (e) => {
                const layer = e.target;
                layer.setStyle({
                  fillColor: 'black',
                })
              }
            }}
          />)
      })
    }  
    {/* <ChangeMapView coords={center}/>
    <Marker position={center}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> */}
      <LeafletgeoSearch/>
      <Polygon color={'green'} positions={coords} />
 
      <Pane name="yellow-rectangle" style={{ zIndex: 499 }}>
        <Rectangle bounds={inner} pathOptions={{ color: 'yellow' }} />
      </Pane>
    </MapContainer>
    </div>
  );
  }
}

export default MapWrapper;

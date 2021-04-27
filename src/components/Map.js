import React from 'react'
import { MapContainer as LeafletMap , TileLayer,Tooltip,useMap,CircleMarker } from 'react-leaflet'
import { PieChart,Pie,Cell} from "recharts"
import "leaflet/dist/leaflet.css";
import "./map.css"
import Title from 'antd/lib/typography/Title';
import { Space } from 'antd';
import CountUp from "react-countup"
import { BLUE, GREEN, GREY, RED } from '../lib/colors';


function ChangeMapView({ coords ,zoom}) {
  const map = useMap();
  map.invalidateSize()
  map.setView([coords[0], coords[1]], zoom);
  return null;
}

const ACCESS_TOKEN = "pk.eyJ1IjoiYmhhdmluZGhvZGlhIiwiYSI6ImNrbXMwdHFiYjBhdHUyd3BvZDlraTRvMW0ifQ.2QR3JT7R3RoKZIWs4PGpUQ" 

const MapURL = `https://api.mapbox.com/styles/v1/bhavindhodia/ckms0ogqk0w8k17p8ftzxpm52/tiles/256/{z}/{x}/{y}@2x?access_token=${ACCESS_TOKEN}`

/* const MapURL = `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png` */


const COLORS = [BLUE, GREY, GREEN];
const pieKey = ['Active','Deaths','Recovered']


const PieInfo = ({ countryData }) => {
  let pieObj = {}
  pieKey.map((name,key)=> pieObj[name] = {value:countryData[name.toLowerCase()],color:COLORS[key]} )

 /*  console.log("po",pieObj); */
  return (
    <Space direction="vertical">
      {Object.keys(pieObj).map((item,key) => (
        <Title key={key} level={5} style={{ color: pieObj[item].color }} >
          {item} <CountUp
            start={0}
            end={pieObj[item].value}
            duration={2}
            separator=","
          />
        </Title>
      ))}
    </Space>

  )
}

const Map = (props) => {

  let {center,zoom,data}= props


  //var centerLat = (data.minLat + data.maxLat) / 2;
  var distanceLat = data.maxLat - data.minLat;
  var bufferLat = distanceLat * 0.05;
  //var centerLong = (data.minLong + data.maxLong) / 2;
  var distanceLong = data.maxLong - data.minLong;
  var bufferLong = distanceLong * 0.05;

  

  

  return (
    <div className="map">
      <LeafletMap center={center}
       zoom={zoom} 
       
       bounds={[
          [data.minLat - bufferLat, data.minLong - bufferLong],
          [data.maxLat + bufferLat, data.maxLong + bufferLong]
        ]} 
       >
        <TileLayer 
        noWrap={true}
         url={MapURL}  />
        <ChangeMapView coords={center} zoom={zoom} />
         
         
        {data.map((countryData, ind) => {
          const { name, active, countryFlag, countryInfo, deaths, recovered } = countryData
          const pieData = [
            {
              name: "Active",
              value: active
            },
            {
              name: "deaths",
              value: deaths
            },
            {
              name: "Recovered",
              value: recovered
            },
          ]
          return (

            <CircleMarker
              key={ind}
              center={[countryInfo.lat, countryInfo.long]}
              fillColor={RED}
              color={RED}
              weight="2"
              opacityFill={1}
              /* radius={15 * Math.log(active / 10000) } */
              radius={15 * Math.log(active / 10000) < 8 ? 8 :15 * Math.log(active / 10000) }
            >
              <Tooltip className="tooltipClass" >
                <Title level={3}>{name} <img alt="" src={countryFlag} height={20} width={30} /> </Title>

                <PieChart width={200} height={200}>
                  <Pie data={pieData} dataKey="value" cx="50%" cy="50%" innerRadius={50} outerRadius={70} fill="#82ca9d"
                    paddingAngle={10}>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
                <PieInfo countryData={countryData} />
              </Tooltip>
            </CircleMarker>
          )
        }
        )
        }
      </LeafletMap>
    </div>
  )
}

export default Map
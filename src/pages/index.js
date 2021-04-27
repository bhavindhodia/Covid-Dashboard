import React from 'react'
import Map from '../components/Map'
import axios from 'axios'
import { Select,Row,Col, Space} from 'antd';
import { isDomAvailable } from '../lib/util'
import {ResponsiveContainer,Line,LineChart,Tooltip,XAxis,YAxis,Label,Legend} from 'recharts'
import { AllInfoCards, EpochDate,Charts } from '../components'
import Title from 'antd/lib/typography/Title';
import Attr from '../components/Attr'
import { GREEN, GREEN_RGB, RED, RED_RGB, BLUE, BLUE_RGB, GREY, GREY_RGB, VOILET, VOILET_RGB, YELLOW, YELLOW_RGB, PURPLE_RGB, PURPLE } from '../lib/colors'
import selectDateArr from '../lib/dateArr'

const CENTER = [0, 0]
const ZOOM = 2
const HISTORIC_DATE = 30
const COUNTRY_ISO = "all"

const HomePage = () =>{ 

  const [ countryData, setCountryData] = React.useState([])
  const [country,setCountry] = React.useState([])
  const [mapCenter,setMapCenter] = React.useState(CENTER)
  const [mapZoom,setMapZoom] = React.useState(ZOOM)
  const [allInfo,setAllInfo] = React.useState({})
  const [historicalData,setHistoricalData] = React.useState({})
  const [ vaccine,setVaccine] = React.useState({})
  const [inputState, setInputState] = React.useState({ countryISO: COUNTRY_ISO, historicDate: HISTORIC_DATE})
  const [currentCountryDetail,setCurrentCountryDetail]=React.useState({})
  
  
  const { Option } = Select;
  

  React.useEffect(() => {
    
    getCountryData()
    
  }, [])
  React.useEffect(() => {
    cardInfo(currentCountryDetail)
    getHistoricalData()
    getVaccineData()
  }, [inputState.countryISO, currentCountryDetail,inputState.historicDate])


  if (!isDomAvailable()) {
    return (
      <div >
        <p className="map-loading">Loading map...</p>
      </div>
    );
  }

  const getVaccineData=async()=>{
  
     let data={}
    let vaccineURL=''
    
   if(inputState.countryISO ==="all"){
      vaccineURL = `https://disease.sh/v3/covid-19/vaccine/coverage?lastdays=${inputState.historicDate}`
     data = await (await axios.get(vaccineURL)).data
   }else{
     vaccineURL = `https://disease.sh/v3/covid-19/vaccine/coverage/countries/${inputState.countryISO}?lastdays=${inputState.historicDate}`
     data = await (await axios.get(vaccineURL)).data.timeline
   }

   
let mvaccince = Object.keys(data).map(item => ({
  date : item,
  value:data[item]/1000000
}))

    setVaccine(mvaccince)
  }

  
  const getHistoricalData = async() =>{
    const historicalDataURL = `https://disease.sh/v3/covid-19/historical/${inputState.countryISO}?lastdays=${inputState.historicDate}`

    
    let data = {}
    inputState.countryISO === "all"?
      data= await (await axios.get(historicalDataURL)).data
    :
      data = await (await axios.get(historicalDataURL)).data.timeline
    

    let finishedData = Object.keys(data.cases).map((item, key) => {
      const x = {
        date: item,
        cases:data.cases[item]/1000000,
        deaths: data.deaths[item] / 1000000,
        recovered: data.recovered[item] / 1000000,
        recoveryRate:(data.recovered[item]/data.cases[item]) *100,
        deathRate:(data.deaths[item]/data.cases[item]) *100
      }
      return x
    })
    setHistoricalData(finishedData)


  }


  const cardInfo = async (countryCardData={})  =>{

    if (inputState.countryISO ==="all" ){
      const allDataURL = "https://disease.sh/v3/covid-19/all"
      const { data } = await axios.get(allDataURL)
      countryCardData = data
    }
    const filteredData= filterCardData(countryCardData)
   setAllInfo(filteredData) 
  }

  const filterCardData = (data={}) =>{
    const filteredData = {
      "Infected": { value: data['cases'],today:data['todayCases'], color: RED,backgroundColor:RED_RGB },
      "Active": { value: data['active'], today: "", color: BLUE, backgroundColor: BLUE_RGB },
      "Total Recovered": { value: data['recovered'],today:data['todayRecovered'], color: GREEN, backgroundColor:GREEN_RGB },
      "Total Deaths": { value: data['deaths'], today: data['todayDeaths'], color: GREY, backgroundColor: GREY_RGB },
      
      "Critical": { value: data['critical'],today:"",  color: YELLOW,backgroundColor:YELLOW_RGB },
      "Test": { value: data['tests'],today:"",  color: VOILET,backgroundColor:VOILET_RGB },
      "Last Updated": { value: data['updated'], today: "", color: "", backgroundColor:'#161625' },

    }
    return filteredData
 
  }

  const getCountryData = async () => {
    const countryDataURL = "https://disease.sh/v3/covid-19/countries"
    const {data = {}} = await axios.get(countryDataURL)
    const hasData = Array.isArray(data) && data.length > 0
    if( !hasData ) return

    const cData = data.map(item =>({
    countryISO : item.countryInfo.iso2,
    countryFlag:item.countryInfo.flag,
    name:item.country,
      cases :item.cases,
      todayCases:item.todayCases,
      recovered:item.recovered,
      todayRecovered:item.todayRecovered,
      deaths: item.deaths,
      todayDeath:item.todayDeaths,
      active: item.active,
      critical:item.critical,
      tests: item.tests,
      countryInfo: item.countryInfo,
      updated:item.updated
    }))

    const c = data.map(item =>({
      name: item.country,
      value: item.countryInfo.iso2
    }))

    setCountryData(cData)
    setCountry(c)
  }
  
  
  const onCountryChange = async (value)=>{
    setInputState({ ...inputState, countryISO:value})
    if (value === "all"){
        setMapCenter(CENTER)
        setMapZoom(ZOOM)
      }
      else{
      const countryDetail = countryData.find(({ countryISO }) => countryISO === value)
      if (countryDetail === "") return
      setCurrentCountryDetail(countryDetail)
      setMapCenter([countryDetail.countryInfo.lat, countryDetail.countryInfo.long])
        setMapZoom(5)
      }
  }


  const onDateChange=(value)=>{
    setInputState({...inputState, historicDate:value})
  }


 const SelectCountry =() =>(
   <Select
     showSearch
     size="large"
     placeholder="Select Country"
     style={{ width: '25vw' }}
     value={inputState.countryISO}
     onChange={onCountryChange}>
     <Option value="all">All</Option>
     {
       country.map(({ name, value }, key) => (
         <Option key={key} value={value}>{name}</Option>
       ))
     }
   </Select>
 )

 const SelectDate=() =>(
   <Select
     size="large"
     placeholder="Select Date"
     style={{ width: '95%' }}
     value={inputState.historicDate}
     onChange={onDateChange}>
     {
       selectDateArr.map(({ name, value }, key) => (
         <Option key={key} value={value}>{name}</Option>
       ))
     }
   </Select>
 )


 

  return(

    <Row  style={{height:'100%',padding:'1rem 2rem'}} >
      
      <Col span={18} xs={24} lg={18} style={{ padding:'0.5rem'}} >
        <Space direction="vertical" size="large" style={{ width: "100%" }} >
          <SelectCountry country = {inputState.country}  />
        <AllInfoCards data = {allInfo}/>
        <Map center={mapCenter} zoom={mapZoom} data={countryData} />

          <ResponsiveContainer width="95%" height={500}>
            <LineChart
              width={800}
              height={500}
              data={vaccine}
              style={{ backgroundColor: PURPLE_RGB, margin: '0.5rem 1.5rem' }}
              margin={{
                top: 50,
                right: 10,
                left: 10,
                bottom: 5,
              }}

            >
              <XAxis dataKey="date" tick={{ stroke: PURPLE }}>
                <Label value="Vaccine (In Millions) "
                  offset={410} fill={PURPLE} position="top"
                  fontSize="1rem"
                />
                </XAxis>
                <YAxis tick={{ stroke: PURPLE }} />
              <Tooltip />
              <Legend />
              <Line dot={false} type="monotone" dataKey="value" stroke={PURPLE} strokeWidth={2} activeDot={{ r: 8 }} />

            </LineChart>
          </ResponsiveContainer>
      </Space>
      </Col>
      <Col span={6} xs={24} lg={6} style={{ padding: '0.5rem' }}    >
        <Space direction="vertical" size="large" style={{ width: "100%" }} >
          <SelectDate date={inputState.historicDate} />
          <EpochDate value={allInfo["Last Updated"] && allInfo["Last Updated"].value} />
          <Charts data={historicalData} />
          <Attr/>
        </Space>

      </Col>

      <Col span={24} style={{textAlign:'center'}} >
        <Title level={3} >Made By  <a  target="_blank" href="https://bhavindhodia.xyz" rel="noreferrer">Bhavin Dhodia</a> </Title>
      </Col>
    </Row>
    
  )


}
export default HomePage
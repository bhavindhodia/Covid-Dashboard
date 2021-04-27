import { ResponsiveContainer, LineChart, Tooltip, XAxis, YAxis,  Legend, Line, Label} from 'recharts'
import { BLUE, BLUE_RGB, GREEN, GREEN_RGB, GREY, GREY_RGB, RED } from '../lib/colors'


const CustomTooltip = ({
  active,
  payload,
  label,
  color
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="tooltipClass"  >
        <p> Date : {label} </p>
        {payload.map((item,key) =>(
          <p key={key} style={{color:color}}  > {item.name} : {item.value}</p>
        ))}
      </div>
    );
  }

  return null;
};


const chartObj = [{
  dataKey: [{ name: "cases", color: RED }, { name: "recovered", color: GREEN }, { name: "deaths", color: GREY }],
  label: "Cases in Millions",
  color: BLUE,
  backgroundColor: BLUE_RGB,
  height: 400,
  width: "100%"
},{
  dataKey:[{name:"recoveryRate",color:GREEN}],
  label: "Recovery Rate(%)",
  color:GREEN,
  backgroundColor:GREEN_RGB,
  height:300,
  width:"100%" 
}, {
    dataKey:[ {name:"deathRate",color:GREY}],
  label: "Death Rate (%)",
    color: GREY,
    backgroundColor:GREY_RGB,
    height:300,
    width:"100%"
  }]

const Charts = ({data}) =>(
  <>

        {chartObj.map((item,key) => (
          <ResponsiveContainer key= {key} width="95%" height={300}>
            <LineChart
              data={data}
              style={{ backgroundColor: item.backgroundColor, margin: '1rem 0rem' }}
              margin={{
                top: 50,
           
                right:20,
                bottom: 5,
              }}

            >
              <XAxis dataKey="date" tick={{ stroke: item.color }} >
                <Label value={item.label}
                  offset={210} fill={item.color} position="top"
                  fontSize="1rem"
                />
              </XAxis>
           
              <YAxis tick={{ stroke: item.color }} />
              <Tooltip cursor={false} content={CustomTooltip} color={item.color} />
              <Legend />
             
              {item?.dataKey.map((dKey, index) => (
                <Line key={index} dot={false} type="monotone" strokeWidth={2} dataKey={dKey.name} stroke={dKey.color} activeDot={{ r: 8 }} />
              ))}

            </LineChart>
          </ResponsiveContainer>
        ))}


  </>
)

export default Charts
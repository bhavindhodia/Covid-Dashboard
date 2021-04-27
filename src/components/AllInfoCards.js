import {Row,Col,Card,Typography} from "antd"
import CountUp from 'react-countup'

const dataCards = ({data}) =>{
   const {Title} = Typography
  return(
    <Row gutter={[16, 24]}  style={{ justifyContent: 'center' }} >
      {
        Object.keys(data)
          .filter(item => (item !== "Last Updated"))
          .map((item, key) => (
            <Col key={key} xs={12} md={8} lg={6}  className="gutter-row">
              <div className="site-card-border-less-wrapper">
                <Card type="flex" bordered={false} style={{ textAlign: "center",  backgroundColor:data[item].backgroundColor}}>
                  <Title level={5} style={{ color: data[item].color }} >{item}</Title>
                  <Title level={5} style={{ color: data[item].color, opacity: 0.6 }} > {data[item].today !== "" ? "+"+data[item].today : "-"} </Title>
                  <Title style={{ color: data[item].color }} level={3} >
                    <CountUp
                    start={0}
                    end={data[item].value }
                    duration={3}
                    separator=","
                    />
                  </Title>
                </Card>
              </div>
            </Col>
          ))
      }
    </Row>
  )
}

export default dataCards
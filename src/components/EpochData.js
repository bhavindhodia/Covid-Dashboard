import {Card,Typography} from "antd"

const EpochDate = ({ value }) => {
  var d = new Date(value);
  const {Title} = Typography
  return (
    <div className="site-card-border-less-wrapper" style={{width:"95%"}} >
      <Card bordered={false} style={{ backgroundColor: '#373744'}} >
        <Title level={5} > Last Updated At </Title>
        <Title level={3} >
          {d.toLocaleDateString()} at {d.toLocaleTimeString()}
        </Title>
      </Card>
    </div>
  )
}

export default EpochDate
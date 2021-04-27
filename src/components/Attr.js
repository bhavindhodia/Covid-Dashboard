import {Card,Typography} from "antd"
import attr from '../lib/attributions'
import { YELLOW, YELLOW_RGB } from "../lib/colors"

const {Title} = Typography
const Attr = () =>(
  <Card bordered="false" style={{ width: '95%', backgroundColor: YELLOW_RGB, textAlign: 'center' }} >

    {Object.keys(attr).map((item, key) => (
      <div key={key}>
        <Title  level={4} >{item}</Title>
        {attr[item].map((subitem, index) => (
          <Title key={index} level={5}>
            <a style={{ color: YELLOW }} target="_blank" rel="noreferrer" href={subitem?.link}>{subitem?.name}
            </a>
          </Title>
        ))}
      </div>
    ))}
  </Card>
)

export default Attr
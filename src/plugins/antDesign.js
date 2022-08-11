// 如果报错，看版本是否是1.7.8或者其他，不能是3.+的版本
import 'ant-design-vue/dist/antd.css'
import {
  Button,
  Input,
  Row,
  Col,
  Card,
  DatePicker,
  Table,
  Spin,
  Tooltip,
  Modal
} from 'ant-design-vue'
export const registerAntDesign = (vue) => {
  vue.use(Button)
  vue.use(Input)
  vue.use(Row)
  vue.use(Col)
  vue.use(Card)
  vue.use(DatePicker)
  vue.use(Table)
  vue.use(Spin)
  vue.use(Tooltip)
  vue.use(Modal)
}

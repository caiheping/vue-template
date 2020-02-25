import {
  Rate,
  Row,
  Switch,
  Progress,
  Button
} from 'element-ui'

export default {
  install (V) {
    V.use(Rate)
    V.use(Button)
    V.use(Switch)
    V.use(Progress)
    V.use(Row)
  }
}

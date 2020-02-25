import { Message } from 'element-ui'

export function httpResponse (type = 'success', message = 'success') {
  Message({
    type: type,
    message: message
  })
}

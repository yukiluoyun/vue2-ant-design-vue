import qs from 'qs'
import moment from 'moment'
const utils = {}
// 字符串格式化，一般用于POST请求
utils.formUrlencoded = (data) => qs.stringify(data)

// 时间
const addZero = (val) => val.toString().padStart(2, '0') // 小于10，加0
// 将星期几转化为中文
function transWeek(val) {
  let day = ''
  switch (val) {
    case 0:
      day = '星期天'
      break
    case 1:
      day = '星期一'
      break
    case 2:
      day = '星期二'
      break
    case 3:
      day = '星期三'
      break
    case 4:
      day = '星期四'
      break
    case 5:
      day = '星期五'
      break
    case 6:
      day = '星期六'
  }
  return day
}
const myDate = new Date()
const year = addZero(myDate.getFullYear())
const month = addZero(myDate.getMonth() + 1)
const date = addZero(myDate.getDate())
const week = transWeek(myDate.getDay())
const hour = addZero(myDate.getHours())
const minute = addZero(myDate.getMinutes())
const second = addZero(myDate.getSeconds())

utils.time = {
  year,
  month,
  date,
  week,
  hour,
  minute,
  second
}

utils.dateFormat = (time, pattern = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(time).format(pattern)
}

const randomHexColor = () => {
  // 随机生成十六进制颜色
  let hex = Math.floor(Math.random() * 16777216).toString(16) // 生成ffffff以内16进制数
  while (hex.length < 6) {
    // while循环判断hex位数，少于6位前面加0凑够6位
    hex = '0' + hex
  }
  return '#' + hex // 返回‘#'开头16进制颜色
}
utils.randomHexColor = randomHexColor

// null/0会转化成NAN，如是，则直接变成0
utils.nanTo0 = (val) => {
  return val === null ? 0 : +val
}
utils.unit = (value, point = 2, rep = '') => {
  if (value === null || value === undefined) {
    return rep
  }
  value += ''
  const unit = {
    3: '百',
    4: '千',
    5: '万',
    6: '万',
    7: '百万',
    8: '千万',
    9: '亿',
    10: '亿',
    11: '百亿',
    12: '千亿',
    13: '万亿',
    14: '兆'
  }
  const length = value.substr(0, value.indexOf('.')).length || value.length
  if (length < 5) {
    return value
  } else {
    let pow
    if (length + '' === '6' || length + '' === '10') {
      pow = Math.pow(10, length - 2)
    } else {
      pow = Math.pow(10, length - 1)
    }
    let data = (value / pow).toFixed(point)
    data += unit[length]
    return data
  }
}

export default utils

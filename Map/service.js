import {
  getOpticalApi,
  getSupportNetWorkApi,
  getPipeApi,
  getSupportApi,
  getDataSourceApi
} from '@/api/map/extendMap.js'
import X2JS from 'x2js' // xml数据处理插件
const x2js = new X2JS()
// 光缆资源：ODF、MODF、光交接箱、光分纤盒、光分路器、光终端盒、合波器、光缆接头、OLT、ONU、光缆盘留、光缆预留
const fetchOpticalList = async () => {
  const res = await getOpticalApi
  const data = x2js.xml2js(res.data)
  const result = data.FeatureCollection.featureMember
  let list = result.map((item) => {
    const baseItem = item.TEGSB
    return {
      fid: baseItem._fid,
      label1: baseItem.DZ.__text,
      label: baseItem.MC.__text,
      data: baseItem.GLID.__text,
      time: baseItem.ID0.__text,
      type: baseItem.TYPE.__text,
      coordinates: baseItem.XY.Point.coordinates.__text
    }
  })
  return list
}

// 支撑网资源：空间资源： 局站、机房、用户点、进线室
const fetchSupportNetworkList = async () => {
  const res = await getSupportNetWorkApi
  const data = x2js.xml2js(res.data)
  const result = data.FeatureCollection.featureMember
  let list = result.map((item) => {
    const baseItem = item.TEKJZY
    return {
      fid: baseItem._fid,
      bm: baseItem.BM.__text,
      label: baseItem.MC.__text,
      data: baseItem.GLID.__text,
      time: baseItem.ID0.__text,
      type: baseItem.TYPE.__text,
      coordinates: baseItem.XY.Point.coordinates.__text
    }
  })
  return list
}

// 管道杆路资源：电杆、撑点、人手井、引上点、标石
const fetchPipeList = async () => {
  const res = await getPipeApi
  const data = x2js.xml2js(res.data)
  const result = data.FeatureCollection.featureMember
  let list = result.map((item) => {
    const baseItem = item.TEGDGLZY
    return {
      fid: baseItem._fid,
      bm: baseItem.BM.__text,
      dz: baseItem.DZ?.__text || '',
      label: baseItem.MC.__text,
      data: baseItem.GLID.__text,
      time: baseItem.ID0.__text,
      type: baseItem.TYPE.__text,
      coordinates: baseItem.XY.Point.coordinates.__text
    }
  })
  return list
}

// 支撑段：管道段、关联线、吊线段
const fetchSupportList = async () => {
  const res = await getSupportApi
  const data = x2js.xml2js(res.data)
  const result = data.FeatureCollection.featureMember
  let list = result.map((item) => {
    const baseItem = item.TEZCD
    return {
      fid: baseItem._fid,
      bm: baseItem.BM.__text,
      dz: baseItem.DZ?.__text || '',
      label: baseItem.MC.__text,
      data: baseItem.GLID.__text,
      time: baseItem.ID0.__text,
      type: baseItem.TYPE.__text,
      coordinates: baseItem.XY.LineString.coordinates.__text
    }
  })
  return list
}

//  数据网资源：IDF、综合配线箱、交换机
const fetchDataSourceList = async () => {
  const res = await getDataSourceApi
  const data = x2js.xml2js(res.data)
  const result = data.FeatureCollection.featureMember
  let list = result.map((item) => {
    const baseItem = item.TESJW
    return {
      fid: baseItem._fid,
      bm: baseItem.BM.__text,
      dz: baseItem.DZ?.__text || '',
      // label: item.TESJW.MC.__text,
      data: baseItem.GLID.__text,
      time: baseItem.ID0.__text,
      type: baseItem.TYPE.__text,
      coordinates: baseItem.XY.Point.coordinates.__text
    }
  })
  return list
}

export {
  fetchOpticalList,
  fetchSupportNetworkList,
  fetchPipeList,
  fetchSupportList,
  fetchDataSourceList
}

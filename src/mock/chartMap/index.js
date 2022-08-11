import Mock from 'mockjs'
Mock.mock(
  /system\/loginApplet/,
  'get',
  ({
    userCode = 'lzj153893',
    userName = '梓',
    areaId = '360000',
    timestamp = 'null',
    signature = 'd91fbb6def8d14ee796ad55e6a3a4136'
  }) => {
    console.log('mock.....')
    return {
      code: 200,
      msg: 'mock测试数据',
      data: {
        id: '361100000000000001681918',
        areaCode: '36',
        areaName: '江西省',
        areaType: '1',
        parentId: '-1',
        zxAreaId: '360000',
        zxAreaCode: null,
        zxParentId: '0',
        areaStatus: 1,
        areaOrderby: 1,
        mapPolygons: null,
        mapColor: null,
        mapZoom: null,
        mapCenterLongitude: null,
        mapCenterLatitude: null,
        mapCenterAltitude: null
      }
    }
  }
)

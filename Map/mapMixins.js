import {
  getCityMarkerList,
  getDistrictMarkerList,
  getStationList
} from '@/api/map'

export const mapMixins = {
  methods: {
    // 加载地图
    addMap() {
      const { areaType, mapCenterLongitude, mapCenterLatitude } =
        this.currentLevelData
      const center = {
        lng: mapCenterLongitude,
        lat: mapCenterLatitude
      }
      const zoom =
        areaType === '1'
          ? this.zoom
          : areaType === '2'
          ? this.cityZoom
          : this.countryZoom
      this.map.centerAndZoom(new window.T.LngLat(center.lng, center.lat), zoom)
    },
    /*
     *区域描边：如果有描边数据，则需要重新加一层label
     *offset3 底层偏离数据
     *offset2 倒数第二层偏离数据
     *offset1 倒数第一层偏离数据
     */
    drawArea() {
      const { boundBorderList } = this.currentLevelData
      for (let i = 1; i < boundBorderList.length; i++) {
        const itemI = boundBorderList[i]
        const fillColor = boundBorderList[i].mapColor
        // 描出三层叠加图层
        const { areaType } = this.currentLevelData
        const [offset1, offset2, offset3] =
          areaType === '1' ? this.offsetList1 : this.offsetList2
        this.layer3Border(itemI, fillColor, offset1, offset2, offset3)
      }
    },
    /**
     * 添加不同区域的文字信息
     * @param {*} map 地图实例new window.T.Map
     * @param {*} areaListData 标注点的信心集合数组，数组里面是一个个的对象，对象含有mapName地址名，mapValue 子数组，子数组第一个是精度：数值型，第二个是维度，第三个是地址信息
     */
    addLabel() {
      // console.log('addLabel==')
      // 显示在地图上的具体点的坐标
      const { labelList } = this.currentLevelData
      console.log('labelList==', labelList)
      for (let i = 0; i < labelList.length; i++) {
        // 官方大大的代码是随机500个坐标点
        const label = new window.T.Label({
          text: labelList[i].areaName,
          position: new window.T.LngLat(
            labelList[i].mapCenterLongitude,
            labelList[i].mapCenterLatitude
          ),
          // offset: new window.T.Point(-50, 60)
          offset: new window.T.Point(0, 0)
        })
        this.map.addOverLay(label) // 将标注添加到地图中，加入这一句会使其标注，聚合点会有点点问题
      }
    },
    /**
     * 添加多个图标，及鼠标经过
     * @param {*} map 地图实例new window.T.Map
     * @param {*} areaListData 标注点的信心集合数组，数组里面是一个个的对象，对象含有mapName地址名，mapValue 子数组，子数组第一个是精度：数值型，第二个是维度，第三个是地址信息
     * @param {*} markImg1  'assets/images/marker.png',
     * @param {*} markerIconSize  markerIconSize: new window.T.Point(49 * 0.5, 101 * 0.5)
     */
    addMarkers() {
      // console.log('addMarkers==')
      this.markerClustererList = []
      const { markListData } = this.currentLevelData
      const _areaType = markListData[markListData.length - 1].areaType // 取最后一个对象的类型,因为第一个为本省或本市，并不是对应的子集
      const that = this
      let icon = null
      // 表示登录就是默认省1，上面的地市就是2，市区图上的区县3，之后局站为100
      if (+_areaType < 3) {
        icon = new window.T.Icon({
          iconUrl: require('@/' + this.markImg1),
          iconSize: this.markerIconSize
          // iconAnchor: new window.T.Point(22, 0)
        })
      } else {
        icon = new window.T.Icon({
          iconUrl: require('@/' + this.markImg2),
          iconSize: new window.T.Point(73 * 0.8, 77 * 0.8)
        })
      }

      // 显示在地图上的具体点的坐标
      for (var i = 1; i < markListData.length; i++) {
        var marker = null
        // 表示登录就是默认省1，上面的地市就是2，市区图上的区县3，之后局站为100
        if (markListData[i].areaType === '2') {
          const _icon = new window.T.Icon({
            // iconUrl: require(`@/assets/images/rank_${markListData[i].roomGreenRank}.png`),
            iconUrl: require('@/assets/images/marker-icon.png'),
            iconSize: new window.T.Point(49 * 0.65, 101 * 0.65)
          })
          marker = new window.T.Marker(
            new window.T.LngLat(
              markListData[i].mapCenterLongitude,
              markListData[i].mapCenterLatitude
            ),
            {
              icon: _icon
            }
          )
        } else {
          marker = new window.T.Marker(
            new window.T.LngLat(
              markListData[i].mapCenterLongitude,
              markListData[i].mapCenterLatitude
            ),
            {
              icon: icon
            }
          )
        }

        const roomGreenRank = delUndefined(markListData[i].roomGreenRank)
        const areaName = delUndefined(markListData[i].areaName)
        const roomAllTotal = delUndefined(markListData[i].roomAllTotal)
        const roomPueTotal = delUndefined(markListData[i].roomPueTotal)
        const roomGreenTotal = delUndefined(markListData[i].roomGreenTotal)
        const stationName = markListData[i].stationName
          ? markListData[i].stationName
          : ''

        let content = ''
        content = `
          <div class="wrap">
            <div class="yellow">
              <span><i class="icon iconfont icon-lingxing title-icon"></i> No.${roomGreenRank} </span>
              <span>${areaName}</span>
            </div>
            <div >
            <span class="yellow station" >${stationName} </span>
          </div>
            <div class="content">
              <p>
                <span>机房总数：</span>
                <span  :class="{hidden:roomGreenRank}">${roomAllTotal}</span>
              </p>
              <p>
                <span>PUE机房总数：</span>
                <span>${+roomPueTotal + +roomGreenTotal}</span>
              </p>
            </div>
            <div class="content">
              <p>
                <san>绿色达标：</span>
                <span  class="cyan">${roomGreenTotal}</span></p>
              <p>
              <span>PUE超标： </span>
              <span class="orange">${roomPueTotal}</span></p>
            </div>
          </div>
        `
        this.map.addOverLay(marker) // 将标注添加到地图中，加入这一句会使其标注，聚合点会有点点问题
        this.markerClustererList.push(marker) // 变成聚合点
        markerMouseoverHandler(that, content, marker)
        // markerMousemoveHandler(that, content, marker)
        markerClickHandler(that, marker, markListData[i])

        // eslint-disable-next-line no-inner-declarations
        function delUndefined(val) {
          return val === undefined || val === null ? '' : val
        }
      }

      if (_areaType !== '2') {
        this.markerClusterer = new window.T.MarkerClusterer(this.map, {
          markers: this.markerClustererList,
          styles: [
            {
              url: require('@/assets/images/marker-clusterer.png'),
              size: [138 * 0.4, 154 * 0.4], // 图片大小
              offset: new window.T.Point(-15, -13), // 显示图片的偏移量
              textColor: '#48AAFF', // 显示数字的颜色
              textSize: 8, // 显示文字的大小
              range: [0, 100000]
            }
          ]
        }) // 聚合，一个区域多个点太过集中时使用
      }

      // 鼠标移动时，坐标点打开一个窗口
      function markerMouseoverHandler(that, content, marker) {
        marker.addEventListener('mouseover', function (e) {
          openInfo(that, content, e)
        })
      }
      // 开启信息窗口
      function openInfo(that, content, e) {
        var point = e.lnglat
        marker = new window.T.Marker(point) // 创建标注
        var markerInfoWin = new window.T.InfoWindow(content, {
          offset: new window.T.Point(0, -30)
        }) // 创建信息窗口对象
        that.map.openInfoWindow(markerInfoWin, point) // 开启信息窗口
      }

      // 点击标注
      function markerClickHandler(that, marker, markerData) {
        marker.addEventListener('click', function (e) {
          if (markerData.areaType === '100') {
            // 如果已经是市一级，已经到了终点，则不能再继续跳转，只能跳转到机房集站
            that.map.removeEventListener('click', that.handleDrilling)
            that.openComputerRoomList(marker, markerData)
          } else {
            that.map.clearOverLays()
            if (+markerData.areaType < 4) {
              // 目前到第三级，也就是县、区就出集站层，不能也不需要下钻了，直接到机房画像
              that.handleDrilling(markerData)
            }
          }
        })
      }
    },
    /**
     * 区域下钻
     * @param {*} map 地图实例
     * @param {*} markerData 父级的marker点带来的数据，对应的是list2ByID接口带来的数据
     * @param {*} boundBorderList 对应当前从父级点击过来时的区域描边数据，并不是所有的描边数据
     */
    async handleDrilling(markerData) {
      // eslint-disable-next-line no-debugger
      // debugger
      this.currentLevelData = Object.assign(this.currentLevelData, markerData)

      // this.areaType = this.currentLevelData.areaType
      // 南昌市 441100000000000000001225

      if (+markerData.areaType <= 3) {
        let markerList = []
        if (+markerData.areaType < 3) {
          const res = await getCityMarkerList(markerData.id, '1')
          markerList = res.data
          // 如果有描边数据，就需要自己加label层
          this.currentLevelData.labelList = markerList
        } else if (+markerData.areaType === 3) {
          console.log('到了局站层')
          const res = await getDistrictMarkerList(markerData.id, '1')
          markerList = res.data
        }
        const result = markerList.map((item) => {
          const _roomGreenRank = item.roomGreenRank ? item.roomGreenRank : ''
          const _stationName = item.tbsName ? item.tbsName : ''
          return {
            id: item.id,
            areaCode: item.areaCode,
            areaName: item.areaName,
            areaType: item.areaType,
            parentId: item.parentId,
            areaStatus: item.areaStatus,
            mapCenterLongitude: item.mapCenterLongitude,
            mapCenterLatitude: item.mapCenterLatitude,
            roomGreenRank: _roomGreenRank,
            roomAllTotal: item.roomAllTotal,
            roomGreenTotal: item.roomGreenTotal,
            roomPueTotal: item.roomPueTotal,
            stationName: _stationName,
            zxAreaId: item.zxAreaId,
            zxParentId: item.zxParentId
          }
        })

        this.currentLevelData.markListData = result
        this.levelPathList.push(this.currentLevelData)
        this.clearMapAllOverLays()
        this.addMap()
        // 如果是从省-市进来的，则描边，否则不描 1.2 为省市，有描边,其他没有
        // areaType，区域类型，行政区划类型。枚举值，0：国家；1：省级；2：市级；3：县级；4：乡级；5：村级；6：网格；…。
        if (+markerData.areaType < 3) {
          if (markerData.areaType === '2') {
            const _boundBorderList = this.boundBorderList.find(
              (item) => item.areaCode === markerData.areaCode
            )
            // 第一个是本省市，要剔除，所以组装一个新的空对象
            this.currentLevelData.boundBorderList = [{}, _boundBorderList]

            this.drawArea(
              this.offsetList2[0],
              this.offsetList2[1],
              this.offsetList2[2]
            )
            this.addLabel()
          }
        }
        this.changeAreaInfo()
        this.addMarkers()
      } else {
        console.log('超过了第四层')
      }
    },
    // 从地图最后一层有数据的点，跳转到机房画像页面
    async openComputerRoomList(marker, markerData) {
      var infoWin1 = new window.T.InfoWindow()
      const res = await getStationList('361100000000000000864419')
      if (res.data.length === 0) {
        alert('此局站暂时没有对应的机房---')
        return
      }

      let options = ''
      res.data.forEach((station) => {
        options += '<option value="0"  >请选择</option>'
        options += `<option value="${station.roomCode}_${station.id}"  >${station.buildingName}</option>`
      })

      var sContent = `
      <p class="yellow">${res.data[0].areaName}</p>
      <div class="select-wrap">
        <p>选择机房:</p>
        <div class="search-input-wrap">
          <select onchange="toComputerRoom()" id="computerRoom">
            ${options}
          </select>
        </div>
        </div>
      `

      infoWin1.setContent(sContent)
      marker.openInfoWindow(infoWin1)
    },
    toComputerRoom() {
      const _option = document.getElementById('computerRoom').value
      const roomCode = _option.split('_')[0]
      const id = _option.split('_')[1]
      this.$router.push({
        path: '/computerRoom',
        query: {
          roomCode,
          id
        }
      })
    },

    // 切换时更改数据，使得页面其他组件的地区参数值发生变化
    changeAreaInfo() {
      localStorage.setItem('currentAreaName', this.currentLevelData.areaName)
      localStorage.setItem('currentCityType', this.currentLevelData.areaType)
      localStorage.setItem('currentAreaId', this.currentLevelData.id)
      localStorage.setItem('zxAreaId', this.currentLevelData.zxAreaId)
      localStorage.setItem('zxParentId', this.currentLevelData.zxParentId)
      this.$bus.$emit('changeCurrentAreaId', this.currentLevelData.id)
    },

    // 添加菜单: 鼠标右键
    addMenu() {
      const menuList = new window.T.ContextMenu({
        width: 100
      })

      const menuItem = new window.T.MenuItem('菜单', function () {})
      // menuItem.enable()
      menuList.addItem(menuItem)
      this.map.addContextMenu(menuList)
    },
    /**
     * 辅助函数1--根据参数，绘制三层不同边线的背景边线的描边，使其具有立体感
     * @param {*} map  地图实例
     * @param {*} polygonsList 描边点的数据
     * @param {*} fillColor 最上面那一层区域色块的颜色
     * @param {*} offset1 倒数第一层 背景偏移量
     * @param {*} offset2 倒数第一层 背景偏移量
     * @param {*} offset3  倒数第3层 背景偏移量
     */

    layer3Border(
      polygonsList,
      fillColor,
      offset1 = this.offsetList1[0],
      offset2 = this.offsetList1[1],
      offset3 = this.offsetList1[2]
    ) {
      const points = []
      const pointsOffset1 = [] // 地图偏移图层1 最底层
      const pointsOffset2 = [] // 地图偏移图层2 中间层
      const pointsOffset3 = [] // 地图偏移图层3 最上一层
      for (let j = 0; j < polygonsList.icmMapPolygonsList.length; j++) {
        const itemJ = polygonsList.icmMapPolygonsList[j]
        points.push(new window.T.LngLat(+itemJ.latitude, +itemJ.longitude))
        pointsOffset1.push(
          new window.T.LngLat(
            +itemJ.latitude + offset1,
            +itemJ.longitude - offset1
          )
        )
        pointsOffset2.push(
          new window.T.LngLat(
            +itemJ.latitude + offset2,
            +itemJ.longitude - offset2
          )
        )
        pointsOffset3.push(
          new window.T.LngLat(
            +itemJ.latitude + offset3,
            +itemJ.longitude - offset3
          )
        )
      }
      // 地图偏移图层1 -最底层-创建面对象
      this.addBorderFn(pointsOffset1, '#101950', '#101950', 1, 1)

      // 地图偏移图层2 -中间层-创建面对象
      this.addBorderFn(pointsOffset2, '#2667df', '#2667df', 1, 1)

      // 地图偏移图层3-最上一层-创建面对象
      this.addBorderFn(pointsOffset3, '#4aceff', '#4aceff', 1, 1)

      // 创建面对象--正宗数据
      this.addBorderFn(points, '#fff', fillColor, 1, 1)
    },

    // 辅助函数2--辅助函数1 layer3Border 会用到的子函数
    addBorderFn(
      pointList,
      borderColor = '#101950',
      fillColor = '#101950',
      opacity = 1,
      fillOpacity = 1
    ) {
      // 地图偏移图层1-创建面对象
      const polygon = new window.T.Polygon(pointList, {
        color: borderColor,
        weight: 2,
        fillColor: fillColor,
        opacity: opacity,
        fillOpacity: fillOpacity
        // opacity: 0.05,
        // fillOpacity: 0.05
      })
      this.map.addOverLay(polygon)
    },
    // 地图s上返回操作
    backMap() {
      this.levelPathList.pop()
      this.clearMapAllOverLays()
      this.$nextTick(() => {
        this.addMap()
        if (this.currentLevelData.areaType <= this.lastBoundBorderAreaType) {
          this.drawArea()
          this.addLabel()
        }
        this.addMarkers()

        this.changeAreaInfo()
      })
    },
    clearMapAllOverLays() {
      // console.log('clearAllOverLays')
      this.map.clearOverLays()
      this.markerClustererList = []
      if (this.markerClusterer !== null) {
        this.markerClusterer.clearMarkers(this.markerClustererList)
      }
      this.$forceUpdate()
    },

    // 光缆资源
    toggleSource(sourceFlag) {
      let overLay = null
      let actionsFn = null
      switch (sourceFlag) {
        case 1:
          overLay = this.opticalOverLay
          actionsFn = 'getOpticalList'
          break
        case 2:
          overLay = this.supportNetworkOverLay
          actionsFn = 'getSupportNetWorkList'
          break
        case 3:
          overLay = this.pipeOverLay
          actionsFn = 'getPipeList'
          break
        case 4:
          overLay = this.dataSourceOverLay
          actionsFn = 'getDataSourceList'
          break
        case 5:
          overLay = this.supportOverLay
          actionsFn = 'getSupportList'
          break
      }
      if (!overLay) {
        this.$store.dispatch(`map/${actionsFn}`)
      } else {
        if (overLay.isHidden()) {
          overLay.show()
          // this.opticalCarTrack.start()
        } else {
          // this.opticalCarTrack.stop()
          overLay.hide()
        }
      }
    },

    // 将点变成线条
    renderLine(overLay, dataSource, lineColor) {
      const points = []
      dataSource.forEach((item, index) => {
        const coordinates = item.coordinates.split(',')
        points.push(new window.T.LngLat(coordinates[0], coordinates[1]))
      })
      // 创建线对象
      this[overLay] = new window.T.Polyline(points, {
        color: lineColor,
        weight: 1,
        opacity: 1
      })
      // 向地图上添加线
      this.map.addOverLay(this[overLay])
      // 线条轨迹
    }
  },
  mounted() {
    window.toComputerRoom = this.toComputerRoom
  }
}

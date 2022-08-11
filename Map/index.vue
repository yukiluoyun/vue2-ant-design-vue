<template>
  <div>
    <div id="mapDiv"></div>
    <search-room class="searchRoom"></search-room>
    <div class="backBtn" v-if="+currentLevelData.areaType > 1" @click="backMap">
      <img src="@/assets/images/back-btn.png" alt="" />
      <!-- <a-breadcrumb>
        <a-breadcrumb-item v-for="(level, index) in levelPathList" :key="index"
          ><a href=""> {{ level.areaName }}</a></a-breadcrumb-item
        >
      </a-breadcrumb> -->
    </div>
    <!-- <div class="legend" v-if="currentLevelData.areaType < 3"> -->
    <div class="legend" v-if="true">
      <ul>
        <li>
          <span>绿色达标机房 </span>
          <span>≧70%</span>
        </li>
        <li>
          <span>绿色达标机房</span>
          <span>50%-70%</span>
        </li>
        <li>
          <span>绿色达标机房</span>
          <span>&lt;50%</span>
        </li>
      </ul>
    </div>

    <div class="btn-group" v-if="false">
      <a-button type="primary" size="small" @click="toggleSource(1)">
        光缆
      </a-button>
      <a-button type="primary" size="small" @click="toggleSource(2)">
        支撑网
      </a-button>
      <a-button type="primary" size="small" @click="toggleSource(3)">
        管道
      </a-button>
      <a-button type="primary" size="small" @click="toggleSource(4)">
        数据网
      </a-button>
      <a-button type="primary" size="small" @click="toggleSource(5)">
        支撑段
      </a-button>
    </div>
  </div>
</template>
<script>
/** d'd'd
 * 查询经纬度地址
 * http://api.tianditu.gov.cn/geocoder?ds={%22keyWord%22:%22%E6%B1%9F%E8%A5%BF%E7%9C%81%E5%8D%97%E6%98%8C%E5%B8%82%E5%85%AB%E4%B8%80%E5%B9%BF%E5%9C%BA%22}&tk=edf3a2f93e1d92ad2449ef9facb4970a
 * 八一广场：{lon":115.960910011,"lat":28.5884376430001}
 */
import { mapState } from 'vuex'
import './map.scss'
import { mapMixins } from './mapMixins.js'
// 全局查询机房
import searchRoom from '@/components/searchRoom'

const userInfo = JSON.parse(localStorage.getItem('userInfo'))
const mapCenterLongitude = +userInfo.mapCenterLongitude
const mapCenterLatitude = +userInfo.mapCenterLatitude
export default {
  mixins: [mapMixins],
  components: { searchRoom },
  data() {
    return {
      map: null, // 地图实例
      geocoder: null, // 地图实例
      lastBoundBorderAreaType: '3', // 最后一级描边等级类型，用于返回层级用
      zoom: 7, // 地图初始放大级别-省级
      cityZoom: 10, // 地图放大级别-市级
      countryZoom: 14, // 地图放大级别-区县
      offsetList1: [0.09, 0.06, 0.03], // 省级3D折叠参数
      offsetList2: [0.02, 0.015, 0.01], // 市级3D折叠参数
      initMap: false, // 是否地图已经加载完
      markImg1: 'assets/images/marker.png', // markder标记点图片1
      markImg2: 'assets/images/station.png', // markder标记点图片2
      markerIconSize: new window.T.Point(49 * 0.65, 101 * 0.65), // markder图片大小
      center: { lng: mapCenterLongitude, lat: mapCenterLatitude - 1 }, // 地图初始定位中心，-1是为了方便地图显示居中上的纠偏
      markerClustererList: [], // marker聚合得数据
      markerClusterer: null, // marker聚合实例
      // showStationsList: true,
      stationName: '', // 局站站点名字
      currentLevelData: {}, // 当前数据对象
      levelPathList: [
        // 下钻后所有层级的数据
        {
          areaName: '江西',
          id: '361100000000000001681918',
          areaCode: '36',
          areaType: '1',
          mapCenterLongitude: '115.8202720356450000',
          // mapCenterLatitude: '28.6993654539487000',
          mapCenterLatitude: '27.6993654539487000', // 28.6993654539487000 - 1为了显示靠上一点
          boundBorderList: [], // 描边数据
          markListData: [] // 打点数据
        }
      ],
      opticalOverLay: null, // 光缆资源
      supportNetworkOverLay: null, // 支撑网资源
      pipeOverLay: null, // 管道杆路资源
      supportOverLay: null, // 支撑段
      dataSourceOverLayt: null, // 数据网资源
      opticalCarTrack: null // 光缆资源轨迹  网速加载太慢了，不建议做轨迹
    }
  },
  watch: {
    // 区域边线
    boundBorderList: {
      handler(val) {
        // console.log('map-watch-boundBorderList')
        // 如果是从省进来的，则描边，否则不描;市一级的会在js中重新组装描边。这里只负责省一级的
        // areaType，区域类型，行政区划类型。枚举值，0：国家；1：省级；2：市级；3：县级；4：乡级；5：村级；6：网格；…。
        if (val.length > 0 && val[0].areaType === '1') {
          this.levelPathList[0].boundBorderList = this.boundBorderList
          this.levelPathList[0].labelList = this.boundBorderList.slice(1)
          this.currentLevelData = { ...this.levelPathList[0] }
          console.log('currentLevelData==', this.levelPathList[0])
          this.drawArea()
          this.addLabel() // 虽然是有描边数据，才需要有label，但是省份是有子描边，可以由此产生11个由子描边获取的11个label.但是市没有子描边，只会产生一个label,所以不能把label封在描边函数里
        }
      },
      deep: true
      // immediate: true
    },
    // 监听状态，渲染支持下钻的点位信息
    markerState: {
      handler(val) {
        const initMap = sessionStorage.getItem('initMap') || 'yes'
        if (
          val.boundBorderList.length > 0 &&
          val.markData.length > 0 &&
          initMap === 'yes'
        ) {
          // console.log('首次进来了。。。。。')
          this.levelPathList[0].markListData = this.markData
          this.currentLevelData = { ...this.levelPathList[0] }
          this.addMarkers()
          sessionStorage.setItem('initMap', 'no') // 表示已经加载过一次了
        }
      },
      deep: true
      // immediate: true
    },
    // 下钻取得相应的数据
    levelPathList: {
      handler(val) {
        this.currentLevelData = {
          ...this.levelPathList[this.levelPathList.length - 1]
        }
      },
      deep: true,
      immediate: true
    },
    // 渲染光缆资源数据
    opticalList: {
      handler(val) {
        if (val.length > 0) {
          this.renderLine('opticalOverLay', val || [], '#EDF503')
        }
      },
      deep: true
    },
    //  支撑网资源
    supportNetworkList: {
      handler(val) {
        if (val.length > 0) {
          this.renderLine('supportNetworkOverLay', val || [], '#d2814d')
        }
      },
      deep: true
    },
    // 管道资源
    pipeList: {
      handler(val) {
        if (val.length > 0) {
          this.renderLine('pipeOverLay', val || [], '#00ea9b')
        }
      },
      deep: true
    },
    // 数据网资源
    dataSourceList: {
      handler(val) {
        if (val.length > 0) {
          this.renderLine('dataSourceOverLay', val || [], '#fe5a75')
        }
      },
      deep: true
    },
    // 支撑段
    supportList: {
      handler(val) {
        if (val.length > 0) {
          // console.log('支撑段==', val)
          this.renderLine('supportOverLay', val || [], '#F00D9B')
        }
      },
      deep: true
    }
  },
  computed: {
    ...mapState({
      boundBorderList: (state) => {
        return state.map.boundBorderData
      },
      markData: (state) => {
        return state.viewData.map.markData
      },
      // 光缆资源
      opticalList: (state) => {
        return state.map.opticalList
      },
      // 支撑网资源
      supportNetworkList: (state) => {
        return state.map.supportNetworkList
      },
      // 管道杆路资源
      pipeList: (state) => {
        return state.map.pipeList
      },
      // 支撑段
      supportList: (state) => {
        return state.map.supportList
      },
      // 数据网资源
      dataSourceList: (state) => {
        return state.map.dataSourceList
      }
    }),
    markerState() {
      const { boundBorderList, markData } = this
      return {
        boundBorderList,
        markData
      }
    }
  },
  methods: {
    // 创建信息窗口对象
    initChart() {
      // 创建地图实例
      this.map = new window.T.Map('mapDiv', {
        attributionControl: false,
        inertia: false
      })
      // this.addMap(this.center)
      this.addMap(this.center)
      this.initMap = true

      // 设置暗色调颜色
      this.map.setStyle('indigo')

      //  根据地理名称，从新进行地址解析
      // this.geocoder = new window.T.Geocoder()

      // 添加菜单:鼠标右键
      // this.addMenu()
    }
  },
  mounted() {
    const id = JSON.parse(localStorage.getItem('userInfo')).areaId
    this.$store.dispatch('map/getBoundBorderData', id, '1')
    // 初始化地图
    this.initChart()
    // this.getMapOptical()
  },
  created() {
    sessionStorage.clear()
    window.addEventListener('beforeunload', () => {
      // console.log('页面刷新')
      sessionStorage.clear()
    })
    // 初始化一个对象，用来装载正在操作的层
    this.currentLevelData = { ...this.levelPathList[0] }
  }
}
</script>

<style lang="scss"></style>

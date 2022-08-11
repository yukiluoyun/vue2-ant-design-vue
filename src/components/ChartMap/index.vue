<template>
  <a-spin :spinning="mapLoading">
    <v-chart
      class="chartMap"
      :option="mapOpt"
      autoresize
      @click="chartClick"
      v-if="!mapLoading"
    />
  </a-spin>
</template>

<script>
import mapFiles from '@/utils/mapFiles'
import * as echarts from 'echarts'
export default {
  name: 'index',
  data() {
    return {
      mapLoading: true,
      mapOpt: {
        // backgroundColor: {
        //   type: 'linear',
        //   x: 0,
        //   y: 0,
        //   x2: 1,
        //   y2: 1,
        //   colorStops: [
        //     {
        //       offset: 0,
        //       color: '#0f378f' // 0% 处的颜色
        //     },
        //     {
        //       offset: 1,
        //       color: '#00091a' // 100% 处的颜色
        //     }
        //   ],
        //   globalCoord: false // 缺省为 false
        // },
        grid: {
          left: 0,
          top: 0,
          bottom: 0,
          right: 0
        },
        visualMap: {
          show: true,
          min: 0,
          max: 500,
          left: 'left',
          top: 'bottom',
          text: ['高', '低'], // 文本，默认为数值文本
          calculable: true,
          seriesIndex: [1],
          inRange: {}
        },
        geo: {
          map: '江西省',
          roam: true,
          label: {
            show: true,
            color: ' rgb(28, 253, 255)'
          },
          itemStyle: {
            areaColor: '#3a7fd5',
            borderColor: '#0a53e9', //线
            shadowColor: '#092f8f', //外发光
            shadowBlur: 20
          },
          select: {
            label: {
              show: true,
              position: [10, 10],
              distance: 5,
              rotate: 30,
              color: 'purpel'
            }
          }
        }
      }
    }
  },

  components: {},

  methods: {
    initCharts(code) {
      let areaName = ''
      let url = ''
      const index = Object.keys(mapFiles).find((key) => {
        const item = mapFiles[key]
        if (item.code === +code) {
          areaName = key
          url = item.url
          return true
        }
      })

      if (index) {
        this.createMap(areaName, url)
      }
    },
    //创建地图
    createMap(areaName, url) {
      this.register(areaName, url).then((res) => {
        if (res) {
          console.log('createMap-areaName-,areaName==', areaName)

          // 获取dom节点
          // let chartMap = echarts.init(this.$refs.chartMap)
          this.mapOpt.geo.map = areaName
          // option配置写在最下面的
          // chartMap.setOption(this.mapOpt)
        }
      })
    },
    register(areaName, url) {
      return new Promise((resolve, reject) => {
        this.$http
          .get(`${process.env.VUE_APP_STATIC}/map/${url}`)
          .then((geoJson) => {
            console.log('register-areaName==', areaName)
            console.log('register-geoJson==', geoJson)
            this.mapLoading = false
            this.mapOpt.geo.map = areaName
            echarts.registerMap(areaName, geoJson)
            return resolve(true)
          })
      }).catch((err) => {
        return Promise.reject(err)
      })
    },
    chartClick(params) {
      console.log(params)
      let areaName = params.name
      let url = ''
      const index = Object.keys(mapFiles).find((key) => {
        const item = mapFiles[key]
        if (key === areaName) {
          url = item.url
          return true
        }
      })
      if (index) {
        this.createMap(areaName, url)
      }
    }
  },
  mounted() {
    this.initCharts(360000)
  },

  created() {}
}
</script>

<style lang="scss" scoped>
.chartMap {
  width: 100%;
  height: calc(100000vh / 1080);
}
</style>

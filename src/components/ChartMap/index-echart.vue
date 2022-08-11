<template>
  <div ref="chartMap" class="chartMap" />
</template>

<script>
import mapFiles from '@/utils/mapFiles'
import * as echarts from 'echarts'
export default {
  name: 'index',
  data() {
    return {
      mapOpt: {
        geo: {
          map: ''
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
          let chartMap = echarts.init(this.$refs.chartMap)
          this.mapOpt.geo.map = areaName
          // option配置写在最下面的
          chartMap.setOption(this.mapOpt)
        }
      })
    },
    register(areaName, url) {
      return new Promise((resolve, reject) => {
        this.$http
          .get(`${process.env.VUE_APP_STATIC}/map/${url}`)
          .then((geoJson) => {
            echarts.registerMap(areaName, geoJson)
            resolve(true)
          })
      }).catch((err) => {
        return Promise.reject(err)
      })
    },
    mapClick(aaa) {
      console.log(aaa)
    }
  },
  mounted() {
    this.initCharts(360500)
  },

  created() {}
}
</script>

<style lang="scss" scoped>
.chartMap {
  width: 300px;
  height: 300px;
}
</style>

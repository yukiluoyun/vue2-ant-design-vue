<template>
  <div class="item">
    <div id="map" class="tdMap"></div>
    <a-button-group class="btns">
      <a-button
        type="primary"
        @click="
          addWmsLayer(
            'demo_city,demo_road,demo_anno',
            'http://gisserver.tianditu.com/tiandituService/wms'
          )
        "
      >
        叠加WMS服务图层
      </a-button>

      <!-- <a-button
        type="primary"
        @click="
          addWmsLayer(
            'demo_city,demo_road,demo_anno',
            'http://gisserver.tianditu.com/tiandituService/wms'
          )
        "
      >
        叠加WMS服务图层
      </a-button> -->
      <a-button @click="map.removeLayer(wmsLayer)">删除瓦片图</a-button>
    </a-button-group>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      map: null,
      zoom: 7,
      wmsLayer: null
    }
  },

  components: {},

  methods: {
    load() {
      this.map = new T.Map('map')
      this.map.centerAndZoom(
        // new T.LngLat(115.820272035645, 27.6993654539487),
        new T.LngLat(116.40769, 39.89945),
        this.zoom
      )
    },
    getWMS(url, config) {
      if (this.wmsLayer) {
        this.map.removeLayer(this.wmsLayer)
      }
      this.wmsLayer = new T.TileLayer.WMS(url, config)
      this.map.addLayer(this.wmsLayer)
    },
    addWmsLayer(layers, url) {
      console.log('addWmsLayer-layers', layers)
      console.log('addWmsLayer-url', url)
      var config = {
        version: '1.1.1', //请求服务的版本
        layers: layers,
        transparent: true, //输出图像背景是否透明
        styles: '', //每个请求图层的用","分隔的描述样式
        format: 'image/png' //输出图像的类型
      }
      this.getWMS(url, config)
    }
  },
  mounted() {
    let T = window.T
    this.load()
  }
}
</script>

<style lang="scss" scoped>
.item {
  position: relative;
}
.tdMap {
  width: 100%;
  height: calc(40000vh / 1080);
}
.btns {
  position: absolute;
  top: -50px;
  left: 0;
  z-index: 2;
}
</style>

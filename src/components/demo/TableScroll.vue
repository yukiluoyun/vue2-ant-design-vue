<template>
  <div class="jg-dw-jr">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <div class="title">
      <i class="fa fa-chevron-right" aria-hidden="true"></i
      ><i class="fa fa-chevron-right icon-right" aria-hidden="true"></i>
      监管单位接入情况
    </div>
    <div class="jcContMain">
      <ul class="th">
        <li style="width: 12%">序号</li>
        <li>区域名称</li>
        <li style="width: 25%">监管单位数量</li>
        <li>接入数量</li>
        <li>接入比例</li>
      </ul>
      <vue-seamless-scroll
        :data="tableData"
        :class-option="optionHover"
        class="seamless-warp"
      >
        <ul class="tr-cont" v-for="(item, index) in tableData" :key="index">
          <li style="width: 12%">{{ index + 1 }}</li>
          <li>{{ item.code }}</li>
          <li style="width: 25%">{{ item.name }}</li>
          <li>{{ item.time }}</li>
          <li>{{ item.state }}</li>
        </ul>
      </vue-seamless-scroll>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    }
  },
  computed: {
    optionHover() {
      return {
        step: 0.5, // 数值越大速度滚动越快
        limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
      }
    }
  },
  mounted() {
    this.showCityFun()
  },
  methods: {
    getRowClass({ row, column, rowIndex, columnIndex }) {
      return 'background:#03487B;color:#1adafb;'
    },
    showCityFun() {
      const data = []
      for (let i = 1; i < 30; i++) {
        const state = i % 2 === 0 ? 0 : 1
        const obj = {
          code: i,
          id: '00' + i,
          name: 'John Brown' + i,
          time: '2022-07-22',
          state: state
        }
        data.push(obj)
      }
      this.tableData = data
    }
  }
}
</script>
<style lang="scss" scoped>
.seamless-warp {
  margin-top: 10px;
  width: 100%;
  height: 300px;
  overflow: hidden;
}
.jcContMain {
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  .th {
    background: #03487b;
    color: #1adafb;
    font-weight: bold;
    list-style: none;
    padding: 0px;
    margin: 0px;
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    text-align: center;
    li {
      white-space: nowrap;
      display: block;
      width: 21%;
      float: left;
      text-indent: 2em;
    }
  }
  .tr-cont {
    font-size: 14px;
    list-style: none;
    padding: 0px;
    margin: 0px;
    width: 100%;
    height: 45px;
    line-height: 45px;
    li {
      text-align: center;
      display: block;
      width: 21%;
      float: left;
      text-indent: 2em;
    }
    &:hover {
      background-color: rgba($color: #03487b, $alpha: 0.5) !important;
    }
  }
}

.jg-dw-jr {
  margin-top: 10px;
  background: #062043;
  background-image: url(../../assets/images/down.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  //四个角边框的
  span {
    display: block;
    width: 10px;
    height: 10px;
    border-left: 3px solid rgba($color: #a1cbff, $alpha: 0.6);
    border-bottom: 3px solid rgba($color: #a1cbff, $alpha: 0.6);
    position: absolute;
  }
  span:nth-child(1) {
    bottom: 0;
    left: 0;
  }
  span:nth-child(2) {
    top: 0;
    left: 0;
    -moz-transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
  }

  span:nth-child(3) {
    top: 0;
    right: 0;
    -moz-transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
  }
  span:nth-child(4) {
    bottom: 0;
    right: 0;
    -moz-transform: rotate(-90deg);
    -webkit-transform: rotate(-90deg);
  }
  .title {
    color: #7999d4;
    font-size: 19px;
    font-weight: 540;
    //箭头图表颜色
    .fa-chevron-right {
      color: #779bd8;
    }
    .icon-right {
      color: #a0c0f6;
      margin: 0 5px 0 -3px;
    }
  }
}
</style>

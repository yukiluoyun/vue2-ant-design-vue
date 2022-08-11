<template>
  <!-- <img alt='Vue logo' src='../assets/logo.png'> -->
  <div class="demo">
    <div class="item">
      <h3>测试rem是否配置好：</h3>
      <div class="rem">test: rem</div>
    </div>
    <div class="item">
      <h3>测试ant-ui是否配置好：</h3>
      <a-button type="primary"> test: ant-design-button </a-button>
    </div>
    <div class="item">
      <h3>测试ant-ui modal事件：是否配置好：</h3>
      <a-button type="warning" @click="showMsg"> showMsg </a-button>
    </div>
    <div class="item">
      <h3>测试eCharts是否配置好：</h3>
      <v-chart class="test-chart chart" autoresize :option="option" />
    </div>
    <div class="item">
      <h3>测试animate是否配置好：</h3>
      <div class="test-animate">
        <div class="text animate__animated animate__flip">
          <div class="titleBox">
            <img src="@/assets/logo.png" />
            <div class="title">法律服务</div>
          </div>
        </div>
      </div>
    </div>
    <div class="item">
      <h3>测试mockjs数据：是否配置好：</h3>
      {{ mockData }}
    </div>
  </div>
</template>

<script>
import { THEME_KEY } from "vue-echarts";
// import { getUserInfoApi } from '@/api/user'

// import axios from 'axios'
export default {
  name: "Home",
  provide: {
    [THEME_KEY]: "dark",
  },

  data() {
    return {
      mockData: {},
      option: {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
          },
        ],
      },
    };
  },
  methods: {
    async getUserInfo() {
      // const result = await getUserInfoApi()
      // this.mockData = result
    },
    showMsg() {},
  },

  mounted() {
    console.log("demo-mounted--挂载加载......");
    this.getUserInfo();
  },
};
</script>

<style lang="scss" scoped>
.demo {
  .item {
    padding: 15px;
    border-bottom: 1px solid skyblue;
    text-align: left;
  }
  h3 {
    text-align: left;
  }
  margin: 10px auto;
  width: 1000px;
  border: 1px solid red;
  .rem {
    width: 50%;
    height: 100px;
    background: pink;
  }

  .chart {
    width: 800px;
    height: 200px;
    background: skyblue;
  }

  img {
    width: 100px;
    height: 100px;
  }
}
</style>

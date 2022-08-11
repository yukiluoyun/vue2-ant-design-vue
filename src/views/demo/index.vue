<template>
  <div>
    <div
      style="background-color: rgb(236, 236, 236, 0.3); padding: 20px"
      v-waves
    >
      <a-row :gutter="16" class="row1">
        <a-col :span="8">
          <a-card title="检测mock导入正常" :bordered="false">
            <Mock />
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card title="检测rem是否配置正常" :bordered="false">
            <demo-rem />
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card title="检测transition是否配置正常 " :bordered="false">
            <transition />
          </a-card>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="8">
          <a-card title="检测ant-design-vue是否导入正常" :bordered="false">
            <ant-component />
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card title="v-echarts导入" :bordered="false">
            <demo-chart />
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card title="表格封装" :bordered="false">
            <demo-table />
          </a-card>
        </a-col>
      </a-row>
      <a-row :gutter="16" class="row3">
        <a-col :span="12">
          <a-card title="检测天地图导入" :bordered="false">
            <td-map />
          </a-card>
        </a-col>
        <a-col :span="12">
          <a-card title="检测echarts地图" :bordered="false">
            <chart-map />
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import DemoRem from '@/components/demo/Rem'
import AntComponent from '@/components/demo/antComponent'
import Transition from '@/components/demo/Transition'
import Mock from '@/components/demo/Mock'
import DemoChart from '@/components/demo/DemoChart'
import DemoTable from '@/components/demo/Table'
import TdMap from '@/components/TiandiMap'
import ChartMap from '@/components/ChartMap'
export default {
  name: 'demo',
  data() {
    return {}
  },

  components: {
    AntComponent,
    DemoRem,
    Transition,
    Mock,
    DemoChart,
    DemoTable,
    TdMap,
    ChartMap
  },

  methods: {},

  created() {}
}
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
}
.ant-row {
  margin-bottom: 20px;
}
:deep .ant-card {
  background: rgba(255, 255, 255, 0.3);
}
:deep .ant-card-body {
  height: calc(26000vh / 1080);
  overflow: auto;
}
.row1 :deep .ant-card-body {
  height: calc(10000vh / 1080) !important;
}
.row3 :deep .ant-card-body {
  height: calc(40000vh / 1080) !important;
}
</style>

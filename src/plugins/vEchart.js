// import isEmpty from 'lodash/isEmpty';
// import isArray from 'lodash/isArray';
// import compact from 'lodash/compact';
// import ECharts from 'vue-echarts';
// import 'echarts/lib/chart/bar'; // 柱状图
// import 'echarts/lib/chart/line'; // 线图
// import 'echarts/lib/chart/pie'; // 饼转图
// import 'echarts/lib/chart/custom'; // 饼转图
// import 'echarts/lib/chart/scatter'; // 散点图
// import 'echarts/lib/chart/tree'; // 树图
// import 'echarts/lib/chart/treemap';
// import 'echarts/lib/chart/boxplot'; // 箱形图、盒须图、盒式图、盒状图、箱线图
// import 'echarts/lib/chart/candlestick'; // k线图
// import 'echarts/lib/chart/map'; // 地图
// import 'echarts/lib/chart/pictorialBar'; // 人物
// import 'echarts/lib/component/title';
// import 'echarts/lib/component/legend';
// import 'echarts/lib/component/tooltip';
// import 'echarts/lib/component/toolbox';
// import 'echarts/lib/component/dataZoom';
// import 'echarts/lib/component/markLine';
// import 'echarts/lib/component/markPoint';
// import 'echarts/lib/component/visualMap';
// import 'echarts/lib/component/timeline';
import { LineChart, BarChart, PieChart, MapChart } from 'echarts/charts' //引入折线图
// import { UniversalTransition } from 'echarts/features'; // 全局延时动画，里面很多个方法
// import { CanvasRenderer } from 'echarts/renderers'; //使用canvas渲染，可选使用svg渲染
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  PolarComponent
} from 'echarts/components'
// import VChart, { THEME_KEY } from 'vue-echarts';
import { use } from 'echarts'
use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  PolarComponent,
  LineChart,
  BarChart,
  PieChart,
  MapChart

  // CanvasRenderer,
  // UniversalTransition,
])

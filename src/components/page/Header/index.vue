<template>
  <div class="header">
    <h2>模板</h2>
    <p class="weather">
      <!-- <svg-icon iconClass="battery" />
      <svg-icon iconClass="coincidence" />
      <svg-icon iconClass="station" /> -->
      <span>{{ time.year }}</span
      ><i>-</i> <span>{{ time.month }}</span
      ><i>-</i>
      <span>{{ time.date }}</span>
      <span>{{ time.week }}</span>
    </p>

    <!-- <a-button-group class="route-group" size="small" @change="onChange">
      <a-button
        @click="toPath('home')"
        :type="pathFlag === 'home' ? 'primary' : 'default'"
      >
        首页
      </a-button>
      <a-button
        @click="toPath('drive')"
        :type="pathFlag === 'drive' ? 'primary' : 'default'"
      >
        领导驾驶舱
      </a-button>
    </a-button-group> -->
  </div>
</template>

<script>
// import axios from 'axios'
import utils from '@/utils/common'
export default {
  components: {},
  props: {},
  data() {
    return {
      weather: {},
      baseUrl: process.env.baseUrl,
      currentRoutePath: 'adminHome',
      pathFlag: 'home',
      homePath: true,
      drivePath: false
    }
  },
  computed: {
    // ...mapState('user', ['userInfo']),

    weatherIcon() {
      // xue 、lei、shachen、wu、bingbao、yun、yu、yin、qing
      const { wea_img: weaImg } = this.weather
      let flag = ''
      switch (weaImg) {
        case 'xue':
          flag = 'xiaoxue2'
          break
        case 'lei':
          flag = 'leizhenyu'
          break
        case 'wu':
          flag = 'yejianwu'
          break
        case 'bingbao':
          flag = 'bingbao'
          break
        case 'yun':
          flag = 'duoyun'
          break
        case 'yin':
          flag = 'yin'
          break
        case 'qing':
          flag = 'qing'
          break
        default:
          flag = 'duoyun'
      }
      return require(`@/assets/images/${flag}.png`)
    },
    time() {
      return utils.time
    }
  },

  mounted() {
    this.currentRoutePath = this.$route.path
  },
  methods: {
    toPath(pathName) {
      const params = JSON.parse(localStorage.getItem('userInfo'))
      if (pathName === 'home') {
        this.pathFlag = 'home'
        // this.$router.push('/adminHome')
        this.$router.push({ name: 'adminHome', query: { ...params } })
      } else {
        this.pathFlag = 'drive'
        this.$router.push({ name: 'adminDrive', query: { ...params } })
        // this.$router.push('/adminDrive')
      }
    },
    onChange(path) {
      console.log('path==', path)
    }

    // async getWeather() {
    //   const result = await axios.get(
    //     'https://www.yiketianqi.com/free/day?appid=91779147&appsecret=9WhOIlI7&unescape=1',
    //     'get'
    //   )
    //   this.weather = result.data
    // }
  }
}
</script>
<style scoped lang="scss">
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(8400vh / 1080);
  background-size: cover;
  position: relative;
  background: url(../../../assets/images/header-bg.png) no-repeat center;
  background-size: 100% 100%;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;

  h2 {
    // color: red;
    color: rgba(16, 21, 43, 1);
    font-size: 38px;
    letter-spacing: 3px;
    font-weight: bold;
    position: relative;
    padding-top: 10px;
    margin-bottom: 0;
    margin-top: 5px;
    margin-left: 5px;
    &::after {
      position: absolute;
      content: '模板';
      color: #fff;
      left: 0;
      top: 0;
      z-index: 1;
    }
  }
  .weather {
    position: absolute;
    right: 0;
    top: 5px;
    text-align: right;
    display: flex;
    align-items: center;
    margin-right: 20px !important;
    img {
      width: 1.5em;
      height: 1.5em;
    }
    span {
      &:nth-last-of-type(1) {
        margin-left: 10px;
      }
    }
  }
}

.route-group {
  position: absolute;
  right: 10px;
  top: calc(3300vh / 1080);
}
</style>

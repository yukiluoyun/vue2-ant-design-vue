<template>
  <div class="page">
    <!-- 切换隐藏左右两侧 -->
    <a-tooltip placement="topLeft" :title="triggerImg.title">
      <a
        href="javascript:;"
        class="icon iconfont icon-shouqi triggerBtn"
        :class="{ cyan: triggerFlag }"
        @click="triggerPage"
      ></a>
    </a-tooltip>
    <page-header />

    <transition
      appear
      name="animate__animated animate__bounce"
      enter-active-class="animate__backInLeft"
      leave-active-class="animate__backOutDown"
    >
      <div class="left" v-show="triggerFlag">
        <item-one />
        <item-two />
      </div>
    </transition>

    <div class="center map-wrap"><chart-map /></div>
    <transition
      appear
      name="animate__animated animate__bounce"
      enter-active-class="animate__backInRight"
      leave-active-class="animate__backOutDown"
    >
      <div class="right" v-show="triggerFlag">
        <item-one />
        <item-two />
      </div>
    </transition>
  </div>
</template>

<script>
import PageHeader from '@/components/page/Header'
import ItemOne from './ItemOne'
import ItemTwo from './ItemTwo'
import ChartMap from '@/components/ChartMap'
export default {
  name: 'page',
  data() {
    return { triggerFlag: true }
  },

  components: { PageHeader, ItemOne, ItemTwo, ChartMap },

  methods: {
    triggerPage() {
      console.log('triggerFlag 0==', this.triggerFlag)
      this.triggerFlag = !this.triggerFlag
      console.log('triggerFlag 1==', this.triggerFlag)
    }
  },
  computed: {
    triggerImg() {
      if (this.triggerFlag) {
        return {
          src: require('@/assets/images/toClose.png'),
          title: '折叠地图周边模块'
        }
      } else {
        return {
          src: require('@/assets/images/toOpen.png'),
          title: '展开地图周边模块'
        }
      }
    }
  },

  created() {}
}
</script>

<style lang="scss" scoped>
.triggerBtn {
  position: fixed;
  left: 20px;
  top: calc(3300vh / 1080);
  width: 20px;
  z-index: 20;
  font-size: 20px;
  cursor: pointer;
  color: #fff;
  :hover,
  :link,
  :active,
  :visited {
    color: #fff;
  }
  :hover {
    color: $cyan;
  }
}
</style>

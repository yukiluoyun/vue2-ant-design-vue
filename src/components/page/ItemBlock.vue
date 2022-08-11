<template>
  <div class="item-block">
    <div class="title">
      <div class="border-top"></div>
      <div class="row">
        <div class="border-left"></div>
        <div class="content">
          <div>
            <slot name="icon">
              <i class="icon iconfont icon-dikuangtongyitubiao"></i
            ></slot>
            <slot name="title"><span class="text">标题占位</span></slot>
          </div>
          <div class="right" @click="showModal">
            <slot name="fnIcon"
              ><i class="icon iconfont icon-doubleArrow"></i
            ></slot>
          </div>
        </div>
        <div class="border-right"></div>
      </div>
    </div>

    <div class="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemBlock',
  data() {
    return {}
  },

  components: {},

  methods: {
    showModal() {
      this.$emit('showModal')
    }
  },

  created() {}
}
</script>

<style scoped lang="scss">
.title {
  height: calc(4000vh / 1080);
  line-height: calc(4000vh / 1080);
  background: #074b8a;
  position: relative;
  .row {
    height: 100%;
    display: flex;
    justify-content: space-between;
    .content {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 15px;
      .text {
        margin-left: 5px;
        color: #fff;
      }
      .icon {
        color: #fff;
        font-size: 20px;
      }
      img {
        width: 32px;
        height: auto;
      }
    }
    .right {
      .icon {
        color: #1cfdff;
        cursor: pointer;
      }
    }
  }
  .border-top {
    width: 100% !important;
    width: 100px;
    height: 2px;
    background-image: radial-gradient(
      rgba(28, 253, 255, 1),
      rgba(28, 253, 255, 0)
    );
  }
  .border-left {
    width: 1px;
    height: 100%;
    background-image: radial-gradient(
      rgba(23, 226, 241, 0.3),
      rgba(23, 226, 241, 0)
    );
  }
  .border-right {
    width: 1px;
    height: 100%;
    background-image: radial-gradient(
      rgba(23, 218, 238, 0.3),
      rgba(23, 218, 238, 0)
    );
  }
}
</style>

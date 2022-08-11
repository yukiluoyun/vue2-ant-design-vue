<template>
  <div>
    <a-button type="primary"> 时间组件 </a-button> <br />
    <a-range-picker
      @change="onChange"
      :placeholder="['开始时间', '结束时间']"
      @ok="onOk"
    />
  </div>
</template>

<script>
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");
export default {
  name: "antComponent",
  data() {
    return {};
  },

  components: {},

  methods: {
    onChange(date, dateString) {
      console.log(date, dateString);
    },
    onOk() {},
  },

  created() {},
};
</script>

<style lang="scss" scoped></style>

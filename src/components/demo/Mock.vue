<template>
  <div>
    <a-button type="primary" @click="getMock"
      >点击调用mock接口-userInfo</a-button
    >
    <div class="userInfo">{{ userInfo }}</div>
  </div>
</template>

<script>
import { getUserInfoApi } from "@/api/user";
export default {
  name: "Mock",
  data() {
    return {
      userInfo: {},
    };
  },

  components: {},

  methods: {
    async getMock() {
      const res = await getUserInfoApi();
      this.userInfo = JSON.stringify(res.data);
    },
  },

  created() {},
};
</script>

<style lang="scss" scoped>
.userInfo {
  width: 70%;
  height: 300px;
  overflow: auto;
}
</style>

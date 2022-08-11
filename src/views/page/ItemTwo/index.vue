<template>
  <item-block @showModal="showModal">
    <template v-slot:icon>
      <img src="@/assets/images/itemTitle.png" alt="" class="item-title-bg" />
    </template>
    <template v-slot:title>
      <span class="text">itemOne 标题</span>
    </template>
    <template v-slot:fnIcon>
      <i class="icon iconfont icon-doubleArrow cyan"></i>
    </template>

    <template v-slot:content> itemOne 内容 </template>
  </item-block>
</template>

<script>
import ItemBlock from '@/components/page/ItemBlock'
export default {
  name: 'indev',
  data() {
    return {}
  },

  components: { ItemBlock },

  methods: { showModal() {} },

  created() {}
}
</script>

<style lang="scss" scoped></style>

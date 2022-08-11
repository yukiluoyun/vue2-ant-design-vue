<template>
  <div>
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

    <my-modal v-bind="{ ...modal }" @closeModal="closeModal" />
  </div>
</template>

<script>
import ItemBlock from '@/components/page/ItemBlock'
import MyModal from './itemModal'
export default {
  name: 'indev',
  data() {
    return {
      modal: {
        // title: 'aaaaa',
        visible: false
      }
    }
  },

  components: { ItemBlock, MyModal },

  methods: {
    showModal() {
      this.modal.visible = true
    },
    closeModal() {
      this.modal.visible = false
    }
  },

  created() {}
}
</script>

<style lang="scss" scoped></style>

<template>
  <a-modal
    title="Title"
    width="900"
    :visible="visible"
    :confirm-loading="confirmLoading"
    @ok="handleOk"
    @cancel="closeModal"
  >
    <p>{{ ModalText }}</p>
  </a-modal>
</template>

<script>
export default {
  name: 'index',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ModalText: 'Content of the modal',
      // visible: false,
      confirmLoading: false
    }
  },

  components: {},

  methods: {
    handleOk(e) {
      this.ModalText = 'The modal will be closed after two seconds'
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false
      }, 2000)
    },
    closeModal() {
      this.$emit('closeModal')
    }
  },

  created() {}
}
</script>

<style lang="scss" scoped></style>

<template>
  <table-pagination
    :columns="myColumns"
    :tableData="tableData"
    @refleshTable="refleshTable"
  >
    <template slot="state" slot-scope="{ record }">
      <span :class="{ red: record.state === 0 }">
        {{ record.state | stateFilter }}</span
      >
    </template>
  </table-pagination>
</template>

<script>
import TablePagination from '@/components/TablePagination'
export default {
  name: 'Table',
  data() {
    return {
      myColumns: [
        {
          title: '编号',
          dataIndex: 'code',
          key: 'code',
          width: 60
        },
        {
          title: '名称',
          dataIndex: 'name',
          key: 'name',
          slots: { title: '别名' }
        },
        {
          title: '完成时间',
          dataIndex: 'time',
          key: 'time',
          ellipsis: true
        },
        {
          title: '状态',
          dataIndex: 'state',
          key: 'state',
          scopedSlots: { customRender: 'state' }
          // ellipsis: true
        },
        {
          title: '操作',
          dataIndex: 'operation',
          key: 'operation'
          // ellipsis: true
        }
      ],
      tableData: []
    }
  },

  components: { TablePagination },

  methods: {
    fetchData() {
      let list = []
      for (let i = 1; i < 30; i++) {
        const state = i % 2 === 0 ? 0 : 1
        const obj = {
          code: i,
          id: '00' + i,
          name: '中国' + i,
          time: '2022-08-22',
          state: state
        }
        list.push(obj)
      }

      this.tableData = list
    },
    refleshTable() {
      console.log('调用组件的父组件表格刷新')
      this.fetchData()
    }
  },
  filters: {
    stateFilter(val) {
      return val === 1 ? '非1正常' : '0异常'
    }
  },
  mounted() {
    this.fetchData()
  },

  created() {}
}
</script>

<style lang="scss" scoped>
.red {
  color: $cyan;
}
</style>

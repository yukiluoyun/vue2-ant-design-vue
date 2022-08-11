<template>
  <div>
    <!-- <a-config-provider :locale="locale"> -->
    <a-table
      class="my-table"
      ref="table"
      :loading="loading"
      :pagination="{
        ...pagination,
        showQuickJumper: true,
        showTotal: () => {
          return `共${pagination.total}页`
        }
      }"
      v-bind="getBindValues"
      :columns="columns"
      :data-source="tableData"
      :rowKey="(data) => data.id"
      :row-selection="needCheckList ? rowSelection : null"
      @change="handleTableChange"
    >
      <template
        v-for="column in columns"
        :slot="column.scopedSlots ? column.scopedSlots.customRender : ''"
        slot-scope="text, record, index"
      >
        <slot
          :name="column.scopedSlots ? column.scopedSlots.customRender : ''"
          v-bind="{ text, record, index }"
        >
          {{ text }}
        </slot>
      </template>
      <!-- 表头插槽 -->
      <template
        v-for="column in columns"
        :slot="column.slots ? column.slots.title : ''"
      >
        <slot :name="column.slots ? column.slots.title : ''"></slot>
      </template>
    </a-table>
    <!-- </a-config-provider> -->
  </div>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows
    )
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows)
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows)
  }
}

const columns = [
  {
    title: '编号0',
    dataIndex: 'code',
    key: 'code',
    width: 60,
    scopedSlots: { customRender: 'code' }
  },
  {
    title: '名称0',
    dataIndex: 'name',
    key: 'name',
    slots: { title: '别名' }
  },
  {
    title: '完成时间0',
    dataIndex: 'time',
    key: 'time',
    ellipsis: true
  },
  {
    title: '状态0',
    dataIndex: 'state',
    key: 'state'
    // ellipsis: true
  },
  {
    title: '操作0',
    dataIndex: 'operation',
    key: 'operation'
    // ellipsis: true
  }
]
const data = []
for (let i = 1; i < 30; i++) {
  const state = i % 2 === 0 ? 0 : 1
  const obj = {
    code: i,
    id: '00' + i,
    name: 'John Brown' + i,
    time: '2022-07-22',
    state: state
  }
  data.push(obj)
}

export default {
  name: 'index',
  props: {
    columns: {
      type: Array,
      default: () => columns
    },
    tableData: {
      type: Array,
      default: () => data
    },
    selectedRowKeys: {
      type: Array,
      default: () => []
    },
    // 是否需要复选框
    needCheckList: {
      type: Boolean,
      default: true
    },
    // 是否分页
    paginationFlag: {
      type: Boolean,
      default: true
    },
    pagination: {
      type: Object,
      default: () => {
        return {
          pageSizeOptions: ['10', '20', '30', '40', '50'],
          current: 1,
          pageSize: 3,
          total: 5
        }
      }
    }
  },
  data() {
    return {
      rowSelection,
      loading: false,
      locale: zhCN
    }
  },

  components: {},
  computed: {
    getBindValues() {
      return { ...this.$attrs }
    }
  },

  methods: {
    // handleTableChange(pagination, filters, sorter, { currentDataSource }) {
    handleTableChange(pagination, filters, sorter) {
      console.log('表格数据变化，比如点击分页')
      const params = {
        pagination,
        filters,
        sorter
      }
      this.$emit('refleshTable', false, params)
    }
  },

  created() {}
}
</script>

<style lang="scss" scoped>
:deep .ant-table-body,
.ant-table-header {
  word-break: break-all;
  &::-webkit-scrollbar {
    width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background: rgba(37, 95, 168, 0.5);
    &:hover {
      background: rgba(37, 95, 168, 0.8);
    }
  }
  &::-webkit-scrollbar-track {
    border-radius: 5px;
    background: transparent;
  }
}
:deep .ant-table-thead > tr > th,
:deep .ant-table-tbody > tr > td {
  padding: 3px 5px;
}
</style>

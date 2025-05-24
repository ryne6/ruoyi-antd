<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import type { ButtonType } from 'ant-design-vue/es/button'
import SearchList from '@/components/common/searchList/index.vue'
import PageTable from '@/components/common/pageTable/index.vue'

const searchItems = ref([
  {
    label: '用户名',
    name: 'username',
    type: 'input',
  },
  {
    label: '手机号码',
    name: 'phone',
    type: 'input',
  },
  {
    label: '状态',
    name: 'status',
    type: 'select',
  },
  {
    label: '创建时间',
    name: 'createTime',
    type: 'date-picker',
  },
])

const defaultModel = ref({
  username: '',
  phone: '',
  status: '',
  createTime: '',
})

const columns = ref([
  {
    title: '用户编号',
    dataIndex: 'username',
  },
  {
    title: '用户名称',
    dataIndex: 'phone',
  },
  {
    title: '用户昵称',
    dataIndex: 'status',
  },
  {
    title: '部门',
    dataIndex: '部门',
  },
  {
    title: '手机号码',
    dataIndex: '手机号码',
  },
  {
    title: '状态',
    dataIndex: '状态',
  },
  {
    title: '创建时间',
    dataIndex: '创建时间',
  },
  {
    title: '操作',
    dataIndex: 'action',
  },
])

const headerActions = [
  {
    title: '新增',
    attrs: {
      type: 'primary' as ButtonType,
    },
    icon: PlusOutlined,
    callback: () => {},
  },
]

const searchState = reactive({
  showSearch: true,
})

const mock = {
  username: 'admin',
  phone: '12345678901',
  status: '1',
}

const data = ref(Array.from({ length: 1000 }, () => mock))

function handleSearch() {
  console.log('search')
}

function handleReset() {
  console.log('reset')
}
</script>

<template>
  <BaseCard>
    <SearchList v-show="searchState.showSearch" :search-items="searchItems" :default-model="defaultModel" :on-search="handleSearch" :on-reset="handleReset" />
    <PageTable
      v-model:show-search="searchState.showSearch"
      :header-actions="headerActions"
      :columns="columns"
      :data-source="data"
      :on-search="handleSearch"
    />
  </BaseCard>
</template>

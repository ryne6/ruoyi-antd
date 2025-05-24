<script setup lang="ts" name="ColumnSetting">
import { SettingOutlined } from '@ant-design/icons-vue'
import { computed, h } from 'vue'
import type { ColumnType } from './types'

interface Props {
  columns: ColumnType[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:columns': [columns: ColumnType[]]
}>()

// 计算过滤后的列（基于 column.visible 属性）
const filteredColumns = computed(() => {
  return props.columns.filter((col) => {
    // visible 为 true 或 undefined 时显示，为 false 时隐藏
    return col.visible !== false
  })
})

// 通知父组件列更新
function emitUpdate() {
  emit('update:columns', filteredColumns.value)
}

// 获取可控制的列（排除操作列等）
const controllableColumns = computed(() => {
  return props.columns.filter((col) => {
    return col.dataIndex
      && typeof col.dataIndex === 'string'
      && col.dataIndex !== 'action'
      && !col.title?.toString().includes('操作')
  })
})

// 列显示隐藏控制
function toggleColumn(event: Event, dataIndex: string, visible: boolean) {
  event.stopPropagation()
  event.preventDefault()

  const column = props.columns.find(col => col.dataIndex === dataIndex)
  if (column) {
    column.visible = visible
    emitUpdate()
  }
}

// 重置列显示状态
function resetColumns(event: Event) {
  event.stopPropagation()
  controllableColumns.value.forEach((col) => {
    col.visible = true
  })
  emitUpdate()
}

// 全选/取消全选
function toggleAllColumns(event: Event, checked: boolean) {
  event.stopPropagation()
  controllableColumns.value.forEach((col) => {
    col.visible = checked
  })
  emitUpdate()
}

// 检查是否全选
const isAllSelected = computed(() => {
  return controllableColumns.value.every(col => col.visible !== false)
})

// 检查是否半选
const isIndeterminate = computed(() => {
  const selectedCount = controllableColumns.value.filter(col => col.visible !== false).length
  return selectedCount > 0 && selectedCount < controllableColumns.value.length
})
</script>

<template>
  <a-dropdown placement="bottomRight" :trigger="['click']">
    <a-button :icon="h(SettingOutlined)" />
    <template #overlay>
      <a-menu class="column-setting-menu">
        <div class="px-3 py-2 border-b border-gray-200">
          <a-checkbox
            :checked="isAllSelected"
            :indeterminate="isIndeterminate"
            @change.stop="toggleAllColumns($event, $event.target.checked)"
          >
            <span class="font-medium">列显示</span>
          </a-checkbox>
          <a-button type="link" size="small" class="ml-2 p-0" @click.stop="resetColumns">
            重置
          </a-button>
        </div>
        <div class="max-h-60 overflow-y-auto">
          <div
            v-for="column in controllableColumns"
            :key="column.dataIndex"
            class="column-menu-item"
          >
            <a-checkbox
              :checked="column.visible !== false"
              @change.stop="toggleColumn($event, column.dataIndex as string, $event.target.checked)"
            >
              {{ column.title }}
            </a-checkbox>
          </div>
        </div>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<style scoped>
.column-setting-menu {
  min-width: 160px;
}

.column-menu-item {
  padding: 4px 12px !important;
  margin: 0 !important;
}

.column-menu-item:hover {
  background-color: transparent !important;
}

.column-menu-item .ant-checkbox-wrapper {
  width: 100%;
}
</style>

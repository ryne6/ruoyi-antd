<script setup lang="ts" name="pageTable">
import ColumnSetting from './ColumnSetting.vue'
import { DeleteOutlined, EditOutlined, ExportOutlined, ImportOutlined, PlusOutlined, SearchOutlined, SyncOutlined } from '@ant-design/icons-vue'
import { h, ref } from 'vue'
import type { AntdIconProps } from '@ant-design/icons-vue/lib/components/AntdIcon'
import type { FunctionalComponent } from 'vue'
import type { ButtonProps } from 'ant-design-vue'
import type { ColumnType } from './types'

interface HeaderActionItem {
  title: string
  callback: () => void
  icon?: FunctionalComponent<AntdIconProps>
  attrs?: ButtonProps
}

interface Props {
  columns: ColumnType[]
  dataSource: any[]
  headerActions: HeaderActionItem[]
  autoIcon?: boolean
  showSearch?: boolean
  onSearch?: () => void
}

const props = withDefaults(defineProps<Props>(), {
  columns: () => [],
  dataSource: () => [],
  headerActions: () => [],
  autoIcon: true,
  attrs: {},
  showSearch: true,
  onSearch: () => {},
})

const emit = defineEmits(['update:showSearch'])

const displayColumns = ref(props.columns)

function handleColumnsUpdate(newColumns: any) {
  displayColumns.value = newColumns
}

const defaultIconMap = {
  新增: PlusOutlined,
  删除: DeleteOutlined,
  修改: EditOutlined,
  导入: ImportOutlined,
  导出: ExportOutlined,
}

function getIcon(action: HeaderActionItem) {
  if (action.icon) {
    return h(action.icon)
  }
  if (props.autoIcon && action.title in defaultIconMap) {
    const icon = defaultIconMap[action.title as keyof typeof defaultIconMap]
    return h(icon)
  }
  return null
}
</script>

<template>
  <div class="page-table__header flex mb-2 justify-between">
    <a-space>
      <a-button v-for="(action, i) of headerActions" :key="i" :icon="getIcon(action)" v-bind="action.attrs" @click="action.callback">
        {{ action.title }}
      </a-button>
    </a-space>

    <a-space>
      <a-button :icon="h(SearchOutlined)" @click="emit('update:showSearch', !showSearch)" />
      <a-button :icon="h(SyncOutlined)" @click="onSearch" />
      <ColumnSetting :columns="columns" @update:columns="handleColumnsUpdate" />
    </a-space>
  </div>
  <a-table class="page-table" :columns="displayColumns" :data-source="dataSource" @change="onSearch" />
</template>

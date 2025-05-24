<script setup lang="ts" name="searchList">
import { computed, h, ref } from 'vue'
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons-vue'
import { cloneDeep } from 'lodash-es'
import type { FormSpan } from '@/components/atom/Form/types'

interface SearchItem {
  label: string
  name: string
  type?: string
  attrs?: Record<string, any>
  styles?: Record<string, any>
}

interface Props {
  searchItems: SearchItem[]
  span?: FormSpan
  onChange?: (searchItem: SearchItem, ...args: any) => void
  onSearch?: (params: Record<string, any>) => void
  onReset?: () => void
  searchText?: string
  resetText?: string
  defaultModel?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  searchItems: () => [],
  span: 6,
  type: 'input',
  searchText: '查询',
  resetText: '重置',
  defaultModel: () => ({}),
})

const searchContainerLeft = computed(() => {
  const remainder = props.searchItems.length % 4
  return 4 - remainder - 1
})

const searchForm = ref<Record<string, any>>(cloneDeep(props.defaultModel || {}))

function handleChange(searchItem: SearchItem, ...args: any) {
  props.onChange?.(searchItem, ...args)
}

function handleSearch() {
  props.onSearch?.(searchForm.value)
}

function handleReset() {
  searchForm.value = cloneDeep(props.defaultModel)
  props.onReset?.()
}
</script>

<template>
  <v-form :model="searchForm" :span="6">
    <v-form-item v-for="searchItem in searchItems" :key="searchItem.name" :label="searchItem.label" :name="searchItem.name">
      <component v-bind="searchItem.attrs" :is="`a-${searchItem.type}`" v-model:value="searchForm[searchItem.name]" class="w-full" @change="(...args: any[]) => handleChange(searchItem, ...args)" />
    </v-form-item>

    <a-col v-for="(_item, i) of searchContainerLeft" :key="i" :span="6" />
    <a-col :span="6" class="text-right mb-22px">
      <a-space>
        <a-button :icon="h(SearchOutlined)" type="primary" @click="handleSearch">
          查询
        </a-button>
        <a-button :icon="h(ReloadOutlined)" @click="handleReset">
          重置
        </a-button>
      </a-space>
    </a-col>
  </v-form>
</template>

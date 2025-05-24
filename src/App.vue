<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { effect } from 'vue'
import { theme } from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import enUS from 'ant-design-vue/es/locale/en_US'
import { useSystemStore } from '@/store/system/index'

const { state, primaryColor } = storeToRefs(useSystemStore())

effect(() => {
  if (state.value.showDynamicTitle) {
    document.title = `${state.value.defaultTitle} - ${state.value.currentRouteTitle}`
    return
  }
  document.title = state.value.defaultTitle
})
</script>

<template>
  <a-config-provider
    :theme="{
      token: { colorPrimary: primaryColor },
      algorithm: state.dark ? theme.darkAlgorithm : theme.defaultAlgorithm,
    }"
    :locale="state.locale === 'zh-CN' ? zhCN : enUS"
  >
    <router-view />
  </a-config-provider>
</template>

<style scoped></style>

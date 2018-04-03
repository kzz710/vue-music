<template>
  <div id="app">
    <header-component></header-component>
    <tab-component></tab-component>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import HeaderComponent from '@/components/m-header/m-header.vue'
import TabComponent from '@/components/tab/tab.vue'
export default {
  name: 'App',
  components: {
    HeaderComponent,
    TabComponent
  }
}
</script>

<style>

</style>

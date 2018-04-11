<template>
  <div id="app">
    <header-component></header-component>
    <tab-component></tab-component>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player-component></player-component>
  </div>
</template>

<script>
import HeaderComponent from '@/components/m-header/m-header.vue'
import TabComponent from '@/components/tab/tab.vue'
import PlayerComponent from '@/components/player/player.vue'
export default {
  name: 'App',
  components: {
    HeaderComponent,
    TabComponent,
    PlayerComponent
  }
}
</script>

<style>

</style>

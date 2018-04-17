import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import RankComponent from '@/components/rank/rank.vue'
import RecommendComponent from '@/components/recommend/recommend.vue'
import SearchComponent from '@/components/search/search.vue'
import SingerComponent from '@/components/singer/singer.vue'
import SingerDetailComponent from '@/components/singer-detail/singer-detail.vue'
import DiscComponent from '@/components/disc/disc.vue'

Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/rank',
      component: RankComponent
    },
    {
      path: '/recommend',
      component: RecommendComponent,
      children: [
        {
          path: ':id',
          component: DiscComponent
        }
      ]
    },
    {
      path: '/search',
      component: SearchComponent
    },
    {
      path: '/singer',
      component: SingerComponent,
      children: [
        {
          path: ':id',
          component: SingerDetailComponent
        }
      ]
    }
  ]
})

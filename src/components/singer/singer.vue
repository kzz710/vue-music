<template>
  <div class="singer">
    <listview-component @select="selectSinger" :data="singerList"></listview-component>
    <router-view></router-view>
  </div>
</template>

<script>
  import {getSingerList} from 'api/singer.js'
  import {ERR_OK} from 'api/config.js'
  import Singer from 'common/js/singer.js'
  import ListviewComponent from 'base/listview/listview'
  import {mapMutations} from 'vuex'
  const HOT_NANE = '热门'

  const HOT_SINGER_LENGTH = 10

  export default {
    name: 'singer',
    data() {
      return {
        singerList: []
      }
    },
    components: {
      ListviewComponent
    },
    created() {
      this._getSingerList()
    },
    methods: {
      selectSinger(singer) {
        this.$router.push({
          path: `/singer/${singer.mid}`
        })
        this.setSinger(singer)
      },
      _getSingerList() {
        getSingerList().then((res) => {
          if (res.code === ERR_OK) {
            this.singerList = this._normalizeSinger(res.data.list)
          }
        })
      },
      _normalizeSinger(list) {
        let map = {
          hot: {
            title: HOT_NANE,
            data: []
          }
        }
        list.forEach((item, index) => {
          if (index < HOT_SINGER_LENGTH) {
            map.hot.data.push(new Singer(item.Fsinger_id, item.Fsinger_name, item.Fsinger_mid))
          }
          if (!map[item.Findex]) {
            map[item.Findex] = {
              title: item.Findex,
              data: []
            }
          }
          map[item.Findex].data.push(new Singer(item.Fsinger_id, item.Fsinger_name, item.Fsinger_mid))
        })
        let hot = []
        let ret = []
        for (let key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === HOT_NANE) {
            hot.push(val)
          }
        }
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    }
  }
</script>

<style lang="stylus" type="text/stylus">
  @import "../../common/stylus/variable.styl"
  .singer {
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
  }
</style>

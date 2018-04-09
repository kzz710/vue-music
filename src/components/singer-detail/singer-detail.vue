<template>
  <transition name="slide">
    <music-list-component :songs="songs" :bg-image="bgImage" :title="title"></music-list-component>
  </transition>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {getSingerDetail} from 'api/singer.js'
  import {ERR_OK} from 'api/config.js'
  import {createSong} from 'common/js/song.js'
  import MusicListComponent from '@/components/music-list/music-list.vue'
  export default {
    name: 'singer-detail',
    data() {
      return {
        songs: []
      }
    },
    components: {
      MusicListComponent
    },
    computed: {
      title() {
        return this.singer.name
      },
      bgImage() {
        return this.singer.avatar
      },
      ...mapGetters([
        'singer'
      ])
    },
    created() {
      this._getDetail()
    },
    methods: {
      _getDetail() {
        if (!this.singer.mid) {
//          方式一：回退回去
//          this.$router.push('/singer')
//          return
//          方式二：参数赋值
          this.singer.mid = this.$route.params.id
        }
        getSingerDetail(this.singer.mid).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.data.list)
          }
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((item) => {
          let {musicData} = item
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus">
  @import "../../common/stylus/variable.styl"

  .slide-enter-active, .slide-leave-active {
    transition all 0.3s
  }

  .slide-enter, .slide-leave-to {
    transform translate3d(100%, 0, 0)
  }
</style>

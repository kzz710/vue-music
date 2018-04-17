<template>
  <transition name="slide">
    <music-list-component :songs="songs" :bg-image="bgImage" :title="title"></music-list-component>
  </transition>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {ERR_OK} from 'api/config.js'
  import {getSongList} from 'api/recommend.js'
  import {createSong} from 'common/js/song.js'
  import MusicListComponent from '@/components/music-list/music-list.vue'
  export default {
    name: 'disc',
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
        return this.disc.dissname
      },
      bgImage() {
        return this.disc.imgurl
      },
      ...mapGetters([
        'disc'
      ])
    },
    created() {
      this._getDetail()
    },
    methods: {
      _getDetail() {
        if (!this.disc.dissid) {
//          方式一：回退回去
          this.$router.push('/recommend')
          return
//          方式二：参数赋值
//          this.singer.mid = this.$route.params.id
        }
        getSongList(this.disc.dissid).then(res => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.cdlist[0].songlist)
          }
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((musicData) => {
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

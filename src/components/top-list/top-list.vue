<template>
  <transition name="slide">
    <music-list-component :songs="songs" :bg-image="bgImage" :title="title" :rank="rank"></music-list-component>
  </transition>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {ERR_OK} from 'api/config.js'
  import {getMusicList} from 'api/rank.js'
  import {createSong} from 'common/js/song.js'
  import MusicListComponent from '@/components/music-list/music-list.vue'

  export default {
    name: 'topList',
    data() {
      return {
        songs: [],
        rank: true
      }
    },
    components: {
      MusicListComponent
    },
    computed: {
      title() {
        return this.topList.topTitle
      },
      bgImage() {
        return this.topList.picUrl
      },
      ...mapGetters([
        'topList'
      ])
    },
    created() {
      this._getDetail()
    },
    methods: {
      _getDetail() {
        if (!this.topList.id) {
//          方式一：回退回去
          this.$router.push('/rank')
          return
//          方式二：参数赋值
//          this.singer.mid = this.$route.params.id
        }
        getMusicList(this.topList.id).then(res => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.songlist)
          }
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((musicData) => {
          if (musicData.data.songid && musicData.data.albummid) {
            ret.push(createSong(musicData.data))
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

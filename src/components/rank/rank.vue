<template>
  <div class="rank" ref="rank">
    <scroll class="toplist" :data="topList" ref="topList">
      <ul>
        <li class="item" v-for="(item, index) in topList" :key="index" @click="selectItem(item)">
          <div class="icon">
            <img v-lazy="item.picUrl" alt="" width="100" height="100">
          </div>
          <ul class="songlist">
            <li class="song" v-for="(song, songIndex) in item.songList" :key="songIndex">
              <span>{{songIndex+1}}</span>
              <span>{{song.songname}}-{{song.singername}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="loading-container" v-show="!topList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
  import {getTopList} from 'api/rank'
  import {ERR_OK} from 'api/config'
  import Loading from 'base/loading/loading'
  import Scroll from 'base/scroll/scroll'
  import {playlistMixin} from 'common/js/mixin'
  import {mapMutations} from 'vuex'

  export default {
    name: 'rank',
    mixins: [playlistMixin],
    data() {
      return {
        topList: []
      }
    },
    components: {
      Loading,
      Scroll
    },
    created() {
      this._getTopList()
    },
    methods: {
      _getTopList() {
        getTopList().then(res => {
          if (res.code === ERR_OK) {
            this.topList = res.data.topList
          }
        })
      },
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.rank.style.bottom = bottom
        this.$refs.topList.refresh()
      },
      selectItem(item) {
        this.$router.push({
          path: `/rank/${item.id}`
        })
        this.setTopList(item)
      },
      ...mapMutations({
        setTopList: 'SET_TOP_LIST'
      })
    }
  }
</script>

<style lang="stylus" type="text/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"

  .rank {
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .toplist {
      height: 100%
      overflow hidden
      .item {
        display flex
        margin: 0 20px
        padding-top 20px
        height: 100px
        &:last-child {
          padding-bottom 20px
        }
        .icon {
          flex 0 0 100px
          width: 100px
          height: 100px
        }
        .songlist {
          flex 1
          display flex
          flex-direction column
          justify-content center
          padding: 0 20px
          height: 100px
          overflow: hidden
          background: $color-highlight-background
          color $color-text-d
          font-size $font-size-small
          .song {
            no-wrap()
            line-height: 26px
          }
        }
      }
      .loading-container {
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
      }
    }
  }
</style>

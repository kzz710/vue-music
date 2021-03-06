<template>
  <div class="recommend" ref="recommend">
    <scroll-component ref="scroll" class="recommend-content" :data="discList">
      <div>
        <div v-if="recommends.length" class="slider-wrapper">
          <slider-component>
            <div v-for="(item, index) in recommends" :key="index">
              <a :href="item.linkUrl">
                <img class="needsclick" :src="item.picUrl" alt="" @load="loadImg">
              </a>
            </div>
          </slider-component>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li @click="selectItem(item)" v-for="(item, index) in discList" class="item" :key="index">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.imgurl">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <loading-component></loading-component>
      </div>
    </scroll-component>
    <router-view></router-view>
  </div>
</template>

<script>
  import LoadingComponent from 'base/loading/loading'
  import ScrollComponent from 'base/scroll/scroll'
  import SliderComponent from 'base/slider/slider'
  import {getRecommend, getDiscList} from 'api/recommend.js'
  import {ERR_OK} from 'api/config.js'
  import {playlistMixin} from 'common/js/mixin'
  import {mapMutations} from 'vuex'

  export default {
    name: 'recommend',
    mixins: [playlistMixin],
    data () {
      return {
        recommends: [],
        discList: []
      }
    },
    components: {
      SliderComponent,
      ScrollComponent,
      LoadingComponent
    },
    created () {
      this._getRecommend()
      this._getDiscList()
    },
    methods: {
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.recommend.style.bottom = bottom
        this.$refs.scroll.refresh()
      },
      selectItem(item) {
        this.$router.push({
          path: `/recommend/${item.dissid}`
        })
        this.setDisc(item)
      },
      _getRecommend () {
        getRecommend().then((res) => {
          if (res.code === ERR_OK) {
            this.recommends = res.data.slider
          }
        })
      },
      _getDiscList () {
        getDiscList().then((res) => {
          if (res.code === ERR_OK) {
            this.discList = res.data.list
          }
        })
      },
      loadImg() {
        if (!this.checkLoaded) {
          this.$refs.scroll.refresh()
          this.checkLoaded = true
        }
      },
      ...mapMutations({
        setDisc: 'SET_DISC'
      })
    }
  }
</script>

<style lang="stylus" type="text/stylus">
  @import "../../common/stylus/variable.styl"
  .recommend {
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content {
      height: 100%
      overflow hidden
      .slider-wrapper {
        position: relative
        width: 100%
        overflow hidden
      }
      .recommend-list {
        .list-title {
          height: 65px
          line-height: 65px
          text-align center
          font-size $font-size-medium
          color $color-theme
        }
        .item {
          display flex
          box-sizing border-box
          align-items center
          padding: 0 20px 20px 20px
          .icon {
            flex 0 0 60px
            width: 60px
            padding-right: 20px
          }
          .text {
            display flex
            flex-direction column
            justify-content center
            flex 1
            line-height: 20px
            overflow hidden
            font-size $font-size-medium
            .name {
              margin-bottom: 10px
              color $color-text
            }
            .desc {
              color $color-text-d
            }
          }
        }
      }
      .loading-container {
        position: absolute
        width: 100%
        top: 50%
        left 0
      }
    }
  }
</style>

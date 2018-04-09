<template>
  <div class="music-list">
    <div class="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title" ref="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll :data="songs" :listenScroll="listenScroll" :probeType="probeType" class="list" ref="list" @scroll="scroll">
      <div class="song-list-wrapper">
        <song-list-component :songs="songs"></song-list-component>
      </div>
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import SongListComponent from 'base/song-list/song-list'
  import {prefixStyle} from 'common/js/dom'

  const transform = prefixStyle('transform')
  const backdrop = prefixStyle('backdrop-filter')
  export default {
    name: 'music-list',
    data() {
      return {
        scrollY: -1
      }
    },
    props: {
      bgImage: {
        type: String,
        default: ''
      },
      songs: {
        type: Array,
        default: null
      },
      title: {
        type: String,
        default: ''
      }
    },
    components: {
      Scroll,
      SongListComponent
    },
    computed: {
      bgStyle() {
        return `background-image:url(${this.bgImage})`
      }
    },
    created() {
      this.probeType = 3
      this.listenScroll = true
    },
    mounted() {
      this.imageHeight = this.$refs.bgImage.clientHeight
      this.minTranslateY = this.$refs.title.clientHeight
      this.$refs.list.$el.style.top = this.imageHeight + 'px'
    },
    methods: {
      scroll(pos) {
        this.scrollY = pos.y
      }
    },
    watch: {
      scrollY(newY) {
        let zIndex = 0
        let scale = 1
        let blur = 0
        let diff = this.imageHeight + newY < this.minTranslateY ? this.minTranslateY - this.imageHeight : newY
        this.$refs.layer.style[transform] = `translate3d(0, ${diff}px, 0)`
        const percent = Math.abs(newY / this.imageHeight)
        if (newY > 0) {
          scale = 1 + percent
          zIndex = 10
        } else {
          blur = Math.min(20 * percent, 20)
        }
        this.$refs.filter.style[backdrop] = `blur(${blur}px)`
        if (this.imageHeight + newY < this.minTranslateY) {
          zIndex = 10
          this.$refs.bgImage.style.paddingTop = 0
          this.$refs.bgImage.style.height = this.minTranslateY + 'px'
        } else {
          this.$refs.bgImage.style.paddingTop = '70%'
          this.$refs.bgImage.style.height = 0
        }
        this.$refs.bgImage.style.zIndex = zIndex
        this.$refs.bgImage.style[transform] = `scale(${scale})`
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"

  .music-list {
    position: fixed
    z-index 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background-color: $color-background
    .back {
      position: absolute
      top: 0
      left: 6px
      z-index 50
      .icon-back {
        display block
        padding: 10px
        font-size $font-size-large-x
        color $color-theme
      }
    }
    .title {
      position: absolute
      top: 0
      left: 10%
      z-index 40
      width: 80%
      no-wrap()
      text-align center
      line-height: 40px
      font-size $font-size-large
      color $color-text
    }
    .bg-image {
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin top
      background-size cover
      .filter {
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background-color: rgba(7, 17, 27, 0.4)
      }
    }
    .bg-layer {
      position: relative
      height: 100%
      background-color: $color-background
    }
    .list {
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background-color: $color-background
      .song-list-wrapper {
        padding: 20px 30px
      }
      .loading-container {
        position: absolute
        width: 100%
        top: 50%
        transform translateY(-50%)
      }
    }
  }
</style>

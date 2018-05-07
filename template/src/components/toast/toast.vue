<template>
  <transition name='fade'>
    <div class="msg">
      <div class="msg-container">
        <div class='msg-content fade-top' :style="{left:left+'px'}">
          {{message}}
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  data () {
    return {
      visible: false,
      message: '',
      left: (window.innerWidth - 200) * 0.5
    }
  },
  props: {
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    close () {
      this.$el.remove()
    },
    removeDom (event) {
      event.target.parentNode.removeChild(event.target)
    }
  },
  components: {
  }
}
</script>
<style lang="scss" scoped>
  .msg {
    position: relative;
    z-index: 10000;
    .msg-container {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      @keyframes fade-top {
        0% {
          top: 0px;
        }
        100%{
          top: 60px;
        }
      }
      .fade-top {
        animation: fade-top .2s both;
      }
      .msg-content {
        width: 200px;
        z-index: 10000;
        font-size: 14px;
        color: #fff;
        border-radius: 6px;
        background-color: rgba(0,0,0,0.6);
        display: block;
        margin-left: auto;
        margin-right: auto;
        position: fixed;
        line-height: 24px;
        text-align: center;
        padding: 8px 10px;
      }
    }
  }
</style>

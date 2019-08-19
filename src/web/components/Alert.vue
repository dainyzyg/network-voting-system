<template lang="pug">
BackDrop(:show='backDropShow' backgroundColor="rgba(0,0,0,.4)")
    .popup(:class=`{'popup-active':popupShow,'popup-hidden':!popupShow}`)
        .head {{option.title}}
        .body {{option.content}}
        .buttons
            .btn.blue(@click.stop='hide') 确定
</template>
<script>
import BackDrop from './BackDrop.vue'
export default {
  components: {
    BackDrop
  },
  data() {
    return {
      backDropShow: false,
      popupShow: true,
      option: {}
    }
  },
  methods: {
    show(option = {}) {
      this.option = option
      this.popupShow = true
      this.backDropShow = true
    },
    hide() {
      this.popupShow = false
      this.$nextTick(() => {
        this.backDropShow = false
      })
    }
  }
}
</script>
<style scoped>
.popup {
  width: 250px;
  border-radius: 4px;
  background-color: hsla(0, 0%, 100%, 0.9);
  color: #606266;
}
.head {
  height: 30px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: center;
  align-items: center;
}

.body {
  padding: 15px;
  word-wrap: break-word;
  text-align: center;
}

.popup-hidden {
  -webkit-animation-name: f;
  animation-name: f;
  -webkit-animation-duration: 0.1s;
  animation-duration: 0.1s;
  -webkit-animation-timing-function: ease-in-out;
  animation-timing-function: ease-in-out;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

.popup-active {
  -webkit-animation-name: g;
  animation-name: g;
  -webkit-animation-duration: 0.2s;
  animation-duration: 0.2s;
  -webkit-animation-timing-function: ease-in-out;
  animation-timing-function: ease-in-out;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

@keyframes f {
  0% {
    transform: scale(1);
    opacity: 1;
  }

  to {
    transform: scale(0.6);
    opacity: 0;
  }
}

@keyframes g {
  0% {
    transform: scale(1.3);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}

.buttons {
  display: flex;
  justify-content: center;
}

.btn {
  border-color: transparent;
  margin-top: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
  border-radius: 8px;
  vertical-align: top;
  text-align: center;
  text-overflow: ellipsis;
  line-height: 38px;
  cursor: pointer;
  min-width: 52px;
  width: 100px;
  font-size: 16px;
  color: #fff;
}

.blue {
  background-color: #2e89dc;
}
</style>




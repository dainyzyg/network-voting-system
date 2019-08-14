<template lang="pug">
transition(name='slidedown')
  .modal(v-show="show" @click.self="close")
    .header
      i.iconfont.icon-return(@click="cancel") < 返回
      .title 123123123123
      .option 
    .content(ref="content")    
</template>

<script>
export default {
  name: 'Modal',
  props: {
    show: {
      default: true
    }
  },
  created() {},
  data() {
    return {
      sheetVisible: false,
      record: {},
      picDataURLList: [],
      picActions: [],
      tapPicIndex: 0,
      isAdd: false
    }
  },
  watch: {
    show(val) {}
  },
  methods: {
    cancel() {
      this.$emit('update:show', false)
    }
  },
  computed: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  /* position: absolute;
  top: 0;
  height: 30px;
  left: 0;
  right: 0; */
  flex: 0 0 30px;
  z-index: 9;
  border-bottom-width: 1px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  box-shadow: 0 1px 6px #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  font-size: 14px;
}
.content {
  flex: 1;
  position: relative;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.title {
  font-size: 20px;
  color: #0e90d2;
  color: #333;
}
.iconfont.icon-return {
  font-size: 26px;
  font-weight: bold;
  color: #666;
}
.option {
  color: #666;
  height: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 26px;
}
.modal {
  box-shadow: 0px 8px 6px -6px #ccc inset;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  /* width: 100vw;
  height: 100vh; */
  background: skyblue;
  /* background-color: #fff; */
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-direction: column;
}
.iconfont.icon-add {
  font-size: 50px;
  /* font-weight: bold; */
  color: #666;
}
.slidedown-enter-active,
.slidedown-leave-active {
  transition: all 0.2s ease-in-out;
}
.slidedown-enter,
.slidedown-leave-to {
  transform: translate3d(0, 100%, 0);
}
</style>

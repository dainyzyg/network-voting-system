<template lang="pug">
transition(name='slidedown')
  .modal(v-show="show")
    slot
</template>

<script>
export default {
  name: 'Modal',
  props: {
    show: {
      default: false
    }
  },
  created() {},
  data() {
    return {}
  },
  watch: {
    show(val) {}
  },
  methods: {
    close() {
      this.$emit('update:show', false)
    }
  },
  computed: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal {
  /* box-shadow: 0px 8px 6px -6px #ccc inset; */
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  /* width: 100vw;
  height: 100vh; */
  /* background: skyblue; */
  background-color: #fff;
  overflow: hidden;
  /* -webkit-overflow-scrolling: touch; */
  display: flex;
  flex-direction: column;
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

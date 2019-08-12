<template lang="pug">
  .app
    .result {{result}}
    .btn(@click="getProjects") getProjects
    .btn(@click="getProjects") getProjects
    .btn(@click="getProjects") getProjects
    .btn(@click="getProjects") getProjects
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'home',
  data() {
    return {
      result: ''
    }
  },
  methods: {
    async getProjects() {
      // console.log('test get')
      // a.b.c
      let r = await this.$axios.get('getProjects', {
        params: {
          ID: 12345,
          a: 1,
          b: '2'
        }
      })
      console.log(r.data)
      this.result = r.data
    },
    async test2() {
      let r = await this.$axios.post('system/user/save', { a: 'aaa', b: 'bbb' })
      console.log(r)
    }
  }
})
</script>
<style scoped>
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px;
  padding: 5px;
  height: 30px;
  width: 120px;
  border-radius: 5px;
  color: aliceblue;
  background: #409eff;
  cursor: pointer;
}
</style>

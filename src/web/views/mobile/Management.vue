<template lang="pug">
  .app
    .result {{result}}
    .btn(@click="openModal") 设置当前为第一轮投票
    .btn(@click="openModal") 设置当前为第二轮投票
    .btn(@click="openModal") 查看第一轮投票人数
    .btn(@click="openModal") 查看第一轮投票结果
    .btn(@click="openModal") 查看第二轮投票人数
    .btn(@click="openModal") 查看第二轮投票结果
    .btn(@click="openModal") 重置投票数据
    Modal(:show.sync="show")
</template>

<script lang="ts">
import Vue from 'vue'
import Modal from '@/components/Modal.vue'

export default Vue.extend({
  name: 'home',
  components: {
    Modal
  },
  data() {
    return {
      show: false,
      result: ''
    }
  },
  methods: {
    openModal() {
      this.show = true
    }
  }
})
</script>
<style scoped>
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
  padding: 5px;
  height: 30px;
  /* width: 120px; */
  border-radius: 5px;
  color: aliceblue;
  background: #409eff;
  cursor: pointer;
}
</style>

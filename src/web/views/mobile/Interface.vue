<template lang="pug">
  .app
    .result {{result}}
    .btn(@click="openModal") openModal
    .btn(@click="getProjects") getProjects
    .btn(@click="getUser") getUser
    .btn(@click="getRound") getRound
    .btn(@click="setRound") setRound
    .btn(@click="votingRound1") votingRound1
    .btn(@click="votingRound2") votingRound2
    .btn(@click="getRound1Result") getRound1Result
    .btn(@click="reset") 重置投票数据
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
    async reset() {
      let r = await this.$axios.post('reset')
      if (r.data.success) {
        this.result = `重置成功！`
      } else {
        this.result = `重置失败！`
      }
    },
    openModal() {
      this.show = true
    },
    async getProjects() {
      // console.log('test get')
      // a.b.c
      let r = await this.$axios.get('getProjects')
      console.log(r.data)
      this.result = r.data
    },
    async getUser() {
      // console.log('test get')
      // a.b.c
      let r = await this.$axios.get('getUser', {
        params: {
          userID: 1565595661250900
        }
      })
      console.log(r.data)
      this.result = r.data
    },
    async getRound() {
      let r = await this.$axios.get('getRound')
      this.result = r.data
    },
    async setRound() {
      let r = await this.$axios.post('setRound', { round: 1 })
      this.result = r.data
    },
    async votingRound1() {
      let data = {
        votingUserID: 1565595706229800,
        votingResult: [
          { name: '项目a', group: '生产', id: 1565595548796800, score: 3 },
          { name: '项目b', group: '生产', id: 1565595559448999, score: 5 },
          { name: '项目c', group: '安全', id: 1565595569113299, score: 3 },
          { name: '项目d', group: '安全', id: 1565595580035200, score: 0 },
          { name: '项目e', group: '安全', id: 1565595591646599, score: 2 },
          { name: '项目f', group: '环保', id: 1565595605269800, score: 3 }
        ]
      }
      let r = await this.$axios.post('votingRound1', data)
      this.result = r.data
    },
    async votingRound2() {
      let data = {
        votingUserID: 1565595706229800,
        votingResult: [
          {
            name: '项目b',
            group: '生产',
            id: 1565595559448999,
            score: 2,
            scoreTotal: 10,
            trust: false
          },
          {
            name: '项目d',
            group: '安全',
            id: 1565595580035200,
            score: 5,
            scoreTotal: 10,
            trust: false
          },
          {
            name: '项目a',
            group: '生产',
            id: 1565595548796800,
            score: 5,
            scoreTotal: 8,
            trust: true
          },
          {
            name: '项目c',
            group: '安全',
            id: 1565595569113299,
            score: 3,
            scoreTotal: 8,
            trust: false
          },
          {
            name: '项目e',
            group: '安全',
            id: 1565595591646599,
            score: 0,
            scoreTotal: 7,
            trust: true
          },
          {
            name: '项目f',
            group: '环保',
            id: 1565595605269800,
            score: 2,
            scoreTotal: 7,
            trust: true
          }
        ]
      }
      let r = await this.$axios.post('votingRound2', data)
      this.result = r.data
    },
    async getRound1Result() {
      let r = await this.$axios.get('getRound1Result')
      this.result = r.data
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

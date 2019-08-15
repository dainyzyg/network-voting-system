<template lang="pug">
  .app
    .result {{result}}
    .btn(@click="setRound(1)") 设置当前为第一轮投票
    .btn(@click="setRound(2)") 设置当前为第二轮投票
    .btn(@click="getRound1User") 查看第一轮投票人数
    .btn(@click="openModal") 查看第一轮投票结果
    .btn(@click="getRound2User") 查看第二轮投票人数
    .btn(@click="openModal") 查看第二轮投票结果
    .btn(@click="reset") 重置投票数据
    VoteRound1User(@refesh="getRoundUser" :show.sync="showRound1User" :Round1User="Round1User")
</template>

<script lang="ts">
import Vue from 'vue'
import VoteRound1User from '@/components/VoteRound1User.vue'

export default Vue.extend({
  name: 'home',
  components: {
    VoteRound1User
  },
  data() {
    return {
      round: 1,
      showRound1User: false,
      result: '',
      Round1User: []
    }
  },
  methods: {
    openModal() {
      // this.show = true
    },
    async setRound(index) {
      let r = await this.$axios.post('setRound', { round: index })
      if (r.data.success) {
        this.result = `设置成功，当前投票轮次为：${index}`
      } else {
        this.result = `设置失败`
      }
    },
    getRound1User() {
      this.round = 1
      this.getRoundUser()
    },
    getRound2User() {
      this.round = 2
      this.getRoundUser()
    },
    async getRoundUser() {
      this.Round1User = []
      this.showRound1User = true
      if (this.round == 1) {
        console.log('getRound1User')
        let r = await this.$axios.get('getRound1User')
        this.Round1User = r.data
      } else {
        console.log('getRound2User')
        let r = await this.$axios.get('getRound2User')
        this.Round1User = r.data
      }
    },
    async reset() {
      let r = await this.$axios.post('reset')
      if (r.data.success) {
        this.result = `重置成功！`
      } else {
        this.result = `重置失败！`
      }
    }
  }
})
</script>
<style scoped>
.result {
  background: #a9e0ff;
  color: #2e89dc;
  /* font-size: 50px; */
  border-radius: 5px;
  height: 60px;
  margin: 20px;
  padding: 5px;
  overflow: auto;
}
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

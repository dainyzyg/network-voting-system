<template lang="pug">
  .app
    .result {{result}}
    .btn(@click="setRound(1)") 设置当前为第一轮投票
    .btn(@click="setRound(2)") 设置当前为第二轮投票
    .btn(@click="getRound1User") 查看第一轮投票人数
    .btn(@click="getRound1Result") 查看第一轮投票结果
    .btn(@click="getRound2User") 查看第二轮投票人数
    .btn(@click="getRound2Result") 查看第二轮投票结果
    //- .btn(@click="reset") 重置投票数据
    VoteRound1User(@refesh="getRoundUser" :show.sync="showRound1User" :Round1User="Round1User")
    VoteResult(:show.sync="showRoundResult" :RoundResult="RoundResult")
</template>

<script>
import VoteRound1User from '@/components/VoteRound1User.vue'
import VoteResult from '@/components/VoteResult.vue'

export default {
  name: 'home',
  components: {
    VoteRound1User,
    VoteResult
  },
  data() {
    return {
      round: 1,
      showRound1User: false,
      showRoundResult: false,
      result: '',
      Round1User: [],
      RoundResult: {
        first: [],
        second: [],
        third: [],
        noPlace: [],
        votingCount: 0
      }
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
    },
    async getRound1Result() {
      let r = await this.$axios.get('getRound')
      if (r.data != 2) {
        this.result =
          '请在第一轮投票全部完成后，将当前投票轮次设置成第二轮，然后再查看第一轮投票结果！'
        return
      }
      let r2 = await this.$axios.get('getRound1ResultNew')
      let list = r2.data.result
      const firstCount = 9
      const secondCount = 19
      const thirdCount = 28
      this.RoundResult = {
        first: [],
        second: [],
        third: [],
        noPlace: [],
        votingCount: r2.data.votingCount
      }
      this.showRoundResult = true
      for (let i = 0; i < firstCount; i++) {
        let project = list[i]
        this.RoundResult.first.push(project)
      }
      for (let i = firstCount; i < firstCount + secondCount; i++) {
        let project = list[i]
        this.RoundResult.second.push(project)
      }
      for (let i = firstCount + secondCount; i < firstCount + secondCount + thirdCount; i++) {
        let project = list[i]
        this.RoundResult.third.push(project)
      }
      // this.RoundResult.votingCount = r2.data.votingCount
    },
    async getRound2Result() {
      this.RoundResult = {
        first: [],
        second: [],
        third: [],
        noPlace: [],
        votingCount: 0
      }
      this.showRoundResult = true
      let r2 = await this.$axios.get('getRound2Result')
      this.RoundResult = r2.data
    }
  }
}
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

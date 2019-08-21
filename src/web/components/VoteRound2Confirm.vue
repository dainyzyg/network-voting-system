<template lang="pug" v-else>
Modal(:show='show')
  .VoteConfirm
    template(v-if="!IfSucess")
      .ConfirmTitle 请确认投票结果
      .VoteRank
        .RankFirstTitle 信任
        .RankFirstTable(v-for="first in firstProjects")
          .FirstName {{first.name}}
        .RankSecondTitle 不信任
        .RankSecondTable(v-for="second in secondProjects")
          .SecondName {{second.name}}
      .ConfirmSubmit
        .Confirm(@click='votingRound2')  {{isVoting?'正在提交...':'确认提交'}}
        .Cancel(@click='close') 取消
    template(v-else)
      .Round1EndTitle 投票结束
      .Round1EndInfo
        .InfoTitle1 您已完成此次投票
        .InfoTitle2 感谢您的参与！
</template>

<script>
import Vue from 'vue'
import Modal from '@/components/Modal.vue'

export default {
  name: 'home',
  components: {
    Modal
  },
  props: ['show', 'Round1Result', 'IfSucess', 'isVoting'],
  data() {
    return {}
  },
  methods: {
    close() {
      console.log('close')
      this.$emit('update:show', false)
    },
    votingRound2() {
      this.$emit('confirm')
    }
  },
  computed: {
    firstProjects() {
      if (this.Round1Result && this.Round1Result.length > 0) {
        return this.Round1Result.filter(i => i.trust === true)
      }
      return []
    },
    secondProjects() {
      if (this.Round1Result && this.Round1Result.length > 0) {
        return this.Round1Result.filter(i => i.trust === false)
      }
      return []
    }
  }
}
</script>
<style scoped>
.VoteConfirm {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  border: solid 2px #a9e0ff;
  border-radius: 10px;
  overflow: hidden;
}
.ConfirmTitle,
.Round1EndTitle {
  flex: 0 0 50px;
  line-height: 50px;
  text-align: center;
  width: 100%;
  background: #a9e0ff;
  color: #2e89dc;
  font-size: 22px;
  font-weight: bold;
  border: solid 2px #a9e0ff;
}
.Round1EndInfo {
  flex: 0 0 360px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  color: #2e89dc;
  font-size: 20px;
  font-weight: bold;
}
.InfoTitle1,
.InfoTitle2 {
  text-align: center;
  margin: 20px 0;
}
.EnterRound2 {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}
.EnterRound2Title {
  height: 50px;
  width: 180px;
  font-size: 20px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffdd3e;
  color: #314c6c;
}
.VoteRank {
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  padding: 5px 0;
  width: 90%;
}
.VoteRank::-webkit-scrollbar {
  display: none;
}
.RankFirstTitle,
.RankSecondTitle {
  height: 20px;
  width: 100%;
  color: #2e89dc;
  line-height: 20px;
  text-align: center;
  padding: 5px 0;
  font-size: 18px;
  border-bottom: 1px solid #a9e0ff;
}
.RankFirstTable,
.RankSecondTable {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: #2e89dc;
  font-size: 12px;
  margin-top: 5px;
  background: aliceblue;
  border-radius: 10px;
}
.FirstName,
.SecondName {
  width: 90%;
}
.ConfirmSubmit {
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  margin: 20px 0;
}
.Confirm,
.Cancel {
  height: 40px;
  width: 120px;
  font-size: 20px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.Confirm {
  background: #ffdd3e;
  color: #314c6c;
}
.Cancel {
  background: darkgray;
  color: white;
}
</style>

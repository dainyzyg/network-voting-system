<template lang="pug" v-else>
Modal(:show='show')
  .VoteConfirm
    template(v-if="!IfSucess")
      .ConfirmTitle 请确认投票结果
      .VoteRank
        .RankFirstTitle 一等奖
        .RankFirstTable(v-for="first in firstProjects")
          .FirstName {{first.name}}
        .RankSecondTitle 二等奖
        .RankSecondTable(v-for="second in secondProjects")
          .SecondName {{second.name}}
        .RankThirdTitle 三等奖
        .RankThirdTable(v-for="third in thirdProjects")
          .ThirdName {{third.name}}
        .DisLikeTitle 不入选
        .DisLikeTable(v-for="dislike in dislikeProjects")
          .DisLikeName {{dislike.name}}
      .ConfirmSubmit
        .Confirm(@click='votingRound1') {{isVoting?'正在提交...':'确认提交'}}
        .Cancel(@click='close') 取消
    template(v-else)
      .Round1EndTitle 投票结束
      .Round1EndInfo
        .InfoTitle1 您的第一轮投票已经完成
        .InfoTitle2 感谢您的参与！
        .InfoTitle3 请耐心等待所有评委第一轮投票完成后开启第二轮投票
      .EnterRound2(@click='OpenRound2') 
        .EnterRound2Title 进入第二轮投票
</template>

<script>
import Vue from 'vue'
import Modal from '@/components/Modal.vue'

export default {
  name: 'home',
  components: {
    Modal
  },
  props: ['show', 'projects', 'IfSucess', 'isVoting'],
  data() {
    return {}
  },
  methods: {
    close() {
      console.log('close')
      this.$emit('update:show', false)
    },
    votingRound1() {
      this.$emit('confirm')
    },
    async getRound() {
      let r = await this.$axios.get('getRound')
      return r.data
    },
    async OpenRound2() {
      let i = await this.getRound()
      if (i == 1) {
        this.$alert.show({
          title: '提示',
          content: '第二轮投票尚未开始'
        })
        // alert('第二轮投票尚未开始')
        return
      } else if (i == 2) {
        let userID = this.getQueryVariable('id')
        this.$router.push('/SecondRoundVote?id=' + userID)
      }
    },
    getQueryVariable(variable) {
      var query = window.location.href.split('?')[1]
      var vars = query.split('&')
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=')
        if (pair[0] == variable) {
          return pair[1]
        }
      }
      return false
    }
  },
  computed: {
    firstProjects() {
      if (this.projects && this.projects.length > 0) {
        return this.projects.filter(i => i.score === 5)
      }
      return []
    },
    secondProjects() {
      if (this.projects && this.projects.length > 0) {
        return this.projects.filter(i => i.score === 3)
      }
      return []
    },
    thirdProjects() {
      if (this.projects && this.projects.length > 0) {
        return this.projects.filter(i => i.score === 2)
      }
      return []
    },
    dislikeProjects() {
      if (this.projects && this.projects.length > 0) {
        return this.projects.filter(i => i.score === 0)
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
  justify-content: space-around;
  align-items: center;
  padding: 0 20px;
  color: #2e89dc;
  font-size: 20px;
  font-weight: bold;
}
.InfoTitle1,
.InfoTitle2,
.InfoTitle3 {
  text-align: center;
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
  padding: 5px 0;
  width: 90%;
}
.VoteRank::-webkit-scrollbar {
  display: none;
}
.RankFirstTitle,
.RankSecondTitle,
.RankThirdTitle,
.DisLikeTitle {
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
.RankSecondTable,
.RankThirdTable,
.DisLikeTable {
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
.SecondName,
.ThirdName,
.DisLikeName {
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

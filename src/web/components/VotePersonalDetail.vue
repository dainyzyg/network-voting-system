<template lang="pug">
Modal(:show='show')
  .NetWorkVoting
    .VoteHeader
      .VoteTitle1 {{round==1?'第一轮个人投票结果':'第二轮个人投票结果'}}
      .VoteTitle2 投票人 : {{userInfo.name}}
    .VoteContent
      .VoteItem(v-for="Item,index in userDetail")
        .ItemOrder {{index+1}}
        .ItemInfo
          .ItemName
            .ItemTitle {{Item.name}}
            .ItemClass
              .ClassTitle 组别
              .ClassName {{Item.group}}
          .ItemVote
            div(v-if="round==1" :class="getRank(Item.score)") {{getLevel(Item.score)}}
            div(v-if="round==2" :class="getRankRound2(index)") {{getLevelRound2(index)}}
            .outter 
              .CurrentRankFirstGreen(v-if="round==2" :class="{ CurrentRankFirstRed: !Item.trust}")
                .TechScoreTitle {{Item.trust?'同意':'不同意'}}
  .btn-wrapper
   .btn(@click="close") 关闭
  //-  .btn(@click="refesh") 刷新
</template>

<script>
import Vue from 'vue'
import Modal from '@/components/Modal.vue'

export default {
  name: 'home',
  components: {
    Modal
  },
  props: ['show', 'RoundResult', 'round', 'userDetail', 'userInfo'],
  data() {
    return {
      Round1Result: []
    }
  },
  methods: {
    getLevel(score) {
      let level
      switch (score) {
        case 5:
          level = '一等奖'
          break
        case 3:
          level = '二等奖'
          break
        case 2:
          level = '三等奖'
          break
        case 0:
          level = '不入选'
          break
        default:
          break
      }
      return level
    },
    getRank(score) {
      let className
      switch (score) {
        case 5:
          className = 'CurrentRankFirst'
          break
        case 3:
          className = 'CurrentRankSecond'
          break
        case 2:
          className = 'CurrentRankThird'
          break
        case 0:
          className = 'CurrentRankNoplace'
          break
        default:
          break
      }
      let classObj = {}
      classObj[className] = true
      return classObj
    },
    getRankRound2(index) {
      if (index <= 8) {
        return { CurrentRankFirst: true }
      } else if (index >= 9 && index <= 27) {
        return { CurrentRankSecond: true }
      } else if (index >= 28 && index <= 55) {
        return { CurrentRankThird: true }
      }
    },
    getLevelRound2(index) {
      if (index <= 8) {
        return '一等奖'
      } else if (index >= 9 && index <= 27) {
        return '二等奖'
      } else if (index >= 28 && index <= 55) {
        return '三等奖'
      }
    },
    getTrustCount(item) {
      if (item.trustCount != undefined) {
        return true
      } else return false
    },
    getTrustColor(item) {
      if (item.trustCount / this.RoundResult.votingCount < 2 / 3) {
        return true
      } else {
        return false
      }
    },
    close() {
      this.$emit('update:show', false)
    },
    refesh() {
      this.$emit('refesh')
    }
  }
  // computed: {
  //   done() {
  //     if (this.Round1User && this.Round1User.length > 0) {
  //       let list = this.Round1User.filter(i => i.isVote).map(m => m.name)
  //       return { text: list.join(','), count: list.length }
  //     }
  //     return { text: '', count: 0 }
  //   },
  //   todo() {
  //     if (this.Round1User && this.Round1User.length > 0) {
  //       let list = this.Round1User.filter(i => !i.isVote).map(m => m.name)
  //       return { text: list.join(','), count: list.length }
  //     }
  //     return { text: '', count: 0 }
  //   }
  // }
}
</script>
<style scoped>
/* .content {
  color: slategray;
  flex: 1;
  padding: 20px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
} */
.NetWorkVoting {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
}
.VoteHeader {
  flex: 0 0 60px;
  width: 100vw;
  background: #a9e0ff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.VoteTitle1,
.VoteTitle2 {
  color: #2e89dc;
  font-size: 16px;
  line-height: 24px;
  font-weight: bold;
}
.VoteContent {
  width: 100vw;
  flex: 1;
  background: white;
  -webkit-overflow-scrolling: touch;
  overflow: scroll;
}
.VoteItem {
  margin: 10px 10px;
  height: 100px;
  background: #d4efff;
  border-radius: 15px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.ItemOrder {
  color: #2e89dc;
  font-size: 15px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  width: 25px;
  margin-left: 2px;
  padding-right: 2px;
  border-right: solid white 2px;
}
.ItemInfo {
  height: 100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0px 5px;
}
.ItemName {
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 2px white;
}
.ItemTitle {
  color: #2e89dc;
  font-size: 14px;
  font-weight: bold;
  text-align: left;
  width: 190px;
}
.ItemClass {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 60px;
  border-radius: 10px;
  background: #a9e0ff;
}
.ClassTitle {
  font-size: 12px;
  margin-bottom: 1px;
  width: 45px;
  border-bottom: 1px solid white;
  text-align: center;
  padding-bottom: 1px;
  color: #2e89dc;
}
.ClassName {
  font-size: 13px;
  color: #2e89dc;
  margin-bottom: 2px;
  margin-top: 1px;
}
.ItemVote {
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.CurrentRankFirst,
.CurrentRankSecond,
.CurrentRankThird,
.CurrentRankNoplace,
.CurrentRankFirst1,
.CurrentRankSecond1,
.CurrentRankThird1,
.CurrentRankNoplace1,
.CurrentRankFirstGreen,
.CurrentRankFirstRed {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 25px;
  line-height: 25px;
  background: white;
  color: #2e89dc;
  font-size: 12px;
  border-radius: 8px;
  padding: 0 5px;
}
.CurrentRankFirst {
  color: #f5222d;
  border: 1px solid #ffa39e;
  width: 36px;
}
.outter {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
}
.CurrentRankFirst1,
.CurrentRankSecond1,
.CurrentRankThird1,
.CurrentRankNoplace1 {
  color: #2e89dc;
  background: #a9e0ff;
  margin: 0 1px;
}
.CurrentRankFirstGreen {
  background-color: #f0f9eb;
  color: #67c23a;
  margin-left: 2px;
}
.CurrentRankFirstRed {
  background-color: #fef0f0;
  color: #f56c6c;
  margin-left: 2px;
}
.CurrentRankSecond {
  color: #faad14;
  border: 1px solid #ffe58f;
  width: 36px;
}
.CurrentRankThird {
  color: #52c41a;
  border: 1px solid #b7eb8f;
  width: 36px;
}
.CurrentRankNoplace {
  color: #8c8c8c;
  border: 1px solid #bfbfbf;
  width: 36px;
}
.btn-wrapper {
  margin: 0 10px;
  flex: 0 0 80px;
  overflow: hidden;
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
}
.btn {
  flex: 1;
  margin: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin: 20px; */
  padding: 5px;
  height: 30px;
  /* width: 120px; */
  border-radius: 5px;
  color: aliceblue;
  background: #409eff;
  cursor: pointer;
}
/* .tit {
  margin-top: 20px;
  color: #2e89dc;
  font-weight: bold;
}
.voter {
  font-size: 14px;
  color: #2e89dc;
  background: #a9e0ff;
  border-radius: 10px;
  padding: 5px;
  margin: 5px;
} */
</style>

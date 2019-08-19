<template lang="pug">
Modal(:show='show')
  .NetWorkVoting
    .VoteHeader
      .VoteTitle1 第一轮投票结果
      .VoteTitle2 投票人数:{{RoundResult.votingCount}} 
    .VoteContent
      .VoteItem(v-for="Item,index in RoundResult.first" :key="Item.id")
        .ItemOrder {{index+1}}
        .ItemInfo
          .ItemName
            .ItemTitle {{Item.name}}
            .ItemClass
              .ClassTitle 组别
              .ClassName {{Item.group}}
          .ItemVote
            .CurrentRankFirst 一等奖
              .CurrentTitle 
            .CurrentRankFirst
              .CurrentScoreTitle 总分:
              .CurrentVoteScore {{Item.scoreTotal}}
            .CurrentRankFirst
              .TechScoreTitle 技术分:
              .TechVoteScore {{Item.techScore}}
            .CurrentRankFirst
              .TechScoreTitle 信任票:
              .TechVoteScore {{Item.trustCount}}
      .VoteItem(v-for="Item,index in RoundResult.second" :key="Item.id")
        .ItemOrder {{index+1}}
        .ItemInfo
          .ItemName
            .ItemTitle {{Item.name}}
            .ItemClass
              .ClassTitle 组别
              .ClassName {{Item.group}}
          .ItemVote
            .CurrentRankSecond
              .CurrentTitle 二等奖
            .CurrentRankSecond
              .CurrentScoreTitle 总分:
              .CurrentVoteScore {{Item.scoreTotal}}
            .CurrentRankSecond
              .TechScoreTitle 技术分:
              .TechVoteScore {{Item.techScore}}
            .CurrentRankSecond
              .TechScoreTitle 信任票:
              .TechVoteScore {{Item.trustCount}}
      .VoteItem(v-for="Item,index in RoundResult.third" :key="Item.id")
        .ItemOrder {{index+1}}
        .ItemInfo
          .ItemName
            .ItemTitle {{Item.name}}
            .ItemClass
              .ClassTitle 组别
              .ClassName {{Item.group}}
          .ItemVote
            .CurrentRankThird
              .CurrentTitle 三等奖
            .CurrentRankThird
              .CurrentScoreTitle 总分:
              .CurrentVoteScore {{Item.scoreTotal}}
            .CurrentRankThird
              .TechScoreTitle 技术分:
              .TechVoteScore {{Item.techScore}}
            .CurrentRankThird
              .TechScoreTitle 信任票:
              .TechVoteScore {{Item.trustCount}}
      .VoteItem(v-for="Item,index in RoundResult.noPlace" :key="Item.id")
        .ItemOrder {{index+1}}
        .ItemInfo
          .ItemName
            .ItemTitle {{Item.name}}
            .ItemClass
              .ClassTitle 组别
              .ClassName {{Item.group}}
          .ItemVote
            .CurrentRankNoplace
              .CurrentTitle 不入选
            .CurrentRankNoplace
              .CurrentScoreTitle 总分:
              .CurrentVoteScore {{Item.scoreTotal}}
            .CurrentRankNoplace
              .TechScoreTitle 技术分:
              .TechVoteScore {{Item.techScore}}
            .CurrentRankNoplace
              .TechScoreTitle 信任票:
              .TechVoteScore {{Item.trustCount}}
  //- .content
  //-   .tit 一等奖({{RoundResult.first.length}})：
  //-   .voter(v-for="i in RoundResult.first") {{i.name}}
  //-   .tit 二等奖({{RoundResult.second.length}})：
  //-   .voter(v-for="i in RoundResult.second") {{i.name}}
  //-   .tit 三等奖({{RoundResult.third.length}})：
  //-   .voter(v-for="i in RoundResult.third") {{i.name}}
  //-   .tit(v-if="RoundResult.noPlace.length>0") 未得奖({{RoundResult.noPlace.length}})：
  //-   .voter(v-for="i in RoundResult.noPlace") {{i.name}}
  .btn-wrapper
   .btn(@click="close") 关闭
   .btn(@click="refesh") 刷新
</template>

<script>
import Vue from 'vue'
import Modal from '@/components/Modal.vue'

export default {
  name: 'home',
  components: {
    Modal
  },
  props: ['show', 'RoundResult'],
  data() {
    return {
      Round1Result: []
    }
  },
  async created() {
    await this.getRound1Result()
  },
  methods: {
    async getRound1Result() {
      let r = await this.$axios.get('getRound1Result')
      this.Round1Result = r.data
    },
    getRankGrade(index) {
      if (index <= 8) {
        return '一等奖'
      } else if (index >= 9 && index <= 27) {
        return '二等奖'
      } else if (index >= 28 && index <= 55) {
        return '三等奖'
      }
    },
    getcolor(index) {
      if (index <= 8) {
        return '#f5222d'
      } else if (index >= 9 && index <= 27) {
        return '#faad14'
      } else if (index >= 28 && index <= 55) {
        return '#52c41a'
      }
    },
    getborder(index) {
      if (index <= 8) {
        return '1px solid #ffa39e'
      } else if (index >= 9 && index <= 27) {
        return '1px solid #ffe58f'
      } else if (index >= 28 && index <= 55) {
        return '1px solid #b7eb8f'
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
  flex: 0 0 140px;
  width: 100vw;
  background: #a9e0ff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.VoteTitle1,.VoteTitle2 {
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
.CurrentRankNoplace {
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
.CurrentRankFirst{
  color:#f5222d;
  border:1px solid #ffa39e
}
.CurrentRankSecond{
  color:#faad14;
  border:1px solid #ffe58f
}
.CurrentRankThird{
  color:#52c41a;
  border:1px solid #b7eb8f
}
.CurrentRankNoplace{
  color:#8c8c8c;
  border:1px solid #bfbfbf
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

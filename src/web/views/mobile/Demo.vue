<template lang="pug">
  .NetWorkVoting
    .VoteHeader
      .VoteTitle1 兰州石化公司
      .VoteTitle2 2018年度科学技术奖投票活动
      .VoteOrder (第一轮：推荐投票)
      .Voter
        .VoterTitle 投票人
        .VoterName {{userInfo.name}}
      .CurrentRank
        .RankTitle 当前票数
        .RankFirst
          .FirstTitle 一等奖
          .FirstCount {{firstCount}}
        .RankSecond
          .SecondTitle 二等奖
          .SecondCount {{secondCount}}
        .RankThird
          .ThirdTitle 三等奖
          .ThirdCount {{thirdCount}}
        .RankDislike
          .DislikeTitle 不入选
          .DislikeCount {{dislikeCount}}    
    .VoteContent
      .VoteItem(v-for="Item,index in projects" :key="Item.id")
        .ItemOrder {{index+1}}
        .ItemInfo
          .ItemName
            .ItemTitle {{Item.name}}
            .ItemClass
              .ClassTitle 类别
              .ClassName {{Item.group}}
          .ItemVote
            .VoteFirst(@click="Vote(Item,5)") 
              img(:src="Item.score===5?LikeBlue:LikeGray")
              .VoteFirstTitle 一等奖
            .VoteSecond(@click="Vote(Item,3)") 
              img(:src="Item.score===3?LikeBlue:LikeGray")
              .VoteSecondTitle 二等奖
            .VoteThird(@click="Vote(Item,2)") 
              img(:src="Item.score===2?LikeBlue:LikeGray")
              .VoteThirdTitle 三等奖
            .VoteDisagree(@click="Vote(Item,0)") 
              img(:src="Item.score===0?DisLikeRed:DisLike")
              .VoteDisagreeTitle 不入选
      .VoteSubmit(@click="judgeData") 提交投票
    VoteRound1Confirm(@confirm="votingRound1" :show.sync='show' :projects='projects' :IfSucess='IfSucess' :isVoting='isVoting')
</template>

<script>
import VoteRound1Confirm from '@/components/VoteRound1Confirm.vue'

export default {
  components: {
    VoteRound1Confirm
  },
  data() {
    return {
      isVoting: false,
      IfSucess: false,
      show: false,
      userInfo: {},
      projects: [],
      LikeGray: './LikeGray.png',
      LikeBlue: './LikeBlue.png',
      DisLikeRed: './DisLikeRed.png',
      DisLike: './DisLike.png'
    }
  },
  async created() {
    await this.getUser()
    // console.log(this.getRound())
    let i = await this.getRound()
    console.log(i)
    if (i == 1) {
      await this.getProjects()
    } else if (i == 2) {
      let userID = this.getQueryVariable('id')
      this.$router.push('/SecondRoundVote?id=' + userID)
      return
    }
  },
  methods: {
    async getUser() {
      let userID = this.getQueryVariable('id')
      let r = await this.$axios.get('getUser', {
        params: {
          userID: userID
        }
      })
      if (!r.data) {
        throw new Error('无效的用户名！')
      }
      this.userInfo = r.data
    },
    async getRound() {
      let r = await this.$axios.get('getRound')
      return r.data
    },
    async getProjects() {
      let r = await this.$axios.get('getProjects')
      this.projects = r.data
    },
    Vote(Item, score) {
      switch (score) {
        case 5:
          if (this.firstCount >= 9) {
            this.$alert.show({
              title: '提示',
              content: '一等奖不能超过9个！'
            })
            // alert('一等奖不能超过9个！')
            return
          }
          break
        case 3:
          if (this.secondCount >= 19) {
            this.$alert.show({
              title: '提示',
              content: '二等奖不能超过19个！'
            })
            // alert('二等奖不能超过19个！')
            return
          }
          break
        case 2:
          if (this.thirdCount >= 28) {
            this.$alert.show({
              title: '提示',
              content: '三等奖不能超过28个！'
            })
            // alert('三等奖不能超过28个！')
            return
          }
          break
      }
      this.$set(Item, 'score', score)
    },
    judgeData() {
      // this.show = true
      for (let i in this.projects) {
        let item = this.projects[i]
        if (item.score === undefined) {
          this.$alert.show({
            title: '提示',
            content: `有未投票的项目：${parseInt(i) + 1}.${item.name}`
          })
          // alert(`有未投票的项目：${parseInt(i) + 1}.${item.name}`)
          return
        }
      }
      this.show = true
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
    },
    async votingRound1() {
      this.isVoting = true
      let data = {
        votingUserID: this.userInfo.id,
        votingResult: this.projects
      }
      let r = await this.$axios.post('votingRound1', data)
      this.isVoting = false
      if (r.data.success) {
        this.IfSucess = true
      } else {
        this.$alert.show({
              title: '提示',
              content: '投票失败！'
            })
      }
    }
  },
  computed: {
    firstCount() {
      return this.projects.filter(p => p.score === 5).length
    },
    secondCount() {
      return this.projects.filter(p => p.score === 3).length
    },
    thirdCount() {
      return this.projects.filter(p => p.score === 2).length
    },
    dislikeCount() {
      return this.projects.filter(p => p.score === 0).length
    }
  }
}
</script>
<style scoped>
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
.VoteTitle1,
.VoteTitle2,
.VoteOrder {
  color: #2e89dc;
  font-size: 16px;
  line-height: 24px;
  font-weight: bold;
}
.Voter {
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
}
.VoterTitle,
.VoterName {
  margin: 0 5px;
  font-size: 14px;
  color: #2e89dc;
}
.CurrentRank,
.RankFirst,
.RankSecond,
.RankThird,
.RankDislike {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.CurrentRank {
  width: 100%;
}
.RankTitle {
  font-size: 14px;
  color: #2e89dc;
}
.RankFirst,
.RankSecond,
.RankThird,
.RankDislike {
  height: 20px;
  width: 60px;
  background: white;
  border-radius: 8px;
}
.FirstTitle,
.FirstCount,
.SecondTitle,
.SecondCount,
.ThirdTitle,
.ThirdCount,
.DislikeTitle,
.DislikeCount {
  font-size: 12px;
  color: #2e89dc;
}
.VoteContent {
  width: 100vw;
  flex: 1;
  background: white;
  -webkit-overflow-scrolling: touch;
  overflow: scroll;
}
/* .VoteContent::-webkit-scrollbar {
  display: none;
} */
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
.VoteFirst,
.VoteSecond,
.VoteThird,
.VoteDisagree {
  height: 25px;
  width: 60px;
  background: white;
  color: gray;
  font-size: 12px;
  text-align: center;
  line-height: 25px;
  border-radius: 8px;
  display: flex;
  align-items: center;
}
.VoteSubmit {
  height: 50px;
  line-height: 50px;
  text-align: center;
  margin: 10px 20px;
  background: #ffdd3e;
  color: #314c6c;
  font-size: 20px;
  border-radius: 15px;
}
img {
  max-width: 18px;
  max-height: 18px;
  margin-right: 2px;
}
</style>

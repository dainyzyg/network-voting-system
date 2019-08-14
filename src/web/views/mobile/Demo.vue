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
          .FirstCount 9
        .RankSecond
          .SecondTitle 二等奖
          .SecondCount 15
        .RankThird
          .ThirdTitle 三等奖
          .ThirdCount 18
        .RankDislike
          .DislikeTitle 不入选
          .DislikeCount 9
        
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
</template>

<script>
export default {
  data() {
    return {
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
    await this.getProjects()
  },
  methods: {
    async getUser() {
      let userID = this.getQueryVariable('id')
      let r = await this.$axios.get('getUser', {
        params: {
          userID: userID
        }
      })
      console.log(r)
      if (!r.data) {
        throw new Error('无效的用户名！')
      }
      this.userInfo = r.data
    },
    async getProjects() {
      let r = await this.$axios.get('getProjects')
      console.log(r.data)
      this.projects = r.data
    },
    Vote(Item, score) {
      this.$set(Item, 'score', score)
    },
    judgeData() {
      // this.$router.push('/SecondRoundVote?id=123132')
      for (let i in this.projects) {
        let item = this.projects[i]
        if (item.score === undefined) {
          alert(`有未投票的项目：${parseInt(i) + 1}.${item.name}`)
          return
        }
      }
      alert('success')
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
  }
}
</script>
<style>
body {
  height: 100vh;
  width: 100vw;
  margin: 0;
}
.NetWorkVoting {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
}
.VoteHeader {
  /* height: 196px; */
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
  height: 80px;
  background: #d4efff;
  border-radius: 15px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.ItemOrder {
  color: #2e89dc;
  font-size: 30px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  width: 40px;
  margin-left: 2px;
  padding-right: 2px;
  border-right: solid white 2px;
}
.ItemInfo {
  height: 70px;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0px 5px;
}
.ItemName {
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 2px white;
}
.ItemTitle {
  color: #2e89dc;
  font-size: 12px;
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
  font-size: 10px;
  color: #2e89dc;
  margin-bottom: 2px;
  margin-top: 1px;
}
.ItemVote {
  height: 30px;
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
  margin-top: 5px;
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

<template lang="pug">
  .NetWorkVoting
    .VoteHeader
      .VoteTitle1 兰州石化公司
      .VoteTitle2 2019年度科学技术奖投票活动
      .VoteOrder (第二轮：信任投票)
      .Voter
        .VoterTitle 投票人
        .VoterName {{userInfo.name}}
    .VoteContent
      .VoteItem(v-for="Item,index in Round1Result" :key="Item.id")
        .ItemOrder {{index+1}}
        .ItemInfo
          .ItemName
            .ItemTitle {{Item.name}}
            .ItemClass
              .ClassTitle 类别
              .ClassName {{Item.group}}
          .ItemVote
            .CurrentRank(:style="{color:getcolor(index),border:getborder(index)}") 
              .CurrentTitle 推荐评级
              .CurrentRankName {{getRankGrade(index)}}
            .VoteThird_VoteDisagree
              .VoteThird(@click="Vote(Item,true)") 
                img(:src="Item.trust===true?LikeBlue:LikeGray")
                .VoteThirdTitle 同意
              .VoteDisagree(@click="Vote(Item,false)") 
                img(:src="Item.trust===false?DisLikeRed:DisLike")
                .VoteDisagreeTitle 不同意
      .VoteSubmit(@click="judgeData") 提交投票
    VoteRound2Confirm(@confirm="votingRound2" :show.sync='show' :Round1Result='Round1Result' :IfSucess='IfSucess' :isVoting="isVoting")
</template>

<script>
import VoteRound2Confirm from '@/components/VoteRound2Confirm.vue'

export default {
  components: {
    VoteRound2Confirm
  },
  data() {
    return {
      isVoting: false,
      IfSucess: false,
      show: false,
      userInfo: {},
      Round1Result: [],
      LikeGray: './LikeGray.png',
      LikeBlue: './LikeBlue.png',
      DisLikeRed: './DisLikeRed.png',
      DisLike: './DisLike.png'
    }
  },
  async created() {
    await this.getUser()
    await this.getRound1Result()
  },
  methods: {
    getRankGrade(index) {
      if (index <= 3) {
        return '一等奖'
      } else if (index >= 4 && index <= 12) {
        return '二等奖'
      } else if (index >= 13 && index <= 32) {
        return '三等奖'
      }
    },
    getcolor(index) {
      if (index <= 3) {
        return '#f5222d'
      } else if (index >= 4 && index <= 12) {
        return '#faad14'
      } else if (index >= 13 && index <= 32) {
        return '#52c41a'
      }
    },
    getborder(index) {
      if (index <= 3) {
        return '1px solid #ffa39e'
      } else if (index >= 4 && index <= 12) {
        return '1px solid #ffe58f'
      } else if (index >= 13 && index <= 32) {
        return '1px solid #b7eb8f'
      }
    },
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
    async getRound1Result() {
      let userID = this.getQueryVariable('id')
      let r = await this.$axios.get('getRound1Result', {
        params: {
          userID: userID
        }
      })
      let data = r.data
      if (this.judge(data)) {
        this.Round1Result = JSON.parse(localStorage.secondProjects)
      } else {
        this.Round1Result = data
      }
    },
    async votingRound2() {
      this.isVoting = true
      let data = {
        votingUserID: this.userInfo.id,
        votingResult: this.Round1Result
      }
      let r = await this.$axios.post('votingRound2', data)
      this.isVoting = false
      if (r.data.success) {
        this.IfSucess = true
      } else {
        this.$alert.show({
          title: '提示',
          content: '投票失败！'
        })
      }
    },
    judge(data) {
      //首先判断本地是否有数据，如果没有直接从后台取
      if (!localStorage.secondProjects) {
        return false
      }
      //如果本地有数据，判断当前投票人是否和本地投票人相同，不同直接从后台取
      if (localStorage.userID != this.userInfo.id) {
        return false
      }
      //后台有项目数据但是当前投票人没投过票，则从本地区取数
      if (data && data[0] && typeof data[0].trust !== 'boolean') {
        return true
      }
      //如果已投过票，则从后台取
      return false
    },
    Vote(Item, trust) {
      this.$set(Item, 'trust', trust)
      this.saveToLocalStorage()
    },
    saveToLocalStorage() {
      localStorage.secondProjects = JSON.stringify(this.Round1Result)
      localStorage.userID = this.userInfo.id
    },
    judgeData() {
      // this.show = true
      for (let i in this.Round1Result) {
        let sr = this.Round1Result[i]
        if (sr.trust === undefined) {
          this.$alert.show({
            title: '提示',
            content: `有未投票的项目：${parseInt(i) + 1}.${sr.name}`
          })
          // alert(`有未投票的项目：${parseInt(i) + 1}.${sr.name}`)
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
.CurrentRank {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100px;
  height: 25px;
  line-height: 25px;
  background: white;
  color: #2e89dc;
  font-size: 12px;
  border-radius: 8px;
}
.VoteThird_VoteDisagree {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
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
  justify-content: center;
  align-items: center;
  margin: 0 5px;
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
  flex: 1;
  /* width: 190px; */
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
  width: 62px;
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

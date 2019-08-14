<template lang="pug">
  .NetWorkVoting
    .VoteHeader
      .VoteTitle1 兰州石化公司
      .VoteTitle2 2018年度科学技术奖投票活动
      .VoteOrder (第二轮：信任投票)
      .Voter
        .VoterTitle 投票人
        .VoterName 张三     
    .VoteContent
      .VoteItem(v-for="Item in Items" :key="Item.id")
        .ItemOrder {{Item.ItemOrder}}
        .ItemInfo
          .ItemName
            .ItemTitle {{Item.ItemTitle}}
            .ItemClass
              .ClassTitle 类别
              .ClassName {{Item.ClassName}}
          .ItemVote
            .CurrentRank
              .CurrentTitle 当前评级
              .CurrentRankName 一等奖
            .VoteThird(@click="VoteThird(Item)") 
              img(:src="ThirdIMG")
              .VoteThirdTitle 同意
            .VoteDisagree(@click="VoteDisLike(Item)") 
              img(:src="DisLikeIMG")
              .VoteDisagreeTitle 不同意
      .VoteSubmit(@click="") 提交投票
</template>

<script lang="ts">
import Vue from 'vue'
interface Item {
  ItemOrder: number
  ItemTitle: string
  ClassName: string
  ItemGrade: number
}
let Items: Item[] = []
for (let i = 1; i <= 56; i++) {
  Items.push({
    ItemOrder: i,
    ItemTitle: '采用线性光束检测改造化工装置火灾感烟探测器，提高火灾预警能力',
    ClassName: '生产工艺',
    ItemGrade: 0
  })
}
export default Vue.extend({
  name: 'home',
  data() {
    return {
      Items: Items,
      FirstIMG: './LikeGray.png',
      SecondIMG: './LikeGray.png',
      ThirdIMG: './LikeGray.png',
      DisLikeIMG: './DisLike.png',
    }
  },
  methods: {
    VoteFirst: function(o: any) {
      o.ItemGrade = 1
      this.FirstIMG = './LikeRed.png'
      this.SecondIMG = './LikeGray.png'
      this.ThirdIMG = './LikeGray.png'
      this.DisLikeIMG='./DisLike.png'
    },
    VoteSecond: function(p: any) {
      p.ItemGrade = 2
      this.FirstIMG = './LikeGray.png'
      this.SecondIMG = './LikeYellow.png'
      this.ThirdIMG = './LikeGray.png'
      this.DisLikeIMG='./DisLike.png'
    },
    VoteThird: function(q: any) {
      q.ItemGrade = 3
      this.FirstIMG = './LikeGray.png'
      this.SecondIMG = './LikeGray.png'
      this.ThirdIMG = './LikeBlue.png'
      this.DisLikeIMG='./DisLike.png'
    },
    VoteDisLike: function(r: any) {
      r.ItemGrade = 4
      this.FirstIMG = './LikeGray.png'
      this.SecondIMG = './LikeGray.png'
      this.ThirdIMG = './LikeGray.png'
      this.DisLikeIMG='./DisLikeRed.png'
    }
  }
})
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
  height: 196px;
  width: 100vw;
  background: #a9e0ff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center
}
.VoteTitle1,.VoteTitle2,.VoteOrder{
  margin:5px 5px;
  color:#2e89dc;
  font-size: 18px;
  font-weight: bold;
}
.Voter{
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
}
.VoterTitle,.VoterName{
  margin: 5px 5px;
  font-size: 14px;
  color:#2e89dc;
}
.VoteContent {
  width: 100vw;
  background: white;
  overflow: scroll;
}
.VoteContent::-webkit-scrollbar {
  display: none;
}
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
  width:190px;
}
.ItemClass {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 35px;
  width: 50px;
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
.CurrentRank{
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width:100px;
  height:25px;
  line-height: 25px;
  background: white;
  color:#2e89dc;
  font-size: 12px;
  margin-top: 5px;
  border-radius: 8px;
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
  margin-top: 5px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.VoteSubmit{
  height:50px;
  line-height: 50px;
  text-align: center;
  margin:10px 20px;
  background:#FFDD3E;
  color:#314C6C;
  font-size:20px;
  border-radius: 15px;
}
img {
  max-width: 18px;
  max-height: 18px;
  margin-right: 2px;
}
</style>

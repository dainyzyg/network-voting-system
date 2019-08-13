<template lang="pug">
  .VoteConfirm
    .ConfirmTitle 投票结果确认
    .VoteRank
      .RankFirstTitle 一等奖
      .RankFirstTable
        .FirstName 采用线性光束检测改造化工装置火灾感烟探测器，提高火灾预警能力
      .RankFirstTable
        .FirstName 采用线性光束检测改造化工装置火灾感烟探测器，提高火灾预警能力
      .RankFirstTable
        .FirstName 采用线性光束检测改造化工装置火灾感烟探测器，提高火灾预警能力
      .RankFirstTable
        .FirstName 采用线性光束检测改造化工装置火灾感烟探测器，提高火灾预警能力
      .RankFirstTable
        .FirstName 采用线性光束检测改造化工装置火灾感烟探测器，提高火灾预警能力
      .RankSecondTitle 二等奖
      .RankSecondTable
        .SecondName
      .RankThirdTitle 三等奖
      .RankThirdTable
        .ThirdName
      .DisLikeTitle 不入选
      .DisLikeTable
        .DisLikeName
      .ConfirmSubmit
        .Confirm 确认
        .Cancel 取消
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'home',
  data() {
    return {}
  },
  methods: {}
})
</script>
<style>
body {
  height: 100vh;
  width: 100vw;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.VoteConfirm {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  border: solid 2px #a9e0ff;
  border-radius: 10px;
  height: 520px;
  width: 280px;
  overflow: hidden;
}
.ConfirmTitle {
  height: 50px;
  line-height: 50px;
  text-align: center;
  width: 100%;
  background: #a9e0ff;
  color: #2e89dc;
  font-size: 22px;
  font-weight: bold;
  border: solid 2px #a9e0ff;
}
.VoteRank {
  overflow: scroll;
}
.VoteRank::-webkit-scrollbar {
  display: none;
}
.RankFirstTitle,
.RankSecondTitle,
.RankThirdTitle,
.DisLikeTitle {
  height: 20px;
  width: 240px;
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
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 240px;
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
  width: 230px;
}
.ConfirmSubmit{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin:10px 5px;
}
.Confirm,.Cancel{
    height:40px;
    width:100px;
    font-size: 20px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.Confirm{
    background: #FFDD3E;
    color:#314C6C
}
.Cancel{
    background: darkgray;
    color:white
}
</style>

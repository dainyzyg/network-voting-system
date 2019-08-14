<template lang="pug">
Modal(:show='show')
  .VoteConfirm
    .ConfirmTitle 投票结果确认
    .VoteRank
      .RankFirstTitle 一等奖
      .RankFirstTable(v-for="Item in Items" :key="Item.id")
        .FirstName {{Item.ItemTitle}}
      .RankSecondTitle 二等奖
      .RankSecondTable(v-for="Item in Items" :key="Item.id")
        .SecondName {{Item.ItemTitle}}
      .RankThirdTitle 三等奖
      .RankThirdTable(v-for="Item in Items" :key="Item.id")
        .ThirdName {{Item.ItemTitle}}
      .DisLikeTitle 不入选
      .DisLikeTable(v-for="Item in Items" :key="Item.id")
        .DisLikeName {{Item.ItemTitle}}
      .ConfirmSubmit
        .Confirm 确认
        .Cancel(@click='close') 取消
</template>

<script>
import Vue from 'vue'
import Modal from '@/components/Modal.vue'

let Items = []
for (let i = 0; i < 10; i++) {
  Items.push({
    ItemTitle: '采用线性光束检测改造化工装置火灾感烟探测器，提高火灾预警能力'
  })
}
export default {
  name: 'home',
  components: {
    Modal
  },
  props: {
    show: {
      default: false
    }
  },
  data() {
    return {
      Items: Items
    }
  },
  methods: {
    close() {
      console.log('close')
      this.$emit('update:show', false)
    }
  }
}
</script>
<style>
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
.ConfirmSubmit {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 5px;
}
.Confirm,
.Cancel {
  height: 40px;
  width: 100px;
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

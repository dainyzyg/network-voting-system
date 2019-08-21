<template lang="pug">
Modal(:show='show')
  .VoteTitle1 {{round==1?'第一轮投票个人明细':'第二轮投票个人明细'}}
  .content
    .list-item(@click="openDetail(i)" v-for="i in Round1User" :class="{'list-color':!i.isVote}") {{i.name}}
  .btn-wrapper
   .btn(@click="close") 关闭
  //-  .btn(@click="refesh") 刷新
  VotePersonalDetail(:show.sync="personDetailShow" :round="round" :userDetail="userDetail" :userInfo="userInfo")
</template>

<script>
import Vue from 'vue'
import Modal from '@/components/Modal.vue'
import VotePersonalDetail from '@/components/VotePersonalDetail.vue'

export default {
  name: 'home',
  components: {
    Modal,
    VotePersonalDetail
  },
  props: ['show', 'Round1User', 'round'],
  data() {
    return {
      personDetailShow: false,
      userDetail: [],
      userInfo: {}
    }
  },
  methods: {
    openDetail(user) {
      if (user.isVote) {
        this.userInfo = user
        this.userDetail = []
        this.personDetailShow = true
        this.getUserDetail(user.id)
      }
    },
    async getUserDetail(userID) {
      let url = '/getProjects'
      if (this.round == 2) {
        url = '/getRound1Result'
      }
      let r = await this.$axios.get(url, {
        params: {
          userID: userID
        }
      })
      if (this.round == 1) {
        r.data.sort((a, b) => b.score - a.score)
      }
      this.userDetail = r.data
    },
    close() {
      this.$emit('update:show', false)
    },
    refesh() {
      this.$emit('refesh')
    }
  },
  computed: {
    done() {
      if (this.Round1User && this.Round1User.length > 0) {
        let list = this.Round1User.filter(i => i.isVote).map(m => m.name)
        return { text: list.join(','), count: list.length }
      }
      return { text: '', count: 0 }
    },
    todo() {
      if (this.Round1User && this.Round1User.length > 0) {
        let list = this.Round1User.filter(i => !i.isVote).map(m => m.name)
        return { text: list.join(','), count: list.length }
      }
      return { text: '', count: 0 }
    }
  }
}
</script>
<style scoped>
.list-item {
  border-bottom: 1px solid rgb(224, 224, 224);
  height: 45px;
  line-height: 45px;
  padding-left: 10px;
  color: #2e89dc;
}
.list-item:active {
  background: #f2f6fc;
}
.list-color {
  color: #909399;
}
.VoteTitle1,
.VoteTitle2 {
  background: #a9e0ff;
  color: #2e89dc;
  height: 50px;
  text-align: center;
  font-size: 16px;
  line-height: 50px;
  font-weight: bold;
}
.content {
  color: slategray;
  flex: 1;
  padding: 20px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
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
.tit {
  margin-top: 20px;
  color: #2e89dc;
  font-weight: bold;
}
</style>

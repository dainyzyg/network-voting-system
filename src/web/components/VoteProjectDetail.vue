<template lang="pug">
Modal(:show='show')
  .content
    .tit {{projectName}}
      .firstResult(v-if="round==1")
        .tit 投一等奖评委：
        .voter {{firstCount}}
        .tit 投二等奖评委：
        .voter {{secondCount}}
        .tit 投三等奖评委：
        .voter {{thirdCount}}
        .tit 投不入选评委：
        .voter {{dislikeCount}}
      .secondResult(v-if="round==2")
        .tit 投同意评委：
        .voter {{agree}}
        .tit 投不同意评委：
        .voter {{disagree}}
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
  props: ['show', 'round', 'projectDetailList', 'projectName'],
  data() {
    return {}
  },
  methods: {
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
    },
    firstCount() {
      let first = this.projectDetailList.filter(p => p.score === 5)
      let first1 = []
      for (let i of first) {
        first1.push(i.userName)
      }
      return first1.join()
    },
    secondCount() {
      let second = this.projectDetailList.filter(p => p.score === 3)
      let second1 = []
      for (let i of second) {
        second1.push(i.userName)
      }
      return second1.join()
    },
    thirdCount() {
      let third = this.projectDetailList.filter(p => p.score === 2)
      let third1 = []
      for (let i of third) {
        third1.push(i.userName)
      }
      return third1.join()
    },
    dislikeCount() {
      let dislike = this.projectDetailList.filter(p => p.score === 0)
      let dislike1 = []
      for (let i of dislike) {
        dislike1.push(i.userName)
      }
      return dislike1.join()
    },
    agree() {
      let agree = this.projectDetailList.filter(p => p.trust === true)
      let agree1 = []
      for (let i of agree) {
        agree1.push(i.userName)
      }
      return agree1.join()
    },
    disagree() {
      let disagree = this.projectDetailList.filter(p => p.trust === false)
      let disagree1 = []
      for (let i of disagree) {
        disagree1.push(i.userName)
      }
      return disagree1.join()
    },
  }
}
</script>
<style scoped>
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

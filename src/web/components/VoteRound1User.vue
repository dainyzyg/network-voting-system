<template lang="pug">
Modal(:show='show')
  .content
    .tit 未投票人员({{todo.count}})：
    .voter {{todo.text}}
    .tit 已投票人员({{done.count}})：
    .voter {{done.text}}
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
  props: ['show', 'Round1User'],
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
    }
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

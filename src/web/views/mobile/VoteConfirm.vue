<template lang="pug">
  .VoteConfirm
    .ConfirmTitle 投票结果确认
    .RankFirst
    .RankSecond
    .RankThird
    .DisLike
    .
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'home',
  data() {
    return {
    }
  },
  methods: {
  }
})
</script>
<style>
body {
  height: 100vh;
  width: 100vw;
  margin: 0;
}
::webkit-scrollbar { 
   display: none;
}
</style>

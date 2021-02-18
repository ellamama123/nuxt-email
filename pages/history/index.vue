<template lang="">
  <div>
    <list-history :dataHistory="dataHistory"></list-history>
  </div>
</template>
<script>

import axios from "axios"
import {ListHistory} from '@/components/history/ListHistory'
export default {

  data() {
    return {
      dataHistory : [],
    }
  },

  components: {ListHistory},

  mounted() {
    this.listData()
  },

  methods: {

    listData: function () {
      const url = 'http://127.0.0.1:8000/api/history'
      axios.get(url).then((response) => {
        this.dataHistory = response.data
      })
    },
  }
}
</script>

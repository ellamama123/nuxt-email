<template lang="">
  <div>
    <list-history :dataHistory="dataHistory"></list-history>
  </div>
</template>
<script>

import axios from "axios"
import listHistory from '@/components/history/ListHistory'
export default {

  data() {
    return {
      dataHistory : [],
      dataCandidate: [],
    }
  },

  components: {listHistory},

  mounted() {
    this.fetchData()
  },

  methods: {

    fetchData: function () {
      const url = 'http://127.0.0.1:8000/api/history'
      const url1 = 'http://127.0.0.1:8000/api/candidate'
      axios.get(url1).then((response) => {
        this.dataCandidate = response.data
      }).then(()=>{
        axios.get(url).then((response) => {
          this.dataHistory = response.data

          this.dataHistory.map((item) => {
            this.dataCandidate.map(itemCandidate => {
              if(item.candidate_id  === itemCandidate.id){
                item.name = itemCandidate.name
              }
            })
          })
        })
      })
    },
  }
}
</script>

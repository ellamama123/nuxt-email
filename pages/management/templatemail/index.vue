<template lang="">
  <div>
    <list-template :dataTemplate="dataTemplate" @refresh="listData()" ></list-template>
  </div>
</template>
<script>

import axios from "axios"
import ListTemplate from '@/components/template/ListTemplate'
export default {
  data(){
    return{
      dataTemplate: [],
    }
  },

  components: { ListTemplate },

  mounted() {
    this.listData()
  },

  methods: {
    listData: function () {
      const url = 'http://127.0.0.1:8000/api/template'
      axios.get(url).then((response) => {
        this.dataTemplate = response.data
      })
    },
  }
}
</script>

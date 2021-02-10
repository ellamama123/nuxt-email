<template lang="">
  <div>
    <CCardBody>
      <CDataTable
        :items="dataHistory"
        :fields="fields"
      >
        <template #category="{item}">
          <td>
            <CBadge>{{getBadge(item.category)}}</CBadge>
          </td>
        </template>
        <template #candidate_id="{item}"> 
          <td> 
            {{getCandidate(item.candidate_id)}}
          </td>
        </template>
      </CDataTable>
    </CCardBody>
  </div>
</template>
<script>
import axios from "axios"
const fields = [
  {key : 'candidate_id',label :'Tên'},
  {key: 'category', label: 'Loại mail'},
  {
    key: 'position',
    label: 'Vị trí ứng tuyển'
  }
]

export default {
  name: 'AdvancedTables',
  data() {
    return {
      dataHistory : [],
      fields:fields,
      selected: [],
      name : null,
    }
  },
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

    getBadge(status) {
      if(status == 0) return 'Mail cảm ơn'
      else if(status == 1) return 'Mail phỏng vấn'
      else return 'Mail offer'
    },

    toggleDetails(item) {
      console.log(item)
      this.$set(this.dataHistory[item.id], '_toggled', !item._toggled)
      this.collapseDuration = 300
      this.$nextTick(() => { this.collapseDuration = 0 })
    },
   getCandidate(item)
    {
       const url1 = 'http://127.0.0.1:8000/api/candidate/' + item
      const response =  axios.get(url1)
      return response.data
    }
    
  }
}
</script>

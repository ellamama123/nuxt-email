<template lang="">
  <div>
    <CCardBody>
      <CDataTable
        :items="dataHistory"
        :fields="fields"
      >
        <template #candidate_id="{item}"> 
          <td> 
            <CBadge>{{getCandidate(item.candidate_id)}}</CBadge>
          </td>
        </template>
        <template #category="{item}">
          <td>
            <CBadge> {{getBadge(item.category)}}</CBadge>
          </td>
        </template>
        <template #position="{item}">
          <td>
             {{getPosition(item.position)}}
          </td>
        </template>
        <template #show_details="{item, index}">
        <td class="py-2">
          <CButton
            color="primary"
            variant="outline"
            square
            size="sm"
            @click="toggleDetails(item, index)"
          >
            {{Boolean(item._toggled) ? 'Hide' : 'Show'}}
          </CButton>
        </td>
      </template>
      <template #details="{item}">
        <CCollapse :show="Boolean(item._toggled)" >
          <CCardBody>
            {{item.content}}
          </CCardBody>
        </CCollapse>
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
  },
  { 
    key: 'show_details', 
    label: '', 
    _style: 'width:1%', 
    sorter: false, 
    filter: false
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

    toggleDetails (item,index) {
      this.$set(this.dataHistory[index], '_toggled', !item._toggled)
      this.collapseDuration = 300
      this.$nextTick(() => { this.collapseDuration = 0})
    },
   getCandidate(item)
    {
       const url1 = 'http://127.0.0.1:8000/api/candidate/' + item
       var name1 = ''
        axios.get(url1).then((response) => {
          name1 = response.data.name
          console.log(name1)
           
      }).then(
        ()=>{
          return name1
        }
      )
    },

    getPosition(position){
      if(position == 0) return 'C#'
      else if(position == 1) return 'PHP'
      else return 'Tester'
    },

   
    
  }
}
</script>

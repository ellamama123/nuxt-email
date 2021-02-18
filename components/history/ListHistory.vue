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
  props: ['dataHistory'],
  name: 'AdvancedTables',
  data() {
    return {
      fields:fields,
      selected: [],
      name : null,
    }
  },

  methods: {

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

    
  }
}
</script>
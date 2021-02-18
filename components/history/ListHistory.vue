<template lang="">
  <div>
  <CCard>
    <CCardHeader>
      <p class="center">Mail Hisotry List</p> 
    </CCardHeader>
    <CCardBody>
      <CDataTable
        :items="dataHistory"
        :fields="fields"
      >
        <template #candidate_id="{item}"> 
          <td> 
           {{item.candidate_id}}
          </td>
        </template>
        <template #category="{item}">
          <td>
            {{item.template_id}}
          </td>
        </template>
        <template #position="{item}">
          <td>
             {{item.position}}
          </td>
        </template>
        <template #show="{item}">
          <td>
            <CButton color="primary" variant="outline" size="sm">
              Show
            </CButton>
          </td>
        </template>
      </CDataTable>
    </CCardBody>
  </CCard>
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
    key: 'show', 
    label: '', 
  }
]

export default {
  props: ['dataHistory'],
  name: 'AdvancedTables',
  data() {
    return {
      fields:fields,
      selected: [],
    }
  },

  methods: {
    
  }
}
</script>
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
           {{item.name}}
          </td>
        </template>
        <template #category="{item}">
          <td>
            {{getCategory(item.template_id)}}
          </td>
        </template>
        <template #position="{item}">
          <td>
             {{getPosition(item.position)}}
          </td>
        </template>
        <template #show="{item}">
          <td>
            <CButton color="primary" variant="outline" size="sm" @click="showModal(item)">
              Show
            </CButton>
          </td>
        </template>
      </CDataTable>
    </CCardBody>
  </CCard>
  <CModal CModal title="Mail Content" color="success" :show.sync="warningModal">
    {{content}}
  </CModal>
  </div>
</template>
<script>

import axios from "axios"
import { LIST_POSITION } from "@/const/constdata";
import { LIST_CATEGORY } from "@/const/constdata";
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
      LIST_CATEGORY,
      LIST_POSITION,
      content: '',
      warningModal: false,
    }
  },

  methods: {
    getPosition(id){
      for(const POSITION of this.LIST_POSITION){
        if(id === 0)return ""
        if(id === POSITION.value) return POSITION.label
      }
    },

    getCategory(id){
      for(const CATEGORY of this.LIST_CATEGORY ){
        if(id===0) return ""
        if(id === CATEGORY.value) return CATEGORY.label
      }
    },

    showModal(item){
      this.content = item.content
      this.warningModal = true
    }
  }
}
</script>
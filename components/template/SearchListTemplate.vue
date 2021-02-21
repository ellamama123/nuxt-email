<template lang="">
  <div>
    <CRow>
      <CCol sm="4">
        <CInput placeholder="Name" v-model="name" >
         <template #prepend-content><CIcon :content="$options.freeSet.cilUser" /></template>
        </CInput>
      </CCol>
      <CCol sm="4">
        <CSelect :options="LIST_CATEGORY" :value.sync="category"/>
        <template #prepend-content><CIcon name="cil-user"/></template>
      </CCol>
      <CCol sm="4">
        <CInput type="date" name="date" v-model="date" />
      </CCol>
    </CRow>
    <div class="button-center">
      <CButton type="submit" size="" class="mr-10" color="success" @click="searchListData(name,category,date)">
        <template><CIcon :content="$options.freeSet.cilMagnifyingGlass" /></template>
          Search
      </CButton>
      <CButton type="reset" size="" color="danger" @click="refreshTemplate()"><CIcon :content="$options.freeSet.cilLoopCircular" />Clear</CButton>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import {LIST_CATEGORY} from '@/const/constdata'
import { freeSet } from "@coreui/icons";

export default {

   freeSet,

  data (){
    return {
      name: '',
      date: '',
      category: 0,
      LIST_CATEGORY,
    }
  },

  methods : {
    searchListData(name,category,date){
      const condition = {
        name,
        category,
        date
      }
      this.$emit('set-condition', condition)
    },

    refreshTemplate : function(name,category,date)
     {
       const condition = {
          name,
          category,
          date
       }
        this.$emit('set-condition',condition) 
        this.name = ''  
        this.category=0
        this.date=""
     },
  }
}
</script>
<template lang="">
  <div>
    <CRow>
      <CCol sm="4">
        <CInput placeholder="Name" v-model="name" />
        <template #prepend-content><CIcon name="cil-user"/></template>
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
      <CButton type="submit" size="sm mr-10" color="success" @click="SearchListTemplate(name,category,date)">
        <template><CIcon :content="$options.search"/></template>
          Search
      </CButton>
      <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban"/>Clear</CButton>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import {LIST_CATEGORY} from '@/const/constdata'
import { cilFindInPage, cilArrowCircleLeft } from '@coreui/icons'

export default {

  search: cilFindInPage,

  data (){
    return {
      name: '',
      date: '',
      category: 0,
      LIST_CATEGORY,
    }
  },

  methods : {
    SearchListTemplate(name,category,date){
      const cond = {
        name,
        category,
        date
      }
      this.$emit('set-condition', cond)
    }
  }
}
</script>
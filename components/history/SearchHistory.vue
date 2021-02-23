<template lang="">
  <div>
    <CCardBody>
      <CRow>
        <CCol sm="4">
          <CInput placeholder="Name" v-model="name">
            <template #prepend-content><CIcon :content="$options.freeSet.cilUser" /></template>
          </CInput>
        </CCol>
        <CCol sm="4">
          <CInput placeholder="Mail" v-model="email">
            <template #prepend-content><CIcon :content="$options.cibGmail" /></template>
          </CInput>
        </CCol>
        <CCol sm="4">
            <CInput type="date" name="date" v-model="date" />
          </CCol>
        <CCol sm="4">
          <CSelect
            :options="LIST_CATEGORY"
            :value.sync="category"
          />
            <template #append-content><CIcon name="cil-envelope-open"/></template>
          </CInput>
        </CCol>
        <CCol sm="4">
          <CSelect
            :options="LIST_POSITION"
            :value.sync="position"
          />
            <template #append-content><CIcon name="cil-envelope-open"/></template>
          </CInput>
        </CCol>
      </CRow>
      <div class="button-center">
          <CButton type="submit" size="" color="success" @click="searchHistory(name,email,category,position,date)"><CIcon :content="$options.freeSet.cilMagnifyingGlass" /> Search</CButton>
          <CButton type="reset" size="" color="danger" @click="refreshMail()"><CIcon :content="$options.freeSet.cilLoopCircular" /> Refresh </CButton>
      </div>     
    </CCardBody>
  </div>
</template>
<script>
import axios from "axios"
import {LIST_CATEGORY} from '@/const/constdata'
import {LIST_POSITION} from '@/const/constdata'
import { freeSet } from "@coreui/icons";
import { cibGmail } from "@coreui/icons";
export default {

    freeSet,cibGmail,
   data() {
    return {
      LIST_CATEGORY,
      LIST_POSITION,
      category : 0,
      position: 0,
      name: '',
      email: '',
      date: '',
    }
   },

   methods : {
     searchHistory : function(name,email,category,position,date)
     {
       const condition = {
          category ,
          position,
          name,
          email,
          date,
       }
       this.$emit('set-condition',condition)
     },

     refreshMail : function(name,email,category,position,date)
     {
       const condition = {
          category ,
          position,
          name,
          email,
          date,
       }
        this.$emit('set-condition',condition)
        this.category = 0  
        this.position = 0
        this.name = ''
        this.email = ''
        this.date= ''
     },
   }
}
</script>

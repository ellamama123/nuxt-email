<template lang="">
  <div>
    <CCardBody>
      <CRow>
          <CCol sm="4">
            <CInput placeholder="Name" v-model="name">
              <template #prepend-content><CIcon :content="$options.people" /></template>
            </CInput>
          </CCol>
          <CCol sm="4">
            <CInput placeholder="Phone" v-model="phone">
              <template #prepend-content><CIcon :content="$options.phone" /></template>
            </CInput>
          </CCol>
          <CCol sm="4">
            <CInput placeholder="Mail" v-model="mail">
              <<template #prepend-content><CIcon :content="$options.mail" /></template>
            </CInput>
          </CCol>
          <CCol sm="4">
            <CInput type="date" name="date" v-model="date" />
          </CCol>
          <CCol sm="4">
            <CSelect
              :options="LIST_STATUS"
              :value.sync="status"
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
          <CButton type="submit" size="sm" color="success" @click="searchCandidate(name,mail,phone,date,status,position)"><CIcon :content="$options.search" /> Tìm kiếm</CButton>
          <CButton type="reset" size="sm" color="danger" @click="refreshMail()"><CIcon :content="$options.refresh" /> Làm mới</CButton>
      </div>     
    </CCardBody>
  </div>
</template>
<script>
import axios from "axios"
import {LIST_POSITION} from '@/const/constdata'
import {LIST_STATUS} from '@/const/constdata'
import {cilFindInPage, cilArrowCircleLeft,cilPeople,cilScreenSmartphone,cibGmail} from "@coreui/icons";
export default {

    search: cilFindInPage,
    refresh : cilArrowCircleLeft,
    people : cilPeople,
    phone : cilScreenSmartphone,
    mail : cibGmail,
   data() {
    return {
      LIST_POSITION,
      LIST_STATUS,
      name : '',
      mail : '',
      phone : '',
      date : '',
      status : -1,
      position : 0,
      dataCandidate : []
    }
   },

   methods : {
     searchCandidate : function(name,mail,phone,date,status,position)
     {
       const cond = {
          name,
          mail ,
          phone ,
          date,
          status,
          position ,
       }
       this.$emit('set-condition',cond)
     },

     refreshMail : function(name,mail,phone,date,status,position)
     {
       const cond = {
          name,
          mail ,
          phone ,
          date,
          status,
          position ,
       }
        this.$emit('set-condition',cond) 
        this.name = ''  
        this.mail = '',
        this.phone = '',
        this.date = '',
        this.status = -1,
        this.position = 0  
     },
   }
}
</script>

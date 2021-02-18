<template lang="">
  <div>
    <CCardBody>
      <CRow>
          <CCol sm="4">
            <CInput placeholder="Name" v-model="name">
              <template #prepend-content><CIcon name="cil-user"/></template>
            </CInput>
          </CCol>
          <CCol sm="4">
            <CInput placeholder="Phone" v-model="phone">
              <template #prepend-content><CIcon name="cil-user"/></template>
            </CInput>
          </CCol>
          <CCol sm="4">
            <CInput placeholder="Mail" v-model="mail">
              <template #prepend-content><CIcon name="cil-user"/></template>
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
      <CRow class="button-mid">
              <CCol sm="6">
                <CButton type="submit" size="sm" color="success" @click="searchCandidate(name,mail,phone,date,status,position)"><CIcon name="cil-check-circle"/> Tìm kiếm</CButton>
              </CCol>
              <CCol sm="6">
                <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban"/> Làm mới</CButton>
              </CCol>
            </CRow>     
          </CCardBody>
  </div>
</template>
<script>
import axios from "axios"
import {LIST_POSITION} from '@/const/constdata'
import {LIST_STATUS} from '@/const/constdata'
export default {
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
   }
}
</script>

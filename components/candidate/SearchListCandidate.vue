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
            <CInput placeholder="Phone" v-model="phone">
              <template #prepend-content><CIcon :content="$options.freeSet.cilPhone" /></template>
            </CInput>
          </CCol>
          <CCol sm="4">
            <CInput placeholder="Mail" v-model="mail">
              <template #prepend-content><CIcon :content="$options.cibGmail" /></template>
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
          <CButton type="submit" size="sm" color="success" @click="searchCandidate(name,mail,phone,date,status,position)"><CIcon :content="$options.freeSet.cilMagnifyingGlass" />Search</CButton>
          <CButton type="reset" size="sm" color="danger" @click="refreshCandidate()"><CIcon :content="$options.freeSet.cilLoopCircular" />Clear</CButton>
      </div>     
    </CCardBody>
  </div>
</template>
<script>
import {LIST_POSITION} from '@/const/constdata'
import {LIST_STATUS} from '@/const/constdata'
import { freeSet } from "@coreui/icons";
import {cibGmail} from "@coreui/icons";
export default {
   freeSet,cibGmail,
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
    }
   },

   methods : {
     searchCandidate(name,mail,phone,date,status,position)
     {
       const condition = {
          name,
          mail ,
          phone ,
          date,
          status,
          position ,
       }
       this.$emit('set-condition',condition)      
     },

     refreshCandidate(name,mail,phone,date,status,position)
     {
       const condition = {
          name,
          mail ,
          phone ,
          date,
          status,
          position ,
       }
        this.$emit('set-condition',condition) 
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

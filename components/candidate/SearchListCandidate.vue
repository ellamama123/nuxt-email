<template lang="">
  <div>
    <CCardBody>
      <CRow>
          <CCol sm="6">
            <CInput placeholder="Tên">
              <template #prepend-content><CIcon name="cil-user"/></template>
            </CInput>
          </CCol>
          <CCol sm="6">
            <CSelect
              :options="LIST_POSITION"
            />
              <template #append-content><CIcon name="cil-envelope-open"/></template>
            </CInput>
          </CCol>

      </CRow>
      <CRow>
              <CCol sm="6">
                <CButton type="submit" size="sm" color="success" @click=""><CIcon name="cil-check-circle"/> Tìm kiếm</CButton>
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
export default {
   data() {
    return {
      LIST_POSITION,
    }
   },
   methods(){
     
   }
}
</script>
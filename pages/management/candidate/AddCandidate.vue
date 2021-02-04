<template lang="">
  <div>
    <CRow>
      <CCol sm="12">
        <CInput
          label="Tên ứng viên"
          placeholder="Enter your name"
        />
      </CCol>
    </CRow>
    <CRow>
      <CCol sm="12">
        <CInput
         label="Điện thoại"
         placeholder="Nhập số điện thoại"
        >
        </CInput>
      </CCol>
    </CRow>
    <CRow>
      <CCol sm="12">
        <CInput
         label="Email"
         placeholder="Nhập email"
         type="email"
        >
        </CInput>
      </CCol>
    </CRow>
     <CRow>
      <CCol sm="4">
        <CSelect
          label="Loại mail"
          :options="LIST_POSITION"
        />
      </CCol>
    </CRow>
    <CRow>
      <CCol sm="4">
        <CSelect
          label="Trạng thái"
          :options="LIST_STATUS"
        />
      </CCol>

    </CRow>
    <CButton color="success" class="btn-click">
      Gửi
    </CButton>
    <CButton color="primary" >
      Clear
    </CButton>
  </div>
</template>
<script>
import {LIST_POSITION} from '@/const/constdata'
import {LIST_STATUS} from '@/const/constdata'
export default {
  data() {
    return {
      LIST_POSITION,
      LIST_STATUS,
    }
  },
  mounted() {
    console.log(LIST_POSITION)
  },
  methods:{
    // clear: function(i){
    //   this.data[i].value = '';
    // }
  }
}
</script>
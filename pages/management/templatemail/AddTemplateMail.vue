<template lang="">
  <div>
    <CRow>
      <CCol sm="12">
        <CInput
          label="Tên"
          placeholder="Enter your name"
        />
      </CCol>
    </CRow>
    <CRow>
      <CCol sm="12">
        <CTextarea
         label="Nội dung"
         row="10"
        >
        </CTextarea>
      </CCol>
    </CRow>
    <CRow>
      <CCol sm="4">
        <CSelect
          label="Loại mail"
          :options="LIST_CATEGORY"
          
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
import {LIST_CATEGORY} from '@/store/const/const'
export default {
  data() {
    return {
      LIST_CATEGORY,
    }
  },
  mounted() {
    
  },
  methods:{
    // clear: function(i){
    //   this.data[i].value = '';
    // }
  }
}
</script>
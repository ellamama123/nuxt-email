<template lang="">
  <div>
    <CRow>
      <CCol sm="12">
        <CInput
          label="Name"
          placeholder="Enter your name"
        />
      </CCol>
    </CRow>
    <CRow>
      <CCol sm="12">
        <CInput
          label="Credit Card Number"
          placeholder="0000 0000 0000 0000"
        />
      </CCol>
    </CRow>
    <CRow>
      <CCol sm="4">
        <CSelect
          label="Month"
          :options="[1,2,3,4,5,6,7,8,9,10,11,12]"
        />
      </CCol>
      <CCol sm="4">
        <CSelect
          label="Year"
          :options="[2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025]"
        />
      </CCol>
      <CCol sm="4">
        <CInput
          label="CVV/CVC"
          placeholder="123"
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
export default {
  methods:{
    // clear: function(i){
    //   this.data[i].value = '';
    // }
  }
}
</script>
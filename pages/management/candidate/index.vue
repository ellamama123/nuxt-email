<template lang="">
  <div>
    <CRow>
      <CCol sm="12">
        <CCard>
          <CCardHeader>
            <CRow>
              <CCol sm="10">
                <CBadge color="primary">Danh sách ứng viên</CBadge>
              </CCol>
              <CCol sm="2">
                <CButton
                  color="success"
                  class="m-2"
                  size="sm"
                >
                  <nuxt-link to="/management/candidate/add"> + Thêm mới</nuxt-link>
                </CButton>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <search-list-candidate></search-list-candidate>
            <list-candidate :dataCandidate="dataCandidate" @refresh="fetchData()"></list-candidate>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import ListCandidate from '@/components/candidate/ListCandidate'
import SearchListCandidate from '@/components/candidate/SearchListCandidate'
import axios from "axios";
export default {
  components: {ListCandidate,SearchListCandidate},
  data() {
    return {
      dataCandidate : []   
   }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData: function() {
      const url =  'http://127.0.0.1:8000/api/candidate'
      axios.get(url).then((response) => {
        this.dataCandidate = response.data
      })
    },
  },
}
</script>
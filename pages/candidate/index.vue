<template lang="">
  <div>
    <CRow>
      <CCol sm="12">
        <CCard>
          <CCardHeader>
            <CRow>
              <CCol sm="11">
                <CBadge color="primary">List Candidate</CBadge>
              </CCol>
              <CCol sm="1">
                <CButton color="success" class="m-2" size="sm">
                  <nuxt-link to="/candidate/add"> + Add</nuxt-link>
                </CButton>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <search-list-candidate
              @set-condition="getData"
            ></search-list-candidate>
            <list-candidate
               :dataCandidate="dataCandidate"
              @refresh="fetchData()"
            ></list-candidate>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import ListCandidate from "@/components/candidate/ListCandidate";
import SearchListCandidate from "@/components/candidate/SearchListCandidate";
import axios from "axios";

export default {
  
  components: { ListCandidate, SearchListCandidate },
  data() {
    return {
      dataCandidate: [],
      cond: {},
    };
  },

  mounted() {
    this.fetchData();
  },

  methods: {
    fetchData: function() {
      axios
        .get("http://127.0.0.1:8000/api/candidate", { params: this.cond })
        .then((response) => {
          this.dataCandidate = response.data;
        });
    },

    getData: function(value) {
      this.cond = value;
      this.fetchData();
    },
  },
};
</script>
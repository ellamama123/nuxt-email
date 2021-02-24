<template lang="">
  <div>
    <CRow>
      <CCol sm="12">
        <CCard>
          <CCardHeader>
            <CRow>
              <CCol lg="10 center">
                List Candidate
              </CCol>
              <CCol lg="2 right">
                <CButton color="success" class="m-2" size="sm">
                  <nuxt-link to="/candidate/add"> + Add</nuxt-link>
                </CButton>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <search-list-candidate
              @set-condition="doSearch"
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
  middleware: "auth",
  components: { ListCandidate, SearchListCandidate },
  data() {
    return {
      dataCandidate: [],
      condition: {},
    };
  },

  mounted() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      axios
        .get("http://127.0.0.1:8000/api/candidate", { params: this.condition })
        .then((response) => {
          this.dataCandidate = response.data;
        });
    },

    doSearch(value) {
      this.condition = value;
      this.fetchData();
    },
  },
};
</script>

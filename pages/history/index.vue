<template lang="">
  <div>
    <CCard>
      <CCardHeader>
        <p class="center">Mail History List</p>
      </CCardHeader>
      <search-history @set-condition="doSearch"></search-history>
      <list-history :dataHistory="dataHistory"></list-history>
    </CCard>
  </div>
</template>
<script>
import axios from "axios";
import searchHistory from "@/components/history/SearchHistory";
import listHistory from "@/components/history/ListHistory";
export default {
  // middleware: "auth",
  data() {
    return {
      dataHistory: [],
      dataCandidate: [],
      condition: {},
    };
  },

  components: { listHistory, searchHistory },

  mounted() {
    this.fetchData();
  },

  methods: {
    fetchData: function() {
      const url = "http://127.0.0.1:8000/api/history";
      const url1 = "http://127.0.0.1:8000/api/candidate";
      axios
        .get(url1)
        .then((response) => {
          this.dataCandidate = response.data;
        })
        .then(() => {
          axios.get(url, { params: this.condition }).then((response) => {
            this.dataHistory = response.data;
            this.dataHistory.map((item) => {
              this.dataCandidate.map((itemCandidate) => {
                if (item.candidate_id === itemCandidate.id) {
                  item.name = itemCandidate.name;
                }
              });
            });
          });
        });
    },

    doSearch(value) {
      this.condition = value;
      this.fetchData();
    },
  },
};
</script>

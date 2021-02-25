<template lang="">
  <div>
    <CCard>
      <CCardHeader>
        <p class="center">Send Mail Offer</p>
      </CCardHeader>
      <search-mail @set-condition="getData"></search-mail>
      <mail-offer
        :dataCandidate="dataCandidate"
        @reload="listData"
      ></mail-offer>
    </CCard>
  </div>
</template>

<script>
import axios from "axios";
import MailOffer from "@/components/sendmail/MailOffer";
import SearchMail from "@/components/sendmail/SearchMail";
import { LIST_POSITION } from "@/const/constdata";
import { LIST_STATUS } from "@/const/constdata";

export default {
  middleware: "auth",
  name: "AdvancedTables",
  components: { MailOffer, SearchMail },
  data() {
    return {
      dataCandidate: [],
      dataSend: [],
      date: null,
      dataMailOffer: "",
      salary: "",
      errors: [],
      LIST_POSITION,
      LIST_STATUS,
      content: "",
      warningModal: false,
      condition: {},
    };
  },

  mounted() {
    this.listData();
  },

  methods: {
    listData: function() {
      axios
        .get("http://127.0.0.1:8000/api/candidate", { params: this.condition })
        .then((response) => {
          this.dataCandidate = response.data;
        });
    },
    getData: function(value) {
      this.condition = value;
      this.listData();
    },
  },
};
</script>

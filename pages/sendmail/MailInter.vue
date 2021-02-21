<template lang="">
  <div>
    <CCard>
      <CCardHeader>
        <p class="center">Send Mail Inter</p>
      </CCardHeader>
      <search-mail @set-condition="getData"></search-mail>
      <mail-intern :dataCandidate="dataCandidate"></mail-intern>
    </CCard>
  </div>
</template>

<script>
import axios from "axios";
import MailIntern from "@/components/sendmail/MailIntern";
import SearchMail from "@/components/sendmail/SearchMail";
import { LIST_POSITION } from "@/const/constdata";
import { LIST_STATUS } from "@/const/constdata";

const fields = [
  { key: "name", label: "Name" },
  { key: "phone", label: "Phone" },
  { key: "email", label: "Email" },
  { key: "position", label: "Position" },
  { key: "status", label: "Status" },
  { key: "created_at", label: "Day Reception" },
  {
    key: "dateTime",
    label: "interview schedule",
  },
  {
    key: "show",
    label: "",
  },
];

export default {
  name: "AdvancedTables",
  components: { MailIntern, SearchMail },
  data() {
    return {
      dataCandidate: [],
      fields: fields,
      dataSend: [],
      dateTime: null,
      dataMailIntern: "",
      LIST_POSITION,
      LIST_STATUS,
      warningModal: false,
      content: "",
      cond: {},
    };
  },
  mounted() {
    this.listData();
  },
  methods: {
    listData: function() {
      axios
        .get("http://127.0.0.1:8000/api/candidate", { params: this.cond })
        .then((response) => {
          this.dataCandidate = response.data;
        });
    },
    
    getData: function(value) {
      this.cond = value;
      this.listData();
    },
  },
};
</script>
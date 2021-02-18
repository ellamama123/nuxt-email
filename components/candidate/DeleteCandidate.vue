<template lang="">
  <div>
    <CModal title="Cảnh báo" color="warning" :show.sync="warningModal">

    </CModal>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: ["delCandidate"],
  data() {
    return {
      warningModal: false,
    };
  },
  mounted() {
    console.log(this.delCandidate);
  },
  methods: {

  },
};
</script>
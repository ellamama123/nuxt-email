<template lang="">
  <div>
    <CCard>
      <CCardHeader>
        <p class="center">Send Mail Thank</p>
      </CCardHeader>
      <CCardBody>
        <CDataTable
          :items="dataCandidate"
          :fields="fields"
          :items-per-page="5"
          pagination
        >
          <template #send="{item}">
            <td>
              <CInputCheckbox @change="check(item)" />
            </td>
          </template>
          <template #status="{item}">
            <td>
              {{ getStatus(item.status) }}
            </td>
          </template>
          <template #created_at="{item}">
            <td>
              {{ convertDate(item.created_at) }}
            </td>
          </template>
          <template #show="{item}">
            <td>
              <CButton
                color="primary"
                variant="outline"
                size="sm"
                @click="showModal(item)"
              >
                Show
              </CButton>
            </td>
          </template>
        </CDataTable>
      </CCardBody>
      <CCardFooter>
        <CButton color="success" class="m-2" @click="sendMail()">
          Send
        </CButton>
      </CCardFooter>
    </CCard>
    <CModal
      title="Detail Content Mail"
      color="success"
      :show.sync="warningModal"
    >
      {{ content }}
    </CModal>
  </div>
</template>
<script>
import axios from "axios";
import moment from "moment";
import { LIST_STATUS } from "@/const/constdata";

const fields = [
  { key: "name", label: "Name" },
  { key: "phone", label: "Phone" },
  { key: "email", label: "Email" },
  { key: "status", label: "Status" },
  { key: "created_at", label: "Day Reception" },
  {
    key: "send",
  },
  {
    key: "show",
    label: "",
  },
];

export default {
  name: "AdvancedTables",
  props: ["dataCandidate"],
  data() {
    return {
      dataCandidate: [],
      fields: fields,
      dataMailThank: "",
      dataSend: [],
      warningModal: false,
      LIST_STATUS,
      content: "",
    };
  },

  created() {
    this.getMailThank();
  },

  methods: {
    getMailThank: function() {
      const url1 = "http://127.0.0.1:8000/api/getMailThank";
      axios.get(url1).then((response) => {
        this.dataMailThank = response.data;
      });
    },

    sendMail: function() {
      for (const [key, value] of Object.entries(this.dataSend)) {
        value["content"] = this.changeText(
          this.dataMailThank["content"],
          value["name"]
        );
        value["template_id"] = this.dataMailThank["category"];
        axios
          .post("http://127.0.0.1:8000/api/send-mail", value)
          .then((response) => {
            axios
              .post(
                "http://127.0.0.1:8000/api/history?candidate_id=" + value.id,
                value
              )
              .then((response) => {});
          });
      }
    },

    check: function(item) {
      this.dataSend.push(item);
    },

    changeText: function(content, name) {
      content = content.replace("[Name]", name);
      return content;
    },

    getStatus(status) {
      for (const sta of this.LIST_STATUS) {
        if (status == sta.value) {
          return sta.label;
        }
      }
    },

    convertDate(created) {
      created = moment(String(created)).format("DD/MM/YYYY");
      return created;
    },

    showModal(item) {
      this.content = this.changeText(this.dataMailThank["content"], item.name);
      this.warningModal = true;
    },
  },
};
</script>
<style lang=""></style>

<template lang="">
  <div>
    <CCard>
      <CCardBody>
        <CDataTable
          :items="dataCandidate"
          :fields="fields"
          :items-per-page="5"
          pagination
        >
          <template #send="{item}">
            <td>
              <CSelect
                :options="dataMailThank"
                :value.sync="item.category_mail"
                @change="selectMail(item)"
              />
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
                Preview
              </CButton>
            </td>
          </template>
        </CDataTable>
      </CCardBody>
      <CCardFooter>
        <div class="button-center">
          <CButton color="success" class="m-2" @click="sendMail()">
            Send
          </CButton>
        </div>
      </CCardFooter>
    </CCard>
    <CModal
      title="Detail Content Mail"
      color="success"
      :show.sync="warningModal"
    >
      <div class="content-mail">
        {{ content }}
      </div>
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
      fields: fields,
      dataMailThank: [],
      selectMailThank: [],
      dataSend: [],
      warningModal: false,
      LIST_STATUS,
      category_mail: 0,
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
        this.dataMailThank.map(function(value, key) {
          value["value"] = value["id"];
          value["label"] = value["name"];
        });
        this.dataMailThank.unshift({ value: 0, label: "----Choose mail ----" });
        console.log(this.dataMailThank);
      });
    },
    getContentMailThank(id) {
      return this.dataMailThank.find((element) => element.value === id).content;
    },
    sendMail: function() {
      for (const [key, value] of Object.entries(this.dataSend)) {
        value["template_id"] = value.category_mail;
        value["content"] = this.getContentMailThank(value.category_mail);
        axios
        .post("http://127.0.0.1:8000/api/send-mail", value)
        .then((response) => {
          axios.post(
            "http://127.0.0.1:8000/api/history?candidate_id=" + value.id,
            value
          );
        });
      }
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
      this.dataSend.forEach((element) => {
        if (item.id == element.id) {
          this.content = this.changeText(
            this.getContentMailThank(element.category_mail),
            item.name
          );
          this.warningModal = true;
        }
      });
    },
    selectMail(item) {
      var index = this.dataSend.findIndex((element) => element.id == item.id);
      if (index == -1) {
        this.dataSend.push(item);
      } else {
        item.category_mail == 0
          ? this.dataSend.splice(index, 1)
          : (this.dataSend[index] = item);
      }
    },
  },
};
</script>
<style lang=""></style>

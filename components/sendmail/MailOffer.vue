<template lang="">
  <div>
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
              :options="dataMailOffer"
              :value.sync="item.category_mail"
              @change="selectMail(item)"
            />
          </td>
        </template>
        <template #date="{item}">
          <td>
            <CInput
              type="date"
              name="date"
              v-model="item.date"
              @change="check(item)"
            />
          </td>
        </template>
        <template #salary="{item}">
          <td>
            <CInput v-model="item.salary" />
          </td>
        </template>

        <template #position="{item}">
          <td>
            {{ getPosition(item.position) }}
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
    <div v-if="errors && errors.length">
      <div v-for="error in errors" :key="error">
        <p class="alert alert-warning">{{ error }}</p>
      </div>
    </div>
    <CModal
      title="Detail Content Mail"
      color="success"
      :show.sync="warningModal"
    >
      <div class="content-mail">
        {{ content }}
      </div>
    </CModal>
    <CModal title="Success" color="success" :show.sync="warningModal1">
      <div class="content-mail">
        <p>Send mail success</p>
      </div>
      <div slot="footer" class="w-100"></div>
    </CModal>
    <div v-if="showLoading">
      <CElementCover
        :boundaries="[{ sides: ['top', 'left'], query: '.media-body' }]"
        :opacity="0.8"
      >
        <h1 class="d-inline">Loading...</h1>
        <CSpinner size="5xl" color="success" />
      </CElementCover>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import moment from "moment";
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
    key: "date",
    label: "interview schedule",
  },
  {
    key: "salary",
    label: "Salary",
  },
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
      dataSend: [],
      date: null,
      dataMailOffer: "",
      salary: "",
      errors: [],
      LIST_POSITION,
      LIST_STATUS,
      content: "",
      warningModal: false,
      showLoading: false,
      warningModal1: false,
    };
  },

  mounted() {
    this.getMailOffer();
  },

  methods: {
    getMailOffer: function() {
      const url1 = "http://127.0.0.1:8000/api/getMailOffer";
      axios.get(url1).then((response) => {
        this.dataMailOffer = response.data;
        this.dataMailOffer.map(function(value, key) {
          value["value"] = value["id"];
          value["label"] = value["name"];
        });
        this.dataMailOffer.unshift({ value: 0, label: "----Choose mail ----" });
      });
    },

    getContentMailOffer(id) {
      return this.dataMailOffer.find((element) => element.value === id).content;
    },

    sendMail: function() {
      this.errors = [];
      for (const [key, value] of Object.entries(this.dataSend)) {
        if (!value.date || !value.salary) {
          this.errors.push("Phải nhập đầy đủ dữ liệu");
        } else {
          this.showLoading = true;
          value["template_id"] = 3;
          value["candidate_email"] = value.email;
          value["candidate_id"] = value.id;
          value["status"] = value.status;
          value["position_name"] = this.getPosition(value.position)
          value["content"] = this.getContentMailOffer(value.category_mail)
          value["date_work"] = value.date;
          value["salary"] = value.salary;
          axios
            .post("http://127.0.0.1:8000/api/send-mailOffer", value)
            .then(() => {
              this.warningModal1 = true;
              this.showLoading = false;
            })
            .then(() => {
              window.location.reload(true);
            });
        }
      }
    },

    check: function(item) {
      this.dataSend.push(item);
    },

     showModal(item) {
      console.log(this.dataSend)
      this.dataSend.find((element) => {
        if(element.id === item.id){
          axios.get('http://127.0.0.1:8000/api/previewMail?id=' +  item.category_mail).then((response) => {
            this.content = response.data
            this.content = this.content.replace("[Name]", element.name).replace("[date]", this.convertDate(element.date)).replace("[Position]", this.getPosition(element.position)).replace("[salary]", element.salary);
          });
          this.warningModal = true;
        }
      })
    },

    changeText: function(content, name, date, position, salary) {
      if (!date && !salary) {
        return content;
      } else {
        content = content
          .replace("[Name]", name)
          .replace("[date]", this.convertDate(date))
          .replace("[Position]", position)
          .replace("[salary]", salary);
        return content;
      }
    },

    getPosition(id) {
      for (const position of this.LIST_POSITION) {
        if (id == position.value) {
          return position.label;
        }
      }
    },

    getStatus(id) {
      for (const status of this.LIST_STATUS) {
        if (id == status.value) {
          return status.label;
        }
      }
    },

    convertDate(created) {
      created = moment(String(created)).format("DD/MM/YYYY");
      return created;
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

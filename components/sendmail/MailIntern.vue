<template lang="">
  <div>
    <CCard>
      <CCardHeader>
        <p class="center">Send Mail Inter</p>
      </CCardHeader>
      <CCardBody>
        <CDataTable
          :items="dataCandidate"
          :fields="fields"
          :items-per-page="5"
          pagination
        >
          <template #position="{item}">
            <td>
              {{ getPosition(item.position) }}
            </td>
          </template>
          <template #dateTime="{item}">
            <td>
              <CInput
                type="datetime-local"
                name="dateTime"
                v-model="item.dateTime"
                @change="check(item)"
              />
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

  props: ['dataCandidate'],

  name: "AdvancedTables",
  data() {
    return {
      fields: fields,
      dataSend: [],
      dateTime: null,
      dataMailIntern: "",
      LIST_POSITION,
      LIST_STATUS,
      warningModal: false,
      content: "",
    };
  },
  
  mounted() {
    this.getMailIntern();
  },
  methods: {
    getMailIntern: function() {
      const url = "http://127.0.0.1:8000/api/getMailIntern";
      axios.get(url).then((response) => {
        this.dataMailIntern = response.data;
      });
    },

    sendMail: function() {
      for (const [key, value] of Object.entries(this.dataSend)) {
        value["template_id"] = this.dataMailIntern["category"];
        value["content"] = this.changeText(
          this.dataMailIntern["content"],
          value["name"],
          value["dateTime"],
          this.getPosition(value["position"])
        );
        value["datetime_interview"] = value.dateTime;

        if (!value.dateTime) {
          console.log("loi");
        } else {
          axios
            .post("http://127.0.0.1:8000/api/send-mailIntern", value)
            .then((response) => {
              axios
                .post(
                  "http://127.0.0.1:8000/api/history?candidate_id=" + value.id,
                  value
                )
                .then((response) => {});
            });
        }
      }
    },

    check: function(item) {
      this.dataSend.push(item);
    },

    getPosition(position) {
      for (const pos of this.LIST_POSITION) {
        if (position == pos.value) {
          return pos.label;
        }
      }
    },

    changeText: function(content, name, dateTime, position) {
      if (!dateTime) {
        return content;
      } else {
        dateTime = moment(String(dateTime)).format("DD/MM/YYYY hh:mm");
        content = content
          .replace("[Name]", name)
          .replace("[dateTime]", dateTime)
          .replace("[Position]", position);
        return content;
      }
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
      this.content = this.changeText(
        this.dataMailIntern["content"],
        item.name,
        item.dateTime,
        item.position
      );
      this.warningModal = true;
    },
  },
};
</script>

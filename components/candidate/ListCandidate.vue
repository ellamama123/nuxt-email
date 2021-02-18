<template lang="">
  <div>
    <CDataTable :items="dataCandidate" :fields="fields">
      <template #position="{item}">
        <td>
          {{ getPosition(item.position) }}
        </td>
      </template>
      <template #created_at="{item}">
        <td>
          {{ convertDate(item.created_at) }}
        </td>
      </template>
      <template #edit="{item}">
        <td class="py-2">
          <CButton color="success">
            <nuxt-link :to="`/candidate/${item.id}`">
              <CIcon name="cil-pencil" />
              Edit
            </nuxt-link>
          </CButton>
        </td>
      </template>
      <template #delete="{item}">
        <td class="py-2">
          <CButton color="danger" @click="showModal(item.id)">
            Xóa
          </CButton>
        </td>
      </template>
      <template #status="{item}">
        <td>
          {{ getStatus(item.status) }}
        </td>
      </template>
    </CDataTable>
    <CModal
      title="Detail Content Mail"
      color="success"
      :show.sync="warningModal"
    >
      Bạn có chắc chắn muốn xóa không ?
      <div slot="footer" class="w-100">
        <CButton
          style="border-radius: .2rem; color: white;"
          color="danger"
          class="ml-1 mr-1 float-right"
          @click="warningModal = false"
        >
          Hủy
        </CButton>
        <CButton
          style="border-radius: .2rem; color: white;"
          color="danger"
          class="ml-1 mr-1 float-right"
          @click="deleteData(id)"
        >
          Xóa
        </CButton>
      </div>
    </CModal>
  </div>
</template>
<script>
import axios from "axios";
import { cilPencil, cilSettings } from "@coreui/icons";
import { LIST_POSITION } from "@/const/constdata";
import { LIST_STATUS } from "@/const/constdata";
import DeleteCandidate from "./DeleteCandidate.vue";
import moment from "moment";
const fields = [
  { key: "name", label: "Name" },
  { key: "phone", label: "Phone" },
  { key: "email", label: "Email" },
  { key: "position", label: "Position" },
  { key: "status", label: "Status" },
  { key: "created_at", label: "Date recived" },
  {
    key: "edit",
    label: "Edit",
  },
  {
    key: "delete",
    lable: "Delete",
  },
];

export default {
  components: { DeleteCandidate },
  icons: { cilPencil, cilSettings },
  props: ["dataCandidate"],
  name: "AdvancedTables",
  data() {
    return {
      LIST_POSITION,
      LIST_STATUS,
      dataCandidate: [],
      fields: fields,
      pos: "",
      warningModal: false,
      id: 0,
    };
  },
  methods: {
    getPosition(position) {
      for (const pos of this.LIST_POSITION) {
        if (position == 0) return "";
        if (position == pos.value) {
          return pos.label;
        }
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
    deleteData: function(id) {
      axios.delete("http://127.0.0.1:8000/api/candidate/" + id).then((res) => {
        this.warningModal = false;
        this.$emit("refresh", res);
      });
    },
    showModal(item) {
      this.id = item;
      this.warningModal = true;
    },
  },
};
</script>

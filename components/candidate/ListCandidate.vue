<template lang="">
  <div>
    <CDataTable
      :items="dataCandidate"
      :fields="fields"
      items-per-page-select
      :items-per-page="5"
      pagination
    >
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
      <template #delete="{item}">
        <td class="py-2">
        <CButton color="success">
            <nuxt-link :to="`/candidate/${item.id}`">
              <CIcon :content="$options.pencil" />
            </nuxt-link>
          </CButton>
          <CButton color="danger" @click="showModal(item.id)">
            <CIcon :content="$options.trash" />
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
      title="Delete"
      color="warning"
      :show.sync="warningModal"
    >
      Do you want to delete ?
      <div slot="footer" class="w-100">
        <CButton
          style="border-radius: .2rem; color: white;"
          color="danger"
          class="ml-1 mr-1 float-right"
          @click="warningModal = false"
        >
          No
        </CButton>
        <CButton
          style="border-radius: .2rem; color: white;"
          color="danger"
          class="ml-1 mr-1 float-right"
          @click="deleteData(id)"
        >
          Yes
        </CButton>
      </div>
    </CModal>
  </div>
</template>
<script>
import axios from "axios";
import { cilPencil, cilTrash, cilSearch } from "@coreui/icons";
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
    key: "delete",
    lable: '',
  },
];

export default {
  components: { DeleteCandidate },
  pencil: cilPencil,
  trash: cilTrash,

  props: ["dataCandidate"],
  name: "AdvancedTables",

  data() {
    return {
      LIST_POSITION,
      LIST_STATUS,
      fields: fields,
      pos: "",
      warningModal: false,
      id: 0,
    };
  },

  methods: {
    getPosition(position) {
      return LIST_POSITION.find((element) => element.value === position).label;
    },

    getStatus(status) {
      return LIST_STATUS.find((element) => element.value === status).label;
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

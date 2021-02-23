<template lang="">
  <div>
    <CCardBody>
      <CDataTable
        :items="dataHistory"
        :fields="fields"
        items-per-page-select
        :items-per-page="5"
        pagination
      >
        <template #candidate_id="{item}">
          <td>
            {{ item.name }}
          </td>
        </template>
        <template #email="{item}">
          <td>
            {{ item.candidate_email }}
          </td>
        </template>
        <template #category="{item}">
          <td>
            {{ getCategory(item.template_id) }}
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
    <CModal
      CModal
      title="Mail Content"
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
import { LIST_POSITION } from "@/const/constdata";
import { LIST_STATUS } from "@/const/constdata";
import { LIST_CATEGORY } from "@/const/constdata";
const fields = [
  { key: "candidate_id", label: "Name" },
  { key: "email", label: "Email" },
  { key: "category", label: "Mail Category" },
  {
    key: "position",
    label: "Position",
  },
  {
    key: "status",
    label: "Status",
  },
  { key: "created_at", label: "Created At" },
  {
    key: "show",
    label: "",
  },
];

export default {
  props: ["dataHistory"],
  name: "AdvancedTables",
  data() {
    return {
      fields: fields,
      selected: [],
      LIST_CATEGORY,
      LIST_POSITION,
      content: "",
      warningModal: false,
      dataTemplate: [],
    };
  },

  methods: {
    getPosition(id) {
      for (const POSITION of this.LIST_POSITION) {
        if (id === 0) return "";
        if (id === POSITION.value) return POSITION.label;
      }
    },

    getCategory(id) {
      const category = LIST_CATEGORY.find((element) => element.value == id);
      return category ? category.label : "";
    },

    getStatus(id) {
      const category = LIST_STATUS.find((element) => element.value === id);
      return category ? category.label : "";
    },

    showModal(item) {
      this.content = item.content.replaceAll("<br />", "\n", item.content);
      this.warningModal = true;
    },

    convertDate(created) {
      created = moment(String(created)).format("DD/MM/YYYY");
      return created;
    },
  },
};
</script>

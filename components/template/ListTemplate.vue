<template lang="">
  <div>
    <CDataTable
      :items="dataTemplate"
      :fields="fields"
      items-per-page-select
      :items-per-page="5"
      pagination
    >
      <template #category="{item}">
        <td>
          {{getCategory(item.category)}}
        </td>
      </template>
      <template #created_at="{item}">
        <td>
          {{convertDate(item.created_at)}}
        </td>
      </template>
      <template #delete="{item}"> 
        <td class="py-2">
          <CButton color="success">
            <nuxt-link :to="`${item.id}`">
              <template><CIcon :content="$options.freeSet.cilPencil" /></template>
            </nuxt-link>
          </CButton>
          <CButton color="danger" @click="showModalDelete(item.id)">
            <template><CIcon :content="$options.freeSet.cilTrash" /></template>
          </CButton>
        </td>
      </template>
      <template #show="{item}">
        <td>
          <CButton
            color="primary"
            variant="outline"
            size=""
            @click="showModal(item)"
          >
            Preview
          </CButton>
        </td>
      </template>
    </CDataTable>
    <CModal title="Delete" color="warning" :show.sync="warningModal">
      Do you want to delete?
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
    <CModal title="Mail Content" color="success" :show.sync="successModal">
       <div class="content-mail">
        {{ content }}
      </div>
    </CModal>
  </div>
</template>

<script>
import axios from "axios"
import moment from 'moment'
import {LIST_CATEGORY} from '@/const/constdata'
import { freeSet } from "@coreui/icons";
const fields = [
  {key : 'name',label :'Name'},
  {key: 'category', label: 'Category Mail'},
  {key: 'created_at', label: 'Created'},
  
  {
    key: 'delete',
    label: '',
  },
  {
    key: 'show',
    label: '',
  }
]

export default {

  freeSet,
  props: ['dataTemplate'],

  name: 'AdvancedTables',
  data() {
    return {
      fields:fields,
      selected: [],
      LIST_CATEGORY,
      id: 0,
      warningModal:false,
      successModal: false,
      content: '',
    }
  },

  methods: {

    getCategory(id){
      const category = LIST_CATEGORY.find(element => element.value == id)
      return category ? category.label : ''
    },

    showModalDelete(item){
      this.id = item
      this.warningModal = true
    },

    showModal(item){
      this.content = item.content
      this.successModal = true
    },

    deleteData: function(id) {
      axios.delete("http://127.0.0.1:8000/api/template/" + id).then((res) => {
        this.warningModal = false;
        this.$emit("refresh", res);
      });
    },

    convertDate(created){
      created = moment(String(created)).format('DD/MM/YYYY')
      return created
    }
  }
}
</script>
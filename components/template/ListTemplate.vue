<template lang="">
  <div>
    <CDataTable
      :items="dataTemplate"
      :fields="fields"
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
      <template #edit="{item}">  
        <td class="py-2">
          <CButton color="success">
            <nuxt-link :to="`${item.id}`">
              <template><CIcon :content="$options.pencil" /></template>
            </nuxt-link>
          </CButton>
        </td>
      </template>
      <template #delete="{item}"> 
        <td class="py-2">
          <CButton color="danger" @click="showModal(item.id)">
            <template><CIcon :content="$options.trash" /></template>
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
  </div>
</template>

<script>
import axios from "axios"
import moment from 'moment'
import {LIST_CATEGORY} from '@/const/constdata'
import { cilPencil, cilTrash } from '@coreui/icons'
const fields = [
  {key : 'name',label :'Name'},
  {key: 'category', label: 'Category Mail'},
  {key: 'created_at', label: 'Created'},
  {
    key: 'edit',
    label: 'Edit'
  },
  {
    key: 'delete',
    label: 'Delete',
  },
]

export default {

   pencil: cilPencil,
   trash: cilTrash,
  props: ['dataTemplate'],

  name: 'AdvancedTables',
  data() {
    return {
      fields:fields,
      selected: [],
      LIST_CATEGORY,
      id: 0,
      warningModal:false,
    }
  },

  methods: {

    getCategory(status){
      for(const sta of this.LIST_CATEGORY)
      {
        if(status == sta.value)
        {
          return sta.label
        }
      }
    },

    toggleDetails(item) {
      console.log(item)
      this.$set(this.dataTemplate[item.id], '_toggled', !item._toggled)
      this.collapseDuration = 300
      this.$nextTick(() => { this.collapseDuration = 0 })
    },

    showModal(item){
      this.id = item
      this.warningModal = true
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
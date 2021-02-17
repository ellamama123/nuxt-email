<template lang="">
  <div>
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
            <template #edit="{item}">
              <td class="py-2">
                <CButton color="success">
                  <nuxt-link :to="`/management/candidate/${item.id}`">
                    <CIcon name="cil-pencil" />
                    Sửa
                  </nuxt-link>
                </CButton>
              </td>
            </template>
            <template #delete="{item}">
              <td class="py-2">
                <CButton color="danger"  @click="warningModal = true">
                  Xóa
                </CButton>
                <CModal
                  title="Cảnh báo"
                  color="warning"
                  :show.sync="warningModal"
                  
                >
                  Bạn có chắc chắn muốn xóa không ?
                <div slot="footer" class="w-100">
                    <CButton style="border-radius: .2rem; color: white;" color="danger" class="ml-1 mr-1 float-right" @click="warningModal = false">
                        Hủy
                    </CButton>
                    <CButton style="border-radius: .2rem; color: white;" color="danger" class="ml-1 mr-1 float-right" @click="deleteData(item)">
                        Xóa
                    </CButton>
                </div>
                </CModal>
              </td>
            </template>
              <template #status="{item}">
                <td>
                  {{getStatus(item.status)}}
                </td>
              </template>
            </CDataTable>
  </div>
</template>
<script>
import axios from "axios"
import {LIST_POSITION} from '@/const/constdata'
import {LIST_STATUS} from '@/const/constdata'
import { cilPencil, cilSettings  } from '@coreui/icons'
const fields = [
  {key : 'name',label :'Tên'},
  {key : 'phone',label :'Số điện thoại'},
  {key : 'email',label :'Email'},
  {key : 'position',label :'Vị trí ứng tuyển'},
  {key : 'status',label :'Trạng thái'},
  {key : 'created_at',label :'Ngày tiếp nhận'},
  {
    key : 'edit',
    label : 'Sửa'
  },
  {
    key : 'delete',
    lable : 'Xóa'
  }
];

export default {
  props:['dataCandidate'],
  icons: { cilPencil, cilSettings },
  name: "AdvancedTables",
  data() {
    return {
      LIST_POSITION,
      LIST_STATUS,
      dataCandidate : [],
      fields:fields,
      pos:'',
      warningModal: false
      
    };
  },  
  methods: {
    
    deleteData: function(item) {
        axios.delete('http://127.0.0.1:8000/api/candidate/'+item.id).then((res) => {
          this.warningModal = false
          this.$emit('refresh')
        })        
    },

    getPosition(position){
Object.entries(this.LIST_POSITION).forEach(([key, value]) => {
        if(position == value.value)
        {
          return value.label
        }
        
      });
    },

    getStatus(status){
      if(status == 0) return 'Chưa gửi'
      else return 'Đã gửi'
    }

  },
};
</script>
<template lang="">
  <div>
    <CCardBody>
      <CRow>
        <CCol sm="4">
          <CSelect
            :options="LIST_CATEGORY"
            :value.sync="category"
          />
            <template #append-content><CIcon name="cil-envelope-open"/></template>
          </CInput>
        </CCol>
        <CCol sm="4">
          <CSelect
            :options="LIST_POSITION"
            :value.sync="position"
          />
            <template #append-content><CIcon name="cil-envelope-open"/></template>
          </CInput>
        </CCol>
      </CRow>
      <div class="button-center">
          <CButton type="submit" size="" color="success" @click="searchHistory(category,position)"><CIcon :content="$options.freeSet.cilMagnifyingGlass" /> Search</CButton>
          <CButton type="reset" size="" color="danger" @click="refreshMail()"><CIcon :content="$options.freeSet.cilLoopCircular" /> Refresh </CButton>
      </div>     
    </CCardBody>
  </div>
</template>
<script>
import axios from "axios"
import {LIST_CATEGORY} from '@/const/constdata'
import {LIST_POSITION} from '@/const/constdata'
import { freeSet } from "@coreui/icons";
export default {

    freeSet,
   data() {
    return {
      LIST_CATEGORY,
      LIST_POSITION,
      category : 0,
      position: 0,
    }
   },

   methods : {
     searchHistory : function(category,position)
     {
       const cond = {
          category ,
          position,
       }
       this.$emit('set-condition',cond)
     },

     refreshMail : function(category,position)
     {
       const cond = {
          category ,
          position,
       }
        this.$emit('set-condition',cond)
        this.category = 0  
        this.position = 0
     },
   }
}
</script>

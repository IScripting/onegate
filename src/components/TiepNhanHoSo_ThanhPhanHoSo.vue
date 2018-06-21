<template>
  <div style="position: relative;">
    <v-expansion-panel class="expansion-pl">
      <v-expansion-panel-content hide-actions value="1">
        <div slot="header">
          <div class="background-triangle-small" v-if="subStatusNew === false"> IV.</div>
          <div class="background-triangle-small" v-if="subStatusNew === true"> III.</div>
          THÀNH PHẦN HỒ SƠ &nbsp;&nbsp;&nbsp;&nbsp; 
         <!--  <i><span style="color: red">(*)</span> Những thành phần bắt buộc</i> -->
          <div class="absolute-lable">
            <span class="text-bold">Bản chính</span>
            <span class="text-bold">Bản chụp</span>
            <span class="text-bold">Công chứng</span>
          </div>
        </div>
        <v-card>
          <div class="form_alpaca" style="position: relative;" v-for="(item, index) in dossierTemplates" v-if="item.partType === 1" v-bind:key="item.partNo">
            <v-expansion-panel class="expaned__list__data">
              <v-expansion-panel-content hide-actions :value="false">
                <div slot="header" class="pl-2 py-1">
                  <div style="width: calc(100% - 420px );display: flex;align-items: center;min-height: 38px">
                    <span class="text-bold mr-2">{{index + 1}}.</span>
                    <span @click="loadAlpcaForm(item)">{{item.partName}} <span v-if="item.required" style="color: red"> (*)</span> <i v-if="item.hasForm">Form trực tuyến</i></span>
                  </div>
                </div>
                <v-card>
                  <v-card-text>
                    <v-layout wrap>
                      <v-flex xs12 class="text-xs-right">
                        <div :id="'formAlpaca' + item.partNo">
                        </div>
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <div class="absolute__btn group__thanh_phan px-2">
              <content-placeholders class="mt-1" v-if="loading">
                <content-placeholders-text :lines="1" />
              </content-placeholders>
              <v-layout row wrap class="flex__checkbox" v-else>
                <v-flex style="width: 300px;" class="layout wrap">
                  <v-checkbox light color="secondary" class="flex" v-model="thanhPhanHoSo.dossierTemplates[index].fileCheck"></v-checkbox>
                  <v-radio-group v-model="thanhPhanHoSo.dossierTemplates[index].fileType" row>
                    <v-radio :value="2" :disabled="!thanhPhanHoSo.dossierTemplates[index].fileCheck" ></v-radio>
                    <v-radio :value="0" :disabled="!thanhPhanHoSo.dossierTemplates[index].fileCheck" ></v-radio>
                    <v-radio :value="1" :disabled="!thanhPhanHoSo.dossierTemplates[index].fileCheck" ></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex class="text-right" style="width: 120px;align-self: center;">
                  <v-tooltip top>
                    <v-btn slot="activator" icon class="mx-0 my-0">
                      <v-badge>
                        <input
                        type="file"
                        style="display: none"
                        :id="'file' + item.partNo"
                        @change="onUploadSingleFile($event,item)"
                        >
                        <v-icon size="20" color="primary" @click="pickFile(item)">attach_file</v-icon>
                      </v-badge>
                    </v-btn>
                    <span>Tải file lên</span>
                  </v-tooltip>
                  <v-tooltip top>
                    <v-btn slot="activator" class="mx-0" fab dark small color="primary" @click="viewFile(item)" style="height:25px;width:25px">
                      {{item.count}}
                    </v-btn>
                    <span>Xem</span>
                  </v-tooltip>
                  <v-tooltip top>
                    <v-btn slot="activator" @click="onDeleteAttackFiles(item)" icon class="mx-0 my-0">
                      <v-icon size="18" class="mx-0" color="red darken-3">delete</v-icon>
                    </v-btn>
                    <span>Xóa</span>
                  </v-tooltip>
                </v-flex>
              </v-layout>
            </div>
          </div>
          
          <v-card-text>
            <v-layout wrap>

              <v-flex xs12 sm2>
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-else class="pl-0 text-right">Ghi chú: </v-subheader>
              </v-flex>
              <v-flex xs12 sm10>
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-text-field
                  v-else
                  v-model="thanhPhanHoSo.ghiChuThanhPhan"
                  multi-line
                  rows="2"
                ></v-text-field>
              </v-flex>
              
            </v-layout>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </div>
</template>

<script>
// import $ from 'jquery'
import * as utils from '../store/onegate_utils'
export default {
  data: () => ({
  }),
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    thanhPhanHoSo () {
      return this.$store.getters.thanhPhanHoSo
    },
    dossierTemplates () {
      return this.$store.getters.dossierTemplates
    },
    dossierFiles () {
      return this.$store.getters.dossierFiles
    },
    subStatusNew () {
      return this.$store.getters.subStatusNew
    }
  },
  mounted () {
    var vm = this
    vm.page = 1
    vm.$nextTick(function () {
      setTimeout(function (argument) {
        vm.dossierTemplates.forEach(val => {
          vm.$store.dispatch('loadAlpcaForm', val)
        })
      }, 500)
    })
  },
  methods: {
    onDeleteAttackFiles (item) {
      var vm = this
      console.log('delete')
      vm.$root.$confirm.open('Xóa', 'Bạn có muốn xoá thành phần hồ sơ này?', { color: 'red' }).then((confirm) => {
        vm.$store.dispatch('deleteAttackFiles', item).then(function (result) {
          vm.$store.dispatch('resetCounterTemplate', item)
          vm.$store.dispatch('loadDossierFiles')
          utils.showMessageToastr('success', 'Xóa thành công')
        }).catch(function (xhr) {
          utils.showMessageToastr('error', 'Xóa thất bại')
        })
      }).catch(function (xhr) {
        console.log('kkk')
      })
    },
    pickFile (item) {
      document.getElementById('file' + item.partNo).click()
    },
    onUploadSingleFile (e, data) {
      var vm = this
      e.dataItem = data
      vm.$store.dispatch('uploadSingleFile', e).then(function (result) {
        utils.showMessageToastr('success', 'Tải lên thành công')
        vm.$store.dispatch('loadDossierFiles', data)
      }).catch(function (xhr) {
        utils.showMessageToastr('error', 'Tải lên thất bại')
        vm.$store.dispatch('loadDossierFiles', data)
      })
    },
    loadAlpcaForm (data) {
      this.$store.dispatch('loadAlpcaForm', data)
    },
    postDossierMark (data) {
      this.$store.dispatch('postDossierMark', data)
    },
    viewFile (data) {
      this.$store.dispatch('viewFile', data)
    }
  }
}
</script>
<style>
  .form_alpaca .alpaca-message {
    display: none!important;
  }
  .form_alpaca .card_text {
    padding: 10px 0px !important;
  }
  .form_alpaca .text-xs-right {
    text-align: left!important;
  }
</style>


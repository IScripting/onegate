<template>
  <div class="form-chitiet">
    <content-placeholders class="mt-3" v-if="loading">
      <content-placeholders-text :lines="1" />
    </content-placeholders>
    <div v-else class="row-header" style="margin-top: 6px;">
      <div class="background-triangle-big"> <span>CHI TIẾT HỒ SƠ</span> </div>
      <div class="layout row wrap header_tools row-blue">
        <div class="flex xs8 sm10 pl-3 text-ellipsis text-bold" :title="thongTinChungHoSo.serviceName">
          {{thongTinChungHoSo.serviceName}}
        </div>
        <div class="flex xs4 sm2 text-right" style="margin-left: auto;">
          <v-btn flat class="my-0 mx-0 btn-border-left" @click="goBack" active-class="temp_active">
          Quay lại &nbsp;
            <v-icon size="16">undo</v-icon>
          </v-btn>
        </div>
      </div> 
    </div>
    <v-expansion-panel class="expansion-pl">
      <v-expansion-panel-content hide-actions value="1">
        <div slot="header"><div class="background-triangle-small"> <v-icon size="18" color="white">star_rate</v-icon> </div>THÔNG TIN CHUNG HỒ SƠ</div>
        <v-card>
          <v-card-text>
            <v-layout wrap>
              <v-flex xs12 sm2>
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-else class="pl-0">Tên doanh nghiệp: </v-subheader>
              </v-flex>
              <v-flex xs12 sm4>
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-else class="pl-0 header-text-field"> {{thongTinChuHoSo.applicantName}}</v-subheader>
              </v-flex>
              <!--  -->
              <v-flex xs12 sm2>
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-else class="pl-0">Thời gian gửi: </v-subheader>
              </v-flex>
              <v-flex xs12 sm4>
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-else class="pl-0 header-text-field"> {{thongTinChungHoSo.submitDate|dateTimeView}} </v-subheader>
              </v-flex>
              <!--  -->
              <v-flex xs12 sm2>
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-else class="pl-0">Mã hồ sơ: </v-subheader>
              </v-flex>
              <v-flex xs12 sm4>
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-else class="pl-0 header-text-field">  {{thongTinChungHoSo.dossierIdCTN}} </v-subheader>
              </v-flex>
              <!--  -->
              <v-flex xs12 sm2>
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-else class="pl-0">Thời gian tiếp nhận: </v-subheader>
              </v-flex>
              <v-flex xs12 sm4>
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-else class="pl-0 header-text-field"> {{thongTinChungHoSo.receiveDate|dateTimeView}}</v-subheader>
              </v-flex>
              <!--  -->
              <v-flex xs12 sm2>
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-else class="pl-0">Số hồ sơ: </v-subheader>
              </v-flex>
              <v-flex xs12 sm4>
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-else class="pl-0 header-text-field"> {{thongTinChungHoSo.dossierNo}} </v-subheader>
              </v-flex>
              <!--  -->
              <v-flex xs12 sm2>
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-else class="pl-0">Thời hạn xử lý: </v-subheader>
              </v-flex>
              <v-flex xs12 sm4>
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-else class="pl-0 header-text-field"> <i>{{thongTinChungHoSo.durationDate}} làm việc</i> </v-subheader>
              </v-flex>
              <!--  -->
              <!-- <v-flex xs12 sm2>
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-else class="pl-0">Chuyển bởi: </v-subheader>
              </v-flex>
              <v-flex xs12 sm4>
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-else class="pl-0 header-text-field"></v-subheader>
              </v-flex> -->
              
              <!--  -->
              <v-flex xs12 sm2>
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader :title="!showContactDetail?'Chi tiết liên hệ':'Thu gọn'" v-else class="pl-0 hover-pointer" @click.prevent.stop="showContactDetail = !showContactDetail">
                  Thông tin liên hệ:
                </v-subheader>
              </v-flex>
              <v-flex xs12 sm4>
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-else class="pl-0 header-text-field hover-pointer"> 
                  <span :title="!showContactDetail?'Chi tiết liên hệ':'Thu gọn'" @click.prevent.stop="showContactDetail = !showContactDetail">
                    <v-icon color="primary" v-if="!showContactDetail">keyboard_arrow_down</v-icon>
                    <v-icon color="primary" v-if="showContactDetail">keyboard_arrow_up</v-icon>
                  </span>
                </v-subheader>
              </v-flex>
              <!--  -->
              <v-flex xs12 sm2>
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-else class="pl-0">Trạng thái: </v-subheader>
              </v-flex>
              <v-flex xs12 sm4>
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-else class="pl-0 header-text-field"> {{thongTinChungHoSo.dossierStatusText}} </v-subheader>
              </v-flex>
              <v-flex xs12 sm12>
                <v-slide-y-transition>
                  <div v-if="showContactDetail">
                    <v-layout wrap>
                      <v-flex xs12 sm2>
                        <v-subheader class="pl-0"><i>Tên doanh nghiệp: </i></v-subheader>
                      </v-flex>
                      <v-flex xs12 sm4>
                        <v-subheader class="pl-0 header-text-field"> {{thongTinChuHoSo.applicantName}} </v-subheader>
                      </v-flex>
                      <v-flex xs12 sm2>
                        <v-subheader class="pl-0"><i>Địa chỉ Email: </i></v-subheader>
                      </v-flex>
                      <v-flex xs12 sm4>
                        <v-subheader class="pl-0 header-text-field"> {{thongTinChuHoSo.contactEmail}} </v-subheader>
                      </v-flex>
                      <v-flex xs12 sm2>
                        <v-subheader class="pl-0"><i>Số điện thoại: </i></v-subheader>
                      </v-flex>
                      <v-flex xs12 sm4>
                        <v-subheader class="pl-0 header-text-field"> {{thongTinChuHoSo.contactTelNo}} </v-subheader>
                      </v-flex>
                      <v-flex xs12 sm2>
                        <v-subheader class="pl-0"><i>Địa chỉ: </i></v-subheader>
                      </v-flex>
                      <v-flex xs12 sm4>
                        <v-subheader class="pl-0 header-text-field"> {{thongTinChuHoSo.address}} </v-subheader>
                      </v-flex>
                    </v-layout>
                  </div>
                </v-slide-y-transition>
              </v-flex>
              
            </v-layout>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <!--  -->
    <div>
      <v-tabs slider-color="primary" style="background-color: #dae8e8;">
        <v-tab key="1" class="mr-2">
        THÀNH PHẦN HỒ SƠ
        </v-tab>
        <!-- <v-tab key="2" class="mr-2">
        THỤ LÝ HỒ SƠ
        </v-tab> -->
        <v-tab key="2" class="mr-2">
        TIẾN TRÌNH XỬ LÝ
        </v-tab>
        <!-- <v-tab key="4" class="mr-2">
        TRAO ĐỔI THÔNG TIN
        </v-tab> -->
        <!--  -->
        <v-tab-item key="1">
          <v-expansion-panel expand class="my-0 expansion-pl-transparent" style="border: none">
            <v-expansion-panel-content v-bind:value="true">
              <div slot="header" class="text-bold">
                <div class="background-triangle-small"> I.</div>
                Tài liệu nộp
              </div>
              <div v-for="(item, index) in dossierTemplatesTN" v-bind:key="item.partNo">
                <v-layout wrap class="px-3 py-1 align-center row-list-style" style="border-bottom: 1px solid #ddd"> 
                  <v-flex xs11>
                    <span class="text-bold" style="position: absolute;">{{index + 1}}.</span> 
                    <div style="margin-left: 30px;">{{item.partName}}</div>
                  </v-flex>
                  <v-flex xs1 class="text-right">
                    <v-tooltip top>
                      <v-btn slot="activator" class="mx-0" fab dark small color="primary" @click="viewFile(item)" style="height:25px;width:25px">
                        {{item.count}}
                      </v-btn>
                      <span>Xem</span>
                    </v-tooltip>
                  </v-flex>
                </v-layout>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel expand class="my-0 expansion-pl-transparent" style="border: none">
            <v-expansion-panel-content v-bind:value="true">
            <div slot="header" class="text-bold">
              <div class="background-triangle-small"> II.</div>
              Kết quả
            </div>
            <div v-for="(item, index) in dossierTemplatesKQ" v-bind:key="item.partNo">
                <v-layout wrap class="px-3 py-1 align-center row-list-style" style="border-bottom: 1px solid #ddd"> 
                  <v-flex xs11>
                    <span class="text-bold" style="position: absolute;">{{index + 1}}.</span> 
                    <div style="margin-left: 30px;">{{item.partName}}</div>
                  </v-flex>
                  <v-flex xs1 class="text-right">
                    <v-tooltip top>
                      <v-btn slot="activator" class="mx-0" fab dark small color="primary" @click="viewFile(item)" style="height:25px;width:25px">
                        {{item.count}}
                      </v-btn>
                      <span>Xem</span>
                    </v-tooltip>
                  </v-flex>
                </v-layout>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-tab-item>
        <!--  -->
        <!-- <v-tab-item key="2" reverse-transition="slide-y-transition" transition="slide-y-transition">
          
        </v-tab-item> -->
        <!--  -->
        <v-tab-item key="2" style="background: #ffff;">
          <div v-for="(item, index) in listHistoryProcessing" v-bind:key="item.dossierLogId" class="list_history_style">
            <td style="padding-top: 5px;" class="px-2 text-bold">{{ index + 1 }}.</td>
            <td style="padding-top: 5px;" class="text-xs-left">
              <p class="mb-2"> Ông/bà <b>{{ item.author }}</b> 
                <span style="color: #0b72ba">( {{ item.payload.stepName }} )</span>
                <br/>
                <span style="color: #939393">{{ item.createDate | dateTimeView }}</span>
              </p>
              Ý kiến: <span v-html="item.content"></span> <br>
              <p
                class="history__download__link hover-pointer-download"
                title="Tải file"
                v-for="file in item.payload.files"
                :key="file.dossierFileId"
                @click.prevent.stop="downloadFileLogs(file.dossierFileId)"
              >
                <v-icon>file_download</v-icon> 
                <span>{{file.fileName}}</span>
              </p>

            </td>
          </div>
        </v-tab-item>
        <!-- <v-tab-item key="4" reverse-transition="slide-y-transition" transition="slide-y-transition">
          
        </v-tab-item> -->
      </v-tabs>
    </div>
    
  </div>
</template>

<script>
// import router from '@/router'
// import * as utils from '../store/onegate_utils'
// import printJS from 'print-js/dist/print.min.js'
export default {
  props: ['index', 'id'],
  data: () => ({
    dossierTemplateFiles: [],
    dossierTemplatesItems: [],
    showContactDetail: false,
    listHistoryProcessing: [],
    dossierTemplatesTN: [],
    dossierTemplatesKQ: []
  }),
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    thongTinChungHoSo () {
      return this.$store.getters.thongTinChungHoSo
    },
    thongTinChuHoSo () {
      return this.$store.getters.thongTinChuHoSo
    },
    thongTinNguoiNopHoSo () {
      return this.$store.getters.thongTinNguoiNopHoSo
    },
    lePhi () {
      return this.$store.getters.lePhi
    },
    dichVuChuyenPhatKetQua () {
      return this.$store.getters.dichVuChuyenPhatKetQua
    },
    dossierTemplates () {
      return this.$store.getters.dossierTemplates
    }
  },
  watch: {},
  created () {
    var vm = this
    vm.$nextTick(function () {
      let promise = vm.$store.dispatch('getDetailDossier', vm.id)
      promise.then(function (result) {
        let promise2 = vm.$store.dispatch('loadDossierTemplates', result)
        promise2.then(function (result) {
          vm.dossierTemplatesItems = []
          vm.dossierTemplatesItems = result
          console.log('dossierTemplatesItems', vm.dossierTemplatesItems)
          vm.dossierTemplatesTN = []
          vm.dossierTemplatesKQ = []
          for (var key in vm.dossierTemplatesItems) {
            if (vm.dossierTemplatesItems[key].partType === 1) {
              vm.dossierTemplatesTN.push(vm.dossierTemplatesItems[key])
            } else if (vm.dossierTemplatesItems[key].partType === 2) {
              vm.dossierTemplatesKQ.push(vm.dossierTemplatesItems[key])
            }
          }
          console.log('dossierTemplatesTN', vm.dossierTemplatesTN)
          console.log('dossierTemplatesKQ', vm.dossierTemplatesKQ)
          vm.$store.dispatch('loadDossierFiles').then(function (result) {
            setTimeout(function () {
              vm.$store.dispatch('getDossierTemplateEdit').then(function (resultTemp) {
                vm.dossierTemplateFiles = resultTemp
                console.log('dossierTemplateFiles', vm.dossierTemplateFiles)
              })
            }, 200)
          })
        })
      })
      let promise2 = vm.$store.dispatch('getListHistoryProcessingItems', vm.id)
      promise2.then(function (result) {
        vm.listHistoryProcessing = []
        vm.listHistoryProcessing = result
      })
    })
  },
  methods: {
    goBack () {
      window.history.back()
    },
    viewFile (data) {
      this.$store.dispatch('viewFile', data)
    },
    downloadFileLogs (data) {
      var vm = this
      let dataCommit = {
        fileAttachId: data,
        dossierId: vm.id
      }
      this.$store.dispatch('downloadFile', dataCommit)
    }
  },
  filters: {
    dateTimeView (arg) {
      if (arg) {
        let value = new Date(arg)
        return `${value.getDate().toString().padStart(2, '0')}/${(value.getMonth() + 1).toString().padStart(2, '0')}/${value.getFullYear()} | ${value.getHours().toString().padStart(2, '0')}:${value.getMinutes().toString().padStart(2, '0')}`
      } else {
        return ''
      }
    }
  }
}
</script>

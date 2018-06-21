<template>
  <v-form v-model="validTNHS" ref="formTiepNhanHoSo" lazy-validation>
    <content-placeholders class="mt-3" v-if="loading">
      <content-placeholders-text :lines="1" />
    </content-placeholders>
    <div v-else class="row-header" style="margin-top: 6px;">
      <div class="background-triangle-big"> TIẾP NHẬN HỒ SƠ </div> 
      <div class="layout row wrap header_tools row-blue">
        <div class="flex solo text-ellipsis">
          
        </div> 
        <div class="flex text-right" style="margin-left: auto;">
          <v-btn flat class="my-0 mx-0 btn-border-left" @click="goBack" active-class="temp_active">
            Quay lại &nbsp;
            <v-icon size="16">undo</v-icon>
          </v-btn>
        </div>
      </div>
    </div>
    <thong-tin-chung ref="thongtinchung"></thong-tin-chung>
    <thong-tin-chu-ho-so ref="thongtinchuhoso"></thong-tin-chu-ho-so>
    <thanh-phan-ho-so ref="thanhphanhoso"></thanh-phan-ho-so>
    <le-phi ref="lephi" v-if="subStatusNew === false"></le-phi>
    <dich-vu-chuyen-phat-ket-qua ref="dichvuchuyenphatketqua" v-if="subStatusNew === false"></dich-vu-chuyen-phat-ket-qua>
    <div class="text-center mt-2">
      <v-btn color="primary" v-on:click.native="luuHoSo" v-if="thongTinChungHoSo.dossierStatus === 'new' && !subStatusNew">
        Lưu &nbsp;
        <v-icon>save</v-icon>
      </v-btn>
      <v-btn color="primary" v-on:click.native="tiepNhanHoSo" v-if="thongTinChungHoSo.dossierStatus === 'new' && subStatusNew">
        Tiếp nhận &nbsp;
        <v-icon>save</v-icon>
      </v-btn>
      <v-btn color="primary" v-on:click.native="boSungHoSo" v-if="thongTinChungHoSo.dossierStatus === 'waiting'">
        Bổ sung &nbsp;
        <v-icon>save</v-icon>
      </v-btn>
      <v-btn color="primary" v-if="thongTinChungHoSo.dossierStatus === 'releasing'" :to="'/danh-sach-ho-so/' + index + '/tra-ket-qua/' + id">
        Trả kết quả &nbsp;
        <v-icon>send</v-icon>
      </v-btn>
      <v-btn color="primary" @click="goBack">
        Quay lại &nbsp;
        <v-icon>undo</v-icon>
      </v-btn>
      
    </div>
  </v-form>
</template>

<script>
import router from '@/router'
import * as utils from '../store/onegate_utils'
import ThongTinChung from './TiepNhanHoSo_ThongTinChung.vue'
import ThongTinChuHoSo from './TiepNhanHoSo_ThongTinChuHoSo.vue'
import ThanhPhanHoSo from './TiepNhanHoSo_ThanhPhanHoSo.vue'
import LePhi from './TiepNhanHoSo_LePhi.vue'
import DichVuChuyenPhatKetQua from './TiepNhanHoSo_DichVuChuyenPhatKetQua.vue'

export default {
  props: ['index', 'id'],
  components: {
    'thong-tin-chung': ThongTinChung,
    'thong-tin-chu-ho-so': ThongTinChuHoSo,
    'thanh-phan-ho-so': ThanhPhanHoSo,
    'le-phi': LePhi,
    'dich-vu-chuyen-phat-ket-qua': DichVuChuyenPhatKetQua
  },
  data: () => ({
    validTNHS: false
  }),
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    thongTinChungHoSo () {
      return this.$store.getters.thongTinChungHoSo
    },
    subStatusNew () {
      return this.$store.getters.subStatusNew
    }
  },
  created () {
    var vm = this
    vm.$nextTick(function () {
      console.log(vm.index)
      if (vm.index === '2' && vm.id) {
        vm.$store.commit('setSubStatusNew', true)
      } else {
        vm.$store.commit('setSubStatusNew', false)
      }
    })
  },
  watch: {
    index (val) {
      var vm = this
      console.log(vm.index)
      if (vm.index === '2') {
        vm.$store.commit('setSubStatusNew', true)
      } else {
        vm.$store.commit('setSubStatusNew', false)
      }
    }
  },
  methods: {
    luuHoSo () {
      var vm = this
      vm.$store.commit('setPrintPH', false)
      let thongtinchung = this.$store.getters.thongTinChungHoSo
      let thongtinchuhoso = this.$store.getters.thongTinChuHoSo
      let thongtinnguoinophoso = this.$store.getters.thongTinNguoiNopHoSo
      let thanhphanhoso = this.$store.getters.thanhPhanHoSo
      let lephi = this.$store.getters.lePhi
      let dichvuchuyenphatketqua = this.$store.getters.dichVuChuyenPhatKetQua
      console.log('thongtinchung:', thongtinchung)
      console.log('thongtinchuhoso:', thongtinchuhoso)
      console.log('thongtinnguoinophoso:', thongtinnguoinophoso)
      console.log('thanhphanhoso:', thanhphanhoso)
      console.log('lephi:', lephi)
      console.log('dichvuchuyenphatketqua:', dichvuchuyenphatketqua)
      // Save dossier mark and save Alpaca
      console.log('validate TNHS formThongtinchuhoso.validate()', vm.$refs.formTiepNhanHoSo.validate())
      if (vm.$refs.formTiepNhanHoSo.validate()) {
        vm.$store.dispatch('getCpsAuthen').then(resultAuthen => {
          let dossierTemplates = thanhphanhoso.dossierTemplates
          console.log('dossierTemplates ------', dossierTemplates)
          let listAction = []
          let listDossierMark = []
          if (dossierTemplates) {
            dossierTemplates.forEach(function (val, index) {
              if (val.hasForm && val.partType === 1) {
                val.cps_auth = resultAuthen
                listAction.push(vm.$store.dispatch('putAlpacaForm', val))
              }
              if (val.partType === 1) {
                val.cps_auth = resultAuthen
                listDossierMark.push(vm.$store.dispatch('postDossierMark', val))
              }
            })
          }
          // let dataVNPOST = {
          //   senderProvince: 10,
          //   senderAddress: thongtinnguoinophoso.delegateApplicantName,
          //   senderName: thongtinnguoinophoso.senderName,
          //   senderTel: thongtinnguoinophoso.delegateContactTelNo,
          //   receiverName: thongtinnguoinophoso.delegateApplicantName,
          //   receiverAddress: dichvuchuyenphatketqua.postalAddress,
          //   receiverTel: dichvuchuyenphatketqua.postalTelNo,
          //   receiverProvince: dichvuchuyenphatketqua.vnPostCode
          // }
          Promise.all(listDossierMark).then(values => {
          }).catch(function (xhr) {
          })
          // vm.$store.dispatch('postVNPOST', dataVNPOST).then(function (result) {
          //   console.log('VNPOST Sucess-------------')
          // }).catch(function (xhr) {
          //   console.log('VNPOST Error-------------')
          // })
          Promise.all(listAction).then(values => {
            console.log(values)
            let tempData = Object.assign(thongtinchung, thongtinchuhoso, thongtinnguoinophoso, thanhphanhoso, lephi, dichvuchuyenphatketqua)
            console.log('data put dossier -->', tempData)
            vm.$store.dispatch('getCpsAuthen').then(resultAuthenPut => {
              tempData['cps_auth'] = resultAuthenPut
              vm.$store.dispatch('putDossier', tempData).then(function (result) {
                let index = vm.$store.getters.index
                let id = result.dossierId
                utils.showMessageToastr('success', 'Lưu thành công')
                router.push('/danh-sach-ho-so/' + index + '/tiep-nhan-ho-so/' + id + '/phieu-hen')
              })
            }).catch(reject => {
              console.log(reject)
            })
          }).catch(reject => {
            console.log('reject=============', reject)
            let tempData = Object.assign(thongtinchung, thongtinchuhoso, thongtinnguoinophoso, thanhphanhoso, lephi, dichvuchuyenphatketqua)
            vm.$store.dispatch('getCpsAuthen').then(resultAuthenPut => {
              tempData['cps_auth'] = resultAuthenPut
              vm.$store.dispatch('putDossier', tempData).then(function (result) {
                let index = vm.$store.getters.index
                let id = result.dossierId
                utils.showMessageToastr('success', 'Lưu hồ sơ thành công')
                router.push('/danh-sach-ho-so/' + index + '/tiep-nhan-ho-so/' + id + '/phieu-hen')
              })
              utils.showMessageToastr('error', 'Lưu Form lỗi')
            }).catch(error => {
              console.log(error)
            })
          })
        }).catch(reject => {
        })
      }
    },
    tiepNhanHoSo () {
      var vm = this
      vm.$store.commit('setPrintPH', false)
      let thongtinchung = this.$store.getters.thongTinChungHoSo
      let thongtinchuhoso = this.$store.getters.thongTinChuHoSo
      let thongtinnguoinophoso = this.$store.getters.thongTinNguoiNopHoSo
      let thanhphanhoso = this.$store.getters.thanhPhanHoSo
      let lephi = this.$store.getters.lePhi
      let dichvuchuyenphatketqua = this.$store.getters.dichVuChuyenPhatKetQua
      console.log('thongtinchung:', thongtinchung)
      console.log('thongtinchuhoso:', thongtinchuhoso)
      console.log('thongtinnguoinophoso:', thongtinnguoinophoso)
      console.log('thanhphanhoso:', thanhphanhoso)
      console.log('lephi:', lephi)
      console.log('dichvuchuyenphatketqua:', dichvuchuyenphatketqua)
      // Save dossier mark and save Alpaca
      console.log('validate TNHS formThongtinchuhoso.validate()', vm.$refs.formTiepNhanHoSo.validate())
      let tempData = Object.assign(thongtinchung, thongtinchuhoso, thongtinnguoinophoso, thanhphanhoso, lephi, dichvuchuyenphatketqua)
      console.log('tempData------------', tempData)
      vm.$store.dispatch('getCpsAuthen').then(result => {
        let dataPostAction = {
          dossierId: vm.thongTinChungHoSo.dossierId,
          actionCode: 10000,
          cps_auth: result
        }
        vm.$store.dispatch('postAction', dataPostAction).then(function (result) {
          utils.showMessageToastr('success', 'Gửi hồ sơ thành công')
          router.push('/danh-sach-ho-so/2')
        })
      }).catch(reject => {
      })
    },
    boSungHoSo () {
      var vm = this
      let thongtinchung = this.$store.getters.thongTinChungHoSo
      let thongtinchuhoso = this.$store.getters.thongTinChuHoSo
      let thongtinnguoinophoso = this.$store.getters.thongTinNguoiNopHoSo
      let thanhphanhoso = this.$store.getters.thanhPhanHoSo
      let lephi = this.$store.getters.lePhi
      let dichvuchuyenphatketqua = this.$store.getters.dichVuChuyenPhatKetQua
      console.log('thongtinchung:', thongtinchung)
      console.log('thongtinchuhoso:', thongtinchuhoso)
      console.log('thongtinnguoinophoso:', thongtinnguoinophoso)
      console.log('thanhphanhoso:', thanhphanhoso)
      console.log('lephi:', lephi)
      console.log('dichvuchuyenphatketqua:', dichvuchuyenphatketqua)
      // Save dossier mark and save Alpaca
      console.log('validate TNHS formThongtinchuhoso.validate()', vm.$refs.formTiepNhanHoSo.validate())
      if (vm.$refs.formTiepNhanHoSo.validate()) {
        vm.$store.dispatch('getCpsAuthen').then(resultAuthen => {
          let dossierTemplates = thanhphanhoso.dossierTemplates
          console.log('dosierTemplates ------', dossierTemplates)
          let listAction = []
          let listDossierMark = []
          if (dossierTemplates) {
            dossierTemplates.forEach(function (val, index) {
              if (val.hasForm && val.partType === 1) {
                val.cps_auth = resultAuthen
                listAction.push(vm.$store.dispatch('putAlpacaForm', val))
              }
              if (val.partType === 1) {
                val.cps_auth = resultAuthen
                listDossierMark.push(vm.$store.dispatch('postDossierMark', val))
              }
            })
          }
          Promise.all(listDossierMark).then(values => {
          }).catch(function (xhr) {
          })
          console.log('run tiep nhan')
          Promise.all(listAction).then(values => {
            console.log(values)
            let tempData = Object.assign(thongtinchung, thongtinchuhoso, thongtinnguoinophoso, thanhphanhoso, lephi, dichvuchuyenphatketqua)
            console.log('data put dossier -->', tempData)
            vm.$store.dispatch('getCpsAuthen').then(resultAuthenPut => {
              tempData.cps_auth = resultAuthenPut
              vm.$store.dispatch('putDossier', tempData).then(function (result) {
                let dataPostAction = {
                  dossierId: vm.thongTinChungHoSo.dossierId,
                  actionCode: 20000,
                  cps_auth: resultAuthenPut
                }
                vm.$store.dispatch('postAction', dataPostAction).then(function (result) {
                  vm.$store.dispatch('showMessageToastr', ['success', 'Lưu thành công'])
                  router.push('/danh-sach-ho-so/3')
                })
              })
            }).catch(reject => {

            })
          }).catch(reject => {
            console.log('reject=============', reject)
            vm.$store.dispatch('showMessageToastr', ['error', 'Vui lòng kiểm tra lại Form thành phần hồ sơ'])
          })
        }).catch(reject => {
        })
      }
    },
    goBack () {
      window.history.back()
    }
  }
}
</script>

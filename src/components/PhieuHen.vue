<template>
  <div>
    <div class="row-header" style="margin-top: 6px;">
      <div class="background-triangle-big"> PHIẾU HẸN </div> 
      <div class="layout row wrap header_tools row-blue">
        <div class="flex solo text-ellipsis"></div> 
        <div class="flex text-right" style="margin-left: auto;">
          <v-btn flat class="my-0 mx-0 btn-border-left" :to="'/danh-sach-ho-so/' + index + '/tiep-nhan-ho-so/' + id" active-class="temp_active">
            Quay lại &nbsp;
            <v-icon size="16">undo</v-icon>
          </v-btn>
        </div>
      </div>
    </div>
    <div style="background-color: white;">
      <div id='printContent'>
        <div class="receipt-wrapper" style="width: 21cm;height: 29.7cm">
          <div class="row head">
            <div class="left">
              <p class="text-uppercase text-bold">{{thongTinChungHoSo.govAgencyName}}</p>
              <span class="text-bold">BỘ PHẬN TIẾP NHẬN VÀ TRẢ KẾT QUẢ</span>
              <p>==================</p>
            </div>
            <div class="right">
              <p class="text-uppercase text-bold">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
              <p class="text-bold">Độc lập - Tự do - Hạnh phúc</p>
              <p>==================</p>
              <p><i>{{receiveDateText()}}</i></p>
            </div>
          </div>
        
          <div class="row title">
            <h4 class="text-uppercase">GIẤY TIẾP NHẬN HỒ SƠ VÀ HẸN TRẢ KẾT QUẢ</h4>
            <p><span class="text-bold">Mã hồ sơ:</span> {{thongTinChungHoSo.dossierIdCTN}}</p>
            <p><i>(Liên 1: Lưu)</i></p>
          </div>
          <div class="row">
            <p>Bộ phận tiếp nhận và trả kết quả: {{thongTinChungHoSo.govAgencyName}}</p>
            <p>Tiếp nhận hồ sơ của: {{ thongTinChuHoSo.applicantName }}</p>
            <p>Địa chỉ: {{ thongTinChuHoSo.address }}</p>
            <p>Số điện thoại: {{ thongTinChuHoSo.contactTelNo}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Email: {{ thongTinChuHoSo.contactEmail }}</p>
            <!-- <p>Lệ phí tạm thu: {{ lePhi.fee }} đồng</p> -->
            <p>Nội dung yêu cầu giải quyết: {{thongTinChungHoSo.serviceName}}</p>
            <ul>
              <li>
                <p>1. Thành phần hồ sơ nộp gồm:</p>
                <p class="ml-3" v-for="(item, index) in dossierTemplateFiles" v-bind:key="item.partNo">
                  ({{index+1}}) &nbsp;{{item.partName}}
                </p>
              </li>
              <li><p>2. Số bộ hồ sơ: ………… (bộ)</p></li>
              <li><p>3. Thời gian giải quyết hồ sơ theo quy định là: <span v-if="thongTinChungHoSo.durationDate">{{ thongTinChungHoSo.durationDate }} làm việc</span></p></li>
              <li><p>4. Thời gian nhận hồ sơ: {{thongTinChungHoSo.receiveDate|dateTimeView}} </p></li>
              <li><p>5. Thời gian trả kết quả giải quyết hồ sơ: {{ thongTinChungHoSo.dueDate|dateTimeView }}</p></li>
              <li><p>6. Đăng ký nhận kết quả tại: {{dichVuChuyenPhatKetQua.postalAddress}}</p></li>
            </ul>
            <p>Vào Sổ theo dõi hồ sơ, Quyển số:……………… Số thứ tự……………</p>
            <p class="note text-bold"><i>Ghi chú:</i></p>
            <p>- Giấy tiếp nhận và hẹn trả kết quả được lập thành 2 liên; một liên chuyển kèm theo Phiếu kiểm soát quá trình giải quyết hồ sơ và được lưu tại Bộ phận tiếp nhận và trả kết quả; một liên giao cho cá nhân, tổ chức nộp hồ sơ;</p>
            <p>- Cá nhân, tổ chức có thể đăng ký nhận kết quả tại Bộ phận tiếp nhận và trả kết quả hoặc tại nhà (trụ sở tổ chức) qua dịch vụ bưu chính.</p>
          </div>
          <div class="row">
            <div class="submit left">
              <p class="text-bold">NGƯỜI NỘP HỒ SƠ</p>
              <p><i>(Ký và ghi rõ họ tên)</i></p>
            </div>
            <div class="reciever right">
              <p class="text-bold">NGƯỜI TIẾP NHẬN HỒ SƠ</p>
              <p><i>(Ký và ghi rõ họ tên)</i></p>
            </div>
          </div>
        </div>
        <!--  -->
        <div class="receipt-wrapper" style="padding-top: 50px">
          <div class="row head">
            <div class="left">
              <p class="text-uppercase text-bold">{{thongTinChungHoSo.govAgencyName}}</p>
              <span class="text-bold">BỘ PHẬN TIẾP NHẬN VÀ TRẢ KẾT QUẢ</span>
              <p>==================</p>
            </div>
            <div class="right">
              <p class="text-uppercase text-bold">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
              <p class="text-bold">Độc lập - Tự do - Hạnh phúc</p>
              <p>==================</p>
              <p><i>{{receiveDateText()}}</i></p>
            </div>
          </div>
        
          <div class="row title">
            <h4 class="text-uppercase">GIẤY TIẾP NHẬN HỒ SƠ VÀ HẸN TRẢ KẾT QUẢ</h4>
            <p><span class="text-bold">Mã hồ sơ:</span> {{thongTinChungHoSo.dossierIdCTN}}</p>
            <p><i>(Liên 2: Giao khách hàng)</i></p>
          </div>
          <div class="row">
            <p>Bộ phận tiếp nhận và trả kết quả: {{thongTinChungHoSo.govAgencyName}}</p>
            <p>Tiếp nhận hồ sơ của: {{ thongTinChuHoSo.applicantName }}</p>
            <p>Địa chỉ: {{ thongTinChuHoSo.address }}</p>
            <p>Số điện thoại: {{ thongTinChuHoSo.contactTelNo}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Email: {{ thongTinChuHoSo.contactEmail }}</p>
            <!-- <p>Lệ phí tạm thu: {{ lePhi.fee }} đồng</p> -->
            <p>Nội dung yêu cầu giải quyết: {{thongTinChungHoSo.serviceName}}</p>
            <ul>
              <li>
                <p>1. Thành phần hồ sơ nộp gồm:</p>
                <p class="ml-3" v-for="(item, index) in dossierTemplateFiles" v-bind:key="item.partNo">
                  ({{index+1}}) &nbsp;{{item.partName}}
                </p>
              </li>
              <li><p>2. Số bộ hồ sơ: ………… (bộ)</p></li>
              <li><p>3. Thời gian giải quyết hồ sơ theo quy định là: <span v-if="thongTinChungHoSo.durationDate">{{ thongTinChungHoSo.durationDate }} làm việc</span></p></li>
              <li><p>4. Thời gian nhận hồ sơ: {{thongTinChungHoSo.receiveDate|dateTimeView}} </p></li>
              <li><p>5. Thời gian trả kết quả giải quyết hồ sơ: {{ thongTinChungHoSo.dueDate|dateTimeView }}</p></li>
              <li><p>6. Đăng ký nhận kết quả tại: {{dichVuChuyenPhatKetQua.postalAddress}}</p></li>
            </ul>
            <p>Vào Sổ theo dõi hồ sơ, Quyển số:……………… Số thứ tự……………</p>
            <p class="note text-bold"><i>Ghi chú:</i></p>
            <p>- Giấy tiếp nhận và hẹn trả kết quả được lập thành 2 liên; một liên chuyển kèm theo Phiếu kiểm soát quá trình giải quyết hồ sơ và được lưu tại Bộ phận tiếp nhận và trả kết quả; một liên giao cho cá nhân, tổ chức nộp hồ sơ;</p>
            <p>- Cá nhân, tổ chức có thể đăng ký nhận kết quả tại Bộ phận tiếp nhận và trả kết quả hoặc tại nhà (trụ sở tổ chức) qua dịch vụ bưu chính.</p>
          </div>
          <div class="row" style="margin-bottom: 50px">
            <div class="submit left">
              <p class="text-bold">NGƯỜI NỘP HỒ SƠ</p>
              <p><i>(Ký và ghi rõ họ tên)</i></p>
            </div>
            <div class="reciever right">
              <p class="text-bold">NGƯỜI TIẾP NHẬN HỒ SƠ</p>
              <p><i>(Ký và ghi rõ họ tên)</i></p>
            </div>
          </div>
        </div>
      </div>
      <content-placeholders class="mt-3" v-if="loading">
        <content-placeholders-text :lines="1" />
      </content-placeholders>
      <div v-else class="text-center mt-2">
        <v-btn outline color="primary" v-on:click.native="guiHoSo">
          Gửi hồ sơ
        </v-btn>
        <v-btn outline color="primary" v-on:click.native="hoanThanhVaThemMoi">
          Hoàn thành và thêm mới
        </v-btn>
        <v-btn outline color="primary" v-on:click.native="hoanThanh">
          Hoàn thành
        </v-btn>
        <v-btn outline color="primary" v-on:click.native="printContent()">
          In hồ sơ
        </v-btn>
        <v-btn outline color="primary" v-on:click.native="quayLai(index)" active-class="temp_active">
          Quay lại &nbsp;
          <v-icon>undo</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import printJS from 'print-js/dist/print.min.js'
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
    dossierTemplateFiles: []
  }),
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    trangThaiHoSoList () {
      return this.$store.getters.loadtrangThaiHoSoList
    },
    lePhi () {
      return this.$store.getters.lePhi
    },
    thongTinChungHoSo () {
      return this.$store.getters.thongTinChungHoSo
    },
    thanhPhanHoSo () {
      return this.$store.getters.thanhPhanHoSo
    },
    dichVuChuyenPhatKetQua () {
      return this.$store.getters.dichVuChuyenPhatKetQua
    },
    thongTinChuHoSo () {
      console.log('thongTinChuHoSo=============', ThongTinChuHoSo)
      return this.$store.getters.thongTinChuHoSo
    },
    dossierTemplates () {
      return this.$store.getters.dossierTemplates
    }
  },
  created () {
    var vm = this
    vm.$nextTick(function () {
      console.log(vm.$store.getters.printPH)
      setTimeout(function () {
        if (vm.$store.getters.printPH) {
          let promise = vm.$store.dispatch('getDetailDossier', vm.id)
          promise.then(function (result) {
            let promise2 = vm.$store.dispatch('loadDossierTemplates', result)
            promise2.then(function (result) {
              console.log('loadDossierTemplates----Phieuhen-----', result)
              vm.dossierTemplateFiles = result.filter(item => {
                return item.partType === 1 && item.fileCheck
              })
              console.log('vm.dossierTemplateFiles----Phieuhen-----', vm.dossierTemplateFiles)
              setTimeout(function () {
                vm.printContent()
                vm.$store.commit('setPrintPH', false)
              }, 500)
            })
            //
            console.log('thongtin chung ho so', vm.thongTinChungHoSo)
            // vm.$store.dispatch('loadDossierFiles').then(function (result) {
            //   setTimeout(function () {
            //     vm.$store.dispatch('getDossierTemplateEdit').then(function (resultTemp) {
            //       vm.dossierTemplateFiles = resultTemp
            //     })
            //   }, 200)
            // })
          })
          // console.log('run print')
          // setTimeout(function () {
          //   vm.printContent()
          //   vm.$store.commit('setPrintPH', false)
          // }, 500)
        } else {
          let promise = vm.$store.dispatch('getDetailDossier', vm.id)
          promise.then(function (result) {
            let promise2 = vm.$store.dispatch('loadDossierTemplates', result)
            promise2.then(function (result) {
              console.log('loadDossierTemplates----Phieuhen-----', result)
              vm.dossierTemplateFiles = result.filter(item => {
                return item.partType === 1 && item.fileCheck
              })
              console.log('vm.dossierTemplateFiles----Phieuhen-----', vm.dossierTemplateFiles)
            })
            console.log('thongtin chung ho so', vm.thongTinChungHoSo)
          })
        }
      }, 100)
    })
  },
  methods: {
    guiHoSo () {
      var vm = this
      vm.$root.$confirm.open('Thông báo', 'Bạn chắc chắn muốn thực hiện thao tác này?', { color: 'blue darken-4' }).then((confirm) => {
        // let promise = vm.$store.dispatch('submitDossier')
        // promise.then(function (result) {
        //   vm.$store.dispatch('showMessageToastr', ['success', 'Gửi hồ sơ thành công'])
        // })
        vm.$store.dispatch('getCpsAuthen').then(resultAuthen => {
          let dataPostAction = {
            dossierId: vm.thongTinChungHoSo.dossierId,
            actionCode: 10000,
            cps_auth: resultAuthen
          }
          vm.$store.dispatch('postAction', dataPostAction).then(function (result) {
            router.push('/danh-sach-ho-so/3')
            utils.showMessageToastr('success', 'Lưu thành công')
          })
        }).catch(reject => {
          console.log(reject)
        })
      }).catch(function (xhr) {
        console.log('kkk')
      })
    },
    hoanThanhVaThemMoi () {
      var vm = this
      let index = vm.$store.getters.index
      router.push('/danh-sach-ho-so/' + index + '/tiep-nhan-ho-so')
    },
    hoanThanh () {
      router.push('/danh-sach-ho-so/3')
    },
    printContent () {
      // var printContents = document.getElementById('printContent').innerHTML
      // var originalContents = document.body.innerHTML
      // document.body.innerHTML = printContents
      // window.print()
      // document.body.innerHTML = originalContents
      printJS({
        printable: 'printContent',
        type: 'html',
        css: 'http://hanoi.fds.vn:2080/o/front-end-onegate-npm/css/app.d3f9b52c6230c1366867495bac7af304.css'
      })
    },
    receiveDateText () {
      var vm = this
      let date = new Date(vm.thongTinChungHoSo.receiveDate)
      return `Phú Thọ, Ngày ${date.getDate().toString().padStart(2, '0')} tháng ${(date.getMonth() + 1).toString().padStart(2, '0')} năm ${date.getFullYear()}`
    },
    quayLai (index) {
      window.history.back()
    }
  },
  filters: {
    dateTimeView (arg) {
      let value = new Date(arg)
      return `${value.getHours().toString().padStart(2, '0')} giờ ${value.getMinutes().toString().padStart(2, '0')} phút, ngày ${value.getDate().toString().padStart(2, '0')} tháng ${(value.getMonth() + 1).toString().padStart(2, '0')} năm ${value.getFullYear()} `
    }
  }
}
</script>

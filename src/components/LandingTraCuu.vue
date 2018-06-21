<template>
  <div>
    <content-placeholders class="mt-3" v-if="loadingTable">
      <content-placeholders-text :lines="1" />
    </content-placeholders>
    <div v-else class="row-header" style="margin-top: 6px;">
      <div class="background-triangle-big"> <span v-if="trangThaiHoSoList">{{trangThaiHoSoList[index].title}}</span> </div> 
      <div class="layout row wrap header_tools row-blue">
        <div class="flex text-ellipsis">
          <v-text-field
            v-model="keywords"
            @change.native="keywordSearch"
            placeholder="Nhập từ khoá ..."
            prepend-icon="search"
            solo
          ></v-text-field>
        </div> 
        <div class="flex text-right" style="margin-left: auto;">
          <!-- <v-btn flat class="my-0 mx-0 btn-border-left" @click="moveProcess" v-if="trangThaiHoSoList[index].id === 'new'">
            <v-icon size="16">send</v-icon>
            Chuyển hồ sơ vào xử lý
          </v-btn>
          <v-btn flat class="my-0 mx-0 btn-border-left" @click="moveRelease" v-if="trangThaiHoSoList[index].id === 'release'">
            <v-icon size="16">send</v-icon>
            Trả kết quả
          </v-btn>
          <v-btn flat class="my-0 mx-0 btn-border-left" @click="moveDelete" v-if="showMultiDelete(trangThaiHoSoList[index].id)">
            <v-icon size="16">delete</v-icon>
            Xóa
          </v-btn> -->
         <!--  <v-btn flat class="my-0 mx-0 btn-border-left" @click="advanced_filter = !advanced_filter">
            Nâng cao
            <v-icon class="mr-2" v-if="!advanced_filter">keyboard_arrow_down</v-icon>
            <v-icon class="mr-2" v-if="advanced_filter">keyboard_arrow_up</v-icon>
          </v-btn> -->
        </div>
      </div>
    </div>
    <v-slide-y-transition>
      <div v-if="advanced_filter" class="panel" style="height: auto;width: 100%;margin: 0;border-radius: 0;border-top: 1px solid white;background-color: #e1e2e1;padding: 15px;">
        <div class="layout wrap">
          <v-flex xs12 sm3 class="pr-4 no-wrap">
            <content-placeholders class="mt-1" v-if="loadingTable">
              <content-placeholders-text :lines="1" />
            </content-placeholders>
            <v-text-field
            v-else
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm3 class="pr-4 no-wrap">
            <content-placeholders class="mt-1" v-if="loadingTable">
              <content-placeholders-text :lines="1" />
            </content-placeholders>
            <v-text-field
            v-else
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm3 class="pr-4 no-wrap">
            <content-placeholders class="mt-1" v-if="loadingTable">
              <content-placeholders-text :lines="1" />
            </content-placeholders>
            <v-text-field
            v-else
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm3 class="pr-4 no-wrap">
            <content-placeholders class="mt-1" v-if="loadingTable">
              <content-placeholders-text :lines="1" />
            </content-placeholders>
            <v-text-field
            v-else
            ></v-text-field>
          </v-flex>
        </div>
        <div class="layout wrap">
          <v-flex xs12 sm3 class="pr-4 no-wrap">
            <content-placeholders class="mt-1" v-if="loadingTable">
              <content-placeholders-text :lines="1" />
            </content-placeholders>
            <v-text-field
            v-else
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm3 class="pr-4 no-wrap">
            <content-placeholders class="mt-1" v-if="loadingTable">
              <content-placeholders-text :lines="1" />
            </content-placeholders>
            <v-text-field
            v-else
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm3 class="pr-4 no-wrap">
            <content-placeholders class="mt-1" v-if="loadingTable">
              <content-placeholders-text :lines="1" />
            </content-placeholders>
            <v-text-field
            v-else
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm3 class="pr-4 no-wrap">
            <content-placeholders class="mt-1" v-if="loadingTable">
              <content-placeholders-text :lines="1" />
            </content-placeholders>
            <v-text-field
            v-else
            ></v-text-field>
          </v-flex>
        </div>
        <v-layout wrap>
          <v-flex xs12 sm12>
            <v-btn color="primary" class="mx-0 my-0 mt-2">
              <v-icon size="16">search</v-icon>
              Tìm kiếm
            </v-btn>
            <v-btn color="primary" class="mx-0 my-0 mt-2">
              <v-icon size="16">delete</v-icon>
              Xóa lọc
            </v-btn>
          </v-flex>
        </v-layout>
      </div>
    </v-slide-y-transition>
    <content-placeholders v-if="loadingTable">
      <content-placeholders-img />
      <content-placeholders-heading />
    </content-placeholders>
    <div v-else>
      <v-data-table
        :headers="headers"
        :items="danhSachHoSoTables"
        :total-items="total"
        v-model="selected"
        item-key="dossierId"
        select-all
        class="table-landing table-bordered"
        hide-actions
        :no-data-text="'Không tìm thấy ' + trangThaiHoSoList[index].title"
        :no-results-text="'Không tìm thấy ' + trangThaiHoSoList[index].title"
      >
        <template slot="headerCell" slot-scope="props">
          <v-tooltip bottom>
            <span slot="activator">
              {{ props.header.text }}
            </span>
            <span>
              {{ props.header.text }}
            </span>
          </v-tooltip>
        </template>
        <template slot="items" slot-scope="props">
          <td>
            <v-checkbox
              v-model="props.selected"
              primary
              hide-details
            ></v-checkbox>
          </td>
          <td class="text-xs-center stt_column">{{ props.index + 1 }}</td>
          <td class="text-xs-left" >{{ props.item.dossierIdCTN }}</td>
          <td class="text-xs-left" >{{ props.item.applicantName }}</td>
          <td class="text-xs-left" >
            <a title="Chi tiết hồ sơ" :href="viewChitiet(props.item, index)">
              <span>{{ props.item.serviceName }}</span>
            </a>
          </td>
          <td class="text-xs-left" >{{ props.item.address}}</td>
          <td class="text-xs-left" >{{ props.item.dueDate }}</td>
          <td class="text-xs-left" >{{durationText(props.item.processBlock, props.item.processUnit)}} <span v-if="props.item.processBlock">làm việc</span></td>
          <td class="text-xs-left px-0">
            <v-tooltip top>
              <v-btn style="width:30px;height:30px" slot="activator" icon class="mx-0 my-0" @click="toDetailDossier(index, props.item.dossierId)">
                <v-icon size="16" class="mx-0" style="color:#1976d2">visibility</v-icon>
              </v-btn>
              <span>Xem hồ sơ</span>
            </v-tooltip>
            <v-tooltip top v-if="checkAction(props.item.dossierStatus).includes('send')">
              <v-btn style="width:30px;height:30px" slot="activator" @click="toDetailPhieuHen(index, props.item.dossierId)" icon class="mx-0 my-0" :disabled="checkPrint(props.item)">
                <v-icon size="16" class="mx-0" style="color:#1976d2">print</v-icon>
              </v-btn>
              <span>In phiếu hẹn</span>
            </v-tooltip>
            <v-tooltip top v-if="checkAction(props.item.dossierStatus).includes('send')">
              <v-btn style="width:30px;height:30px" slot="activator" icon class="mx-0 my-0" @click="chuyenXuLy(props.item)" :disabled="checkPrint(props.item)">
                <v-icon size="16" class="mx-0" style="color:#1976d2">send</v-icon>
              </v-btn>
              <span>Chuyển hồ sơ vào xử lý</span>
            </v-tooltip>
            <v-tooltip top v-if="checkAction(props.item.dossierStatus).includes('ticket')">
              <v-btn style="width:30px;height:30px" slot="activator" icon class="mx-0 my-0">
                <v-icon size="16" class="mx-0" style="color:#1976d2">description</v-icon>
              </v-btn>
              <span>Phiếu kiểm soát</span>
            </v-tooltip>
            <v-tooltip top v-if="checkAction(props.item.dossierStatus).includes('result')">
              <v-btn style="width:30px;height:30px" slot="activator" icon class="mx-0 my-0" :to="'/danh-sach-ho-so/' + index + '/tra-ket-qua/' + props.item.dossierId">
                <v-icon size="16" style="color:#1976d2" class="mx-0">send</v-icon>
              </v-btn>
              <span>Trả kết quả</span>
            </v-tooltip> 
            <!-- <v-tooltip top v-if="checkAction(props.item.dossierStatus).includes('view')">
              <v-btn style="width:30px;height:30px" slot="activator" icon class="mx-0 my-0">
                <v-icon size="16" class="mx-0">remove_red_eye</v-icon>
              </v-btn>
              <span>Xem danh sách giấy tờ cần trả</span>
            </v-tooltip> -->
            <v-tooltip top v-if="checkAction(props.item.dossierStatus).includes('delete')">
              <v-btn style="width:30px;height:30px" slot="activator" icon class="mx-0 my-0" @click="deleteDosier(props.item.dossierId, props.index)">
                <v-icon size="16" class="mx-0" color="red darken-3">delete</v-icon>
              </v-btn>
              <span>Xoá</span>
            </v-tooltip>
          </td>
        </template>
      </v-data-table>
      <div class="mt-3 text-xs-right table-footer">
        <div class="left">
          <!-- <v-btn outline color="indigo" class="my-0 mx-0 mr-2" @click="moveProcess" v-if="trangThaiHoSoList[index].id === 'new'">
            <v-icon size="16">send</v-icon>
            Chuyển hồ sơ vào xử lý
          </v-btn>
          <v-btn outline color="indigo" class="my-0 mx-0 mr-2" @click="moveRelease" v-if="trangThaiHoSoList[index].id === 'release'">
            <v-icon size="16">send</v-icon>
            Trả kết quả
          </v-btn>
          <v-btn outline color="indigo" class="my-0 mx-0 mr-2" @click="moveDelete" v-if="showMultiDelete(trangThaiHoSoList[index].id)">
            <v-icon size="16">delete</v-icon>
            Xóa
          </v-btn> -->
        </div>
        <span class="mr-2"><i>Tổng số <span class="red--text">{{total}}</span> kết quả được tìm thấy</i></span>
        <v-pagination v-model="page" :length="pages"></v-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import * as utils from '../store/onegate_utils'
// import printJS from 'print-js/dist/print.min.js'
export default {
  props: ['index'],
  data: () => ({
    keywords: '',
    selected: [],
    advanced_filter: false,
    statusAll: 'new,receiving,processing,waiting,paying,done,expired,cancelled',
    headers: [
      {
        text: 'STT',
        align: 'center',
        sortable: false,
        class: 'stt_column'
      },
      {
        text: 'Mã hồ sơ',
        align: 'center',
        sortable: false
      },
      {
        text: 'Người đăng ký',
        align: 'center',
        sortable: false
      },
      {
        text: 'Tên thủ tục',
        align: 'center',
        sortable: false
      },
      {
        text: 'Địa chỉ',
        align: 'center',
        sortable: false
      },
      {
        text: 'Ngày giờ hẹn trả',
        align: 'center',
        sortable: false
      },
      {
        text: 'Thời hạn',
        align: 'center',
        sortable: false
      },
      {
        text: '',
        align: 'center',
        sortable: false,
        class: 'action_column'
      }
    ],
    danhSachHoSoTables: [],
    itemperpage: 15,
    pages: 0,
    page: 1,
    total: 0
  }),
  computed: {
    loadingTable () {
      return this.$store.getters.loadingTable
    },
    trangThaiHoSoList () {
      return this.$store.getters.loadtrangThaiHoSoList
    }
  },
  watch: {
    index (val) {
      var vm = this
      vm.$store.dispatch('setCurrentIndex', vm.index)
      vm.selected = []
      vm.keywords = ''
      vm.page = 1
      var statusFilter = vm.trangThaiHoSoList[val] === 'all' ? vm.statusAll : vm.trangThaiHoSoList[val].id
      console.log(statusFilter)
      let filter = {
        keywords: vm.keywords,
        status: '',
        start: vm.page * vm.itemperpage - vm.itemperpage,
        end: vm.page * vm.itemperpage
      }
      console.log(vm.index)
      if (vm.index === '2') {
        vm.$store.commit('setSubStatusNew', true)
      } else {
        vm.$store.commit('setSubStatusNew', false)
      }
      vm.$store.getters.danhSachHoSo(filter).then(function (result) {
        vm.danhSachHoSoTables = result.data
        vm.total = result.total
        vm.pages = Math.ceil(vm.total / vm.itemperpage)
      })
    },
    page (val) {
      var vm = this
      vm.page = val
      vm.loadDataTable()
    }
  },
  created () {
    var vm = this
    vm.page = 1
    vm.$nextTick(function () {
      vm.$store.dispatch('setCurrentIndex', vm.index)
      vm.loadDataTable()
    })
  },
  methods: {
    checkAction (status) {
      if (status === 'new') {
        return 'print,send,delete'
      } else if (status === 'releasing') {
        return 'result,ticket'
      } else if (status === 'done') {
        return 'view,ticket'
      } else if (status === 'ended') {
        return 'view,ticket'
      } else if (status === 'waiting') {
        return 'view,ticket'
      } else if (status === 'receiving') {
        return 'view,result'
      } else if (status === 'correcting') {
        return 'view,ticket'
      } else if (status === 'processing') {
        return 'view,ticket'
      } else {
        return 'delete'
      }
    },
    checkPrint (item, status) {
      if (!item.applicantName && !item.address) {
        return true
      }
      return false
    },
    showMultiDelete (status) {
      if (status === 'new') {
        return true
      }
      return false
    },
    keywordSearch () {
      var vm = this
      vm.page = 1
      vm.loadDataTable()
    },
    loadDataTable () {
      var vm = this
      console.log(vm.trangThaiHoSoList[vm.index].id)
      var statusFilter = vm.trangThaiHoSoList[vm.index].id === 'all' ? vm.statusAll : vm.trangThaiHoSoList[vm.index]
      console.log(statusFilter)
      let filter = {
        keywords: vm.keywords,
        status: '',
        start: vm.page * vm.itemperpage - vm.itemperpage,
        end: vm.page * vm.itemperpage
      }
      console.log(vm.index)
      if (vm.index === '2') {
        vm.$store.commit('setSubStatusNew', true)
      } else {
        vm.$store.commit('setSubStatusNew', false)
      }
      vm.$store.getters.danhSachHoSo(filter).then(function (result) {
        vm.danhSachHoSoTables = result.data
        vm.total = result.total
        vm.pages = Math.ceil(vm.total / vm.itemperpage)
      })
    },
    chuyenXuLy (data) {
      var vm = this
      vm.$root.$confirm.open('Thông báo', 'Bạn chắc chắn muốn thực hiện thao tác này?', { color: 'blue darken-4' }).then((confirm) => {
        vm.$store.dispatch('getCpsAuthen').then(resultAuthen => {
          let dataPost = {
            dossierId: data.dossierId,
            actionCode: 10000,
            cps_auth: resultAuthen
          }
          vm.$store.dispatch('postAction', dataPost).then(function (result) {
            utils.showMessageToastr('success', 'Xử lý thành công')
            vm.loadDataTable()
          }).catch(function (xhr) {
            utils.showMessageToastr('error', 'Xử lý thất bại')
          })
        }).catch(reject => {
          console.log(reject)
        })
      }).catch(function (xhr) {
        console.log('kkk')
      })
    },
    traKetQua (data) {
      var vm = this
      vm.$root.$confirm.open('Thông báo', 'Bạn chắc chắn muốn thực hiện thao tác này?', { color: 'blue darken-4' }).then((confirm) => {
        vm.$store.dispatch('getCpsAuthen').then(resultAuthen => {
          let dataPost = {
            dossierId: data.dossierId,
            actionCode: 30000,
            cps_auth: resultAuthen
          }
          vm.$store.dispatch('postAction', dataPost).then(function (result) {
            utils.showMessageToastr('success', 'Xử lý thành công')
            vm.loadDataTable()
          }).catch(function (xhr) {
            utils.showMessageToastr('error', 'Xử lý thất bại')
          })
        }).catch(reject => {
          console.log(reject)
        })
      }).catch(function (xhr) {
        console.log('kkk')
      })
    },
    moveProcess () {
      var vm = this
      vm.$root.$confirm.open('Thông báo', 'Bạn chắc chắn muốn thực hiện thao tác này?', { color: 'blue darken-4' }).then((confirm) => {
        var listPost = []
        for (var i = 0; i < vm.selected.length; i++) {
          if (!vm.selected[i].applicantName && !vm.selected[i].address) {
            vm.$root.$confirm.open('Thông báo', 'Bạn phải điền đầy đủ thông tin của hồ sơ trước khi thực hiện thao tác này?', { color: 'blue darken-4' }).then(function (ressult) {
              return
            }).catch(function (xhr) {
              return
            })
            return
          }
        }
        vm.$store.dispatch('getCpsAuthen').then(resultAuthen => {
          vm.selected.forEach(val => {
            let data = {
              dossierId: val.dossierId,
              actionCode: 10000,
              cps_auth: resultAuthen
            }
            listPost.push(vm.$store.dispatch('postAction', data))
          })
          if (listPost.length === 0) {
            utils.showMessageToastr('error', 'Bạn chưa chọn hồ sơ nào')
            return
          }
          Promise.all(listPost).then(function (ressult) {
            utils.showMessageToastr('success', 'Xử lý thành công')
            vm.loadDataTable()
          }).catch(function (xhr) {
            utils.showMessageToastr('error', 'Xử lý thất bại')
          })
        }).catch(reject => {
          console.log(reject)
        })
      }).catch(function (xhr) {
        console.log('kkk')
      })
      console.log(vm.selected)
    },
    moveRelease () {
      var vm = this
      vm.$root.$confirm.open('Thông báo', 'Bạn chắc chắn muốn thực hiện thao tác này?', { color: 'blue darken-4' }).then((confirm) => {
        var listPost = []
        for (var i = 0; i < vm.selected.length; i++) {
          if (!vm.selected[i].applicantName && !vm.selected[i].address) {
            vm.$root.$confirm.open('Thông báo', 'Bạn phải điền đầy đủ thông tin của hồ sơ trước khi thực hiện thao tác này?', { color: 'blue darken-4' }).then(function (ressult) {
              return
            }).catch(function (xhr) {
              return
            })
            return
          }
        }
        vm.$store.dispatch('getCpsAuthen').then(resultAuthen => {
          vm.selected.forEach(val => {
            let data = {
              dossierId: val.dossierId,
              actionCode: 30000,
              cps_auth: resultAuthen
            }
            listPost.push(vm.$store.dispatch('postAction', data))
          })
          if (listPost.length === 0) {
            utils.showMessageToastr('error', 'Bạn chưa chọn hồ sơ nào')
            return
          }
          Promise.all(listPost).then(function (ressult) {
            utils.showMessageToastr('success', 'Xử lý thành công')
            vm.loadDataTable()
          }).catch(function (xhr) {
            utils.showMessageToastr('error', 'Xử lý thất bại')
          })
        }).catch(reject => {
          console.log(reject)
        })
      }).catch(function (xhr) {
        console.log('kkk')
      })
      console.log(vm.selected)
    },
    deleteDosier (dossierId, index) {
      var vm = this
      vm.$root.$confirm.open('Xóa', 'Bạn có muốn xoá hồ sơ này?', { color: 'red' }).then((confirm) => {
        if (dossierId) {
          vm.$store.dispatch('getCpsAuthen').then(resultAuthen => {
            let deleteData = {
              dossierId: dossierId,
              cps_auth: resultAuthen
            }
            let promise = vm.$store.dispatch('deleteDossier', deleteData)
            promise.then(function (ressult) {
              vm.danhSachHoSoTables.splice(index, 1)
            })
          }).catch(reject => {

          })
        }
      }).catch(function (xhr) {
        console.log('kkk')
      })
      console.log(vm.selected)
    },
    moveDelete () {
      var vm = this
      vm.$root.$confirm.open('Xóa', 'Bạn có chắc chắn muốn xoá các mục đã chọn?', { color: 'red' }).then((confirm) => {
        vm.$store.dispatch('getCpsAuthen').then(resultAuthen => {
          var listDelete = []
          vm.selected.forEach(val => {
            let deleteData = {
              dossierId: val.dossierId,
              cps_auth: resultAuthen
            }
            listDelete.push(vm.$store.dispatch('deleteDossier', deleteData))
          })
          if (listDelete.length === 0) {
            utils.showMessageToastr('error', 'Bạn chưa chọn hồ sơ nào')
            return
          }
          Promise.all(listDelete).then(function (ressult) {
            if (vm.selected) {
              vm.selected.forEach(val => {
                vm.danhSachHoSoTables.splice(vm.danhSachHoSoTables.findIndex(item => {
                  return val.dossierId === item.dossierId
                }), 1)
              })
            }
            utils.showMessageToastr('success', 'Xử lý thành công')
          }).catch(function (xhr) {
            utils.showMessageToastr('error', 'Xử lý thất bại')
          })
        }).catch(reject => {
          console.log(reject)
        })
      }).catch(function (xhr) {
      })
      console.log(vm.selected)
    },
    toDetailDossier (index, dossierId) {
      var url = '/group/cong-xu-ly/mot-cua-dien-tu#/danh-sach-ho-so/' + index + '/chi-tiet-ho-so/' + dossierId
      if (index === '4') {
        url = '/group/cong-xu-ly/mot-cua-dien-tu#/danh-sach-ho-so/' + index + '/chi-tiet-ho-so/' + dossierId
      }
      window.location.href = url
    },
    toDetailPhieuHen (index, dossierId) {
      var vm = this
      vm.$store.commit('setPrintPH', true)
      console.log(vm.$store.getters.printPH)
      let url = '/group/cong-xu-ly/mot-cua-dien-tu#/danh-sach-ho-so/' + index + '/tiep-nhan-ho-so/' + dossierId + '/phieu-hen'
      // window.location.href = url
      window.open(url, '_blank')
    },
    durationText (block, unit) {
      var duration
      if (unit === 1 && block > 8) {
        let day = Math.floor(block / 8) + ' ngày'
        let hours
        if (block % 8 !== 0) {
          hours = ((block / 8) - Math.floor(block / 8)) * 8 + ' giờ'
        } else {
          hours = ''
        }
        duration = `${day} ${hours}`
      } else if (unit === 0) {
        duration = block + ' ngày'
      } else if (unit === 1 && block <= 8) {
        duration = block + ' giờ'
      }
      return duration
    },
    viewChitiet (item, index) {
      if (item.dossierStatus === 'done') {
        return '/group/cong-xu-ly/mot-cua-dien-tu#/danh-sach-ho-so/' + index + '/chi-tiet-ho-so/' + item.dossierId
      } else {
        return '/group/cong-xu-ly/mot-cua-dien-tu#/danh-sach-ho-so/' + index + '/chi-tiet-ho-so/' + item.dossierId
      }
    }
  },
  filters: {
    processUnit (arg) {
      if (arg === 1) {
        return 'giờ'
      } else if (arg === 0) {
        return 'ngày'
      }
    }
  }
}
</script>

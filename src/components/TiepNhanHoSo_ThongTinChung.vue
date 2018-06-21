<template>
  <div style="position: relative;">
    
    <v-expansion-panel class="expansion-pl">
      <v-expansion-panel-content hide-actions value="1">
        <div slot="header"><div class="background-triangle-small"> I. </div>THÔNG TIN CHUNG</div>
        <v-card>
          <v-card-text>
            <v-layout wrap>
              <v-flex xs12 sm2>
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-else class="pl-0">Thủ tục: </v-subheader>
              </v-flex>
              <v-flex xs12 sm10>
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-select
                  v-if="loading === false&&isDetail === false"
                  :items="serviceConfigItems"
                  item-text="serviceName"
                  item-value="serviceCode"
                  v-model="thongTinChungHoSo.serviceConfig"
                  autocomplete
                  return-object
                  hide-selected
                  @change = "changeServiceConfigs"
                ></v-select>
                <v-subheader v-if="loading === false&&isDetail" style="float:left;height: 100%">
                  <i>{{thongTinChungHoSo.serviceName}}</i>
                </v-subheader>
              </v-flex>
              <v-flex xs12 sm2>
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-else class="pl-0">Dịch vụ: </v-subheader>
              </v-flex>
              <v-flex xs12 sm10>
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-select
                  v-if="loading === false&&isDetail === false"
                  :items="serviceOptionItems"
                  item-text="optionName"
                  item-value="templateNo"
                  v-model="thongTinChungHoSo.serviceOption"
                  @change="changeServiceOption"
                  hide-selected
                  autocomplete
                ></v-select>
                <v-subheader v-if="loading === false&&isDetail" style="float:left;height: 100%">
                  <i>{{thongTinChungHoSo.dossierTemplateName}}</i>
                </v-subheader>
              </v-flex>
              <v-flex xs12></v-flex>
              <!--  -->
              <v-flex xs12 sm2>
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-else class="pl-0" >
                  Mã hồ sơ: 
                </v-subheader>
              </v-flex>
              <v-flex xs12 sm4>
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-else style="float:left"><i>{{thongTinChungHoSo.dossierIdCTN}}</i></v-subheader>
              </v-flex>
              <v-flex xs12></v-flex>
              <!--  -->
              <v-flex xs12 sm2 v-if="subStatusNew === false">
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-else class="pl-0" >
                  Mã tiếp nhận: 
                </v-subheader>
              </v-flex>
              <v-flex xs12 sm4 v-if="subStatusNew === false">
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-else style="float:left"><i>{{thongTinChungHoSo.dossierNo}}</i></v-subheader>
              </v-flex>
              <!--  -->
              <v-flex xs12 sm2 v-if="subStatusNew === false">
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-else class="pl-0">Thời gian giải quyết: </v-subheader>
              </v-flex>
              <v-flex xs12 sm4 v-if="subStatusNew === false">
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-if="!loading&&thongTinChungHoSo.durationDate" style="float:left"><i>{{thongTinChungHoSo.durationDate}} làm việc</i></v-subheader>
              </v-flex>
              <v-flex xs12 sm2 v-if="subStatusNew === false">
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-else class="pl-0">Ngày giờ tiếp nhận: </v-subheader>
              </v-flex>
              <v-flex xs12 sm4 v-if="subStatusNew === false">
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-else style="float:left"><i>{{thongTinChungHoSo.receiveDate|dateTimeView}}</i></v-subheader>
              </v-flex>
              <v-flex xs12 sm2 v-if="subStatusNew === false">
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-else class="pl-0">Ngày hẹn trả: </v-subheader>
              </v-flex>
              <v-flex xs12 sm4 v-if="subStatusNew === false">
                <content-placeholders class="mt-1" v-if="loading">
                  <content-placeholders-text :lines="1" />
                </content-placeholders>
                <v-subheader v-else style="float:left;height: 100%">
                  <datetime v-model="thongTinChungHoSo.dueDate" 
                    type="datetime"
                    input-format="DD/MM/YYYY | HH:mm"
                    :i18n="{ok:'Chọn', cancel:'Thoát'}"
                    moment-locale="vi"
                    zone="local"
                    :min-date="minDate"
                    monday-first
                    wrapper-class="wrapper-datetime"
                    auto-continue
                    auto-close
                    required
                    ></datetime>
                    <v-icon>event</v-icon>
                </v-subheader>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    
    <v-btn flat class="absolute__btn">
      <v-icon size="16">file_copy</v-icon>
      Hướng dẫn
    </v-btn>
  </div>
</template>

<script>
  import router from '@/router'
  export default {
    data: () => ({
      minDate: null,
      dataPostDossier: {
        serviceCode: '',
        govAgencyCode: '',
        processOptionId: ''
      }
    }),
    created () {
      var vm = this
      vm.$nextTick(function () {
        vm.minDate = vm.getCurentDateTime('date')
        // vm.$store.commit('setThongTinChungHoSoDueDate', (new Date()).toString())
        // vm.$store.commit('setThongTinChungHoSoReceiveDate', vm.getCurentDateTime('datetime'))
      })
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      },
      isDetail () {
        return this.$store.getters.isDetail
      },
      thongTinChungHoSo () {
        return this.$store.getters.thongTinChungHoSo
      },
      serviceConfigItems () {
        return this.$store.getters.serviceConfigItems
      },
      serviceOptionItems () {
        return this.$store.getters.serviceOptionItems
      },
      dossierTemplates () {
        return this.$store.getters.dossierTemplates
      },
      subStatusNew () {
        return this.$store.getters.subStatusNew
      }
    },
    watch: {},
    methods: {
      // changeDate () {
      //   var vm = this
      //   console.log(vm.thongTinChungHoSo.dueDate)
      //   var date = new Date(vm.thongTinChungHoSo.dueDate)
      //   var dueDatePut = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
      //   if (vm.isDetail) {
      //     vm.$store.dispatch('putDuedateDossier', dueDatePut)
      //   }
      //   // let durationDate = vm.getDuedate()
      //   // vm.$store.commit('setThongTinChungHoSoDurationDate', durationDate)
      // },
      getCurentDateTime (type) {
        let date = new Date()
        if (type === 'datetime') {
          return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} | ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
        } else if (type === 'date') {
          return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate()}`
        }
      },
      getDuedate () {
        var vm = this
        let dueDateMs = (new Date(vm.thongTinChungHoSo.dueDate).getTime() - new Date(vm.thongTinChungHoSo.receiveDate).getTime())
        if (Math.ceil(dueDateMs / 1000 / 60 / 60 / 24) <= 0) {
          return 1
        }
        return Math.ceil(dueDateMs / 1000 / 60 / 60 / 24)
      },
      changeServiceConfigs () {
        var vm = this
        vm.$store.commit('setSubStatusNew', false)
        setTimeout(function () {
          let optionItems = vm.thongTinChungHoSo.serviceConfig.options
          // console.log(optionItems)
          vm.dataPostDossier.serviceCode = vm.thongTinChungHoSo.serviceConfig.serviceCode
          vm.dataPostDossier.govAgencyCode = vm.thongTinChungHoSo.serviceConfig.govAgencyCode
          vm.$store.commit('setServiceConfigObj', vm.thongTinChungHoSo.serviceConfig)
          if (optionItems.length !== 1) {
            vm.$store.commit('setServiceOptionItems', optionItems)
          } else {
            vm.dataPostDossier.templateNo = optionItems[0].templateNo
            vm.$store.commit('setServiceOptionItems', optionItems)
            vm.$store.commit('setServiceOptionThongTinChungHoSo', optionItems[0].templateNo)
            vm.$store.commit('setSubStatusNew', false)
            vm.$store.dispatch('getCpsAuthen').then(function (result) {
              vm.dataPostDossier.cps_auth = result
              let promise = vm.$store.dispatch('postDossier', vm.dataPostDossier)
              promise.then(function (result) {
                console.log('result', result)
                router.push('/danh-sach-ho-so/' + vm.$store.getters.index + '/tiep-nhan-ho-so/' + result.dossierId)
                vm.$store.dispatch('loadDossierFiles')
                vm.$store.dispatch('loadDossierTemplates', result).then(function (result) {
                  setTimeout(function (argument) {
                    console.log('result dossierTemplates=-------', result)
                    result.forEach(val => {
                      vm.$store.dispatch('loadAlpcaForm', val)
                    })
                  }, 500)
                })
              })
            })
          }
        },
        300)
      },
      changeServiceOption () {
        var vm = this
        vm.$store.commit('setSubStatusNew', false)
        setTimeout(function () {
          vm.dataPostDossier.templateNo = vm.thongTinChungHoSo.serviceOption
          vm.$store.dispatch('getCpsAuthen').then(function (result) {
            vm.dataPostDossier.cps_auth = result
            let promise = vm.$store.dispatch('postDossier', vm.dataPostDossier)
            promise.then(function (result) {
              console.log('log', vm.$store.getters.index, result.dossierId)
              router.push('/danh-sach-ho-so/' + vm.$store.getters.index + '/tiep-nhan-ho-so/' + result.dossierId)
            })
          }).catch(reject => {
            console.log(reject)
          })
        }, 300)
      }
    },
    filters: {
      dateTimeView (arg) {
        if (arg) {
          let value = new Date(arg)
          return `${value.getDate().toString().padStart(2, '0')}/${(value.getMonth() + 1).toString().padStart(2, '0')}/${value.getFullYear()} | ${value.getHours().toString().padStart(2, '0')}:${value.getMinutes().toString().padStart(2, '0')}`
        }
        //  else {
        //   if (!arg) {
        //     return ''
        //   }
        //   const [date, time] = date.split(' ')
        //   const [day, month, year] = date.split('/')
        //   const [hour, minute] = time.split(':')
        //   return `${day.toString().padStart(2, '0')}/${(month + 1).toString().padStart(2, '0')}/${year} | ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
        // }
      }
    }
  }
</script>

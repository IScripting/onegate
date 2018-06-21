import Vue from 'vue'
import Vuex from 'vuex'
import $ from 'jquery'
import toastr from 'toastr'
import axios from 'axios'
import * as utils from './onegate_utils'
import support from './support.json'

Vue.use(toastr)
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    printPH: true,
    api: {
      apiLocal: true,
      serviceInfoApi: '/o/rest/v2/serviceinfos',
      serviceConfigApi: '/o/rest/v2/onegate/serviceconfigs/processes',
      regionApi: '/o/rest/v2/dictcollections',
      serviceOptionApi: '/o/rest/v2/serviceconfigs/301/processes',
      postDossierApi: '/o/rest/v2/onegate',
      dossierApi: '/o/rest/v2/dossiers',
      dossierTemplatesApi: '/o/rest/v2/dossiertemplates',
      applicantApi: '/o/rest/v2/applicant',
      govAgency: 'abc',
      dossierlogsApi: '/o/rest/v2/dossierlogs',
      user: {},
      groupId: 55301
    },
    // api: {
    //   serviceInfoApi: 'http://hanoi.fds.vn:2281/api/serviceinfos',
    //   serviceConfigApi: 'http://127.0.0.1:8081/api/onegate/serviceconfigs/processes',
    //   regionApi: 'http://127.0.0.1:8081/api/dictcollections',
    //   serviceOptionApi: 'http://hanoi.fds.vn:2281/api/serviceconfigs/301/processes',
    //   postDossierApi: 'http://127.0.0.1:8081/api/onegate',
    //   dossierApi: 'http://127.0.0.1:8081/api/dossiers',
    //   dossierTemplatesApi: 'http://127.0.0.1:8081/api/dossiertemplates',
    //   applicantApi: '/o/rest/v2/applicant',
    //   dossierlogsApi: 'http://127.0.0.1:8081/api/dossiers/dossierlogs',
    //   govAgency: 'abc',
    //   user: {},
    //   groupId: 0
    // },
    dataDetailDossier: {},
    isDetail: false,
    loading: false,
    loadingTable: false,
    error: null,
    user: null,
    trangThaiHoSoList: [],
    index: 0,
    lePhi: {
      fee: '',
      feeNote: '',
      request: ''
    },
    dossier: {
      applicantIdNo: 'ccc'
    },
    serviceConfigObj: {},
    dossierTemplateName: '',
    thongTinChungHoSo: {
      serviceName: '',
      dossierTemplateName: '',
      serviceConfig: '',
      serviceOption: '',
      dossierNo: '',
      receiveDate: new Date(),
      dueDate: (new Date()).toString(),
      durationDate: '',
      dossierId: '',
      dossierIdCTN: '',
      dossierStatus: '',
      dossierStatusText: ''
    },
    vnpostCodeItems: [],
    serviceConfigItems: null,
    serviceOptionItems: [],
    citys: null,
    cityVal: null,
    districtVal: null,
    wardVal: null,
    resultServices: null,
    dossierFiles: [],
    listHistoryProcessingItems: [],
    thanhPhanHoSo: {
      dossierTemplates: [{
        'partNo': '2',
        'partName': 'Giấy đăng ký hợp đồng xuất khẩu sản phẩm thủy sản (tải bản scan)',
        'partTip': '',
        'partType': 0,
        'multiple': false,
        'required': false,
        'esign': false,
        'fileTemplateNo': '',
        'hasForm': true,
        'fileType': 0
      },
      {
        'partNo': '2',
        'partName': 'Giấy đăng ký hợp đồng xuất khẩu sản phẩm thủy sản (tải bản scan)',
        'partTip': '',
        'partType': 0,
        'multiple': false,
        'required': false,
        'esign': false,
        'fileTemplateNo': '',
        'hasForm': true,
        'fileType': 0
      },
      {
        'partNo': '2',
        'partName': 'Giấy đăng ký hợp đồng xuất khẩu sản phẩm thủy sản (tải bản scan)',
        'partTip': '',
        'partType': 0,
        'multiple': false,
        'required': false,
        'esign': false,
        'fileTemplateNo': '',
        'hasForm': true,
        'fileType': 0
      },
      {
        'partNo': '2',
        'partName': 'Giấy đăng ký hợp đồng xuất khẩu sản phẩm thủy sản (tải bản scan)',
        'partTip': '',
        'partType': 0,
        'multiple': false,
        'required': false,
        'esign': false,
        'fileTemplateNo': '',
        'hasForm': true,
        'fileType': 0
      },
      {
        'partNo': '2',
        'partName': 'Giấy đăng ký hợp đồng xuất khẩu sản phẩm thủy sản (tải bản scan)',
        'partTip': '',
        'partType': 0,
        'multiple': false,
        'required': false,
        'esign': false,
        'fileTemplateNo': '',
        'hasForm': true,
        'fileType': 0
      }
      ]
    },
    dossierTemplates: [{
      'partNo': '1',
      'partName': 'Giấy đăng ký hợp đồng xuất khẩu sản phẩm thủy sản',
      'partTip': '',
      'partType': 0,
      'multiple': false,
      'required': false,
      'esign': false,
      'fileTemplateNo': '',
      'hasForm': true,
      'fileType': 0
    },
    {
      'partNo': '2',
      'partName': 'Giấy đăng ký hợp đồng xuất khẩu sản phẩm thủy sản (tải bản scan)',
      'partTip': '',
      'partType': 0,
      'multiple': false,
      'required': false,
      'esign': false,
      'fileTemplateNo': '',
      'hasForm': true,
      'fileType': 0
    },
    {
      'partNo': '3',
      'partName': 'Giấy đăng ký nuôi thủy sản thương phẩm',
      'partTip': '',
      'partType': 0,
      'multiple': false,
      'required': false,
      'esign': false,
      'fileTemplateNo': '',
      'hasForm': false,
      'fileType': 0
    },
    {
      'partNo': '4',
      'partName': 'Giấy đăng ký nuôi thủy sản thương phẩm',
      'partTip': '',
      'partType': 0,
      'multiple': false,
      'required': false,
      'esign': false,
      'fileTemplateNo': '',
      'hasForm': false,
      'fileType': 0
    },
    {
      'partNo': '5',
      'partName': 'Hợp đồng mua thủy sản nguyên liệu với tổ chức, cá nhân có cơ sở nuôi thủy sản thương phẩm',
      'partTip': '',
      'partType': 0,
      'multiple': false,
      'required': false,
      'esign': false,
      'fileTemplateNo': '',
      'hasForm': false,
      'fileType': 0
    }
    ],
    thongTinChuHoSo: {
      userType: true,
      cityCode: '',
      districtCode: '',
      wardCode: '',
      applicantNote: '',
      applicantIdNo: '',
      contactEmail: '',
      contactName: '',
      address: '',
      applicantName: ''
    },
    thongTinNguoiNopHoSo: {
      sameUser: true,
      delegateName: '',
      delegateCityCode: '',
      delegateAddress: '',
      delegateDistrictCode: '',
      delegateWardCode: '',
      delegateEmail: '',
      delegateTelNo: '',
      delegateIdNo: ''
    },
    dichVuChuyenPhatKetQua: {
      viaPostal: false,
      postalServiceCode: '',
      postalServiceName: '',
      postalAddress: '',
      postalCityCode: '',
      postalCityName: '',
      postalDistrictCode: '',
      postalDistrictName: '',
      postalWardCode: '',
      postalWardName: '',
      postalTelNo: '',
      vnPostCode: ''
    },
    processSteps: [],
    subStatusNew: true,
    danhSachHoSo: null
  },
  actions: {
    clearError ({ commit }) {
      commit('clearError')
    },
    loadInitResource ({ commit, state }) {
      axios.get(support.renderURLInit, {}).then(function (response) {
        state.api = response.data
      }).catch(function (xhr) {})
    },
    loadDanhSachHoSo ({ commit, state }, filter) {
      return new Promise((resolve, reject) => {
        commit('setLoadingTable', true)
        var paramsGet = {
          status: filter.status.id,
          keyword: filter.keywords,
          start: filter.start,
          end: filter.end,
          online: false
        }
        if (state.subStatusNew) {
          paramsGet.online = true
        }
        if (filter.status.id === 'receiving') {
          paramsGet.online = true
          paramsGet.substatus = 'receiving_5'
        }
        let param = {
          headers: {
            groupId: state.api.groupId
          },
          params: paramsGet
        }
        axios.get(state.api.dossierApi, param).then(function (response) {
          let serializable = response.data
          commit('setDanhSachHoSo', serializable)
          resolve(response.data)
          commit('setLoadingTable', false)
        }, error => {
          reject(error)
          commit('setLoadingTable', false)
        })
      })
    },
    deleteDossier ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        let param = {
          headers: {
            groupId: state.api.groupId,
            'cps_auth': data.cps_auth
          }
        }
        axios.delete(state.api.dossierApi + '/' + data.dossierId, param).then(function (response) {
          resolve(response)
        }).catch(function (error) {
          reject(error)
        })
      })
    },
    loadtrangThaiHoSoList ({ commit }) {
      commit('setLoading', true)
      let data = [{
        title: 'Hồ sơ chờ bàn giao',
        id: 'new',
        action: 'folder',
        action_active: 'play_arrow',
        link: '/',
        active: false
      },
      {
        title: 'Hồ sơ chờ bổ sung',
        id: 'waiting',
        action: 'folder',
        action_active: 'play_arrow',
        link: '/'
      },
      {
        title: 'Hồ sơ chờ tiếp nhận online',
        id: 'new',
        action: 'folder',
        action_active: 'play_arrow',
        link: '/'
      },
      {
        title: 'Hồ sơ chờ trả kết quả',
        id: 'releasing',
        action: 'folder',
        action_active: 'play_arrow',
        link: '/'
      },
      {
        title: 'Hồ sơ đã trả kết quả',
        id: 'done',
        action: 'folder',
        action_active: 'play_arrow',
        link: '/'
      },
      // {
      //   title: 'Hồ sơ chờ tiếp nhận online',
      //   id: 'receiving',
      //   action: 'folder',
      //   action_active: 'play_arrow',
      //   link: '/'
      // },
      {
        title: 'Tra cứu hồ sơ',
        id: 'all',
        action: 'folder',
        action_active: 'play_arrow',
        link: '/'
      }
      ]
      commit('setLoading', false)
      commit('setTrangThaiHoSoList', data)
    },
    setCurrentIndex ({ commit }, data) {
      commit('setIndex', data)
    },
    setLePhi ({ commit }, data) {
      commit('setLePhi', data)
    },
    setDataDetailDossier ({commit}, data) {
      commit('dataDetailDossier', data)
    },
    setThongTinChuHoSo ({commit}, data) {
      commit('setThongTinChuHoSo', data)
    },
    setThongTinNguoiNopHoSo ({ commit }, data) {
      commit('setThongTinNguoiNopHoSo', data)
    },
    loadServiceConfigs ({ commit, state }, data) {
      let param = {
        headers: {
          groupId: state.api.groupId
        }
      }
      axios.get(state.api.serviceConfigApi, param).then(function (response) {
        commit('setserviceConfigItems', response.data.data)
      }).catch(function (xhr) {})
    },
    loadDictItems ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        let param = {
          headers: {
            groupId: state.api.groupId
          },
          params: {
            parent: data.parent
          }
        }
        axios.get(state.api.regionApi + '/' + data.collectionCode + '/dictitems', param).then(function (response) {
          let serializable = response.data
          if (data.collectionCode === 'ADMINISTRATIVE_REGION') {
            if (data.level === 0) {
              commit('setCitys', serializable.data)
            }
          }
          resolve(response.data)
        }, error => {
          reject(error)
        })
      })
    },
    loadResultServices ({ commit, state }, data) {
      let param = {
        headers: {
          groupId: state.api.groupId
        },
        params: {
          parent: data
        }
      }
      axios.get(state.api.regionApi, param).then(function (response) {
        commit('setResultServices', response.data.data)
      }).catch(function (xhr) {})
    },
    resetThongTinChungHoSo ({ commit }) {
      let data = {
        serviceConfig: {},
        serviceOption: '',
        receiveDate: new Date(),
        dueDate: (new Date()).toString(),
        durationDate: '',
        dossierId: '',
        dossierNo: '',
        govAgencyName: '',
        dossierIdCTN: '',
        processBlock: '',
        processUnit: '',
        dossierStatus: '',
        dossierStatusText: '',
        submitDate: ''
      }
      commit('setThongTinChungHoSo', data)
    },
    resetThongTinChuHoSo ({ commit }) {
      let data = {
        userType: true,
        cityCode: 25,
        districtCode: '',
        wardCode: '',
        applicantNote: '',
        applicantIdNo: '',
        contactEmail: '',
        contactName: '',
        address: '',
        applicantName: ''
      }
      commit('setThongTinChuHoSo', data)
    },
    resetThongTinNguoiNopHoSo ({ commit }) {
      let data = {
        sameUser: '',
        delegateName: '',
        delegateCityCode: 25,
        delegateAddress: '',
        delegateDistrictCode: '',
        delegateWardCode: '',
        delegateEmail: '',
        delegateTelNo: '',
        delegateIdNo: ''
      }
      commit('setThongTinNguoiNopHoSo', data)
    },
    resetThanhPhanHoSo ({ commit }) {
      commit('setDossierTemplates', [])
    },
    loadDossierTemplates ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        let param = {
          headers: {
            groupId: state.api.groupId
          }
        }
        let paramDossierMark = {
          headers: {
            groupId: state.api.groupId
          },
          params: {
            type: 1
          }
        }
        axios.all([axios.get(state.api.dossierTemplatesApi + '/' + data.dossierTemplateNo, param), axios.get(state.api.dossierApi + '/' + state.thongTinChungHoSo.dossierId + '/marks', paramDossierMark)])
        .then(axios.spread(function (resDossierTemplates, resDossierMarks) {
          let dossierTemplateItems = resDossierTemplates.data.dossierParts
          let dossierMarkItems = resDossierMarks.data.data
          if (dossierMarkItems) {
            dossierTemplateItems = dossierTemplateItems.map(itemTemplate => {
              if (itemTemplate.hasForm) {
                itemTemplate.count = 1
              } else {
                itemTemplate.count = 0
              }
              dossierMarkItems.forEach(function (val, index) {
                if (val.dossierPartNo === itemTemplate.partNo) {
                  itemTemplate.fileType = val.fileType
                  itemTemplate.fileCheck = val.fileCheck
                }
              })
              // let itemMarkFinded = dossierMarkItems.find(itemMark => {
              //   return itemMark && itemMark.dossierPartNo === itemTemplate.partNo
              // })
              // if (itemMarkFinded) {
              //   itemTemplate.fileType = itemMarkFinded.fileType
              //   itemTemplate.fileCheck = itemMarkFinded.fileCheck
              // } else {
              //   itemTemplate.fileType = 0
              //   itemTemplate.fileCheck = false
              // }
              return itemTemplate
            })
          } else {
            dossierTemplateItems = dossierTemplateItems.map(itemTemplate => {
              if (itemTemplate.hasForm) {
                itemTemplate.count = 1
              } else {
                itemTemplate.count = 0
              }
              itemTemplate.fileType = 0
              itemTemplate.fileCheck = false
              return itemTemplate
            })
          }
          console.log(dossierTemplateItems)
          commit('setDossierTemplates', dossierTemplateItems)
          state.thanhPhanHoSo.dossierTemplates = dossierTemplateItems
          state.thanhPhanHoSo.dossierTemplateId = resDossierTemplates.dossierTemplateId
          resolve(dossierTemplateItems)
        })).catch(function (xhr) {
          reject(xhr)
          console.log(xhr)
        })
      })
    },
    loadAllDossierTemplates ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        let param = {
          headers: {
            groupId: state.api.groupId
          }
        }
        axios.get(state.api.dossierTemplatesApi + '/' + data.dossierTemplateNo, param).then(function (response) {
          let serializable = response.data
          resolve(serializable.dossierParts)
        }, error => {
          reject(error)
        })
      })
    },
    deleteAttackFiles ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        let param = {
          headers: {
            groupId: state.api.groupId
          }
        }
        console.log('data -delete-----', data)
        console.log('data-- dossier file-------', state.dossierFiles)
        var dataPut = new URLSearchParams()
        if (data.hasForm) {
          state.dossierFiles.forEach(item => {
            if (item.dossierPartNo === data.partNo) {
              axios.put(state.api.dossierApi + '/' + state.thongTinChungHoSo.dossierId + '/files/' + item.referenceUid + '/resetformdata', dataPut, param).then(function (response) {
                console.log('success')
                resolve(response)
              }).catch(function (xhr) {
                console.log(xhr)
                reject(xhr)
              })
            }
          })
        } else {
          axios.delete(state.api.dossierApi + '/' + state.thongTinChungHoSo.dossierId + '/files/' + data.fileTemplateNo + '/all', param).then(function (response) {
            console.log('success!')
            resolve(response)
          }).catch(function (xhr) {
            console.log(xhr)
            reject(xhr)
          })
        }
      })
    },
    resetCounterTemplate ({commit, state}, data) {
      state.dossierTemplates.forEach(val => {
        if (val.partNo === data.partNo) {
          if (val.hasForm) {
            val.count = 1
          } else {
            val.count = 0
          }
        }
      })
    },
    deleteSingleFile ({ commit, state }, data) {
      let param = {
        headers: {
          groupId: state.api.groupId
        }
      }
      axios.delete(state.api.dossierApi + '/' + state.thonTinChungHoSo.dossierId + '/files/' + data.referenceUid, param).then(function (response) {
        console.log('success')
      }).catch(function (xhr) {
        console.log(xhr)
      })
    },
    uploadSingleFile ({ commit, state }, e) {
      return new Promise((resolve, reject) => {
        let files = e.target.files || e.dataTransfer.files
        let file = files[0]
        let data = e.dataItem
        let formData = new FormData()
        formData.append('displayName', file.name)
        formData.append('fileType', file.type)
        formData.append('fileSize', file.size)
        formData.append('isSync', 'false')
        formData.append('file', file)
        formData.append('dossierPartNo', data.partNo)
        formData.append('dossierTemplateNo', state.thongTinChungHoSo.dossierTemplateNo)
        formData.append('fileTemplateNo', data.partNo)
        formData.append('formData', '')
        formData.append('referenceUid', '')
        axios.post(state.api.dossierApi + '/' + state.thongTinChungHoSo.dossierId + '/files', formData, {
          headers: {
            'groupId': state.api.groupId,
            'Content-Type': 'multipart/form-data'
          }
        }).then(function (response) {
          resolve(response.data)
          console.log('upload file success!')
        }).catch(function (xhr) {
          console.log(xhr)
          reject(xhr)
        })
      })
    },
    getDetailDossier ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        let param = {
          headers: {
            groupId: state.api.groupId
          }
        }
        if (data > 0) {
          axios.get(state.api.postDossierApi + '/' + data, param).then(function (response) {
            let thongTinNguoiNop = {
              delegateName: response.data.delegateName,
              delegateCityCode: response.data.delegateCityCode,
              delegateAddress: response.data.delegateAddress,
              delegateDistrictCode: response.data.delegateDistrictCode,
              delegateWardCode: response.data.delegateWardCode,
              delegateEmail: response.data.delegateEmail,
              delegateTelNo: response.data.delegateTelNo,
              delegateIdNo: response.data.delegateIdNo
            }
            commit('setDossier', response.data)
            commit('setThongTinChuHoSo', response.data)
            commit('setLePhi', response.data)
            commit('setThongTinNguoiNopHoSo', thongTinNguoiNop)
            commit('setThongTinChungHoSo', response.data)
            commit('setDichVuChuyenPhatKetQua', response.data)
            resolve(response.data)
          }, error => {
            reject(error)
          }).catch(function (xhr) {
            console.log(xhr)
          })
        } else {
          resolve()
        }
      })
    },
    loadDossierFiles ({ commit, state }) {
      let param = {
        headers: {
          groupId: state.api.groupId
        }
      }
      axios.get(state.api.dossierApi + '/' + state.thongTinChungHoSo.dossierId + '/files', param).then(function (response) {
        commit('setDossierFiles', response.data.data)
        if (response.data.data) {
          let dossierFiles = response.data.data
          state.dossierTemplates.forEach(itemTemplate => {
            itemTemplate.count = 0
            dossierFiles.forEach(itemFile => {
              if (itemTemplate.partNo === itemFile.dossierPartNo) {
                itemTemplate.count ++
              }
            })
          })
        }
      }).catch(function (xhr) {
        console.log(xhr)
      })
    },
    viewFile ({commit, state}, data) {
      let param = {
        headers: {
          groupId: state.api.groupId
        },
        responseType: 'blob'
      }
      state.dossierFiles.forEach(val => {
        if (val.dossierPartNo === data.partNo) {
          axios.get(state.api.dossierApi + '/' + state.thongTinChungHoSo.dossierId + '/files/' + val.referenceUid, param).then(function (response) {
            var url = window.URL.createObjectURL(response.data)
            window.open(url, '_blank')
          }).catch(function (xhr) {
            console.log(xhr)
          })
        }
      })
    },
    postDossier ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        commit('setLoading', true)
        let options = {
          headers: {
            'groupId': state.api.groupId,
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'cps_auth': data.cps_auth
          }
        }
        var dataPostdossier = new URLSearchParams()
        dataPostdossier.append('serviceCode', data.serviceCode)
        dataPostdossier.append('govAgencyCode', data.govAgencyCode)
        dataPostdossier.append('dossierTemplateNo', data.templateNo)
        axios.post(state.api.postDossierApi, dataPostdossier, options).then(function (response) {
          response.data.serviceConfig = state.serviceConfigObj
          commit('setLoading', false)
          commit('setDossier', response.data)
          commit('setThongTinChuHoSo', response.data)
          commit('setLePhi', response.data)
          commit('setThongTinChungHoSo', response.data)
          commit('setDichVuChuyenPhatKetQua', response.data)
          resolve(response.data)
        }).catch(function (error) {
          utils.showMessageByAPICode(error.response.status)
          reject(error)
          commit('setLoading', false)
        })
      })
    },
    putDossier ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        commit('setLoading', false)
        let options = {
          headers: {
            groupId: state.api.groupId,
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'cps_auth': data.cps_auth
          }
        }
        var applicantType = ''
        if (data.userType) {
          applicantType = 'business'
        } else {
          applicantType = 'citizen'
        }
        var dataPutdossier = new URLSearchParams()
        dataPutdossier.append('applicantName', data.applicantName)
        dataPutdossier.append('dossierNo', data.dossierNo)
        dataPutdossier.append('applicantIdType', applicantType)
        dataPutdossier.append('applicantIdNo', data.applicantIdNo)
        dataPutdossier.append('address', data.address)
        dataPutdossier.append('cityCode', data.cityCode)
        dataPutdossier.append('districtCode', data.districtCode)
        dataPutdossier.append('wardCode', data.wardCode)
        dataPutdossier.append('contactTelNo', data.contactTelNo)
        dataPutdossier.append('contactEmail', data.contactEmail)
        dataPutdossier.append('delegateName', data.delegateName)
        dataPutdossier.append('delegateIdNo', data.delegateIdNo)
        dataPutdossier.append('delegateTelNo', data.delegateTelNo)
        dataPutdossier.append('delegateEmail', data.delegateEmail)
        dataPutdossier.append('delegateAddress', data.delegateAddress)
        dataPutdossier.append('delegateCityCode', data.delegateCityCode)
        dataPutdossier.append('delegateDistrictCode', data.delegateDistrictCode)
        dataPutdossier.append('delegateWardCode', data.delegateWardCode)
        dataPutdossier.append('applicantNote', data.applicantNote)
        dataPutdossier.append('paymentFee', data.fee)
        dataPutdossier.append('paymentFeeNote', data.feeNote)
        if (data.viaPostal) {
          dataPutdossier.append('viaPostal', data.viaPostal ? 1 : 0)
          dataPutdossier.append('postalServiceCode', data.postalServiceCode)
          dataPutdossier.append('postalServiceName', data.postalServiceName)
          dataPutdossier.append('postalAddress', data.postalAddress)
          dataPutdossier.append('postalCityCode', data.postalCityCode)
          dataPutdossier.append('postalDistrictCode', data.postalDistrictCode)
          dataPutdossier.append('postalWardCode', data.postalWardCode)
          dataPutdossier.append('postalTelNo', data.postalTelNo)
        }
        axios.put(state.api.postDossierApi + '/' + state.thongTinChungHoSo.dossierId, dataPutdossier, options).then(function (response) {
          resolve(response.data)
          commit('setLoading', false)
          commit('setDossier', response.data)
          commit('setThongTinChuHoSo', response.data)
          commit('setThongTinChungHoSo', response.data)
          commit('setLePhi', response.data)
          commit('setDichVuChuyenPhatKetQua', response.data)
        }).catch(function (xhr) {
          reject(xhr)
        })
      })
    },
    putDuedateDossier ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        commit('setLoading', false)
        let options = {
          headers: {
            groupId: state.api.groupId,
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        var dataPutdossier = new URLSearchParams()
        dataPutdossier.append('dueDate', data)
        axios.put(state.api.postDossierApi + '/' + state.thongTinChungHoSo.dossierId, dataPutdossier, options).then(function (response) {
          resolve(response.data)
          // commit('setLoading', false)
          // commit('setDossier', response.data)
          // commit('setThongTinChuHoSo', response.data)
          // commit('setThongTinChungHoSo', response.data)
          // commit('setLePhi', response.data)
          // commit('setDichVuChuyenPhatKetQua', response.data)
        }).catch(function (xhr) {
          reject(xhr)
        })
      })
    },
    submitDossier ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        let param = {
          headers: {
            groupId: state.api.groupId
          }
        }
        axios.get(state.api.dossierApi + '/' + state.thongTinChungHoSo.dossierId + '/submitting', param).then(function (response) {
          resolve(response.data)
        }).catch(function (xhr) {
          reject(xhr)
          console.log(xhr)
        })
      })
    },
    postDossierMark ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        commit('setLoading', true)
        let options = {
          headers: {
            'groupId': state.api.groupId,
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'cps_auth': data.cps_auth
          }
        }
        var dataPostdossierMark = new URLSearchParams()
        dataPostdossierMark.append('fileCheck', data.fileCheck)
        dataPostdossierMark.append('fileType', data.fileType)
        let url = state.api.dossierApi + '/' + state.thongTinChungHoSo.dossierId + '/marks/' + data.partNo
        axios.post(url, dataPostdossierMark, options).then(function (response) {
          resolve(response.data)
          commit('setLoading', false)
        }).catch(function (xhr) {
          reject(xhr)
          commit('setLoading', false)
        })
      })
    },
    postAction ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        commit('setLoading', true)
        let options = {
          headers: {
            'groupId': state.api.groupId,
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'cps_auth': data.cps_auth
          }
        }
        var dataPostActionDossier = new URLSearchParams()
        dataPostActionDossier.append('actionCode', data.actionCode)
        dataPostActionDossier.append('actionNote', '')
        let url = state.api.dossierApi + '/' + data.dossierId + '/actions'
        axios.post(url, dataPostActionDossier, options).then(function (response) {
          resolve(response.data)
          commit('setLoading', false)
        }).catch(function (xhr) {
          reject(xhr)
          commit('setLoading', false)
        })
      })
    },
    getUserInfoFromApplicantIdNo ({ commit, state }, data) {
      let param = {
        headers: {
          groupId: state.api.groupId
        }
      }
      axios.get(state.api.applicantApi + '/' + data, param).then(function (response) {
        // state.thongTinChuHoSo.applicantIdNo = response.data.applicantIdNo
        // state.thongTinChuHoSo.applicantName = response.data.applicantName
        // state.thongTinChuHoSo.address = response.data.address
        // state.thongTinChuHoSo.contactEmail = response.data.contactEmail
        // state.thongTinChuHoSo.contactTelNo = response.data.contactTelNo
        // state.thongTinChuHoSo.city = response.data.city
        // state.thongTinChuHoSo.district = response.data.district
        // state.thongTinChuHoSo.ward = response.data.ward
      }).catch(function (xhr) {
        console.log(xhr)
      })
    },
    loadAlpcaForm ({ commit, state }, data) {
      // let param = {
      //   headers: {
      //     groupId: state.api.groupId
      //   },
      //   responseType: 'text'
      // }
      console.log('alpaca')
      state.dossierFiles.forEach(item => {
        if (item.dossierPartNo === data.partNo) {
          // let urlFormScript = '/o/rest/v2/dossiers/' + state.thongTinChungHoSo.dossierId + '/files/' + item.referenceUid + '/formscript'
          // let urlFormDate = '/o/rest/v2/dossiers/' + state.thongTinChungHoSo.dossierId + '/files/' + item.referenceUid + '/formdata'
          // axios.all([axios.get(urlFormScript, param), axios.get(urlFormDate, param)])
          // .then(axios.spread(function (resFormScript, resFormData) {
          // })).catch(function (xhr) {
          //   console.log(xhr)
          // })
          /* eslint-disable */
          var formScript, formData
          if (item.formScript) {
            formScript = eval('(' + item.formScript + ')')
          } else {
            formScript = {}
          }
          if (item.formData) {
            formData = eval('(' + item.formData + ')')
          } else {
            formData = {}
          }
          /* eslint-disable */
          console.log(typeof (formScript))
          console.log(typeof (formData))
          formScript.data = formData
          $('#formAlpaca' + data.partNo).alpaca(formScript)
        }
      })
    },
    putAlpacaForm ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        let options = {
          headers: {
            groupId: state.api.groupId,
            cps_auth: data.cps_auth
          }
        }
        try {
          var control = $('#formAlpaca' + data.partNo).alpaca('get')
          var formData = control.getValue()
          console.log('Data Form ------', data)
          console.log('formData-------', formData)
          var dataPutAlpacaForm = new URLSearchParams()
          dataPutAlpacaForm.append('formdata', JSON.stringify(formData))
          state.dossierFiles.forEach(item => {
            if (item.dossierPartNo === data.partNo) {
              let url = state.api.dossierApi + '/' + state.thongTinChungHoSo.dossierId + '/files/' + item.referenceUid + '/formdata'
              axios.put(url, dataPutAlpacaForm, options).then(function (response) {
                resolve(response.data)
              }).catch(function (xhr) {
                reject(data)
              })
            }
          })
        } catch (e) {
          console.log(e)
          reject(data)
        }
      })
    },
    postVNPOST ({commit, state}, data) {
      return new Promise((resolve, reject) => {
        commit('setLoading', true)
        let options = {
          headers: {
            'groupId': state.api.groupId,
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        var dataVnPost = new URLSearchParams()
        dataVnPost.append('customerCode', 'ccth')
        dataVnPost.append('orderNumber', state.thongTinChungHoSo.dossierId)
        dataVnPost.append('senderProvince', data.senderProvince)
        dataVnPost.append('senderAddress', data.senderAddress)
        dataVnPost.append('senderName', data.senderName)
        dataVnPost.append('senderTel', data.senderTel)
        dataVnPost.append('receiverName', data.receiverName)
        dataVnPost.append('receiverAddress', data.receiverAddress)
        dataVnPost.append('receiverTel', data.receiverTel)
        dataVnPost.append('receiverProvince', data.receiverProvince)
        let url = '/o/rest/v2/postal/vnpost'
        axios.post(url, dataVnPost, options).then(function (response) {
          resolve(response.data)
          commit('setLoading', false)
        }).catch(function (xhr) {
          reject(xhr)
          commit('setLoading', false)
        })
      })
    },
    getDossierTemplateEdit ({commit, state}) {
      return new Promise((resolve, reject) => {
        var dossierTemplatesTemp = state.dossierTemplates
        var resultTemp = []
        try {
          state.dossierFiles.forEach(itemFile => {
            dossierTemplatesTemp.forEach(itemTemplate => {
              if (itemFile.dossierPartNo === itemTemplate.partNo) {
                resultTemp.push({
                  partName: itemTemplate.partName,
                  partNo: itemTemplate.partNo,
                  displayName: itemFile.displayName,
                  dossierFileId: itemFile.dossierFileId,
                  partType: itemTemplate.partType,
                  hasForm: itemTemplate.hasForm,
                  fileType: itemFile.fileType,
                  referenceUid: itemFile.referenceUid
                })
              }
            })
          })
          resolve(resultTemp)
          console.log(resultTemp)
        } catch (e) {
          console.log(e)
          reject([])
        }
      })
    },
    changeProcessStep ({commit, state}, item) {
      if (item.type === 1) {
        if (item.hasOwnProperty('createFiles') && !(item.createFiles instanceof Array)) {
          var createFileTemp = item.createFiles
          item.createFiles = []
          item.createFiles.push(createFileTemp)
        }
        if (item.autoEvent !== 'submit' && item.autoEvent !== 'timer') {
        }
      } else {
        var urlPluginFormData = '/o/rest/v2/dossiers/' + state.thongTinChungHoSo.dossierId + '/plugins/' + item.processActionId + '/formdata'
        var urlPluginFormScript = '/o/rest/v2/dossiers/' + state.thongTinChungHoSo.dossierId + '/plugins/' + item.processActionId + '/formscript'
      }
    },
    setDefaultCityCode ({commit, state}, data) {
      state.thongTinChuHoSo.cityCode = data
    },
    loadProcessStep ({commit, state}, data) {
      var url = '/o/rest/v2/dossiers/'+state.thongTinChungHoSo.dossierId+'/nextactions'
      var urlPlugin = '/o/rest/v2/dossiers/'+state.thongTinChungHoSo.dossierId+'/plugins'
      axios.all([axios.get(url, config), axios.get(urlPlugin, config)]).then(axios.spread(function (urlRespones, urlPluginsRespones) {
        var serializable = urlRespones.data.data
        var serializablePlugins = urlPluginsRespones.data.data
        var serializablePluginsConvert = []
        var serializableNextActionConvert = []
        if(serializable){
          for (var i = 0; i < serializable.length; i++) {
            serializable[i].type = 1;
            if(!serializable[i].autoEvent){
              if(serializable[i].configNote){
                var configNote = JSON.parse(serializable[i].configNote)
                serializable[i].configNote = configNote
              }
              serializableNextActionConvert.push(serializable[i])
            }
          }
        }else {
          serializable = []
          serializableNextActionConvert = []
        }
        if(serializablePlugins){
          for (var i = 0; i < serializablePlugins.length; i++) {
            var plugin = {
              type : 2,
              processActionId : serializablePlugins[i].processPluginId,
              actionName : serializablePlugins[i].pluginName
            };
            serializablePluginsConvert.push(plugin)
          }
        }
        var nextactions = serializableNextActionConvert
        var plugins = serializablePluginsConvert
        state.processSteps = $.merge(nextactions, plugins)
        console.log(state.processSteps)
        if(state.processSteps.length === 1){
          state.changeProcessStep(state.processSteps[0])
        }
      })).catch(function (error) {
        console.log(error)
      })
    },
    getListHistoryProcessingItems ({commit, state}, id){		
      var vm = this
      return new Promise((resolve, reject) => {
        let param = {
          headers: {
            groupId: state.api.groupId
          },
          params: {}
        }
        var listHistoryProcessing = []
        axios.get(state.api.dossierlogsApi + '/' + id + '/logs', param).then(function (response) {
          var serializable = response.data
          for (var key in serializable.data) {
            if (serializable.data[key].notificationType === 'PROCESS_TYPE') {
              listHistoryProcessing.push(serializable.data[key])
            }
          }
          resolve(listHistoryProcessing)
        })
        .catch(function (error) {
          reject(error)
        })
      })
    },
    downloadFile ({commit, state}, data){
      var vm = this;
      let param = {
        headers: {
          groupId: state.api.groupId
        },
        responseType: 'blob'
      }
      axios.get(state.api.dossierApi + '/' + data.dossierId + "/files/" + data.fileAttachId, param).then(function (response) {
        var url = window.URL.createObjectURL(response.data);
        window.open(url)
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    getCpsAuthen ({commit, state}) {
      var vm = this
      return new Promise((resolve, reject) => {
        let param = {
          headers: {
            groupId: state.api.groupId
          },
          params: {}
        }
        axios.get('/o/rest/v2/onegate/token', param).then(function (response) {
          resolve(response.data)
        })
        .catch(function (error) {
          reject(error)
        })
      })
    }
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    },
    setSubStatusNew (state, payload) {
      state.subStatusNew = payload
    },
    setVnpostCodeItems (state, payload) {
      state.vnpostCodeItems = payload
    },
    setLoadingTable (state, payload) {
      state.loadingTable = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    },
    setTrangThaiHoSoList (state, payload) {
      state.trangThaiHoSoList = payload
    },
    setIndex (state, payload) {
      state.index = payload
    },
    setDossierTemplateName (state, payload) {
      state.dossierTemplateName = payload
    },
    setIsDetail (state, payload) {
      state.isDetail = payload
    },
    setLePhi (state, payload) {
      state.lePhi.fee = payload.paymentFee
      state.lePhi.feeNote = payload.paymentFeeNote
    },
    setThanhPhanHoso (state, payload) {
      state.thanhPhanHoSo = payload
    },
    setThanhPhanHosoTemplates (state, payload) {
      state.thanhPhanHoSo.dossierTemplates = payload
    },
    setThongTinChuHoSo (state, payload) {
      let userTypeCondition = true
      if (payload.applicantIdType === 'business') {
        userTypeCondition = false
      }
      let thongTinChuHoSoPayLoad = {
        applicantIdNo: payload.applicantIdNo,
        applicantName: payload.applicantName,
        address: payload.address,
        // cityCode: payload.cityCode,
        cityCode: 25,
        districtCode: payload.districtCode,
        wardCode: payload.wardCode,
        contactEmail: payload.contactEmail,
        contactTelNo: payload.contactTelNo,
        userType: userTypeCondition
      }
      state.thongTinChuHoSo = thongTinChuHoSoPayLoad
    },
    setThongTinNguoiNopHoSo (state, payload) {
      state.thongTinNguoiNopHoSo = Object.assign(state.thongTinNguoiNopHoSo, payload)
    },
    setDichVuChuyenPhatKetQua (state, payload) {
      let tempData = {
        viaPostal: payload.viaPostal,
        postalServiceCode: payload.postalServiceCode,
        postalServiceName: payload.postalServiceName,
        postalAddress: payload.postalAddress,
        postalCityCode: payload.postalCityCode,
        postalCityName: payload.postalCityName,
        postalDistrictCode: payload.postalDistrictCode,
        postalDistrictName: payload.postalDistrictName,
        postalWardCode: payload.postalWardCode,
        postalWardName: payload.postalWardName,
        postalTelNo: payload.postalTelNo
      }
      state.dichVuChuyenPhatKetQua = tempData
    },
    setServiceConfigObj (state, payload) {
      state.serviceConfigObj = payload
    },
    setThongTinChungHoSo (state, payload) {
      var durationText
      if (payload.processUnit === 1 && payload.processBlock > 8) {
        let day = Math.floor(payload.processBlock/8) + ' ngày'
        let hours
        if (payload.processBlock%8 !== 0) {
          hours = ((payload.processBlock / 8) - Math.floor(payload.processBlock / 8)) * 8 + ' giờ'
        } else {
          hours = ''
        }
        durationText = `${day} ${hours}`
      } else if (payload.processUnit === 0) {
        durationText = payload.processBlock + ' ngày'
      } else if (payload.processUnit === 1 && payload.processBlock <= 8) {
        durationText = payload.processBlock + ' giờ'
      }
      let thongTinChungHoSoPayLoad = {
        dossierTemplateNo: payload.dossierTemplateNo,
        dossierTemplateName: payload.dossierTemplateName,
        serviceName: payload.serviceName,
        serviceConfig: payload.serviceConfig,
        serviceOption: payload.dossierTemplateNo,
        receiveDate: new Date(payload.receiveDate),
        dueDate: (new Date(payload.dueDate)).toString(),
        durationDate: durationText,
        dossierId: payload.dossierId,
        dossierIdCTN: payload.dossierIdCTN,
        dossierStatus: payload.dossierStatus,
        dossierNo: payload.dossierNo,
        govAgencyName: payload.govAgencyName,
        dossierStatusText: payload.dossierStatusText,
        submitDate: payload.submitDate
      }
      state.thongTinChungHoSo = thongTinChungHoSoPayLoad
    },
    setThongTinChungHoSoDueDate (state, payload) {
      state.thongTinChungHoSo.dueDate = payload
    },
    setThongTinChungHoSoDurationDate (state, payload) {
      state.thongTinChungHoSo.durationDate = payload
    },
    setThongTinChungHoSoReceiveDate (state, payload) {
      state.thongTinChungHoSo.receiveDate = payload
    },
    setserviceConfigItems (state, payload) {
      state.serviceConfigItems = payload
    },
    setServiceOptionItems (state, payload) {
      state.serviceOptionItems = payload
    },
    setServiceOptionThongTinChungHoSo (state, payload) {
      state.thongTinChungHoSo.serviceOption = payload
    },
    setCitys (state, payload) {
      state.citys = payload
    },
    setResultServices (state, payload) {
      state.resultServices = payload
    },
    setDossierTemplates (state, payload) {
      state.dossierTemplates = payload
    },
    setDossier (state, payload) {
      state.dossier = payload
    },
    setDanhSachHoSo (state, payload) {
      state.danhSachHoSo = payload
    },
    setCityVal (state, payload) {
      state.cityVal = payload
    },
    setDistrictVal (state, payload) {
      state.districtVal = payload
    },
    setWardVal (state, payload) {
      state.wardVal = payload
    },
    setDossierFiles (state, payload) {
      state.dossierFiles = payload
    },
    setSameUser (state, payload) {
      state.thongTinNguoiNopHoSo.sameUser = payload
    },
    setSameUser2 (state, payload) {
      state.sameUser2 = payload
    },
    setPrintPH (state, payload) {
      state.printPH = payload
    },
    setProcessStep (state, payload) {
      state.processSteps = payload
    },
    setlistHistoryProcessingItems (state, payload) {
      state.listHistoryProcessingItems = payload
    }
  },
  getters: {
    loading (state) {
      return state.loading
    },
    loadingTable (state) {
      return state.loadingTable
    },
    error (state) {
      return state.error
    },
    printPH (state) {
      return state.printPH
    },
    index (state) {
      return state.index
    },
    loadtrangThaiHoSoList (state) {
      return state.trangThaiHoSoList
    },
    lePhi (state) {
      return state.lePhi
    },
    isDetail (state) {
      return state.isDetail
    },
    dossierTemplateName (state) {
      return state.dossierTemplateName
    },
    thongTinChungHoSo (state, config) {
      return state.thongTinChungHoSo
    },
    thongTinChuHoSo (state) {
      return state.thongTinChuHoSo
    },
    thanhPhanHoSo (state) {
      return state.thanhPhanHoSo
    },
    thongTinNguoiNopHoSo (state) {
      return state.thongTinNguoiNopHoSo
    },
    dichVuChuyenPhatKetQua (state) {
      return state.dichVuChuyenPhatKetQua
    },
    serviceConfigItems (state) {
      if (state.serviceConfigItems == null) {
        store.dispatch('loadServiceConfigs')
      } else {
        return state.serviceConfigItems
      }
    },
    serviceOptionItems (state) {
      return state.serviceOptionItems
    },
    getDictItems (state) {
      return (filter) => {
        if (filter.collectionCode === 'ADMINISTRATIVE_REGION' && filter.level === 0) {
          if (state.citys == null) {
            return store.dispatch('loadDictItems', filter)
          } else {
            return new Promise((resolve, reject) => {
              resolve({
                total: state.citys.length,
                data: state.citys
              })
            })
          }
        } else {
          return store.dispatch('loadDictItems', filter)
        }
      }
    },
    resultServices (state) {
      return state.resultServices
    },
    dossierTemplates (state) {
      return state.dossierTemplates
    },
    dataDetailDossier (state) {
      return state.dossier
    },
    dossier (state) {
      return state.dossier
    },
    danhSachHoSo (state) {
      return (filter) => {
        let dataPromise = store.dispatch('loadDanhSachHoSo', filter)
        return dataPromise
      }
    },
    getCityVal (state) {
      return state.cityVal
    },
    getDistrictVal (state) {
      return state.districtVal
    },
    getWardVal (state) {
      return state.wardVal
    },
    dossierFiles (state) {
      return state.dossierFiles
    },
    sameUser2 (state) {
      return state.sameUser2
    },
    getVnpostCodeItems (state) {
      return state.vnpostCodeItems
    },
    api (state) {
      if (state.api.apiLocal) {
        store.dispatch('loadInitResource')
      } else {
        return state.api
      }
    },
    processSteps (state) {
      return processSteps
    },
    listHistoryProcessingItems (state) {
      return state.listHistoryProcessingItems
    },
    subStatusNew (state) {
      return state.subStatusNew
    }
  }
})

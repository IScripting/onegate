import Vue from 'vue'
import Vuex from 'vuex'
import toastr from 'toastr'
import axios from 'axios'
// import router from '@/router'

Vue.use(toastr)
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    api: {
      serviceInfoApi: 'http://hanoi.fds.vn:2281/api/serviceinfos',
      serviceConfigApi: 'http://hanoi.fds.vn:2281/api/serviceconfigs',
      regionApi: 'http://hanoi.fds.vn:2281/api/dictcollections/101/dictItems',
      serviceOptionApi: 'http://hanoi.fds.vn:2281/api/serviceconfigs/301/processes',
      dossierApi: 'http://hanoi.fds.vn:2281/api/dossier',
      govAgency: 'abc',
      groupId: 0
    },
    loadedVueProjects: [
    ],
    loadedVueProject: null,
    loading: false,
    error: null,
    user: null,
    trangThaiHoSoList: [
    ],
    index: 0,
    lePhi: {
      totalMoney: 0,
      ghiChuMoney: ''
    },
    dossier: {
    },
    dossierMarkItems: [],
    thongTinChungHoSo: {
      serviceInfo: '',
      serviceOption: '',
      dossierNo: '',
      startDateTime: '',
      endDateTime: '',
      timeStartMenu: true,
      timeStart: '',
      dateStart: '',
      dateStartMd: null,
      dateStartMenu: true,
      dueDate: '',
      valid: false
    },
    serviceInfoItems: [],
    serviceOptionItems: [],
    citys: [],
    districts: [],
    wards: [],
    delegateCitys: [],
    delegateDistricts: [],
    delegateWards: [],
    resultCitys: [],
    resultDistricts: [],
    resultWards: [],
    resultServices: [],
    thanhPhanHoso: {
      fileTypes: []
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
      'hasForm': true
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
      'hasForm': true
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
      'hasForm': false
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
      'hasForm': false
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
      'hasForm': false
    }],
    thongTinChuHoSo: {
      userType: true,
      city: '',
      district: '',
      ward: '',
      applicantNote: '',
      applicantIdNo: '',
      contactEmail: '',
      contactName: '',
      address: '',
      applicantName: ''
    },
    thongTinNguoiNopHoSo: {
      sameUser: true,
      applicantName: '',
      city: '',
      address: '',
      district: '',
      ward: '',
      contactEmail: '',
      contactTelNo: '',
      applicantIdNo: ''
    },
    dichVuChuyenPhatKetQua: {
      homeRegister: false,
      resultService: '',
      resultAddress: '',
      resultCity: '',
      resultDistrict: '',
      resultWard: '',
      resultTelNo: ''
    }
  },
  actions: {
    clearError ({commit}) {
      commit('clearError')
    },
    loadVueProjects ({commit}, keywords) {
      commit('setLoading', true)
    },
    loadVueProject ({commit}, key) {
      commit('setLoading', true)
    },
    loadtrangThaiHoSoList ({commit}) {
      commit('setLoading', true)

      let data = [
        {
          title: 'Thông báo cần xử lý',
          id: '1',
          action: 'folder',
          action_active: 'folder_open',
          active: true,
          link: '/'
        },
        {
          title: 'Hồ sơ chờ chuyển xử lý',
          id: '2',
          action: 'folder',
          action_active: 'folder_open',
          link: '/'
        },
        {
          title: 'Hồ sơ bổ sung',
          id: '3',
          action: 'folder',
          action_active: 'folder_open',
          link: '/'
        },
        {
          title: 'Hồ sơ đang xử lý',
          id: '4',
          action: 'folder',
          action_active: 'folder_open',
          link: '/'
        },
        {
          title: 'Hồ sơ chờ trả kết quả',
          id: '5',
          action: 'folder',
          action_active: 'folder_open',
          link: '/'
        },
        {
          title: 'Hồ sơ đã trả kết quả',
          id: '6',
          action: 'folder',
          action_active: 'folder_open',
          link: '/'
        },
        {
          title: 'Yêu cầu của chủ hồ sơ',
          id: '7',
          action: 'folder',
          action_active: 'folder_open',
          link: '/'
        }
      ]
      commit('setLoading', false)
      commit('setTrangThaiHoSoList', data)
    },
    clearVueProject ({commit}) {
      commit('setLoadedVueProject', null)
    },
    setCurrentIndex ({commit}, data) {
      commit('setIndex', data)
    },
    setLePhi ({commit}, data) {
      commit('setLePhi', data)
    },
    setThongTinChuHoSo ({commit}, data) {
      commit('setThongTinChuHoSo', data)
    },
    setThongTinNguoiNopHoSo ({commit}, data) {
      commit('setThongTinNguoiNopHoSo', data)
    },
    setDichVuChuyenPhatKetQua ({commit}, data) {
      commit('setDichVuChuyenPhatKetQua', data)
    },
    setThongTinChungHoSo ({commit}, data) {
    },
    loadServiceInfos ({commit, state}, data) {
      let param = {
        groupId: state.api.groupId
      }
      axios.get(state.api.serviceInfoApi, param).then(function (response) {
        commit('setServiceInfoItems', response.data.data)
      }).catch(function (xhr) {
      })
    },
    loadServiceOptions ({commit, state}, data) {
      let param = {
        headers: {
          groupId: state.api.groupId
        },
        params: {
          govAgency: state.api.govAgency,
          serviceInfo: data
        }
      }
      axios.get(state.api.serviceOptionApi, param).then(function (response) {
        let serviceConfig = response.data
        axios.get('http://hanoi.fds.vn:2281/api/serviceconfigs/' + serviceConfig.serverConfigId + '/processes', param).then(function (response) {
          commit('setServiceOptionItems', response.data.data)
        }).catch(function (xhr) {
        })
      }).catch(function (xhr) {
      })
    },
    loadCitys ({commit, state}, data) {
      commit('setLoading', true)
      let param = {
        headers: {
          groupId: state.api.groupId
        },
        params: {
          parent: 0
        }
      }
      axios.get(state.api.regionApi, param).then(function (response) {
        commit('setLoading', false)
        commit('setCitys', response.data.data)
      }).catch(function (xhr) {
        commit('setLoading', false)
      })
    },
    loadDistricts ({commit, state}, data) {
      let param = {
        headers: {
          groupId: state.api.groupId
        },
        params: {
          parent: data
        }
      }
      axios.get(state.api.regionApi, param).then(function (response) {
        commit('setDistricts', response.data.data)
      }).catch(function (xhr) {
      })
    },
    loadWards ({commit, state}, data) {
      let param = {
        headers: {
          groupId: state.api.groupId
        },
        params: {
          parent: data
        }
      }
      axios.get(state.api.regionApi, param).then(function (response) {
        commit('setWards', response.data.data)
      }).catch(function (xhr) {
      })
    },
    loadDelegateCitys ({commit, state}, data) {
      let param = {
        headers: {
          groupId: state.api.groupId
        },
        params: {
          parent: 0
        }
      }
      axios.get(state.api.regionApi, param).then(function (response) {
        commit('setLoading', false)
        commit('setDelegateCitys', response.data.data)
      }).catch(function (xhr) {
        commit('setLoading', false)
      })
    },
    loadDelegateDistricts ({commit, state}, data) {
      let param = {
        headers: {
          groupId: state.api.groupId
        },
        params: {
          parent: data
        }
      }
      axios.get(state.api.regionApi, param).then(function (response) {
        commit('setLoading', false)
        commit('setDelegateDistricts', response.data.data)
      }).catch(function (xhr) {
        commit('setLoading', false)
      })
    },
    loadDelegateWards ({commit, state}, data) {
      let param = {
        headers: {
          groupId: state.api.groupId
        },
        params: {
          parent: data
        }
      }
      axios.get(state.api.regionApi, param).then(function (response) {
        commit('setLoading', false)
        commit('setDelegateWards', response.data.data)
      }).catch(function (xhr) {
        commit('setLoading', false)
      })
    },
    loadResultCitys ({commit, state}, data) {
      let param = {
        headers: {
          groupId: state.api.groupId
        },
        params: {
          parent: 0
        }
      }
      axios.get(state.api.regionApi, param).then(function (response) {
        commit('setResultCitys', response.data.data)
      }).catch(function (xhr) {
      })
    },
    loadResultDistricts ({commit, state}, data) {
      let param = {
        headers: {
          groupId: state.api.groupId
        },
        params: {
          parent: data
        }
      }
      axios.get(state.api.regionApi, param).then(function (response) {
        commit('setResultDistricts', response.data.data)
      }).catch(function (xhr) {
      })
    },
    loadResultWards ({commit, state}, data) {
      let param = {
        headers: {
          groupId: state.api.groupId
        },
        params: {
          parent: data
        }
      }
      axios.get(state.api.regionApi, param).then(function (response) {
        commit('setResultWards', response.data.data)
      }).catch(function (xhr) {
      })
    },
    loadResultServices ({commit, state}, data) {
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
      }).catch(function (xhr) {
      })
    },
    resetThongTinNguoiNopHoSo ({commit}) {
      console.log('reset')
      let data = {
        sameUser: '',
        delegateApplicantName: '',
        delegateCity: '',
        delegateAddress: '',
        delegateDistrict: '',
        delegateWard: '',
        delegateContactEmail: '',
        delegateContactTelNo: '',
        delegateApplicantIdNo: ''
      }
      commit('setThongTinNguoiNopHoSo', data)
    },
    loadDossierTemplates ({commit, state}, data) {
      let param = {
        headers: {
          groupId: state.api.groupId
        }
      }
      axios.get('http://hanoi.fds.vn:2281/api/dossiertemplates/' + data, param).then(function (response) {
        commit('setDossierTemplates', response.data.dossierParts)
      }).catch(function (xhr) {
      })
    },
    loadDossierMarkItems ({commit, state}, data) {
      let param = {
        headers: {
          groupId: state.api.groupId
        }
      }
      axios.get('http://hanoi.fds.vn:2281/api/dossiers/' + data + '/marks', param).then(function (response) {
        commit('setDossierMarkItems', response.data.data)
      }).catch(function (xhr) {
      })
    },
    getMoreInfoThongTinChung ({commit, state}, data) {
      let param = {
        headers: {
          groupId: state.api.groupId
        }
      }
      axios.get('http://hanoi.fds.vn:2281/api/dossiers/' + data + '/marks', param).then(function (response) {
        state.thongTinChuHoSo.dossierNo = response.data.dossierNo
        state.thongTinChuHoSo.startDateTime = response.data.startDateTime
        state.thongTinChuHoSo.endDateTime = response.data.endDateTime
        state.thongTinChuHoSo.dueDate = response.data.dueDate
      }).catch(function (xhr) {
      })
    },
    postDossier ({commit, state}, data) {
      commit('setLoading', true)
      let option = {
        headers: {
          groupId: state.api.groupId
        }
      }
      let param = {
        serviceCode: data.serviceCode,
        govAgencyCode: data.govAgency,
        dossierTemplateNo: data.dossierTemplateNo
      }
      if (state.dossier) {
        axios.put(state.api.dossierApi + '/' + state.dossier.dossierId, param, option).then(function (response) {
          commit('setLoading', false)
          commit('setDossier', response.data)
        }).catch(function (xhr) {
          commit('setLoading', false)
        })
      } else {
        axios.post(state.api.dossierApi, param, option).then(function (response) {
          commit('setLoading', false)
          commit('setDossier', response.data)
        }).catch(function (xhr) {
          commit('setLoading', false)
        })
      }
    }
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    },
    setLoadedVueProjects (state, payload) {
      state.loadedVueProjects = payload
    },
    setLoadedVueProject (state, payload) {
      state.loadedVueProject = payload
    },
    setTrangThaiHoSoList (state, payload) {
      state.trangThaiHoSoList = payload
    },
    setIndex (state, payload) {
      state.index = payload
    },
    setLePhi (state, payload) {
      state.lePhi = payload
    },
    setThanhPhanHoso (state, payload) {
      state.thanhPhanHoso = payload
    },
    setThongTinChuHoSo (state, payload) {
      state.thongTinChuHoSo = payload
    },
    setThongTinNguoiNopHoSo (state, payload) {
      state.thongTinNguoiNopHoSo = payload
    },
    setDichVuChuyenPhatKetQua (state, payload) {
      state.dichVuChuyenPhatKetQua = payload
    },
    setThongTinChungHoSo (state, payload) {
      state.thongTinChungHoSo = payload
    },
    setServiceInfoItems (state, payload) {
      state.serviceInfoItems = payload
    },
    setServiceOptionItems (state, payload) {
      state.serviceOptionItems = payload
    },
    setCitys (state, payload) {
      state.citys = payload
    },
    setDistricts (state, payload) {
      state.districts = payload
    },
    setWards (state, payload) {
      state.wards = payload
    },
    setDelegateCitys (state, payload) {
      state.delegateCitys = payload
    },
    setDelegateDistricts (state, payload) {
      state.delegateDistricts = payload
    },
    setDelegateWards (state, payload) {
      state.delegateWards = payload
    },
    setResultCitys (state, payload) {
      state.resultCitys = payload
    },
    setResultDistricts (state, payload) {
      state.resultDistricts = payload
    },
    setResultWards (state, payload) {
      state.resultWards = payload
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
    setDossierMarkItems (state, payload) {
      state.dossierMarkItems = payload
    }
  },
  getters: {
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    },
    index (state) {
      return state.index
    },
    loadVueProjects (state) {
      if (state.loadedVueProjects.length === 0) {
        store.dispatch('loadVueProjects', '')
      } else {
        return state.loadedVueProjects
      }
    },
    loadVueProject (state) {
      return (vueProjectId) => {
        if (state.loadedVueProject == null) {
          store.dispatch('loadVueProject', vueProjectId)
        } else {
          return state.loadedVueProject
        }
      }
    },
    loadtrangThaiHoSoList (state) {
      return state.trangThaiHoSoList
    },
    lePhi (state) {
      return state.lePhi
    },
    thongTinChungHoSo (state, config) {
      return state.thongTinChungHoSo
    },
    thongTinChuHoSo (state) {
      return state.thongTinChuHoSo
    },
    thanhPhanHoSo (state) {
      return state.thanhPhanHoso
    },
    thongTinNguoiNopHoSo (state) {
      return state.thongTinNguoiNopHoSo
    },
    dichVuChuyenPhatKetQua (state) {
      return state.dichVuChuyenPhatKetQua
    },
    serviceInfoItems (state) {
      if (state.serviceInfoItems.length === 0) {
        store.dispatch('loadServiceInfos')
      } else {
        return state.serviceInfoItems
      }
    },
    serviceOptionItems (state) {
      return state.serviceOptionItems
    },
    citys (state) {
      if (state.citys.length === 0) {
        store.dispatch('loadCitys')
      } else {
        return state.citys
      }
    },
    districts (state) {
      return state.districts
    },
    wards (state) {
      return state.wards
    },
    delegateCitys (state) {
      if (state.delegateCitys.length === 0) {
        store.dispatch('loadDelegateCitys')
      } else {
        return state.delegateCitys
      }
    },
    delegateDistricts (state) {
      return state.delegateDistricts
    },
    delegateWards (state) {
      return state.delegateWards
    },
    resultCitys (state) {
      if (state.resultCitys.length === 0) {
        store.dispatch('loadResultCitys')
      } else {
        return state.resultCitys
      }
    },
    resultDistricts (state) {
      return state.resultDistricts
    },
    resultWards (state) {
      return state.resultWards
    },
    resultServices (state) {
      if (state.resultServices.length === 0) {
        store.dispatch('loadResultServices')
      } else {
        return state.resultServices
      }
    },
    dossierTemplates (state) {
      return state.dossierTemplates
    },
    dossier (state) {
      return state.dossier
    },
    dossierMarkItems (state) {
      return state.dossierMarkItems
    }
  }
})

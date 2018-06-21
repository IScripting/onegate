<template>
  <div style="position: relative;">
    <v-expansion-panel class="expansion-pl">
      <v-expansion-panel-content hide-actions value="1">
        <div slot="header"><div class="background-triangle-small"> VI. </div>DỊCH VỤ CHUYỂN PHÁT KẾT QUẢ</div>
        <v-card>
          <v-card-text>
            
            <v-slide-y-transition>
              <span v-if="!dichVuChuyenPhatKetQua.viaPostal">
                <v-icon size="16">check_circle</v-icon> <strong>Đăng ký kết quả tại nhà</strong> để điền thông tin chuyển phát tận nhà
              </span>
              <v-layout v-else wrap>
                <v-flex xs12 sm2>
                  <content-placeholders class="mt-1" v-if="loading">
                    <content-placeholders-text :lines="1" />
                  </content-placeholders>
                  <v-subheader v-else class="pl-0">Dịch vụ đăng ký: </v-subheader>
                </v-flex>
                <v-flex xs12 sm10>
                  <content-placeholders class="mt-1" v-if="loading">
                    <content-placeholders-text :lines="1" />
                  </content-placeholders>
                  <v-select
                    v-else
                    :items="postalServiceItems"
                    item-text="itemName"
                    item-value="itemCode"
                    v-model="dichVuChuyenPhatKetQua.postalServiceCode"
                    autocomplete
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm2>
                  <content-placeholders class="mt-1" v-if="loading">
                    <content-placeholders-text :lines="1" />
                  </content-placeholders>
                  <v-subheader v-else class="pl-0">SĐT người nhận: </v-subheader>
                </v-flex>
                <v-flex xs12 sm4>
                  <content-placeholders class="mt-1" v-if="loading">
                    <content-placeholders-text :lines="1" />
                  </content-placeholders>
                  <v-text-field
                    v-else
                    v-model="dichVuChuyenPhatKetQua.postalTelNo"
                    append-icon="phone"
                    :required='dichVuChuyenPhatKetQua.viaPostal'
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm2>
                  <content-placeholders class="mt-1" v-if="loading">
                    <content-placeholders-text :lines="1" />
                  </content-placeholders>
                  <v-subheader v-else class="pl-0">Mã bưu cục: </v-subheader>
                </v-flex>
                <v-flex xs12 sm4>
                  <content-placeholders class="mt-1" v-if="loading">
                    <content-placeholders-text :lines="1" />
                  </content-placeholders>
                  <v-select
                    v-else
                    :items="vnPostItems"
                    item-text="itemName"
                    item-value="itemCode"
                    v-model="dichVuChuyenPhatKetQua.vnPostCode"
                    :required='dichVuChuyenPhatKetQua.viaPostal'
                    autocomplete
                  ></v-select>
                </v-flex>
                <v-flex xs12>

                </v-flex>
                <v-flex xs12 sm2>
                  <content-placeholders class="mt-1" v-if="loading">
                    <content-placeholders-text :lines="1" />
                  </content-placeholders>
                  <v-subheader v-else class="pl-0">Địa chỉ trả kết quả: </v-subheader>
                </v-flex>
                <v-flex xs12 sm10>
                  <content-placeholders class="mt-1" v-if="loading">
                    <content-placeholders-text :lines="1" />
                  </content-placeholders>
                  <v-text-field
                    v-else
                    v-model="dichVuChuyenPhatKetQua.postalAddress"
                    multi-line
                    rows="2"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm2>
                  <content-placeholders class="mt-1" v-if="loading">
                    <content-placeholders-text :lines="1" />
                  </content-placeholders>
                  <v-subheader v-else class="pl-0">Tỉnh/Thành phố: </v-subheader>
                </v-flex>
                <v-flex xs12 sm2>
                  <content-placeholders class="mt-1" v-if="loading">
                    <content-placeholders-text :lines="1" />
                  </content-placeholders>
                  <v-select
                    v-else
                    :items="citys"
                    item-text="itemName"
                    item-value="itemCode"
                    @change="onChangeResultCity"
                    v-model="dichVuChuyenPhatKetQua.postalCityCode"
                    autocomplete
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm2>
                  <content-placeholders class="mt-1" v-if="loading">
                    <content-placeholders-text :lines="1" />
                  </content-placeholders>
                  <v-subheader v-else class="pl-0">Quận/Huyện: </v-subheader>
                </v-flex>
                <v-flex xs12 sm2>
                  <content-placeholders class="mt-1" v-if="loading">
                    <content-placeholders-text :lines="1" />
                  </content-placeholders>
                  <v-select
                    v-else
                    :items="resultDistricts"
                    item-text="itemName"
                    item-value="itemCode"
                    @change="onChangeResultDistrict"
                    v-model="dichVuChuyenPhatKetQua.postalDistrictCode"
                    autocomplete
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm2>
                  <content-placeholders class="mt-1" v-if="loading">
                    <content-placeholders-text :lines="1" />
                  </content-placeholders>
                  <v-subheader v-else class="pl-0">Xã/Phường: </v-subheader>
                </v-flex>
                <v-flex xs12 sm2>
                  <content-placeholders class="mt-1" v-if="loading">
                    <content-placeholders-text :lines="1" />
                  </content-placeholders>
                  <v-select
                    v-else
                    :items="resultWards"
                    item-text="itemName"
                    item-value="itemCode"
                    v-model="dichVuChuyenPhatKetQua.postalWardCode"
                    autocomplete
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-slide-y-transition>
            
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <div class="absolute__btn" style="width: 198px; margin-top: 4px;">
      <content-placeholders class="mt-1" v-if="loading">
        <content-placeholders-text :lines="1" />
      </content-placeholders>
      <v-checkbox
        v-else
        label="Đăng ký kết quả tại nhà"
        v-model="dichVuChuyenPhatKetQua.viaPostal"
      ></v-checkbox>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    citys: [],
    resultDistricts: [],
    resultWards: [],
    vnPostItems: [],
    postalServiceItems: [
      {
        itemName: 'VNPOST',
        itemCode: 'VNPOST'
      }
    ]
  }),
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    dichVuChuyenPhatKetQua () {
      return this.$store.getters.dichVuChuyenPhatKetQua
    }
  },
  created () {
    var vm = this
    vm.$nextTick(function () {
      // vm.dichVuChuyenPhatKetQua = vm.$store.getters.dichVuChuyenPhatKetQua
      // vm.dichVuChuyenPhatKetQua.postalCityCode = vm.$store.getters.getCityVal
      // vm.dichVuChuyenPhatKetQua.postalDistrictCode = vm.$store.getters.getDistrictVal
      // vm.dichVuChuyenPhatKetQua.postalWardCode = vm.$store.getters.getWardVal
      console.log('dichVuChuyenPhatKetQua---------------', vm.dichVuChuyenPhatKetQua)
      var filter = {
        collectionCode: 'ADMINISTRATIVE_REGION',
        level: 0,
        parent: 0
      }
      vm.$store.getters.getDictItems(filter).then(function (result) {
        vm.citys = result.data
      })
      if (vm.dichVuChuyenPhatKetQua.postalCityCode) {
        filter.parent = vm.dichVuChuyenPhatKetQua.postalCityCode
        filter.level = 1
        vm.$store.getters.getDictItems(filter).then(function (result) {
          vm.resultDistricts = result.data
        })
      }
      if (vm.dichVuChuyenPhatKetQua.postalDistrictCode) {
        filter.parent = vm.dichVuChuyenPhatKetQua.postalDistrictCode
        filter.level = 1
        vm.$store.getters.getDictItems(filter).then(function (result) {
          vm.resultWards = result.data
        })
      }
      filter = {
        collectionCode: 'VNPOST_CODE',
        level: 0,
        parent: 0
      }
      vm.$store.getters.getDictItems(filter).then(function (result) {
        vm.vnPostItems = result.data
      })
    })
  },
  methods: {
    onChangeResultCity (data) {
      var vm = this
      let filter = {
        collectionCode: 'ADMINISTRATIVE_REGION',
        level: 1,
        parent: data
      }
      vm.$store.getters.getDictItems(filter).then(function (result) {
        vm.resultDistricts = result.data
      })
    },
    onChangeResultDistrict (data) {
      var vm = this
      let filter = {
        collectionCode: 'ADMINISTRATIVE_REGION',
        level: 2,
        parent: data
      }
      vm.$store.getters.getDictItems(filter).then(function (result) {
        vm.resultWards = result.data
      })
    }
  }
}
</script>

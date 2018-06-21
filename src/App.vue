<template>
  <v-app>
    <v-navigation-drawer app clipped floating width="240">
      <content-placeholders class="mt-3" v-if="loading">
        <content-placeholders-text :lines="1" />
      </content-placeholders>
      <v-btn v-else color="primary btn__add__menu" :to="'/danh-sach-ho-so/' + currentIndex + '/tiep-nhan-ho-so'">
        <v-icon>add_circle</v-icon>
        Thêm hồ sơ tiếp nhận
      </v-btn>
      <content-placeholders class="mt-3" v-if="loading">
        <content-placeholders-text :lines="7" />
        </content-placeholders>
      <v-list v-else class="py-0 nav_trang_thai_ho_so">
        <v-list-tile v-for="(item, index) in trangThaiHoSoList" :key="item.id" :to="changeList(item, index)">
          <v-list-tile-action>
            <v-icon v-if="index == currentIndex">{{item.action_active}}</v-icon>
            <v-icon v-else>{{item.action}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    
    <v-content>
      <router-view></router-view>
    </v-content>
    <confirm ref="confirm"></confirm>
  </v-app>
</template>

<script>
  // import router from '@/router'
  import Confirm from './components/Confirm.vue'
  export default {
    components: {
      'confirm': Confirm
    },
    mounted () {
      this.$root.$confirm = this.$refs.confirm
    },
    data: () => ({}),
    computed: {
      loading () {
        return this.$store.getters.loading
      },
      currentIndex () {
        return this.$store.getters.index
      },
      trangThaiHoSoList () {
        return this.$store.getters.loadtrangThaiHoSoList
      }
    },
    methods: {
      changeList (item, index) {
        if (item.id === 'all') {
          console.log('all')
          let url = '/tra-cuu-ho-so/' + index
          return url
        } else {
          let url = '/danh-sach-ho-so/' + index
          return url
        }
      }
    },
    created () {
      var vm = this
      vm.$nextTick(function () {
        vm.$store.dispatch('loadtrangThaiHoSoList')
      })
    }
  }
</script>

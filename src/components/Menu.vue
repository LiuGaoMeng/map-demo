<template>
  <div>
    <!-- <div class="icon-img">
      <img :src="logoSrc" />
    </div> -->
    <Menu ref="menu" :active-name="$route.name" theme="dark" width="auto" :open-names="openNames">
        <Submenu :name="RouterItem.name" v-for="RouterItem in routers" :key='RouterItem.name'>
            <template slot="title">
                <!-- <Icon type="ios-navigate"></Icon> -->
                {{RouterItem.name}}
            </template>
            <MenuItem :name="item.name" :to="RouterItem.path+'/'+item.path" v-for="item in RouterItem.children" :key='item.name'>{{item.name}}</MenuItem>
        </Submenu>
    </Menu>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { getOpenArrByName } from '@/lib/util'
  export default {
    name:'slidermenu',
    data() {
      return {
        logoSrc: require('@/assets/img/logo.png')
      }
    },
    computed:{
      ...mapState({
      routers: state => state.router.routers.filter(item => {
        return item.path !== '*' && item.name !== 'login'
      })
    }),
    openNames () {
      return getOpenArrByName(this.$route.name, this.routers)
    }
    },
    watch: {
    openNames () {
      this.$nextTick(() => {
        this.$refs.menu.updateOpened()
      })
    }
  },
  }
</script>

<style scoped lang='less'>
  .icon-img{
    text-align: center;
    img{
      margin-top: 20px;
    }
  }
</style>

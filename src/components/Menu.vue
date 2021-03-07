<template>
  <div>
    <!-- <div class="icon-img">
      <img :src="logoSrc" />
    </div> -->
    <Menu ref="menu" :active-name="$route.name" theme="dark" width="auto" :open-names="openNames">
      <template v-for="RouterItem in routers">
        <template v-if="RouterItem.children!=undefined && RouterItem.children.length>0">
          <Submenu  :name="RouterItem.name"  :key='RouterItem.name'>
            <template slot="title">
                <span>{{RouterItem.name}}</span>
            </template>
            <MenuItem :name="item.name" :to="RouterItem.path+item.path" v-for="item in RouterItem.children" :key='item.name'><span>{{item.meta.title}}</span></MenuItem>
            
        </Submenu>
        </template>
        <template v-else>
           <MenuItem :name="RouterItem.name"  :to="'/'+RouterItem.path" :key='RouterItem.name'><span>{{RouterItem.meta.title}}</span></MenuItem>
        </template>
      </template>
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

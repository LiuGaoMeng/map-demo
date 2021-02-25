<template>
  <div>
    <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
      <Row>
        <Col span="12"><Avatar icon="ios-person" /> <span class="user-name">管理员</span></Col>
        <Col span="12" class="header-right"><Icon type="md-log-out" /> <span @click="handleLogout">退出</span></Col>
      </Row>
    </Header>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    name:'headmenu',
    methods: {
      ...mapActions(['logout']),
      handleLogout() {
        this.logout()
        this.$router.push('/login')
      },
    },
  }
</script>

<style scoped lang='less'>
.user-name{
  font-size: 16px;
  padding-left: 10px;
  font-weight: 500;
}
  .header-right{
    text-align: right;
    i{
      font-size: 20px;
      color:#2d8cf0;
      vertical-align: -3px;
    }
    span{
      font-size: 16px;
      padding-left: 10px;
      cursor: pointer;
    }
  }
</style>

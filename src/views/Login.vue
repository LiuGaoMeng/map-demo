
<template>
  <div class="Login">
      <div class="main">
        <!-- <div class="main-title">xx管理后台</div> -->
        <div class="main-inputWrap">
          <Row class-name='inputMargin'>
            <Col span="24">
              <Input prefix="md-phone-portrait" v-model="phone" placeholder="请输入手机号"/>
            </Col>
          </Row>
          <Row type="flex" align="middle" class-name='inputMargin'>
            <Col span="16">
              <Input prefix="md-mail" v-model="phoneCode" placeholder="请输入验证码"/>
            </Col>
            <Col span="6" offset='2'>
              <Button type="primary" shape="circle" size='small' @click="handleCode">获取验证码</Button>
            </Col>
          </Row>
        </div>
        <div class="main-submit">
          <Button type="primary" shape="circle" long @click="handleSubmit">登录</Button>
        </div>
      </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    data() {
      return {
          phone:'',
          phoneCode:''
      }
    },
    methods: {
      ...mapActions(['login','getPhoneCode']),
      handleSubmit () {
        if(!this.phone || !this.phoneCode) return false;
        this.login( {phone:this.phone,phoneCode:this.phoneCode} ).then(()=>{
          this.$router.push('/home/table')
        }).catch(error => {
          console.log(error)
        })
      },
      handleCode () {
        if(!this.phone) return false;
        this.getPhoneCode( { phone:this.phone } ).then((res)=>{
          // do something 倒计时60s
          console.log(res)
        }).catch(error => {
          console.log(error)
        })
      },
    },
  }
</script>

<style scoped lang='less'>

.Login{
  height: 100%;
  position: relative;

  .main{
    position: absolute;
    width: 428px;
    left: 50%;
    top: 50%;
    box-shadow:0px 3px 7px 0px rgba(0, 0, 0, 0.35);
    transform: translate(-50%,-50%);
    border-radius: 8px;
    &-title{
      height: 117px;
      line-height: 117px;
      text-align: center;
      font-size: 30px;
      color:#fff;
      background-color: #0371d1;
      border-radius: 8px 8px 0 0;
    }
    &-inputWrap{
      margin: 0 60px;
      /deep/ .ivu-input{
        border: 1px solid #fff;
        border-bottom-color: #0371d1;
      }
      /deep/.ivu-input:focus{
        box-shadow: none;
      }
      .inputMargin{
        margin-top: 40px;
      }
    }
    &-submit{
      margin: 60px;
    }
  }
}

</style>

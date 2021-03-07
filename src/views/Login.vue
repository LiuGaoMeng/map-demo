
<template>
  <div class="Login">
      <div class="main">
        <!-- <div class="main-title">xx管理后台</div> -->
        <div class="main-inputWrap">
          <Row class-name='inputMargin'>
            <Form>
               <Col span="24">
                    <FormItem label="用户名" :label-width="100">
                        <Input v-model="username" placeholder="用户名"/>
                    </FormItem>
                </Col>
                <Col span="24">
                    <FormItem label="密码"  :label-width="100">
                        <Input v-model="password" placeholder="密码"/>
                    </FormItem>
                </Col>
            </Form>
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
          username:'admin',
          password:'123'
      }
    },
    methods: {
      ...mapActions(['login','getPhoneCode']),
      handleSubmit () {
        if(this.username!="admin" || this.password!='123') return false;
        this.login( {username:this.username,password:this.password} ).then(()=>{
          this.$router.push('/map')
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

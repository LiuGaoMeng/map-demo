
<template>
    <div class="layout">
        <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
          <SideMenu />
        </Sider>
        <Layout :style="{marginLeft: '200px'}">
            <HeadMeau />
            <Content>
                <Card>
                    <div class="card-height">
                      <router-view/>
                    </div>
                </Card>
            </Content>
            <!-- <Footer class="layout-footer-center">浦京V沃 &copy; IT部出品</Footer> -->
        </Layout>
    </div>
</template>
<script>
     import HeadMeau from '@/components/Head'
    import SideMenu from '@/components/Menu'
    export default {
      components:{
        HeadMeau,
        SideMenu
      }
    }
</script>

<style scoped lang="less">
    .layout{
        // border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-footer-center{
    text-align: center;
    padding-bottom: 0px;
  }
  .card-height{
    height: ~"calc(100vh - 68px)"
    //  height:100%
  }
 
</style>

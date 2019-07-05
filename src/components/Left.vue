<template lang="html">
  <div>
    <div class="left-logo">
      <router-link :to="{ name: 'home'}">
        <img src="../images/logo1.png" width="50" alt="">
        <img src="../images/logo2.png" width="180" alt="">
      </router-link>
    </div>
    <Menu ref="pageLeft" theme="dark" width="340" accordion :active-name="activeName" :open-names="openNames" @on-open-change="change">
        <Submenu v-for="item in leftList" :key="item.activeName" :name="item.activeName" >
          <template slot="title">
              <Icon :custom="item.icon" />{{item.name}}
          </template>
          <MenuItem v-show="item.hasChild" v-for="itemchild in item.children" :key="itemchild.activeName" :name="itemchild.activeName" :to="itemchild.path">{{itemchild.name}}</MenuItem>
        </Submenu>
    </Menu>
  </div>
</template>

<script>
export default {
  name: 'left',
  data() {
    return {
      activeName: '',
      openNames: [],
      leftList: [{
          name: '用户管理',
          icon: 'icon-left-user',
          path: '/page/user',
          activeName: 'left-user'
        }, {
          name: '智能知识库',
          icon: 'icon-left-info',
          path: '/page/info',
          activeName: 'left-info',
          hasChild: true,
          children: [{
              name: '药品知识库',
              path: '/page/info-drug',
              activeName: 'left-info-drug'
            },
            {
              name: '医疗服务库',
              path: '/page/info-service',
              activeName: 'left-info-service'
            },
            {
              name: '疾病分类库',
              path: '/page/info-disease',
              activeName: 'left-info-disease'
            },
            {
              name: '药品字典库',
              path: '/page/info-dictionary',
              activeName: 'left-info-dictionary'
            },
            {
              name: '诊疗字典库',
              path: '/page/info-diagnosis',
              activeName: 'left-info-diagnosis'
            },
            {
              name: '服务设施库',
              path: '/page/info-facility',
              activeName: 'left-info-facility'
            }
          ]
        }, {
          name: '智能审核',
          icon: 'icon-left-audit',
          path: '/page/rule',
          activeName: 'left-rule',
          hasChild: true,
          children: [{
            name: '药品规则',
            path: '/page/rule-drug',
            activeName: 'left-rule-drug'
          }, {
            name: '诊疗规则',
            path: '/page/rule-diagnosis',
            activeName: 'left-rule-diagnosis'
          }, {
            name: '综合规则',
            path: '/page/rule-comp',
            activeName: 'left-rule-comp'
          }, {
            name: '审核配置',
            path: '/page/rule-audit',
            activeName: 'left-rule-audit'
          }]
        },
        {
          name: '系统设置',
          icon: 'icon-left-setting',
          path: '/page/setting',
          activeName: 'left-setting',
          hasChild: true,
          children: [{
            name: '角色管理',
            path: '/page/setting-role',
            activeName: 'left-setting-role'
          }, {
            name: '科室管理',
            path: '/page/setting-room',
            activeName: 'left-setting-room'
          }, {
            name: '医院基本信息管理',
            path: '/page/setting-basic',
            activeName: 'left-setting-basic'
          }]
        }
      ]
    }
  },
  methods: {
    change(va) {
      if (va[0] == 'left-user') {
        this.$router.push('/page/user')
        this.activeName = 'left-user'
        this.openNames = ['left-user']
        this.$refs.pageLeft.currentActiveName = 'left-user'
      }
    },
    updateState() {
      const name = this.$route.path.split('/')[2]
      this.openNames = ['left-' + name.split('-')[0]]
      this.activeName = 'left-' + name
      this.$nextTick(() => {
        this.$refs.pageLeft.updateOpened()
        this.$refs.pageLeft.updateActiveName()
      })
    }
  },
  created() {
    this.updateState()
  }
}
</script>

<style lang="less" scoped>
.left-logo {
    text-align: center;
    padding: 30px 0;
    img {
        margin: 0 5px;
    }
}
</style>

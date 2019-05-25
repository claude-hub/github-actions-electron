<template>
  <div class="left" :class="{'is-active':isCollapse}">
    <div class="sidebar-container">
      <logo :is-collapse="isCollapse" />
      <el-menu
        unique-opened
        mode="vertical"
        :default-active="defaultActive"
        class="el-menu-vertical"
        :collapse="isCollapse"
        background-color="#00142a"
        text-color="hsla(0,0%,100%,.65)"
        active-text-color="#409eff"
      >
        <sidebar-item :user-menu="$t('userMenus')" :is-collapse="isCollapse" />
      </el-menu>
    </div>
  </div>
</template>

<script>
import Logo from './logo'
import { mapGetters } from 'vuex'
import SidebarItem from './sidebarItem'
import { setUrlPath } from '../../../../utils/utiltools'

export default {
  name: 'Index',
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters(['isCollapse']),
    defaultActive: function() {
      return setUrlPath(this.$route)
    }
  }
}
</script>

<style scoped>
  .el-menu-vertical:not(.el-menu--collapse) {
    width: 230px;
  }
  .el-menu-vertical {
    border: 0;
  }
</style>

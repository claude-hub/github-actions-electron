<template>
  <div class="menu-wrapper">
    <template v-for="(item,index) in userMenu">
      <!--没有子菜单的项-->
      <el-menu-item
        v-if="item.children===undefined || item.children.length===0"
        :key="index"
        :index="filterPath(item.path,index)"
        @click="open(item)"
      >
        <i class="iconfont" :class="item.icon" />
        <span slot="title">{{ item.name }}</span>
      </el-menu-item>
      <!--有子菜单的项-->
      <el-submenu v-else :key="item.name" :index="filterPath(item.name,index)">
        <template slot="title">
          <i class="iconfont" :class="item.icon" />
          <span slot="title" :class="{'el-menu--display':isCollapse}">{{ item.name }}</span>
        </template>
        <template v-for="(child,cIndex) in item.children">
          <el-menu-item
            v-if="child.children===undefined || child.children.length===0"
            :key="cIndex"
            :index="filterPath(child.path,cIndex)"
            @click="open(child)"
          >
            <i class="iconfont" :class="child.icon" />
            <span slot="title">{{ child.name }}</span>
          </el-menu-item>
          <sidebar-item v-else :key="cIndex" :menu="[child]" :is-collapse="isCollapse" />
        </template>
      </el-submenu>
    </template>
  </div>
</template>
<script>
import { resolveUrlPath } from '../../../../utils/utiltools'
export default {
  name: 'SidebarItem',
  props: {
    isCollapse: {
      type: Boolean
    },
    /* eslint-disable */
    userMenu: {
      type: Array
    }
  },
  data() {
    return {}
  },
  methods: {
    filterPath(path, index) {
      return path == null ? index + '' : path
    },
    open(item) {
      this.$router.push({
        path: resolveUrlPath(item.path, item.name)
      })
      this.$store.dispatch('SetPageState', { name: item.name, path: item.path })
    }
  }
}
</script>
<style lang="scss" scoped>
  .iconfont {
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 16px;
    vertical-align: middle;
  }
</style>

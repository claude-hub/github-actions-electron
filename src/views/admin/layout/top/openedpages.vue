<template>
  <div class="pages-container">
    <div class="tags-nav">
      <div class="page-item"
           :class="{'is-active':nowTagValue === item.path}"
           v-for="(item,index) in openedPages" :key="index"
           @click="openCurrentPage(item)"
      >
        <i class="iconfont icon-circle"></i>
        <span>{{item.name}}</span>
        <i class="el-icon-close"
           @click.stop="closePage(item)"
           v-if="openedPages.length > 1"></i>
      </div>
    </div>
    <el-dropdown
      class="tags-close"
      size="small"
      placement="bottom">
      <el-button type="primary" size="mini" plain>{{$t('close.others')}}</el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <div @click="closeOthers">{{$t('close.closeOthers')}}</div>
        </el-dropdown-item>
        <el-dropdown-item>
          <div @click="closeAll">{{$t('close.closeAll')}}</div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import { setUrlPath, resolveUrlPath } from '../../../utils/utiltools'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['openedPages', 'currentPage']),
    nowTagValue: function () {
      return setUrlPath(this.$route)
    }
  },
  methods: {
    openCurrentPage (item) {
      this.$router.push({
        path: resolveUrlPath(item.path, item.name)
      })
      this.$store.dispatch('SetPageState', { name: item.name, path: item.path })
    },
    closePage (item) {
      this.$store.dispatch('ShowPrePage', { name: item.name, path: item.path })
      this.$router.push({
        path: resolveUrlPath(this.currentPage.path, this.currentPage.name)
      })
    },
    closeOthers () {
      this.$store.dispatch('CloseOthersPage', { name: this.currentPage.name, path: this.currentPage.path })
      this.$router.push({
        path: resolveUrlPath(this.currentPage.path, this.currentPage.name)
      })
    },
    closeAll () {
      this.$store.dispatch('CloseOthersPage', { name: this.$t('defaultHomePage.name'), path: this.$t('defaultHomePage.path') })
      this.$router.push({
        path: resolveUrlPath(this.$t('defaultHomePage.path'), this.$t('defaultHomePage.name'))
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  $mainBg: #409eff;
  $defaultBg: #eee;
  .pages-container {
    line-height: 42px;
    height: 42px;
    font-size: 12px;
    position: relative;
    border-bottom: 1px solid #eee;
    .tags-nav {
      position: absolute;
      right: 90px;
      left: 0;
      padding-left: 15px;
      padding-right: 10px;
      white-space: nowrap;
      transition: left .3s ease;
      overflow:auto;
    }

    .tags-close {
      position: absolute;
      top: 0;
      right: 0;
      width: 90px;
      text-align: center;
      box-shadow: -3px 0 15px 3px rgba(0,0,0,.1);
      background: #f1f4f5;
    }

    .page-item {
      line-height: 30px;
      display: inline-block;
      border: 1px solid $defaultBg;
      border-radius: 3px;
      cursor: pointer;
      padding: 0 14px;
      margin-right: 6px;
      span {
        margin: 0 8px;
      }
      .icon-circle {
        font-size: 12px;
        color: $defaultBg;
      }
    }
    .is-active{
      border: 1px solid $mainBg !important;
      .icon-circle {
        color: $mainBg;
      }
    }
  }
</style>

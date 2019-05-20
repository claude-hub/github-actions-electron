<template>
  <div>
    <div class="nav">
      <div class="left-menu">
        <div class="tags-breadcrumb" :class="[{ 'tag-collapse_right': isCollapse }]">
          <i class="iconfont icon-menu" @click="showCollapse"></i>
        </div>
        <div :class="{'is-active' : currentPage.path === $t('defaultHomePage.path')}" class="menu-item" @click="openPage">
          {{$t('navbar.dashboard')}}
        </div>
      </div>
      <div class="top-operate">
        <el-dropdown class="item-operate"
                     size="small"
                     placement="bottom">
          <i class="iconfont icon-yuyan"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :disabled="language==='zh-CN'">
              <div @click="changeLanguage('zh-CN')">{{$t('navbar.chinese')}}</div>
            </el-dropdown-item>
            <el-dropdown-item :disabled="language==='en'">
              <div  @click="changeLanguage('en')">English</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-tooltip class="item-operate"
                    effect="dark"
                    :content="isFullScreen?$t('navbar.exitFullScreen'):$t('navbar.screenFull')"
                    placement="bottom">
            <span class="top-item">
            <i class="iconfont" :class="isFullScreen?'icon-tuichuquanping':'icon-quanping'" @click="handleScreen"></i>
          </span>
        </el-tooltip>
        <el-dropdown class="item-operate" size="small">
              <span class="el-dropdown-link">
                {{userName}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <router-link to="/">{{$t('navbar.editMsg')}}</router-link>
            </el-dropdown-item>
            <el-dropdown-item @click.native="logout" divided>{{$t('navbar.exit')}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <opened-pages></opened-pages>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { fullscreenToggel, listenfullscreen } from '../../../../utils/utiltools'
import openedPages from './openedpages'

export default {
  computed: {
    ...mapState({
      userName: state => state.user.userName
    }),
    ...mapGetters(['isFullScreen', 'isCollapse', 'currentPage', 'language'])
  },
  mounted () {
    listenfullscreen(this.setScreen)
  },
  methods: {
    changeLanguage (lang) {
      this.$i18n.locale = lang
      this.$store.dispatch('SetLanguage', lang)
    },
    showCollapse () {
      this.$store.dispatch('SetCollapseState')
    },
    handleScreen () {
      fullscreenToggel()
    },
    setScreen () {
      this.$store.dispatch('SetFullScreen')
    },
    openPage () {
      this.$router.push(this.$t('defaultHomePage.path'))
      this.$store.dispatch('SetPageState', this.$t('defaultHomePage'))
    },
    logout () {
      this.$confirm(this.$t('navbar.isExit'), this.$t('navbar.tips'), {
        confirmButtonText: this.$t('navbar.confirm'),
        cancelButtonText: this.$t('navbar.cancel'),
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          this.$router.push({ path: '/login' })
        })
      }, () => {
      })
    }
  },
  components: {
    openedPages
  }
}
</script>

<style lang="scss" scoped>
  .nav {
    height: 64px;
    line-height: 64px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    .left-menu {
      display: flex;
      justify-content: flex-start;
      .tags-breadcrumb {
        cursor: pointer;
        .icon-menu {
          padding: 0 16px;
          font-size: 32px;
          color: #595959;
        }
      }
      //转动90°
      .tag-collapse_right {
        transform: rotate(90deg);
      }
      .menu-item {
        padding: 0 20px;
        font-size: 14px;
        cursor: pointer;
      }
      .menu-item:hover{
        color: #595959;
      }
      .is-active {
        border-bottom: 2px solid #409EFF;
        color: #409EFF;
      }
    }
    .top-operate{
      display: flex;
      align-items: center;
      .el-dropdown-link {
        cursor: pointer;
      }
      .item-operate{
        margin-right: 20px;
        cursor: pointer;
      }
    }
  }
</style>

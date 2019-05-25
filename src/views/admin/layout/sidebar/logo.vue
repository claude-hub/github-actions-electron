<template>
  <div class="logo">
    <transition name="fade">
      <span v-if="isCollapse" key="0" class="logo_title is-bold ">
        QX
      </span>
    </transition>
    <transition-group name="fade">
      <template v-if="!isCollapse">
        <span key="1" class="logo_title is-bold">{{ $t('logo.name') }}</span>
        <span key="2" class="logo_subtitle">{{ $t('logo.title') }}</span>
      </template>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'Logo',
  /* eslint-disable */
  props: ['isCollapse']
}
</script>
<style scoped="scoped" lang="scss">
  /** 渐进渐出特效 **/
  .fade-leave-active {
    transition: opacity 0.2s;
  }

  .fade-enter-active {
    transition: opacity 2.5s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  /*****/

  .logo {
    width: 230px;
    height: 64px;
    line-height: 64px;
    background: #002140;
    color: #fdfdfd;
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    transition:width .6s;
    -webkit-transition:width .6s; /* Safari */
  }

  .logo_title {
    padding: 0 5px 0 0;
    color: #409eff;
    font-size: 28px;
    &.is-bold {
      font-weight: 700;
    }
  }

  .logo_subtitle {
    font-size: 16px;
    padding-top: 5px;
  }
</style>

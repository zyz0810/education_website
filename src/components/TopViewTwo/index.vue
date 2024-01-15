<template>
  <div class="password_top">
    <div style="width: 150px;"><logo :collapse="true" class="logo" /></div>
  </div>
</template>

<script>
import pathToRegexp from 'path-to-regexp'
import Logo from "../../layout/components/Sidebar/Logo";
export default {
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route(route) {
      // if you go to the redirect page, do not update the breadcrumbs
      if (route.path.startsWith('/redirect/')) {
        return
      }
      this.getBreadcrumb()
    }
  },
  components: {Logo,},
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      // only show routes with meta.title
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]

      if (!this.isDashboard(first)) {
        matched = [{ path: '/', meta: { title: '首页' }}].concat(matched)
      }

      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    },
    isDashboard(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim() === '首页'
    },
    pathCompile(path) {
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink(item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    }
  }
}
</script>

<style lang="scss" scoped>
.password_top{
  padding: 0 20px;
  box-shadow: 0 0 5px #ccc;
  background: #fff;
  .sidebar-logo-container{

    background: #fff;
    /deep/.sidebar-logo-link{
      display: flex;
      align-items: center;
      .sidebar-title{
        color:#333;
      }
    }
  }

}
</style>

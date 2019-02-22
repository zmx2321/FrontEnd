<template>
  <div class="container">
    <!-- LOGO -->
    <div class="logo">
      <img class="logo-img"
           src="./images/logo.png"
           alt="">
      <span>禧智屋</span>
    </div>

    <!-- 分类菜单 -->
    <template v-if="ids">
      <el-menu :default-active="index"
               @select="onSelect">
        <template v-for="item in munesList">
          <el-menu-item :index="item.path"
                        :key="item.id">
            <i :class="item.icon"></i>
            <span>{{item.title}}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </template>
  </div>
</template>
  
<script>
import Slide from '@/models/slideBar-model';
const slideModel = new Slide()

export default {
  name: "v-slidebar",
  props: {
    ids: {
      type: Array,
      default: []
    }
  },
  watch: {
    ids (arr) {
      const _arr = []
      arr.forEach(num => {
        for (let index = 0; index < 50; index++) {
          if (!this.pathList[index]) return

          const id = this.pathList[index].id;
          if (id == num) {
            _arr.push(this.pathList[index])
          }
        }
      });
      this.munesList = _arr
    }
  },
  data () {
    return {
      munesList: [],
      index: '1', //菜单默认项
      pathList: [ //路由列表
        { id: '1', path: '6-1', icon: 'iconfont icon-icon_zhanghao ', title: '用户管理' },
        { id: '3', path: '6-2', icon: 'iconfont icon-mima ', title: '权限管理' },
        { id: '4', path: '1', icon: 'iconfont icon-huowudui', title: '商品管理' },
        { id: '6', path: '4', icon: 'iconfont icon-ceshishenqing ', title: '新闻管理' },
        { id: '7', path: '5-2', icon: 'iconfont icon-ceshishenqing', title: '新闻分类' },
        { id: '8', path: '5-1', icon: 'iconfont icon-huowudui ', title: '商品分类' },
        { id: '11', path: '2', icon: 'iconfont icon-zuzhixiaxia ', title: '分销管理' },
        { id: '10', path: '3', icon: 'iconfont icon-zuoduiqi', title: '订单管理' },

        // { id: '05', path: '5', icon: 'iconfont icon-icon_shezhi ', title: '分类管理' },

        // { id: '08', path: '6', icon: 'iconfont icon-icon_zhanghao ', title: '权限管理' },
      ],
      dialogVisible: false, //弹窗控制
      password: '', // 密码
    };
  },
  mounted () {
    this.index = localStorage.index
  },
  methods: {
    // 菜单项
    onSelect (key, keyPath) {
      localStorage.index = key + ''
      this.$router.push(`/home/main${key}`)
    },
  }
}
</script>
  
<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #001529;

  .logo {
    height: 65px;
    line-height: 65px;
    color: #fff;
    background: #002140;
    padding-left: 20px;
    box-sizing: border-box;

    font-weight: bold;
    font-size: 20px;

    display: flex;
    align-items: center;
    .logo-img {
      margin-right: 5px;
      width: 32px;
      margin-right: 10px;
    }
  }

  .el-menu {
    padding-top: 20px;
    border-right: none;
    background: #001529 !important;
    .el-menu-item {
      background: #001529 !important;
      color: #ccc !important;
      transition: all 0.3s !important;

      .iconfont {
        margin-right: 7px;
      }
    }
    .el-menu-item.is-active {
      background-color: #1890ff !important;
      color: #fff !important;
    }
  }
}
</style>
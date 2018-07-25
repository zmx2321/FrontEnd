window.onload = function(){
  var vm = new Vue({
    el: "#vue-test",
    data: {
      table: [],
      textMap: ['狐', '孤'],
      level: 1
    },
    computed: {
      levelText: function(){
        return this.level >10 ? this.level : "一二三四五六七八九十".split('')[this.level - 1]
      }
    },
    methods:{
      choose: function(v){
        if(v){
          this.level++
          this.generateTable()
        }
      },
      generateTable: function(){
        var size = this.level + 1
        var table = new Array(size).fill(0).map(function(){return new Array(size).fill(0)})
        var random = Math.random() * size * size | 0
        var row = random / size | 0
        var col = random - row * size
        table[row][col] = 1
        this.table = table
      }
    },
    created: function(){
      this.generateTable()
    }
  })  
}

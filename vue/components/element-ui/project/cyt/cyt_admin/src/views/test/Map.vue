<!--
      "username": "admin",  账号
      "name": "admin",  姓名
      "role": "0",  角色(超级管理员)1管理员
      "mobile": "18212345678", 手机
      "disable": 0,  0未封禁（给封禁按钮）1封禁（给解封按钮）
      "guiAdmin": 1,  是否能进入柜端后台
      "createAt": "2019-01-04 14:28:02",  创建时间
      "guiNos": [  标签的形式
        "180921002",
        "0571002"
      ],
      "weChatName": null  微信名

-->


<template>
    <section class="main_cont">
        <div id="atlas"></div>
    </section>
</template>

<script>
    import { TMap } from '../../api/parking'

    export default {
        name: "Map",

        data () {
            return {
                // 地图
                mapView: '',
                // 信息提示框
                mapInfoWindow: '',
                // 标注点数组
                markersArray: [],
                // 地图数据
                mapData: [],

                mapData: [
                    {
                        "id":1,
                        "name":"北京后海酒店",
                        "latitude":"39.92300000",
                        "longitude":"116.5200000000"
                    },
                    {
                        "id":2,
                        "name":"北京七天酒店",
                        "latitude":"39.9254100000",
                        "longitude":"116.5220000000"
                    }
                ]
            }
        },

        methods: {
            init() {
                TMap().then(qq => {
                    /*var map = new qq.maps.Map(document.getElementById('atlas'), {
                        // 地图的中心地理坐标。
                        center: new qq.maps.LatLng(39.916527,116.397128)
                    })*/

                    var myLatlng = new qq.maps.LatLng(39.916527,116.397128);
                    var myOptions = {
                        zoom: 8,
                        center: myLatlng,
                        mapTypeId: qq.maps.MapTypeId.ROADMAP
                    };

                    var map = new qq.maps.Map(document.getElementById("atlas"), myOptions);
                    var scaleControl = new qq.maps.ScaleControl({
                        align: qq.maps.ALIGN.BOTTOM_LEFT,
                        margin: qq.maps.Size(85, 15),
                        map: map
                    });

                    qq.maps.event.addListener(
                        map,
                        'click',
                        function(event) {
                            alert('您点击的位置为:[' + event.latLng.getLng() +
                                ',' + event.latLng.getLat() + ']');
                        }
                    );

                })
            },
        },
        created() {
            this.init()
        }
    }
</script>

<style scoped>
    #atlas{
        min-width: 600px;
        min-height: 300px;
    }
</style>
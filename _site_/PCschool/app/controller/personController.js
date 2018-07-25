/**
 * Created by liufangzhou on 2016/12/4.
 */

myAppModule.controller('personController',
    ["$routeParams", "$scope", '$rootScope', "asyncHttp", "userStatueService", function ($routeParams, $scope, $rootScope, asyncHttp, userStatueService) {

        $rootScope.isMenuSelected = 6;

        $scope.imgRoot = "http://static.iboom.tv/static/img/";

        var thisApi = {
            getLolDate:{
                //dev: "mock/mockapi/recentChampionList.json",
                // test: "http://192.168.1.150:9000/wx/school/v1.0/statue",
                product: "/pc/school/v1.0/lolDate"
            },
            getStudyRecordCount: {
                //dev: "/pc/school/v1.0/getStudyRecordCount"
                /* test: "/pc/school/v1.0/getStudyRecordCount",*/
                 product: "/pc/school/v1.0/getStudyRecordCount"
            },
            getStudyRecords: {
                //dev: "/pc.test/pc/school/v1.0/getStudyRecords"
                /* test: "/pc/school/v1.0/getStudyRecordCount",*/
                 product: "/pc/school/v1.0/getStudyRecords"
            }
        };
        bMock.setFace(thisApi);
        bMock.setEnv('product');

        $scope.getLolDate = function () {
            asyncHttp.get(bMock.getFace("getLolDate"), function (data) {
                console.log(data.data);
                if (data.error) {
                    console.log("获取记录失败！");
                    return;
                }
                $scope.growthRecord = data.data.growthRecord;
                $scope.useHeroList = data.data.recentUseChampion;
                $scope.playStatistic = data.data.recentPlayStatistics;

                //加载图表数据
                var xdata = [], ydata = [];
                if($scope.growthRecord && $scope.growthRecord.length >0){
                    $scope.growthRecord.forEach(function (rec,index) {
                        xdata.push(index+1);
                        ydata.push(rec.ability);
                    })
                }
                $scope.initChart(xdata,ydata);
            },function (data) {
                console.log("获取记录失败！");
            });
        }
        
        //获取英雄使用情况
        $scope.getUseHero = function () {
            asyncHttp.get(bMock.getFace("getUseHero"), function (data) {
                if (data.error) {
                    console.log("获取英雄使用情况失败！");
                    return;
                }
                $scope.useHeroList = data.data[0].recent_champion_list;
            },function (data) {
                console.log("获取英雄使用情况失败！");
            });
        }

        //获取学习记录总计
        $scope.getStudyRecordCount = function () {
            asyncHttp.get(bMock.getFace("getStudyRecordCount"), function (data, status) {
                if (data.error) {
                    console.log("获取学习记录总计失败！");
                    return;
                }
                $scope.otoCount = data.data.oneToOneServiceNum;
                $scope.ssjCount = data.data.ssjNum;
                $scope.courseCount = data.data.videoWatchNum;
            });
        }

        $scope.getStudyRecordCount();

        function NewList(time,record){
            this.date = time;
            this.record = record;
        }
        //获取学习详细记录
        $scope.getStudyRecords = function (page,size) {
            asyncHttp.get(bMock.getFace("getStudyRecords")+"?page="+page+"&size="+size, function (data, status) {
                if (data.error) {
                    console.log("获取学习详细记录失败！");
                    return;
                }
                var lists = []; //每一天组成的数组
                var listAll = []; //以日期为key,学习数据为value的数组
                for(var i=0;i<data.data.length;i++) {
                    var newday = new Date(data.data[i].studyTime).toLocaleDateString();
                    if($.inArray(newday, lists)==-1){
                        lists.push(newday);
                    }
                }

                for(var j=0;j< lists.length;j++){
                    var day=lists[j];
                    var record=[];
                    for(var i=0;i<data.data.length;i++) {
                        var listday = new Date(data.data[i].studyTime).toLocaleDateString();
                        if(listday==day){
                            var studyName=data.data[i].studyName;
                            record.push(studyName);
                        }
                    }
                    var onedaydata = new NewList(day, record);
                    listAll.push(onedaydata);
                }

                console.log("新组成数据为"+listAll)
                    $scope.StudyRecords = listAll;
                console.log("学习总记录："+data.data);

            });
        }

        $scope.getStudyRecords(0,20);

        $scope.nowpage=0;
        $scope.showHistory = function () {
            $scope.nowpage= $scope.nowpage+1;
            $scope.getStudyRecords( $scope.nowpage,20);

        }

        //图表
        $scope.initChart = function (xdata,ydata) {
            // 指定图表的配置项和数据
            var option = {
                backgroundColor: "#f6f6f6",
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: true,
                    data: xdata,
                    axisLine: {
                        lineStyle: {
                            color: '#e3e3e3',
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#999999'
                        },
                        interval:function(num,str){if(num%5==0)return str;},
                        min:5,
                        max:5
                    }
                },
                yAxis: {
                    type: 'value',
                    max: 'dataMax',
                    min: 'dataMix',
                    axisLabel: {
                        formatter: '{value}',
                        textStyle: {
                            color: '#999999'
                        }
                    },
                    minInterval: 1,
                    // interval: 500
                    ayisLine: {
                        show: false
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#e3e3e3'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#e3e3e3',
                            opacity: '0'
                        }
                    }
                },
                series: [
                    {
                        name: '能力值',
                        type: 'line',
                        data: ydata,
                        symbolSize: 6,
                        symbol: 'emptyCircle',
                        lineStyle: {
                            normal: {
                                color: "#EC2D4D",
                                width: 2
                            }
                        }
                    }
                ]
            };
            //初始化e-chart
            var myChart = echarts.init(document.getElementById('chart'));
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        }

        //初始化数据
        $scope.initData = function () {
            $scope.personStatue = userStatueService.getStatue();//获取学员状态
            $scope.getLolDate();
        }
        $scope.initData();

        $scope.mes = "111";

        console.log($scope.mes);

        $scope.isSelectedLi = false;

        $scope.chooseDate = function () {

        }

        $scope.isChooseTab = 0;
        $scope.chooseTab = function (num) {
            $scope.isChooseTab = num;
        }




    }]);
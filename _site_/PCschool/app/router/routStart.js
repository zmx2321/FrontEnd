/**
 * Created by Administrator on 2016/3/8.
 */
myAppModule.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: '/app/temp/home.html',
        controller: 'homeController'
    }).when('/course', {
        templateUrl: '/app/temp/course.html',
        controller: 'courseController'
    }).when('/service', {
        templateUrl: '/app/temp/service.html',
        controller: 'serviceController'
    }).when('/activity', {
        templateUrl: '/app/temp/activity.html',
        controller: 'activityController'
    }).when('/UI', {
        templateUrl: '/app/temp/UI.html',
        controller: 'activityController'
    }).when('/allTeacher/:serviceType', {
        templateUrl: '/app/temp/allTeacher.html',
        controller: 'allTeacherController'
    }).when('/serviceTime/:serviceType/:teacherId', {
        templateUrl: '/app/temp/serviceTime.html',
        controller: 'serviceTimeController'
    }).when('/activityBefore/:activityId', {
        templateUrl: '/app/temp/activityBefore.html',
        controller: 'activityBeforeController'
    }).when('/activityAfter/:activityId', {
        templateUrl: '/app/temp/activityAfter.html',
        controller: 'activityAfterController'
    }).when('/person', {
        templateUrl: '/app/temp/person.html',
        controller: 'personController'
    }).when('/editPerson', {
        templateUrl: '/app/temp/editPerson.html',
        controller: 'editPersonController'
    }).when('/courseRecording/:courseId', {
        templateUrl: '/app/temp/courseRecording.html',
        controller: 'courseRecordingController'
    }).when('/live/:liveShowId', {
        templateUrl: '/app/temp/liveShow.html',
        controller: 'liveController'
    }).otherwise({
        redirectTo: '/home'
    });
}])


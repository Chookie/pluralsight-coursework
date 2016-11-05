(function (ngapp) {

    // Wrap toastr global variable in service so can use in our dependency injection and use that to inject it below
    ngapp.value('mvToastr', toastr);

    // Service
    ngapp.factory('mvNotifier', function (mvToastr) {
        return{
            notify: function (msg) {
                mvToastr.success(msg);
                console.log(msg);
            }
        };
    });

}(window.angular.module('app')));
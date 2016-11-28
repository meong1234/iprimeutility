/**
 * Created by abhe on 8/22/2015.
 */
/**
 * Created by abhe on 8/19/2015.
 */
(function () {
    'use strict';

    angular
        .module('app.system')
        .controller('menuController', menuController)
        .controller('menuEditController', menuEditController);


    var icons = ['ti-arrow-up', 'ti-arrow-right', 'ti-arrow-left', 'ti-arrow-down', 'ti-arrows-vertical', 'ti-arrows-horizontal',
        'ti-angle-up', 'ti-angle-right', 'ti-angle-left', 'ti-angle-down', 'ti-angle-double-up', 'ti-angle-double-right', 'ti-angle-double-left',
        'ti-angle-double-down', 'ti-move', 'ti-fullscreen', 'ti-arrow-top-right', 'ti-arrow-top-left', 'ti-arrow-circle-up', 'ti-arrow-circle-right',
        'ti-arrow-circle-left', 'ti-arrow-circle-down', 'ti-arrows-corner', 'ti-split-v', 'ti-split-v-alt', 'ti-split-h', 'ti-hand-point-up',
        'ti-hand-point-right', 'ti-hand-point-left', 'ti-hand-point-down', 'ti-back-right', 'ti-back-left', 'ti-exchange-vertical',
        'ti-wand', 'ti-save', 'ti-save-alt', 'ti-direction', 'ti-direction-alt', 'ti-user', 'ti-link', 'ti-unlink', 'ti-trash', 'ti-target',
        'ti-tag', 'ti-desktop', 'ti-tablet', 'ti-mobile', 'ti-email', 'ti-star', 'ti-spray', 'ti-signal', 'ti-shopping-cart', 'ti-shopping-cart-full',
        'ti-settings', 'ti-search', 'ti-zoom-in', 'ti-zoom-out', 'ti-cut', 'ti-ruler', 'ti-ruler-alt-2', 'ti-ruler-pencil', 'ti-ruler-alt', 'ti-bookmark',
        'ti-bookmark-alt', 'ti-reload', 'ti-plus', 'ti-minus', 'ti-close', 'ti-pin', 'ti-pencil', 'ti-pencil-alt', 'ti-paint-roller', 'ti-paint-bucket',
        'ti-na', 'ti-medall', 'ti-medall-alt', 'ti-marker', 'ti-marker-alt', 'ti-lock', 'ti-unlock', 'ti-location-arrow', 'ti-layout', 'ti-layers',
        'ti-layers-alt', 'ti-key', 'ti-image', 'ti-heart', 'ti-heart-broken', 'ti-hand-stop', 'ti-hand-open', 'ti-hand-drag', 'ti-flag', 'ti-flag-alt',
        'ti-flag-alt-2', 'ti-eye', 'ti-import', 'ti-export', 'ti-cup', 'ti-crown', 'ti-comments', 'ti-comment', 'ti-comment-alt', 'ti-thought', 'ti-clip',
        'ti-check', 'ti-check-box', 'ti-camera', 'ti-announcement', 'ti-brush', 'ti-brush-alt', 'ti-palette', 'ti-briefcase', 'ti-bolt', 'ti-bolt-alt',
        'ti-blackboard', 'ti-bag', 'ti-world', 'ti-wheelchair', 'ti-car', 'ti-truck', 'ti-timer', 'ti-ticket', 'ti-thumb-up', 'ti-thumb-down',
        'ti-stats-up', 'ti-stats-down', 'ti-shine', 'ti-shift-right', 'ti-shift-left', 'ti-shift-right-alt', 'ti-shift-left-alt', 'ti-shield',
        'ti-notepad', 'ti-server', 'ti-pulse', 'ti-printer', 'ti-power-off', 'ti-plug', 'ti-pie-chart', 'ti-panel', 'ti-package', 'ti-music',
        'ti-music-alt', 'ti-mouse', 'ti-mouse-alt', 'ti-money', 'ti-microphone', 'ti-menu', 'ti-menu-alt', 'ti-map', 'ti-map-alt', 'ti-location-pin',
        'ti-light-bulb', 'ti-info', 'ti-infinite', 'ti-id-badge', 'ti-hummer', 'ti-home', 'ti-help', 'ti-headphone', 'ti-harddrives', 'ti-harddrive',
        'ti-gift', 'ti-game', 'ti-filter', 'ti-files', 'ti-file', 'ti-zip', 'ti-folder', 'ti-envelope', 'ti-dashboard', 'ti-cloud', 'ti-cloud-up',
        'ti-cloud-down', 'ti-clipboard', 'ti-calendar', 'ti-book', 'ti-bell', 'ti-basketball', 'ti-bar-chart', 'ti-bar-chart-alt', 'ti-archive',
        'ti-anchor', 'ti-alert', 'ti-alarm-clock', 'ti-agenda', 'ti-write', 'ti-wallet', 'ti-video-clapper', 'ti-video-camera', 'ti-vector',
        'ti-support', 'ti-stamp', 'ti-slice', 'ti-shortcode', 'ti-receipt', 'ti-pin2', 'ti-pin-alt', 'ti-pencil-alt2', 'ti-eraser', 'ti-more',
        'ti-more-alt', 'ti-microphone-alt', 'ti-magnet', 'ti-line-double', 'ti-line-dotted', 'ti-line-dashed', 'ti-ink-pen', 'ti-info-alt',
        'ti-help-alt', 'ti-headphone-alt', 'ti-gallery', 'ti-face-smile', 'ti-face-sad', 'ti-credit-card', 'ti-comments-smiley', 'ti-time',
        'ti-share', 'ti-share-alt', 'ti-rocket', 'ti-new-window', 'ti-rss', 'ti-rss-alt',
        'ti-control-stop', 'ti-control-shuffle', 'ti-control-play', 'ti-control-pause', 'ti-control-forward', 'ti-control-backward', 'ti-volume', 'ti-control-skip-forward',
        'ti-control-skip-backward', 'ti-control-record', 'ti-control-eject',
        'ti-paragraph', 'ti-uppercase', 'ti-underline', 'ti-text', 'ti-Italic', 'ti-smallcap', 'ti-list', 'ti-list-ol', 'ti-align-right',
        'ti-align-left', 'ti-align-justify', 'ti-align-center', 'ti-quote-right', 'ti-quote-left',
        'ti-layout-width-full', 'ti-layout-width-default', 'ti-layout-width-default-alt', 'ti-layout-tab', 'ti-layout-tab-window',
        'ti-layout-tab-v', 'ti-layout-tab-min', 'ti-layout-slider', 'ti-layout-slider-alt', 'ti-layout-sidebar-right', 'ti-layout-sidebar-none',
        'ti-layout-sidebar-left', 'ti-layout-placeholder', 'ti-layout-menu', 'ti-layout-menu-v', 'ti-layout-menu-separated', 'ti-layout-menu-full',
        'ti-layout-media-right', 'ti-layout-media-right-alt', 'ti-layout-media-overlay', 'ti-layout-media-overlay-alt', 'ti-layout-media-overlay-alt-2',
        'ti-layout-media-left', 'ti-layout-media-left-alt', 'ti-layout-media-center', 'ti-layout-media-center-alt', 'ti-layout-list-thumb',
        'ti-layout-list-thumb-alt', 'ti-layout-list-post', 'ti-layout-list-large-image', 'ti-layout-line-solid', 'ti-layout-grid4', 'ti-layout-grid3',
        'ti-layout-grid2', 'ti-layout-grid2-thumb', 'ti-layout-cta-right', 'ti-layout-cta-left', 'ti-layout-cta-center', 'ti-layout-cta-btn-right',
        'ti-layout-cta-btn-left', 'ti-layout-column4', 'ti-layout-column3', 'ti-layout-column2', 'ti-layout-accordion-separated', 'ti-layout-accordion-merged',
        'ti-layout-accordion-list', 'ti-widgetized', 'ti-widget', 'ti-widget-alt', 'ti-view-list', 'ti-view-list-alt', 'ti-view-grid', 'ti-upload',
        'ti-download', 'ti-loop', 'ti-layout-sidebar-2', 'ti-layout-grid4-alt', 'ti-layout-grid3-alt', 'ti-layout-grid2-alt', 'ti-layout-column4-alt',
        'ti-layout-column3-alt', 'ti-layout-column2-alt',
        'ti-flickr', 'ti-flickr-alt', 'ti-instagram', 'ti-google', 'ti-github', 'ti-facebook', 'ti-dropbox', 'ti-dropbox-alt', 'ti-dribbble',
        'ti-apple', 'ti-android', 'ti-yahoo', 'ti-trello', 'ti-stack-overflow', 'ti-soundcloud', 'ti-sharethis', 'ti-sharethis-alt', 'ti-reddit',
        'ti-microsoft', 'ti-microsoft-alt', 'ti-linux', 'ti-jsfiddle', 'ti-joomla', 'ti-html5', 'ti-css3', 'ti-drupal', 'ti-wordpress', 'ti-tumblr',
        'ti-tumblr-alt', 'ti-skype', 'ti-youtube', 'ti-vimeo', 'ti-vimeo-alt', 'ti-twitter', 'ti-twitter-alt', 'ti-linkedin', 'ti-pinterest',
        'ti-pinterest-alt', 'ti-themify-logo', 'ti-themify-favicon', 'ti-themify-favicon-alt'
    ]

    menuController.$inject = ['$rootScope', '$q', 'logger', 'menuService', 'gridOptions', 'pageable', 'modalService', '$translate'];
    function menuController($rootScope, $q, logger, menuService, gridOptions, pageable, modalService, $translate) {
        var vm = this;
        vm.hapus = hapus;
        vm.translate = translate;
        vm.createCopy = createCopy;
        vm.addrow = addrow;
        vm.refreshGrid = refreshGrid;
        vm.exportExcel = exportExcel;
        vm.exportPdf = exportPdf;


        function translate(data) {
            return $translate.instant(data);
        }

        activate();

        function activate() {
            setupGrid();
            logger.info('Activated '+$rootScope.pagetitle+' View');
        }

        function hapus(id) {
            modalService.Confirmation(
                $translate.instant('confirmation_message.delete')+' '+id.label,
                function () {
                    menuService.remove(id).success(
                        function (response, status, headers, config) {
                            logger.info('menu '+id.label+' '+$translate.instant('confirmation_message.delete_info'));
                            vm.refreshGrid();
                        })
                }
            );

        };

        function setupGrid() {
            var gridmodel = {
                id: "id",
                expanded: true,
                fields: {
                    label: { type: 'string' },
                    options: { type: 'string' },
                    icon: { type: 'string' },
                    order: { type: 'number' }
                }

            };

            var gridRead = function gridRead(e) {
                vm.optionCallback = e;
                menuService.query(pageable.buildPageKendo(e.data)).$promise.then(function(data) {
                    e.success(data);
                }, function(error) {
                    e.error(error);
                })
            }

            vm.mainGridOptions = gridOptions.buildTreeGrid();
            vm.mainGridOptions.excel.fileName = $rootScope.pagetitle+'.xlsx';
            vm.mainGridOptions.pdf.fileName = $rootScope.pagetitle+'.pdf';
            vm.mainGridOptions.dataSource.schema.model = gridmodel;
            vm.mainGridOptions.dataSource.transport.read = gridRead;
            vm.mainGridOptions.dataSource.sort =  { field: "order", dir: "asc" };
            vm.mainGridOptions.columns.push({ field: 'label', title: translate('Modules.System.menu_page.fields.field1') });
            vm.mainGridOptions.columns.push({ field: 'options', title: translate('Modules.System.menu_page.fields.field2') });
            vm.mainGridOptions.columns.push({ field: 'icon', template: '<a><i class="#:data.icon#"></i> #: icon # </a>',  title: translate('Modules.System.menu_page.fields.field3') });
            vm.mainGridOptions.columns.push({ field: 'order', title: translate('Modules.System.menu_page.fields.field4') });
            vm.mainGridOptions.columns.push({filterable : false,  template: kendo.template($("#commandtemplate").html()), title: '{{ "table.command" | translate }}', attributes: { "class": "table-cell", style: "text-align: center;" }});

            vm.mainGridOptions.columns[4].title = translate('table.command');
        }

        function createCopy(row) {
            $rootScope.$state.go('app.system.security.menu.edit', {id:null, copydata: row});
        }

        function addrow(id) {
            $rootScope.$state.go('app.system.security.menu.edit', {id: id});
        }

        function refreshGrid() {
            console.log('aaa');
            if ((vm.optionCallback !== undefined) &&
                (vm.mainGridOptions !== undefined)) {
                vm.mainGridOptions.dataSource.transport.read(vm.optionCallback);
            }
        }

        function exportExcel() {
            vm.grid.saveAsExcel();
        }

        function exportPdf() {
            vm.grid.saveAsPDF();
        }
    }

    menuEditController.$inject = [
        '$rootScope', '$scope','$q', '$stateParams',
        'logger','modalService', 'menuService',
        '$translate'
    ];
    function menuEditController($rootScope, $scope, $q, $stateParams,
                                      logger, modalService, menuService,
                                      $translate ) {

        var vm = this;
        vm.currentData = {};
        vm.original = {};

        vm.translate = translate;
        vm.isEdit = ($stateParams.id !== "");
        vm.simpan = simpan;
        vm.cancel = cancel;
        vm.baru = baru;
        vm.icons = icons;

        activate();

        function activate() {
            var promises = [getCurrentData(), getAllMenu()];
            return $q.all(promises).then(function() {
                logger.info('Activated '+$rootScope.pagetitle+' View');
            });
        }

        function translate(data) {
            return $translate.instant(data);
        }

        function getCurrentData(){
            if ($stateParams.id !== "") {

                return menuService.get({id: $stateParams.id}).$promise.then(function (data) {
                    vm.currentData = data;
                    vm.original = angular.copy(vm.currentData);
                    return vm.currentData;
                });
            } else {

                if ($stateParams.copydata !== null) {
                    $stateParams.copydata.id = null;
                    vm.currentData = $stateParams.copydata;
                    vm.original = angular.copy(vm.currentData);
                    return vm.currentData;
                }


            }
        }

        function getAllMenu(){
            return menuService.query({"page": 0, "size": 1000}, null).$promise.then(function (data) {
                vm.allMenu = data.content;
                return vm.allMenu;
            });
        }


        $scope.$watch('vm.currentData', function(current, original) {
            vm.isClean = angular.equals(vm.currentData, vm.original);
        }, true)

        function simpan(){

            menuService.save(vm.currentData)
                .success(function(){
                    logger.info($translate.instant('confirmation_message.save_info'));
                    $rootScope.$state.go('app.system.security.menu.list');
                });
        }

        function cancel(){
            modalService.Confirmation(
                $translate.instant('confirmation_message.cancel'),
                function () {
                    $rootScope.$state.go('app.system.security.menu.list');
                },
                !vm.isClean
            );
        }

        function baru(){
            modalService.Confirmation(
                $translate.instant('confirmation_message.reset'),
                function () {
                    vm.currentData = angular.copy(vm.original);
                },
                !$scope.isClean
            );
        }
    }

})();
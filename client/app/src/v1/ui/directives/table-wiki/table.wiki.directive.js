(function () {
    'use strict';

    //http://ng-table.com/#/editing/demo-inline
      angular
            .module('wikiApp')
            .directive('tableWiki', ['LanguageConfigService', 'NgTableParams', '$interpolate', '$sce', tableWiki]);

      function tableWiki (language, NgTableParams, $interpolate, $sce){
            var directive = {};
            directive.restrict = 'E';
            directive.scope =  {data : '=', options : '='};
            directive.templateUrl = '/app/src/v1/ui/directives/table-wiki/table.wiki.directive.html';
            directive.replace = true;
            directive.link = articlesTableLinking; //Leval 3 function
            return directive;

	      function articlesTableLinking(scope, element, attrs, ctrl){
	    	  init();
              scope.toHtml = toHtml;

	    	  function init() {
		          	setStyle();
	          		scope.$watch('data', createSmartTable);
	          		scope.$watch('options', createSmartTable);
	          }

	          function setStyle (){
		          	scope.tableHeaderStyle = {};
		          	scope.fieldStyle = {};
		          	scope.tableHeaderStyle["font-weight"] = "bold";

		          	if (language.isRtl()){
		          		scope.fieldStyle["text-align"] = "right";
		          		scope.tableHeaderStyle["text-align"] = "right";
		          	}else{
		          		scope.fieldStyle["text-align"] = "left";
		          		scope.tableHeaderStyle["text-align"] = "left";
		          	}
	          }

	          function createSmartTable(){
                  if (!scope.data || !scope.options){
                    return;
                  }
                 var options1 = {page: 1, count: 2, sorting: { id: "desc" }};
                // var data1 = { dataset: scope.data};
                 var data1 = {
                     counts:[1, 2, 4, 6, 10],
                     getData: getData2
                 };
                 scope.tableParams = new NgTableParams(options1, data1);
                 var x = 1; //TODO: remove
	          }

              function getData2 ($defer, params) {
                    var params2 = $defer.prevParamsMemento.params;
                    var page = params2.page;
                    var count = params2.count;
                    var start = (page - 1) * count;
                    var end = page * count;
                    var data1 = scope.data.slice(start, end);
                    scope.tableParams.total(scope.data.length);
                    return data1;
                }

               function toHtml (colIndex, rowIndex, $data) {
                    var html = scope.options.makeCell
                             (colIndex, rowIndex, $data, scope.options);
                    var result = processHtml (html);
                    return result;
               }
               function processHtml (html) {
                   var html2 = html.replace(/&quot;/g, "'");
                   var html3 = $interpolate(html2)(scope);
                   var html4 = $sce.trustAsHtml(html3);
                    return html4;
                }

	      }//End articlesTableLinking
      }//End articlesTable
})();

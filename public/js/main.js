/**
* Main JS
* js/main.js
* configure require.js
*/
require.config({
     baseUrl:'js',
          paths : {
              'jquery' : 'lib/jquery',
              'underscore' : 'lib/underscore',
              'bootstrap' : 'lib/bootstrap',
              'backbone'    :    'lib/backbone',
              'localStorage'     : 'lib/backbone.localStorage',
              'text'    :    'lib/text'
          },
          shim : {           /*this is used to give the dependecies of non AMD module like 
                                      jquery or underscore*/
                   'backbone' :  {
                        deps : ['jquery','underscore'],
                        exports : 'backbone'
                   },
                   'underscore' : {
                        deps : ['jquery'],
                        exports :'_'
                   },
                   'localStorage' : {
                        deps : ['backbone']
                   }
              }
});
require(['router','views/masterView'],function(Router,MasterView){
     var router = new Router();
     Backbone.history.start();
     var url=Backbone.history.getFragment();
     var masterView= new MasterView();
     masterView.render();
     
});







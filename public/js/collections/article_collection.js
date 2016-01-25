/**
 * New node file
 */
define(function(require){
var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');
var localStorage = require('localStorage');
var Article= require('models/articleModel')
var Articles = Backbone.Collection.extend({
	model:Article,
	localStorage : new localStorage('article')
});
return new Articles;
});
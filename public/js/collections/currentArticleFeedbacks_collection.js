/**
 * New node file
 */
define(function(require){
	var Backbone = require('backbone');
	var Feedback= require('models/currentArticleFeedback');
	var localStorage = require('localStorage');
	var CurFeedbacks = Backbone.Collection.extend({
		model: Feedback,
		localStorage : new localStorage('cur-art-feedback'),
		satisfied : function(){
				return this.where({appropriate:true});			
		},
		comparator: function(item){
			 return -new Date(item.get('Date'));
		 },
	});
	return new CurFeedbacks();
});
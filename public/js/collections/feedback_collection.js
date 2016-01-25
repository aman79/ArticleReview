/**
 * New node file
 */
define(function(require){
	var Backbone = require('backbone');
	var Feedback= require('models/feedbackModel');
	var localStorage = require('localStorage');
	var Feedbacks = Backbone.Collection.extend({
		model: Feedback,
		localStorage : new localStorage('feedback')
	});
	return new Feedbacks();
});
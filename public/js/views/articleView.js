 /**
 * New node file
 */
define(function(require){
	var Backbone = require('backbone');
	var _ = require('underscore');
	var $ = require('jquery');
	var LoadFeedbackForm = require('views/loadfeedbackformView');
	return Backbone.View.extend({
		tagName : 'article',
		events : {
			'click .providefeedback':'loadFeedback'
		},
		render :function(){
			var template = require('text!templates/articlesTemp.html');
			var compiledTemplate = _.template(template);
			this.$el.html(compiledTemplate({"article":this.model.toJSON()}));
			this.$el.attr({'style':'border-bottom:2px solid blue'});
			return this;
		},
		loadFeedback : function(){
		$(".delete").trigger('click');
		var feedback = new LoadFeedbackForm({model:this.model});
			feedback.render(); 
		}
	});
});
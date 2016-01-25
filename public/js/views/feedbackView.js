/**
 * New node file
 */
define(function(require) {
	var Backbone = require('backbone');
	var _ = require('underscore');
	var $ = require('jquery');
	return Backbone.View.extend({
				render : function() {
					var template = require('text!templates/usersfeedbackTemplate.html');
					var compiledtemplate = _.template(template);
					var value;
					if (this.model.get('appropriate')) {
						value = " required article";
					} else {
						value = "Not require Article";
					}
					var oldjson = this.model.toJSON();
					var past = new Date(oldjson.Date);
					var today = new Date();
					var datediff = this.calcDate(today, past);
					var newjson = {
						"aid" : oldjson.aid,
						"userName" : oldjson.userName,
						"feedback" : oldjson.feedback,
						"Date" : datediff,
						"appropriate" : value
					};
					this.$el.html(compiledtemplate({
						'user' : newjson,
						'value' : value
					}));
					this.$el.attr({
						'style' : 'border-bottom:2px solid blue'
					});
					if(this.model.get('appropriate')){
						this.$el.find("#name").attr('style','color:blue');
					}else{
						this.$el.find("#name").attr('style','color:red');
					}
					return this;
				},
				calcDate : function(date1, date2) {
					var diff = Math.floor(date1.getTime() - date2.getTime());
					var day = 1000 * 60 * 60 * 24;
					var days = Math.floor(diff / day);
					var hour = 1000 * 60 * 60;
					var hours = Math.floor(diff / hour);
					var minute = 1000 * 60;
					var minutes = Math.floor(diff / minute);
					var second = 1000;
					var seconds = Math.floor(diff / second);
					var message = date2.toDateString();
					if (days < 1) {
						if (hours < 1) {
							if (minutes < 1) {
								message += " was " + seconds + " Second ago"
							} else {
								message += " was " + minutes + " Minute ago"
							}
						} else {
							message += " was " + hours + " Hour ago"
						}
					}
					return message
				}
			});
});
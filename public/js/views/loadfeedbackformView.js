/**
 * New node file
 */
define(function(require){
var Backbone = require('backbone');
	var _ = require('underscore');
	var $ = require('jquery');
	var feedbackCollection = require ('collections/feedback_collection');
	var CurFeedbackModel= require('models/currentArticleFeedback');
	var FeedbackView = require('views/feedbackView');
	var Feedback = require('models/feedbackModel');
	var curFeedbackCollection = require('collections/currentArticleFeedbacks_collection');
	return Backbone.View.extend({
		events : {
			'click #feedbackpost' : 'newFeedback',
			'click .delete' : 'close'
		},
		close : function(){
		  this.remove();
		},
		newFeedback : function(){
			var appro;
			var appropriate;
			var radio=document.getElementsByName('choice');
			for(i=0;i<radio.length;i++){
				if(radio[i].checked){
				appro=radio[i].value;
				}
				};
			var username = $("#txtUname").val();
			var feedback= $("#feedbackcomments").val();
			var date = new Date();
			var aid =this.model.get('aid');
			if(appro=="true"){
				appropriate=true;
			}else{
				appropriate=false;
			}
			var json={"aid":aid,
           "userName":username,
           "feedback":feedback,
           "Date":date,
           "appropriate":appropriate
           }
			var currentfeedback = new CurFeedbackModel(json);
			var feedback = new Feedback(json);
			curFeedbackCollection.create(currentfeedback);
			feedbackCollection.create(feedback);
		},
		initialize : function(){
			feedbackCollection.fetch({
				reset:true
			});
			_.invoke(curFeedbackCollection.toArray(), 'destroy');
			this.listenTo(curFeedbackCollection, 'add', this.showFeedback);
			this.listenTo(curFeedbackCollection, 'change', this.showFeedback);
		},
		render: function(){
			var template = require('text!templates/feedbackTemplate.html');
			var compiledTemplate=_.template(template);
			this.$el.html(compiledTemplate({'article':this.model.toJSON()}));
			$("#feedback").html(this.el);
			this.filterFeedbacks();
			return this;
		},
		filterFeedbacks : function(){
			var aid=this.model.get('aid');
			feedbackCollection.forEach(function(itr){
				if(itr.get('aid')==aid){
					var json=itr.toJSON();
					var curfeedback = new CurFeedbackModel(json);
					curFeedbackCollection.create(curfeedback);
				}
				
			});
		},
		showFeedback : function(){
			$("#feedbacks").html('');
			if(curFeedbackCollection.length){
			curFeedbackCollection.forEach(function(itr){
				var feedbackView = new FeedbackView({model:itr});
				$("#feedbacks").append(feedbackView.render().el);
				$("#totalpost").html(curFeedbackCollection.length);
				var percentage=Math.floor((curFeedbackCollection.satisfied().length/curFeedbackCollection.length)*100);
				$("#appropriate").html(percentage);
				});
			}
		}
	});
});
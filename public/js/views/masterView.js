/**
 * Main Backbone View js/views/MasterView.js
 */
define(function(require) {
	var Backbone = require('backbone');
	var $ = require('jquery');
	var _ = require('underscore');
	var articleModule = require('data/articles');
	var articleJSONS = articleModule.articles;
	var feedBackModule = require('data/feedbacks');
	var feedBackJSON = feedBackModule.feedbacks;
	var Article = require('models/articleModel');
	var Feedback = require('models/feedbackModel');
	var articleCollection = require('collections/article_collection');
	var feedbackCollection = require('collections/feedback_collection');
	var ArticleView = require('views/articleView');
	var pageNumber = 1;
	var incr = 3;
	var count;
	return Backbone.View.extend({
		el : '#mainApp',
		events : {
			'click #next' : 'next',
			'click #prev' : 'prev'
		},
		next : function() {
			pageNumber = parseInt($("#pageno").html());
			if (count < incr) {
				pageNumber = pageNumber;
			} else {
				pageNumber++;
			}
			this.loadArticles();
			$("#pageno").html(pageNumber);
		},
		prev : function() {
			pageNumber = parseInt($("#pageno").html());
			if (pageNumber <= 1) {
				pageNumber = 1;
			} else {
				pageNumber--;
			}
			this.loadArticles();
			$("#pageno").html(pageNumber);
		},
		initialize : function() {
			if (localStorage.length == 0) {
				articleJSONS.forEach(function(itr) {
					var article = new Article(itr);
					articleCollection.create(article);
				});
				feedBackJSON.forEach(function(itr) {
					var feedback = new Feedback(itr);
					feedbackCollection.create(feedback);
				});
			}
		},
		loadArticles : function() {
			if (articleCollection.length) {
				$("#articles").html('');
				var newCollection = articleCollection.slice((pageNumber - 1)
						* incr, (pageNumber) * incr);
				count = 0;
				newCollection.forEach(function(itr) {
					var articleView = new ArticleView({
						model : itr
					});
					$("#articles").append(articleView.render().el);
					count++;
				}, this);
			}
		},
		render : function() {
			articleCollection.fetch({
				reset : true
			});
			this.loadArticles();
		}
	});
});

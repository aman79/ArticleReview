/**
 * New node file
 */
define(function(require){
	var Backbone= require('backbone');
	//var employees = require('collections/Employees');
	//var EmployeeFilter = require('filter/EmployeeFilter');
	
	return Backbone.Router.extend({
		routes  : {
			'employee/:id' : 'setFilter'
		},
		setFilter : function(id){
			EmployeeFilter.setParam(id);
			//todos.trigger('filter');
		}
	});
});
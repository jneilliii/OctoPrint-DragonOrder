/*
 * View model for OctoPrint-DragonOrder
 *
 * Author: jneilliii
 * License: AGPLv3
 */
$(function() {
	function dragon_orderViewModel(parameters) {
		var self = this;
		self.settingsViewModel = parameters[0];

		self.onAllBound = function(allViewModels){
			// Make the Tabs draggable.
			$('#tabs,#tabs li ul.dropdown-menu').sortable({connectWith: '#tabs li ul.dropdown-menu,#tabs', items: 'li:not(.dropdown)', update:function(event, ui){
					$('#tabs > li.dropdown > ul > li').appendTo('#tabs');
					$('#tabs > li.dropdown').remove();
					$('#tabs').width(function(){return ($('#navbar').width() - $('.accordion.span4').width() - ($('div.octoprint-container > div.row').width()/2) - 25) + 'px';});
					if (!self.notify || self.notify.state !== 'open'){
						var stack_bottomright = {"dir1": "up", "dir2": "left", "firstpos1": 25, "firstpos2": 25};
						self.notify = new PNotify({
							title: 'Dragon Order',
							text: 'Tabs expanded for setting order. Once complete hold down the [shift] key on your keyboard and press the refresh/reload button in your browser.',
							type: 'info',
							hide: false,
							buttons: {
								closer: $('html').attr('id') == 'touch',
								sticker: false
							},
							stack: stack_bottomright,
							addclass: 'stack-bottomright',
							});
					}

					var new_tab_order = [];
					$.each($('#tabs').sortable('toArray'), function(index, value){
							if(value !== ''){
								var octo_version = VERSION.match(/\d+/gm);
								if (octo_version[0] == 1 && octo_version[1] > 3 && octo_version[2] > 0){
									var new_value = value.replace('temp_link','temperature_link').replace('term_link','terminal_link').replace(/^gcode_link$/,'plugin_gcodeviewer_link').replace(/^(tab_)?(.+)_link$/g,'$2');
								} else {
									var new_value = value.replace('temp_link','temperature_link').replace('term_link','terminal_link').replace(/^gcode_link$/,'gcodeviewer_link').replace(/^(tab_)?(.+)_link$/g,'$2');
								}
								new_tab_order.push(new_value);
							}
						});
					self.settingsViewModel.settings.plugins.dragon_order.tab_order(new_tab_order);
					self.settingsViewModel.saveData();
				}});

			// Make the sidebar draggable.
			$('body > div > div.container.octoprint-container > div.row > div.accordion.span4').sortable({axis:'y',handle: 'div.accordion-heading', update:function(){
					var new_sidebar_order = [];
					$.each($(this).sortable('toArray'), function(index, value){
							var new_value = value.replace(/^(sidebar_)?(.+)_wrapper$/g,'$2');
							new_sidebar_order.push(new_value);
						});
					self.settingsViewModel.settings.plugins.dragon_order.sidebar_order(new_sidebar_order);
					self.settingsViewModel.saveData();
				}});

			// Make the navbar draggable.
			$('#navbar > div > div > div > ul.nav').sortable({axis: 'x', update:function(){
					var new_navbar_order = [];
					$.each($(this).sortable('toArray'), function(index, value){
							var new_value = value.replace(/^(navbar_)?(.+)$/g,'$2');
							new_navbar_order.push(new_value);
						});
					self.settingsViewModel.settings.plugins.dragon_order.navbar_order(new_navbar_order);
					self.settingsViewModel.saveData();
				}});
		}
	}
	OCTOPRINT_VIEWMODELS.push({
		construct: dragon_orderViewModel,
		dependencies: ['settingsViewModel'],
		elements: []
	});
});

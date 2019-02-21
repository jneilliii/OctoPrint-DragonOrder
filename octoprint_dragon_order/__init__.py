# coding=utf-8
from __future__ import absolute_import

import octoprint.plugin

class dragon_orderPlugin(octoprint.plugin.SettingsPlugin,
						 octoprint.plugin.AssetPlugin,
						 octoprint.plugin.TemplatePlugin):

	##~~ SettingsPlugin mixin

	def get_settings_defaults(self):
		return dict(
			tab_order = [],
			sidebar_order = [],
			navbar_order = []
		)

	def on_settings_save(self, data):
		self._logger.debug(data)
		if "tab_order" in data:
			old_tab_order = self._settings.global_get(["appearance","components","order","tab"])
			self._logger.debug('Old Tab Order: %s' % old_tab_order)
			self._logger.debug('New Tab Order: %s' % data["tab_order"])
			if old_tab_order != data["tab_order"]:
				self._settings.global_set(["appearance","components","order","tab"], data["tab_order"])
		if "sidebar_order" in data:
			old_sidebar_order = self._settings.global_get(["appearance","components","order","sidebar"])
			self._logger.debug('Old Sidebar Order: %s' % old_sidebar_order)
			self._logger.debug('New Sidebar Order: %s' % data["sidebar_order"])
			if old_sidebar_order != data["sidebar_order"]:
				self._settings.global_set(["appearance","components","order","sidebar"], data["sidebar_order"])
		if "navbar_order" in data:
			old_navbar_order = self._settings.global_get(["appearance","components","order","navbar"])
			self._logger.debug('Old Navbar Order: %s' % old_navbar_order)
			self._logger.debug('New Navbar Order: %s' % data["navbar_order"])
			if old_navbar_order != data["navbar_order"]:
				self._settings.global_set(["appearance","components","order","navbar"], data["navbar_order"])

	##~~ AssetPlugin mixin

	def get_assets(self):
		return dict(
			js=["js/dragon_order.js","js/jquery-ui.min.js"],
			css=["css/jquery-ui.css"]
		)

	##~~ Softwareupdate hook

	def get_update_information(self):
		return dict(
			dragon_order=dict(
				displayName="Dragon Order",
				displayVersion=self._plugin_version,

				# version check: github repository
				type="github_release",
				user="jneilliii",
				repo="OctoPrint-DragonOrder",
				current=self._plugin_version,

				# update method: pip
				pip="https://github.com/jneilliii/OctoPrint-DragonOrder/archive/{target_version}.zip"
			)
		)

__plugin_name__ = "Dragon Order"
__plugin_pythoncompat__ = ">=2.7,<4"

def __plugin_load__():
	global __plugin_implementation__
	__plugin_implementation__ = dragon_orderPlugin()

	global __plugin_hooks__
	__plugin_hooks__ = {
		"octoprint.plugin.softwareupdate.check_config": __plugin_implementation__.get_update_information
	}


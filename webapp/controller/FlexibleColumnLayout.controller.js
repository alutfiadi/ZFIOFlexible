// This Apps is developed by:  Ahmad Lutfiadi
// PT NTT Data Business Solution
sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"zal/zflexibletemplate/controller/BaseController"
], function (JSONModel, Controller) {
	"use strict";

	return Controller.extend("zal.zflexibletemplate.controller.FlexibleColumnLayout", {
		onInit: function () {
			this.oRouter = this.getRouter();
			this.oRouter.attachRouteMatched(this.onRouteMatched, this);
			this.oRouter.attachBeforeRouteMatched(this.onBeforeRouteMatched, this);
			// Navigating to a random product in order to display two columns initially
			// this.oRouter.navTo("detail", {layout: "TwoColumnsMidExpanded", product: "95"});
		},

		onBeforeRouteMatched: function(oEvent) {

			var oModel = this.getModel();

			var sLayout = oEvent.getParameters().arguments.layout;

			// If there is no layout parameter, query for the default level 0 layout (normally OneColumn)
			if (!sLayout) {
				var oNextUIState = this.getHelper().getNextUIState(0);
				sLayout = oNextUIState.layout;
			}

			// Update the layout of the FlexibleColumnLayout
			if (sLayout) {
				oModel.setProperty("/layout", sLayout);
			}
		},

		onRouteMatched: function (oEvent) {
			var sRouteName = oEvent.getParameter("name"),
				oArguments = oEvent.getParameter("arguments");

			this._updateUIElements();

			// Save the current route name
			this.currentRouteName = sRouteName;
			this.currentCarrier = oArguments.carrier;
			this.currentFlight = oArguments.flight;
		},

		onStateChanged: function (oEvent) {
			var bIsNavigationArrow = oEvent.getParameter("isNavigationArrow"),
				sLayout = oEvent.getParameter("layout");

			this._updateUIElements();

			// Replace the URL with the new layout if a navigation arrow was used
			if (bIsNavigationArrow) {
				this.oRouter.navTo(this.currentRouteName, {layout: sLayout, carrier: this.currentCarrier, flight: this.currentFlight}, true);
			}
		},

		// Update the close/fullscreen buttons visibility
		_updateUIElements: function () {
			var oModel = this.getModel();
			var oUIState = this.getHelper().getCurrentUIState();
			oModel.setData(oUIState);
		},

		onExit: function () {
			this.oRouter.detachRouteMatched(this.onRouteMatched, this);
			this.oRouter.detachBeforeRouteMatched(this.onBeforeRouteMatched, this);
		}
	});
});
// This Apps is developed by:  Ahmad Lutfiadi
// PT NTT Data Business Solution
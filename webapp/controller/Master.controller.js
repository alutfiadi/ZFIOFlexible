sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	'sap/ui/model/Sorter',
	'sap/m/MessageBox'
], function(JSONModel, Controller, Filter, FilterOperator, Sorter, MessageBox) {
	"use strict";

	return Controller.extend("zalflexible.controller.Master", {
		onInit: function() {
			this.oRouter = this.getOwnerComponent().getRouter();
			this._bDescendingSort = false;

			this.oRouter.getRoute("master").attachPatternMatched(this._onCarrierMatched, this);
			this.oRouter.getRoute("detail").attachPatternMatched(this._onCarrierMatched, this);
			// this.oRouter.getRoute("detailDetail").attachPatternMatched(this._onCarrierMatched, this);
		},
		onListItemPress: function(oEvent) {
			var oNextUIState = this.getOwnerComponent().getHelper().getNextUIState(1),
				carrierPath = oEvent.getSource().getSelectedItem().getBindingContext("carriers").getPath(),
				carrier = carrierPath.slice(
					carrierPath.indexOf("'") + 1,
					carrierPath.lastIndexOf("'"));
			this.oRouter.navTo("detail", {
				layout: oNextUIState.layout,
				carrier: carrier
			});
		},
		onSearch: function(oEvent) {
			var oTableSearchState = [],
				sQuery = oEvent.getParameter("query");

			if (sQuery && sQuery.length > 0) {
				oTableSearchState = [new Filter("Carrname", FilterOperator.Contains, sQuery)];
			}

			this.getView().byId("carriersTable").getBinding("items").filter(oTableSearchState, "Application");
		},

		onAdd: function(oEvent) {
			MessageBox.show("This functionality is not ready yet.", {
				icon: MessageBox.Icon.INFORMATION,
				title: "Aw, Snap!",
				actions: [MessageBox.Action.OK]
			});
		},

		onSort: function(oEvent) {
			this._bDescendingSort = !this._bDescendingSort;
			var oView = this.getView(),
				oTable = oView.byId("carriersTable"),
				oBinding = oTable.getBinding("items"),
				oSorter = new Sorter("Carrname	", this._bDescendingSort);

			oBinding.sort(oSorter);
		},

		_onCarrierMatched: function(oEvent) {
			// var sCarrier = oEvent.getParameter("arguments").carrier || this.carrier || "AB",
			// 	oTable = this.byId("carriersTable");
			// oTable.getItems()[oTable.getBinding("items").aIndices.indexOf(+sCarrier)].setSelected(true);
		},

		getNumberOfItems: function(sCarrid) {
			return this.getOwnerComponent().getModel('carriers').getProperty("/CarriersSet('" + sCarrid + "')/FlightSet").length;
		}
	});
});
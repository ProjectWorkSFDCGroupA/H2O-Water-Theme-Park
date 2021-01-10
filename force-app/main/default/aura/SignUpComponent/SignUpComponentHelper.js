({
	validateCustomerForm : function(component) {
		
        var allValid = component.find('customerField').reduce(function (validFields, inputCmp) {
            inputCmp.showHelpMessageIfInvalid();
            return validFields && inputCmp.get('v.validity').valid;
        }, true);
        
        return allValid;
	}
})
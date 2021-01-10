({
	validateTicketData : function(component) {
		
        console.log('FROM TICKET HELPER');
        let allValid = component.find('ticketField').reduce(function (validFields, inputCmp) {
            inputCmp.showHelpMessageIfInvalid();
            return validFields && inputCmp.get('v.validity').valid;
        }, true);
        
        return allValid;
	}
})
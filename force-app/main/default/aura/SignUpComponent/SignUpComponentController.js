({
	doInit: function(component, event, helper) {
        // Prepare a new record from template
        component.find("customerRecordCreator").getNewRecord(
            "Contact", // sObject type (entityAPIName)
            null,      // recordTypeId
            false,     // skip cache?
            $A.getCallback(function() {
                let rec = component.get("v.newCustomer");
                let error = component.get("v.newCustomerError");
                if(error || (rec === null)) {
                    console.log("Error initializing record template: " + error);
                }
                else {
                    console.log("Record template initialized: " + rec.apiName);
                }
            })
        );
    },
    
    handleRegister: function(component, event, helper) {
        console.log(helper.validateCustomerForm(component));
        if(helper.validateCustomerForm(component)) {
            component.find("customerRecordCreator").saveRecord(function(saveResult) {
                if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                    window.location.href = "/h2owaterthemepark/s/loginpage?";
                } else {
                    console.log(saveResult.state);
                    alert('Fields with (*) are required for Registration');
                }
            });
        }
        
    },
    
    loginHandler : function(){
        window.location.href = "/h2owaterthemepark/s/loginpage?";
    }
})
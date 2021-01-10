({
	fireGetRideEvt : function(component, event, helper) {
		
        console.log('Setting Params');
        let evt = component.getEvent("getRideDetailsEvt");
        console.log('Got Event');
        evt.setParams({
            "rideObj" : component.get('v.rideObj')
        });
        console.log('Preparing to fire');
        evt.fire();
	}
})
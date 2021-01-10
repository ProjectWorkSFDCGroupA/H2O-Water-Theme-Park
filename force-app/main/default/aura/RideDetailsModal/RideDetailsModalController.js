({
    doInit : function(component, event, helper){
        
        console.log('MODAL DOINIT');
        
        let action = component.get('c.getPackageInfo');
        
        action.setParams({
            rideId : component.get('v.rideId')
        });
       	
        action.setCallback(this, function(response){
            if(response.getState()=='SUCCESS'){
                component.set('v.packages',response.getReturnValue());
            }
        });
        
        $A.enqueueAction(action);
    },
    
    closeModal : function(component, event, helper) {
		component.set('v.isOpen',false);
	}
})
({
	doInit : function(component, event, helper) {
		
        console.log('DOINIT PACKAGE');
        let action = component.get('c.getRideInfo');
        console.log('Set Course');
        let packageId = component.get('v.packageId');
        console.log(component.get('v.packageId'));
        action.setParams({
            packageId : packageId,
            visitingDate : component.get('v.visitingDate')
        });
        
        action.setCallback(this, function(response){
            
            if(response.getState()=='SUCCESS'){
                console.log(JSON.stringify(response.getReturnValue()));
                component.set('v.rides', response.getReturnValue());
            }
            else{
                
                console.log('ERROR');
            }
        });
        
        $A.enqueueAction(action);
	},
    
    firePackageEvent : function(component, event, helper){
        
        let packageEvent = component.getEvent('packageEvt');
        packageEvent.setParams({
            "packageObj" : component.get('v.packageObj')
        });
        packageEvent.fire();
    }
})
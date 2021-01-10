({
    getRides : function(component, visitingDate, level) {
        
        console.log("Inside Helper");
        let action = component.get('c.getRides');
        
        action.setParams({
            'visitingDate' : visitingDate,
            'level' : level
        });
        
        action.setCallback(this, function(response){
            
            if(response.getState()=='SUCCESS'){
                console.log(JSON.stringify(response.getReturnValue()));  
                component.set("v.rides",response.getReturnValue());
            }
            else{
                console.log('ERROR');
            }
            
        });
        
        $A.enqueueAction(action);
        
    },
    
    getPackages : function(component, visitingDate, level){
        
        console.log("Inside Helper");
        let action = component.get('c.getPackages');
        
        action.setParams({
            'visitingDate' : visitingDate,
            'level' : level
        });
        
        action.setCallback(this, function(response){
            
            if(response.getState()=='SUCCESS'){
                console.log(JSON.stringify(response.getReturnValue())); 
                component.set("v.packages",response.getReturnValue());
            }
            else{
                console.log('ERROR');
            }
            
        });
        
        $A.enqueueAction(action);
    },
    
    filterPackage : function(component, event, type){
        
        let action = component.get('c.getFilterPackage');
        
        action.setParams({
            'type' : type,
            'level' : component.get('v.level')
        });
        
        action.setCallback(this, function(response){
            
            if(response.getState()=='SUCCESS'){
                
                console.log(JSON.stringify(response.getReturnValue())); 
                component.set("v.packages",response.getReturnValue());
            }
        });
        
        $A.enqueueAction(action);
    },
    
    getTickets : function(component, event){
        
        let action = component.get('c.getTicketHistory');
        
        action.setParams({
            'customerId' : component.get('v.cusRecId')
        });
        
        action.setCallback(this, function(response){
            
            if(response.getState()=='SUCCESS'){
                
                component.set('v.ticketList', response.getReturnValue());
                console.log(JSON.stringify(response.getReturnValue()));
            }
        });
        
        $A.enqueueAction(action);
    }
})
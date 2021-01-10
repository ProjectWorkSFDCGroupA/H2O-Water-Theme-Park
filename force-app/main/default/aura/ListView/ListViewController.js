({
    
    doInit : function(component, event, helper){
        
        let sPageURL = decodeURIComponent(window.location.search.substring(1));
        console.log(sPageURL);
        let sURLVariables = sPageURL.split('?');
        
        if(sPageURL==''){
            window.location.href="/h2owaterthemepark/s/loginpage?";
        }
        else{
            component.set("v.cusRecId",sURLVariables[0]);
        }
        
        let action = component.get("c.getAllRidesInitially");
        
        action.setCallback(this, function(response){
            if(response.getState()=='SUCCESS'){
                console.log('init success');
                component.set('v.rides',response.getReturnValue());
            }
        });
        
        $A.enqueueAction(action);
    },
    
    handleFilterEvent : function(component, event, helper) {
        
        let visitingDate = event.getParam("visitingDate");
        let displayType = event.getParam("displayType");
        let level = event.getParam("level");
        component.set('v.level',level);
        component.set('v.visitingDate',visitingDate);
        
        if(displayType == 'rides'){
            
            component.set('v.packageOpen',false);
            component.set('v.ticketHistoryOpen',false);
            component.set('v.rideOpen',true);
            console.log("IF RIDES");
            helper.getRides(component, visitingDate, level);
        }
        else if(displayType == 'package'){
            component.set('v.rideOpen',false);
            component.set('v.ticketHistoryOpen',false);
            component.set('v.packageOpen',true);
            console.log("IF PACKAGES");
            helper.getPackages(component, visitingDate, level);
        }
    },
    
    handleGetRideEvt : function(component, event, helper){
        
        let rideObj = event.getParam("rideObj");
        component.set('v.rideObj',rideObj);
        component.set('v.isRideModalOpen',true);
    },
    
    handlePackageEvt : function(component, event, helper){
        
        let packageObj = event.getParam("packageObj");
        component.set("v.packageObj", packageObj);
        component.set('v.isBookingModalOpen', true);
    },
    
    handleToggleChange : function(component, event, helper){
        
        
        
        console.log('Toggle Changed');
        
        if(component.find('toggleValue').get('v.checked')){
            var cmpTarget = component.find('dynamic');
            $A.util.removeClass(cmpTarget, 'listview');    
            console.log('Toggle True');
            component.set('v.ticketHistoryOpen',true);
            component.set('v.packageOpen',false);
            component.set('v.rideOpen',false);
            helper.getTickets(component, event);
            
        }else{
             var cmpTarget = component.find('dynamic');
            $A.util.addClass(cmpTarget, 'listview');   
            component.set('v.rideOpen',true);
            component.set('v.ticketHistory',false);
        }
    },
    
    handleFilter : function(component, event, helper){
        
        console.log('Setting up');
        let action = component.get('c.getFilteredPackages');
        
        console.log('Setting Params');
        
        action.setParams({
            
            'priceLimit' : component.get('v.priceVal'),
            'rideLimit' : component.get('v.rideVal'),
            'level' : component.get('v.level')
        });
        
        console.log('Getting Callback');
        
        action.setCallback(this, function(response){
            if(response.getState()=='SUCCESS'){
                console.log(response.getReturnValue());
                component.set('v.packages',response.getReturnValue());
            }
        });
        
        $A.enqueueAction(action);
    }
    
    
})
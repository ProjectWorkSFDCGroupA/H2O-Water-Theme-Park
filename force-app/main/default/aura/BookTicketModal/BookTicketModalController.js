({
    doInit : function(component, event, helper) {
        console.log(component.get('v.isOpen'));
        console.log(component.get("v.customerId"));
        console.log(component.get("v.packageId"));
        let customerId = component.get('v.customerId');
        
        let customerSetter = component.find("customerField");
        customerSetter.set("v.value",customerId);
        
        component.find("packageField").set("v.value",component.get("v.packageId"));
        component.find("dateField").set("v.value",component.get("v.visitingDate"));
        
    },
    
    getNoOfTickets : function(component, event, helper){
        
        console.log('Changed');
        let tickets = component.find('noOfTicketsField').get('v.value');
        component.set('v.noOfTickets',tickets);
        if(tickets!='' && tickets>0){
            component.set('v.isBooking',true);
            component.set('v.totalPrice',(tickets*component.get('v.cost')));
        }
        else{
           component.set('v.isBooking',false); 
        }
        console.log(component.get('v.noOfTickets'));
        console.log(component.get('v.totalPrice'));
    },
    
    closeModal : function(component){
        
        component.set('v.isOpen',false);
    },
    
    confirmTicket : function(component, event, helper){
        console.log('Booking Initialized');
        component.set('v.isOpen',false);
        
        $A.get('e.force:showToast').setParams({
            "title": "Greetings from Team H2O!",
            "message": "Your Booking has been confirmed! Ticket will be mailed to your registered email id.",
            "type": "success",
            "duration":"6000"
        }).fire();
    }
})
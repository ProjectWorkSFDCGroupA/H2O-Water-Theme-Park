({
    signupHandler : function() {
        
        window.location.href = "https://resourceful-unicorn-jxqloj-dev-ed.preview.salesforce-communities.com/h2owaterthemepark/s/";
    },
    
    handleLogin :  function(component, event, helper){
        
        console.log('Handler');
        
        let action = component.get('c.verifyUser');
        console.log('Got Component');
        action.setParams({
            'email' : component.get('v.Email'),
            'passkey' : component.get('v.Passkey')
        });
        
        action.setCallback(this, function(response){
            console.log(response.getState());
            if(response.getState()=='SUCCESS'){
                console.log(JSON.stringify(response.getReturnValue()));
                component.set('v.customerObj',response.getReturnValue());
                let urlEvent = $A.get("e.force:navigateToURL");
                urlEvent.setParams({
                    "url": '/book-tickets?' +response.getReturnValue()
                });
                urlEvent.fire();
                //window.location.href = "https://mainproject-developer-edition.ap24.force.com/h2owaterthemepark/s/book-tickets";
            }
            else{
                alert('Enter Correct Credentials. Click Sign-up if New');
            }
            
        });
        
        $A.enqueueAction(action);
        
    }
})
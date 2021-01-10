({
    fireFilterEvent : function(component, event, helper) {
        console.log(component.get('v.valid'));
        var today = new Date();
        if(component.get('v.visitingDate')==null || component.get('v.visitingDate')==undefined || new Date(component.get('v.visitingDate'))<today){
            console.log('Halted');
            component.set('v.valid',true);
        }
        else{
            console.log('Fired');
            component.set('v.valid',false);
            let filterEvt = $A.get("e.c:BookingFilterEvent");
            filterEvt.setParams({
                'visitingDate' : component.get("v.visitingDate"),
                'displayType' : component.get("v.displayType"),
                'level' : component.get("v.level")
            });
            
            filterEvt.fire();
        }
        //console.log(filterEvt.getPhase());
    }
})
trigger PreventDelete on Case (before delete) {
	
    for(Case c: trigger.old){
        if(c.status != 'Closed' && c.status!='Rejected'){
            c.addError('Delete Action Not Allowed');
        }
    }
}
export class CommonService{
    GetRoles(){
        return localStorage.getItem("plainRolesText");
    }
    isRoleExists(role){
        return this.GetRoles().search(role);        
    }
    applyRoleOnMenu(){
        //TO DO: show only those menu items which are allowed
    }
    menuVisibility:boolean=false;
    isAuthenticated:boolean=false;
}
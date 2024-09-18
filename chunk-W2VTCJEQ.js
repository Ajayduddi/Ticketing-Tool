import{a as te}from"./chunk-KYDLVRIQ.js";import{a as pe,b as de,c as le,d as se}from"./chunk-G6B6AZSJ.js";import"./chunk-VDWCKEYE.js";import"./chunk-5U2JP7Y3.js";import{a as ie,b as ne,c as re}from"./chunk-3CQKWVPW.js";import"./chunk-Z2JUUHCF.js";import{f as ae,g as oe}from"./chunk-L44P52BQ.js";import{d as k}from"./chunk-SSQJ3YUY.js";import{b as $,c as ee}from"./chunk-JLPIB5B6.js";import"./chunk-X4SNFC5H.js";import{a as K,b as Q}from"./chunk-BS5ZSUXQ.js";import{A as Z,e as V,i as j,n as J,y as X,z as Y}from"./chunk-RWOU77EA.js";import"./chunk-XSSXK7EZ.js";import{b as U,d as q,e as H,g as z,l as G}from"./chunk-RRIUMA4F.js";import"./chunk-LLONOUOZ.js";import"./chunk-LPI7DW4Z.js";import"./chunk-2AQ67VSH.js";import{Ab as B,Bb as D,Ca as p,Cb as W,Kb as S,Lb as E,Mb as L,Ta as y,V as M,Va as l,Ya as P,Z as O,cb as t,db as i,eb as x,ha as c,ia as u,ib as b,jb as f,kb as _,pc as F,rb as T,sb as d,sc as A,tb as C,uc as R,wb as h,xb as v,yb as w,zb as N}from"./chunk-QG64PWEM.js";var me=()=>({width:"100%",right:"0",left:"0"}),ce=r=>({"920px":r}),ue=()=>({width:"50rem"}),_e=()=>[5,10,15,20,30],fe=()=>({"min-width":"50rem"});function ge(r,s){r&1&&(t(0,"span",31),d(1,"Update Dpertment Information."),i())}function be(r,s){r&1&&(t(0,"span",31),d(1,"Add Dpertment Information."),i())}function ye(r,s){if(r&1){let o=b();t(0,"div",32)(1,"label",33),d(2,"Department Id"),i(),t(3,"input",34),w("ngModelChange",function(a){c(o);let e=_();return v(e.deptObj.deptId,a)||(e.deptObj.deptId=a),u(a)}),i()()}if(r&2){let o=_();p(3),h("ngModel",o.deptObj.deptId),l("disabled",!0)}}function xe(r,s){r&1&&(t(0,"small",35),d(1,"Department Name is required"),i())}function Ce(r,s){if(r&1){let o=b();t(0,"div",16)(1,"label",36),d(2,"Create Date"),i(),t(3,"input",37),w("ngModelChange",function(a){c(o);let e=_();return v(e.deptObj.createdate,a)||(e.deptObj.createdate=a),u(a)}),i()()}if(r&2){let o=_();p(3),h("ngModel",o.deptObj.createdate),l("disabled",!0)}}function he(r,s){if(r&1){let o=b();t(0,"p-button",38),f("onClick",function(){c(o);let a=_();return u(a.addDept())}),i()}if(r&2){_();let o=T(27);l("disabled",o.invalid)}}function ve(r,s){if(r&1){let o=b();t(0,"p-button",39),f("onClick",function(){c(o);let a=_();return u(a.updateDept())}),i()}if(r&2){_();let o=T(27);l("disabled",o.invalid)}}function we(r,s){r&1&&(t(0,"tr")(1,"th"),d(2,"S.NO"),i(),t(3,"th",40),d(4,"Department Id "),x(5,"p-sortIcon",41),i(),t(6,"th",42),d(7,"Department Name "),x(8,"p-sortIcon",43),i(),t(9,"th",44),d(10,"Created at "),x(11,"p-sortIcon",45),i(),t(12,"th"),d(13,"Action"),i()())}function De(r,s){if(r&1){let o=b();t(0,"tr")(1,"td"),d(2),i(),t(3,"td"),d(4),S(5,"na"),i(),t(6,"td"),d(7),S(8,"na"),i(),t(9,"td"),d(10),S(11,"date"),S(12,"na"),i(),t(13,"td")(14,"button",46),f("click",function(){let a=c(o).$implicit,e=_();return u(e.editDept(a))}),i(),t(15,"button",47),f("click",function(a){let e=c(o).$implicit,m=_();return u(m.deleteDept(e._id,a))}),i()()()}if(r&2){let o=s.$implicit,n=s.rowIndex;p(2),C(n+1),p(2),C(E(5,6,o.deptId)),p(3),C(E(8,8,o.deptName)),p(3),C(E(12,13,L(11,10,o.createdate,"dd-MMM-yyyy"))),p(4),l("text",!0),p(),l("text",!0)}}var Xe=(()=>{let s=class s{constructor(){this.dept=M(te),this.message=M(j),this.confirm=M(V),this.isvisable=!1,this.deptList=[],this.deptObj=new k}ngOnInit(){this.getdept()}reset(){this.deptObj=new k}getdept(){this.dept.getDept().subscribe(n=>{this.deptList=n.data})}newDept(){this.deptObj=new k,this.isvisable=!0}addDept(){this.dept.createDept(this.deptObj).subscribe({next:n=>{n.result?(this.isvisable=!1,this.message.add({severity:"success",summary:"success",detail:"Department Added Successfully"}),this.getdept()):this.message.add({severity:"error",summary:"error",detail:n.message})},error:n=>{if(this.message.add({severity:"error",summary:"error",detail:n.error.message}),n.error.data)for(let a of n.error.data)this.message.add({severity:"error",summary:"error",detail:a.msg+" "+a.path})}})}editDept(n){this.deptObj=n,this.isvisable=!0}updateDept(){this.dept.updateDept(this.deptObj).subscribe({next:n=>{n.result?(this.isvisable=!1,this.message.add({severity:"success",summary:"success",detail:"Department Updated Successfully"}),this.getdept()):this.message.add({severity:"error",summary:"error",detail:n.message})},error:n=>{if(this.message.add({severity:"error",summary:"error",detail:n.error.message}),n.error.data)for(let a of n.error.data)this.message.add({severity:"error",summary:"error",detail:a.msg+" "+a.path})}})}deleteDept(n,a){this.confirm.confirm({target:a.target,message:"Are you want to delete this Department?",header:"Confirmation",icon:"pi pi-exclamation-triangle",acceptIcon:"none",rejectIcon:"none",rejectButtonStyleClass:"p-button-text",accept:()=>{this.dept.deleteDept(n).subscribe({next:e=>{e.result?(this.message.add({severity:"success",summary:"success",detail:"Department deleted successfully"}),this.getdept()):this.message.add({severity:"error",summary:"error",detail:e.message})},error:e=>{if(this.message.add({severity:"error",summary:"error",detail:e.error.message}),e.error.data)for(let m of e.error.data)this.message.add({severity:"error",summary:"error",detail:m.msg+" "+m.path})}})},reject:()=>{this.message.add({severity:"info",summary:"info",detail:"Delete cancelled"})}})}};s.\u0275fac=function(a){return new(a||s)},s.\u0275cmp=O({type:s,selectors:[["app-department"]],standalone:!0,features:[N([j,V]),B],decls:40,vars:28,consts:[["name","ngModel"],[3,"breakpoints"],[1,"col-md-12","flex","flex-row","align-item-center","justify-content-between"],[1,"flex","flex-column","gap-2"],[1,"text-900","font-medium","text-3xl"],[1,"breadcrumb"],[1,"breadcrumb-item"],["routerLink","pages/dashboard",1,"text-decoration-none","text-900","font-medium"],["routerLink","pages/department",1,"text-decoration-none","text-900","font-medium"],["aria-current","page",1,"breadcrumb-item","active"],[1,"flex","flex-row","gap-2","mt-4"],["label","Add Department","icon","pi pi-plus",1,"d-none","d-sm-none","d-md-block",3,"onClick","raised"],["icon","pi pi-plus",1,"d-md-none","d-sm-block",3,"onClick","raised"],["header","Dpeartment","draggable","false",3,"visibleChange","modal","visible"],["class","p-text-secondary block mb-5",4,"ngIf"],["class","flex align-items-center gap-3 mb-3 ",4,"ngIf"],[1,"flex","align-items-center","gap-3","mb-5"],["for","department_name",1,"font-semibold","w-6rem"],["pInputText","","id","department_name","type","text","name","department_name","ngModel","","required","",1,"flex-auto",3,"ngModelChange","ngModel"],["class","p-error",4,"ngIf"],["class","flex align-items-center gap-3 mb-5",4,"ngIf"],[1,"flex","justify-content-end","gap-2"],["label","Reset","severity","secondary",3,"onClick"],["label","Save",3,"disabled","onClick",4,"ngIf"],["label","Update",3,"disabled","onClick",4,"ngIf"],[1,"col-md-12"],[1,"row"],[1,"col-12","d-print-none"],["styleClass","p-datatable","currentPageReportTemplate","Showing {first} to {last} of {totalRecords} entries",3,"value","paginator","first","showCurrentPageReport","rows","rowsPerPageOptions","tableStyle"],["pTemplate","header"],["pTemplate","body"],[1,"p-text-secondary","block","mb-5"],[1,"flex","align-items-center","gap-3","mb-3"],["for","department_id",1,"font-semibold","w-6rem"],["pInputText","","id","department_id","name","department_id",1,"flex-auto",3,"ngModelChange","ngModel","disabled"],[1,"p-error"],["for","department_date",1,"font-semibold","w-6rem"],["pInputText","","id","department_date","name","department_date",1,"flex-auto",3,"ngModelChange","ngModel","disabled"],["label","Save",3,"onClick","disabled"],["label","Update",3,"onClick","disabled"],["pSortableColumn","deptId","feild","deptId"],["field","deptId"],["pSortableColumn","deptName","feild","deptName"],["field","deptName"],["pSortableColumn","createdate","feild","createdate"],["field","createdate"],["pButton","","type","button","icon","pi pi-pencil",1,"p-button-rounded","p-button-secondary",3,"click","text"],["pButton","","type","button","icon","pi pi-trash",1,"p-button-rounded","p-button-danger",3,"click","text"]],template:function(a,e){if(a&1){let m=b();t(0,"main"),x(1,"p-toast",1)(2,"p-confirmDialog"),t(3,"div",2)(4,"div",3)(5,"span",4),d(6,"Departments"),i(),t(7,"ol",5)(8,"li",6)(9,"a",7),d(10,"Home"),i()(),t(11,"li",6)(12,"a",8),d(13,"Departments"),i()(),t(14,"li",9),d(15,"List"),i()()(),t(16,"div",10)(17,"p-button",11),f("onClick",function(){return c(m),u(e.newDept())}),i(),t(18,"p-button",12),f("onClick",function(){return c(m),u(e.newDept())}),i(),t(19,"p-dialog",13),w("visibleChange",function(g){return c(m),v(e.isvisable,g)||(e.isvisable=g),u(g)}),y(20,ge,2,0,"span",14)(21,be,2,0,"span",14)(22,ye,4,2,"div",15),t(23,"div",16)(24,"label",17),d(25,"Department Name"),i(),t(26,"input",18,0),w("ngModelChange",function(g){return c(m),v(e.deptObj.deptName,g)||(e.deptObj.deptName=g),u(g)}),i(),y(28,xe,2,0,"small",19),i(),y(29,Ce,4,2,"div",20),t(30,"div",21)(31,"p-button",22),f("onClick",function(){return c(m),u(e.reset())}),i(),y(32,he,1,1,"p-button",23)(33,ve,1,1,"p-button",24),i()()()(),t(34,"div",25)(35,"div",26)(36,"div",27)(37,"p-table",28),y(38,we,14,0,"ng-template",29)(39,De,16,15,"ng-template",30),i()()()()()}if(a&2){let m=T(27);p(),l("breakpoints",W(23,ce,D(22,me))),p(16),l("raised",!0),p(),l("raised",!0),p(),P(D(25,ue)),l("modal",!0),h("visible",e.isvisable),p(),l("ngIf",e.deptObj._id!==""),p(),l("ngIf",e.deptObj._id===""),p(),l("ngIf",e.deptObj._id!==""),p(4),h("ngModel",e.deptObj.deptName),p(2),l("ngIf",m.invalid&&(m.dirty||m.touched)),p(),l("ngIf",e.deptObj._id!==""),p(3),l("ngIf",e.deptObj._id===""),p(),l("ngIf",e.deptObj._id!==""),p(4),l("value",e.deptList)("paginator",!0)("first",0)("showCurrentPageReport",!0)("rows",10)("rowsPerPageOptions",D(26,_e))("tableStyle",D(27,fe))}},dependencies:[R,F,A,se,pe,J,de,le,Q,K,Z,X,Y,G,U,q,z,H,ie,re,ne,ee,$,oe,ae]});let r=s;return r})();export{Xe as DepartmentComponent};

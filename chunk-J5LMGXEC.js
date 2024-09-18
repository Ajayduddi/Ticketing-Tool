import{d as oe}from"./chunk-GMAE3TWP.js";import{a as xe}from"./chunk-5CFZ7USD.js";import{a as we}from"./chunk-SSQJ3YUY.js";import{a as W,b as Ie,c as Me}from"./chunk-JLPIB5B6.js";import{a as ve,b as ye}from"./chunk-BS5ZSUXQ.js";import{A as ke,a as H,i as Q,k as pe,n as ge,o as fe,s as Ce,t as be,y as _e}from"./chunk-RWOU77EA.js";import"./chunk-XSSXK7EZ.js";import{a as le,b as re,c as ce,d as de,e as ue,g as he,l as me}from"./chunk-RRIUMA4F.js";import"./chunk-LLONOUOZ.js";import"./chunk-LPI7DW4Z.js";import"./chunk-2AQ67VSH.js";import{Ab as Z,Bb as Y,Ca as r,Cb as $,Da as x,Eb as R,Fb as ee,O as z,Q as M,Qa as F,Ta as p,Ua as f,V as T,Va as l,Wb as te,Z as L,Za as D,Zb as k,_ as S,_b as ie,cb as d,db as u,eb as y,fb as j,gb as A,ha as h,ia as m,ib as I,jb as b,kb as v,ma as U,nb as G,nc as ne,ob as J,pb as B,pc as O,qa as E,qb as q,qc as se,rb as _,rc as ae,sb as C,ub as X,uc as w,wb as N,xb as P,yb as K,zb as V}from"./chunk-QG64PWEM.js";var Ve=["input"],Oe=(t,a,e,n)=>({"p-checkbox p-component":!0,"p-checkbox-checked":t,"p-checkbox-disabled":a,"p-checkbox-focused":e,"p-variant-filled":n}),Fe=(t,a,e)=>({"p-highlight":t,"p-disabled":a,"p-focus":e}),De=(t,a,e)=>({"p-checkbox-label":!0,"p-checkbox-label-active":t,"p-disabled":a,"p-checkbox-label-focus":e});function je(t,a){if(t&1&&y(0,"span",10),t&2){let e=v(3);l("ngClass",e.checkboxIcon),f("data-pc-section","icon")}}function Ae(t,a){t&1&&y(0,"CheckIcon",11),t&2&&(l("styleClass","p-checkbox-icon"),f("data-pc-section","icon"))}function Be(t,a){if(t&1&&(j(0),p(1,je,1,2,"span",8)(2,Ae,1,2,"CheckIcon",9),A()),t&2){let e=v(2);r(),l("ngIf",e.checkboxIcon),r(),l("ngIf",!e.checkboxIcon)}}function qe(t,a){}function Ne(t,a){t&1&&p(0,qe,0,0,"ng-template")}function Pe(t,a){if(t&1&&(d(0,"span",12),p(1,Ne,1,0,null,13),u()),t&2){let e=v(2);f("data-pc-section","icon"),r(),l("ngTemplateOutlet",e.checkboxIconTemplate)}}function Ke(t,a){if(t&1&&(j(0),p(1,Be,3,2,"ng-container",5)(2,Pe,2,2,"span",7),A()),t&2){let e=v();r(),l("ngIf",!e.checkboxIconTemplate),r(),l("ngIf",e.checkboxIconTemplate)}}function Re(t,a){if(t&1){let e=I();d(0,"label",14),b("click",function(i){h(e);let s=v(),o=_(3);return m(s.onClick(i,o,!0))}),C(1),u()}if(t&2){let e=v();D(e.labelStyleClass),l("ngClass",R(6,De,e.checked(),e.disabled,e.focused)),f("for",e.inputId)("data-pc-section","label"),r(),X(" ",e.label,"")}}var He={provide:le,useExisting:z(()=>Qe),multi:!0},Qe=(()=>{class t{cd;injector;config;value;name;disabled;binary;label;ariaLabelledBy;ariaLabel;tabindex;inputId;style;styleClass;labelStyleClass;formControl;checkboxIcon;readonly;required;autofocus;trueValue=!0;falseValue=!1;variant="outlined";onChange=new E;onFocus=new E;onBlur=new E;inputViewChild;templates;checkboxIconTemplate;model;onModelChange=()=>{};onModelTouched=()=>{};focused=!1;constructor(e,n,i){this.cd=e,this.injector=n,this.config=i}ngAfterContentInit(){this.templates.forEach(e=>{switch(e.getType()){case"icon":this.checkboxIconTemplate=e.template;break}})}onClick(e,n,i){e.preventDefault(),!(this.disabled||this.readonly)&&(this.updateModel(e),i&&n.focus())}updateModel(e){let n,i=this.injector.get(ce,null,{optional:!0,self:!0}),s=i&&!this.formControl?i.value:this.model;this.binary?(n=this.checked()?this.falseValue:this.trueValue,this.model=n,this.onModelChange(n)):(this.checked()?n=s.filter(o=>!H.equals(o,this.value)):n=s?[...s,this.value]:[this.value],this.onModelChange(n),this.model=n,this.formControl&&this.formControl.setValue(n)),this.onChange.emit({checked:n,originalEvent:e})}handleChange(e){this.readonly||this.updateModel(e)}onInputFocus(e){this.focused=!0,this.onFocus.emit(e)}onInputBlur(e){this.focused=!1,this.onBlur.emit(e),this.onModelTouched()}focus(){this.inputViewChild.nativeElement.focus()}writeValue(e){this.model=e,this.cd.markForCheck()}registerOnChange(e){this.onModelChange=e}registerOnTouched(e){this.onModelTouched=e}setDisabledState(e){setTimeout(()=>{this.disabled=e,this.cd.markForCheck()})}checked(){return this.binary?this.model===this.trueValue:H.contains(this.value,this.model)}static \u0275fac=function(n){return new(n||t)(x(te),x(U),x(pe))};static \u0275cmp=L({type:t,selectors:[["p-checkbox"]],contentQueries:function(n,i,s){if(n&1&&G(s,ge,4),n&2){let o;B(o=q())&&(i.templates=o)}},viewQuery:function(n,i){if(n&1&&J(Ve,5),n&2){let s;B(s=q())&&(i.inputViewChild=s.first)}},hostAttrs:[1,"p-element"],inputs:{value:"value",name:"name",disabled:[2,"disabled","disabled",k],binary:[2,"binary","binary",k],label:"label",ariaLabelledBy:"ariaLabelledBy",ariaLabel:"ariaLabel",tabindex:[2,"tabindex","tabindex",ie],inputId:"inputId",style:"style",styleClass:"styleClass",labelStyleClass:"labelStyleClass",formControl:"formControl",checkboxIcon:"checkboxIcon",readonly:[2,"readonly","readonly",k],required:[2,"required","required",k],autofocus:[2,"autofocus","autofocus",k],trueValue:"trueValue",falseValue:"falseValue",variant:"variant"},outputs:{onChange:"onChange",onFocus:"onFocus",onBlur:"onBlur"},features:[V([He]),F],decls:7,vars:37,consts:[["input",""],[3,"ngStyle","ngClass"],[1,"p-hidden-accessible"],["type","checkbox","pAutoFocus","",3,"change","focus","blur","value","checked","disabled","readonly","autofocus"],[1,"p-checkbox-box",3,"click","ngClass"],[4,"ngIf"],[3,"class","ngClass","click",4,"ngIf"],["class","p-checkbox-icon",4,"ngIf"],["class","p-checkbox-icon",3,"ngClass",4,"ngIf"],[3,"styleClass",4,"ngIf"],[1,"p-checkbox-icon",3,"ngClass"],[3,"styleClass"],[1,"p-checkbox-icon"],[4,"ngTemplateOutlet"],[3,"click","ngClass"]],template:function(n,i){if(n&1){let s=I();d(0,"div",1)(1,"div",2)(2,"input",3,0),b("change",function(c){return h(s),m(i.handleChange(c))})("focus",function(c){return h(s),m(i.onInputFocus(c))})("blur",function(c){return h(s),m(i.onInputBlur(c))}),u()(),d(4,"div",4),b("click",function(c){h(s);let g=_(3);return m(i.onClick(c,g,!0))}),p(5,Ke,3,2,"ng-container",5),u()(),p(6,Re,2,10,"label",6)}n&2&&(D(i.styleClass),l("ngStyle",i.style)("ngClass",ee(28,Oe,i.checked(),i.disabled,i.focused,i.variant==="filled"||i.config.inputStyle()==="filled")),f("data-pc-name","checkbox")("data-pc-section","root"),r(),f("data-pc-section","hiddenInputWrapper")("data-p-hidden-accessible",!0),r(),l("value",i.value)("checked",i.checked())("disabled",i.disabled)("readonly",i.readonly)("autofocus",i.autofocus),f("id",i.inputId)("name",i.name)("tabindex",i.tabindex)("required",i.required)("aria-labelledby",i.ariaLabelledBy)("aria-label",i.ariaLabel)("aria-checked",i.checked())("data-pc-section","hiddenInput"),r(2),l("ngClass",R(33,Fe,i.checked(),i.disabled,i.focused)),f("data-p-highlight",i.checked())("data-p-disabled",i.disabled)("data-p-focused",i.focused)("data-pc-section","input"),r(),l("ngIf",i.checked()),r(),l("ngIf",i.label))},dependencies:()=>[ne,O,ae,se,Ce,W],styles:[`@layer primeng{.p-checkbox{display:inline-flex;cursor:pointer;-webkit-user-select:none;user-select:none;vertical-align:bottom;position:relative}.p-checkbox-disabled{cursor:default!important;pointer-events:none}.p-checkbox-box{display:flex;justify-content:center;align-items:center}p-checkbox{display:inline-flex;vertical-align:bottom;align-items:center}.p-checkbox-label{line-height:1}}
`],encapsulation:2,changeDetection:0})}return t})(),Le=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=S({type:t});static \u0275inj=M({imports:[w,be,W,fe]})}return t})();var Se=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=S({type:t});static \u0275inj=M({imports:[w]})}return t})();var We=()=>({width:"100%",right:"0",left:"0"}),ze=t=>({"920px":t});function Ue(t,a){t&1&&(d(0,"small",15),C(1,"Email is required"),u())}function Ge(t,a){t&1&&(d(0,"small",15),C(1,"Password is required"),u())}var At=(()=>{let a=class a{constructor(){this.loading=!1,this.loginObj=new we,this.router=T(oe),this.employee=T(xe),this.message=T(Q)}ngOnInit(){this.loginObj.email="admin@gmail.com",this.loginObj.password="Admin@119"}onLogin(){this.loading=!0,this.employee.login(this.loginObj).subscribe({next:n=>{n.result?(localStorage.setItem("user",JSON.stringify(n.data)),this.router.navigateByUrl("pages/dashboard")):(this.loading=!1,console.log(n.message),this.message.add({severity:"error",summary:"Error",detail:n.message}))},error:n=>{this.loading=!1,console.log(n),this.message.add({severity:"error",summary:"error",detail:"Invalid Credentials"})}})}};a.\u0275fac=function(i){return new(i||a)},a.\u0275cmp=L({type:a,selectors:[["app-login"]],standalone:!0,features:[V([Q]),Z],decls:19,vars:10,consts:[["email","ngModel"],["password","ngModel"],[3,"breakpoints"],[1,"surface-card","p-4","shadow-2","border-round","lg:w-4"],[1,"text-center"],[1,"flex","align-items-center","justify-content-center"],["src","https://cdn-icons-png.flaticon.com/512/10729/10729094.png","alt","ticket-icon","width","50","height","50"],[1,"text-900","text-2xl","font-bold"],[1,"mt-3"],["for","email1",1,"block","text-900","font-medium","mb-2"],["id","email1","type","text","placeholder","Email address","name","email","pInputText","","ngModel","","required","",1,"w-full","mb-3",3,"ngModelChange","ngModel"],["class","p-error mb-2",4,"ngIf"],["for","password1",1,"block","text-900","font-medium","mb-2"],["id","password1","type","password","placeholder","Password","name","password","pInputText","","ngModel","","required","",1,"w-full","mb-3",3,"ngModelChange","ngModel"],["pButton","","pRipple","","label","Sign In",1,"w-full",3,"click","loading","disabled"],[1,"p-error","mb-2"]],template:function(i,s){if(i&1){let o=I();y(0,"p-toast",2),d(1,"div",3)(2,"div",4)(3,"div",5),y(4,"img",6),d(5,"span",7),C(6," \xA0 Support Board"),u()()(),d(7,"div",8)(8,"label",9),C(9,"Email"),u(),d(10,"input",10,0),K("ngModelChange",function(g){return h(o),P(s.loginObj.email,g)||(s.loginObj.email=g),m(g)}),u(),p(12,Ue,2,0,"small",11),d(13,"label",12),C(14,"Password"),u(),d(15,"input",13,1),K("ngModelChange",function(g){return h(o),P(s.loginObj.password,g)||(s.loginObj.password=g),m(g)}),u(),p(17,Ge,2,0,"small",11),d(18,"button",14),b("click",function(){return h(o),m(s.onLogin())}),u()()()}if(i&2){let o=_(11),c=_(16);l("breakpoints",$(8,ze,Y(7,We))),r(10),N("ngModel",s.loginObj.email),r(2),l("ngIf",o.invalid&&(o.dirty||o.touched)),r(3),N("ngModel",s.loginObj.password),r(2),l("ngIf",c.invalid&&(c.dirty||c.touched)),r(),l("loading",s.loading)("disabled",o.invalid||c.invalid)}},dependencies:[w,O,Le,Se,ye,ve,ke,_e,me,re,de,he,ue,Me,Ie],styles:["[_nghost-%COMP%]{background-image:url(https://www.telnetww.com/wp-content/uploads/elementor/thumbs/data-center-features-qowadsdutjyf46hr7mv4oqpbmr140pkojp343q0io8.jpg);display:flex;height:100vh;justify-content:center;align-items:center;background-size:cover;margin:none}"]});let t=a;return t})();export{At as LoginComponent};

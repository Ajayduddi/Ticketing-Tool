import{a as i}from"./chunk-LLONOUOZ.js";import{a as r}from"./chunk-LPI7DW4Z.js";import{a as o}from"./chunk-2AQ67VSH.js";import{P as p,U as a}from"./chunk-QG64PWEM.js";var c=(()=>{let e=class e{constructor(t){this.http=t}getDept(){return this.http.get(r.API_URL+i.API_ENDPOINTS.GetDepartments,{withCredentials:!0})}createDept(t){return this.http.post(r.API_URL+i.API_ENDPOINTS.CreateDepartment,t,{withCredentials:!0})}updateDept(t){return this.http.put(r.API_URL+i.API_ENDPOINTS.UpdateDepartment+"/"+t._id,t,{withCredentials:!0})}deleteDept(t){return this.http.delete(r.API_URL+i.API_ENDPOINTS.DeleteDepartment+"/"+t,{withCredentials:!0})}};e.\u0275fac=function(s){return new(s||e)(a(o))},e.\u0275prov=p({token:e,factory:e.\u0275fac,providedIn:"root"});let n=e;return n})();export{c as a};

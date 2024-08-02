import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Constant } from '../constant/constant';
import { Observable } from 'rxjs';
import { Api_Response, ChildcaregoryModel, ParentCategoryModel } from '../models/api.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  constructor(private http:HttpClient) { }

  // get parent categories
  getParentCategories():Observable<Api_Response> {
    return this.http.get<Api_Response>(environment.API_URL+Constant.API_ENDPOINTS.GetParentCategories, {withCredentials:true});
  }

  // create parent category
  createParentCategory(parentCategory:ParentCategoryModel):Observable<Api_Response> {
    return this.http.post<Api_Response>(environment.API_URL+Constant.API_ENDPOINTS.CreateParentCategory, parentCategory, {withCredentials:true});
  }

  // update parent category
  updateParentCategory(parentCategory:ParentCategoryModel):Observable<Api_Response> {
    return this.http.put<Api_Response>(environment.API_URL+Constant.API_ENDPOINTS.UpdateParentCategory+'/'+parentCategory._id, parentCategory,{withCredentials:true});
  }

  // delete parent category
  deleteParentCategory(parentCategoryId:string):Observable<Api_Response> {
    return this.http.delete<Api_Response>(environment.API_URL+Constant.API_ENDPOINTS.DeleteParentCategory+'/'+parentCategoryId,{withCredentials:true});
  }

  // get child categories
  getChildCategories(): Observable<Api_Response> { 
    return this.http.get<Api_Response>(environment.API_URL+Constant.API_ENDPOINTS.GetChildCategories, {withCredentials:true});
  }
  
  // get child categories by parent category id
  getChildCategoriesByParentCategoryId(parentCategoryId:string): Observable<Api_Response> { 
    return this.http.get<Api_Response>(environment.API_URL+Constant.API_ENDPOINTS.GetChildCategoryByParentId+'/'+parentCategoryId, {withCredentials:true});
  }
  
  // create child category
  createChildCategory(childCategory:ChildcaregoryModel): Observable<Api_Response> { 
    return this.http.post<Api_Response>(environment.API_URL+Constant.API_ENDPOINTS.CreateChildCategory, childCategory, {withCredentials:true});
  }

  // update child category
  updateChildCategory(childCategory:ChildcaregoryModel): Observable<Api_Response> { 
    return this.http.put<Api_Response>(environment.API_URL+Constant.API_ENDPOINTS.UpdateChildCategory+'/'+childCategory._id, childCategory, {withCredentials:true});
  }

  // delete child category
  deleteChildCategory(childCategoryId:string): Observable<Api_Response> { 
    return this.http.delete<Api_Response>(environment.API_URL+Constant.API_ENDPOINTS.DeleteChildCategory+'/'+childCategoryId, {withCredentials:true});
  }
}

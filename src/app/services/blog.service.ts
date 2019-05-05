import { Injectable } from '@angular/core';
import { HttpClient }    from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})

export class BlogService  { 
    constructor(private http: HttpClient) { }

    saveBlog(blog: any) {
        return this.http.post(environment.baseUrl+'/blog/saveBlog', blog);
    }

    getApprovedBlogList(){
        return this.http.get(environment.baseUrl + '/blog/approvedBlogs');
    }

    getBlogDetails(blogId:string){
        return this.http.get(environment.baseUrl + `/blog/approvedBlogs/${blogId}`);
    }

}
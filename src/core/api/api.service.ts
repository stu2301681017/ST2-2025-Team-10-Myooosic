import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { ApiRoute } from './api.routes';

export interface ApiResponse<T> {
    data: T,
    status: number,
    response: string,
    success: boolean
}

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private apiBase = 'api';

    constructor(
        private http: HttpClient
    ) {}

    public get<T>(url: ApiRoute, params?: {[key: string]: string}): Observable<T> {
        return this.http.get<ApiResponse<T>>(params ? Object.keys(params).reduce(((p, c) => p.replace('{'+c+'}', params[c])), this.apiBase + url) : this.apiBase + url)
            .pipe(map(x => x.data))
            .pipe(catchError(err => {throw new Error(err.error.response)}))
    }

    public post<T>(url: ApiRoute, body: any, params?: {[key: string]: string}): Observable<T> {
        return this.http.post<ApiResponse<T>>(params ? Object.keys(params).reduce(((p, c) => p.replace('{'+c+'}', params[c])), this.apiBase + url) : this.apiBase + url, body)
            .pipe(map(x => x.data))
            .pipe(catchError(err => {throw new Error(err.error.response)}))
    }

    public delete<T>(url: ApiRoute, params?: {[key: string]: string}): Observable<T> {
        return this.http.delete<ApiResponse<T>>(params ? Object.keys(params).reduce(((p, c) => p.replace('{'+c+'}', params[c])), this.apiBase + url) : this.apiBase + url)
            .pipe(map(x => x.data))
            .pipe(catchError(err => {throw new Error(err.error.response)}))
    }
    
    public put<T>(url: ApiRoute, body: any, params?: {[key: string]: string}): Observable<T> {
        return this.http.put<ApiResponse<T>>(params ? Object.keys(params).reduce(((p, c) => p.replace('{'+c+'}', params[c])), this.apiBase + url) : this.apiBase + url, body)
            .pipe(map(x => x.data))
            .pipe(catchError(err => {throw new Error(err.error.response)}))
    }

}

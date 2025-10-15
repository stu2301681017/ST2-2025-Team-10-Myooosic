import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiRoute } from './api.routes';
import { Observable, of, switchMap, throwError } from 'rxjs';

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

    private apiBase = '';

    constructor(
        private http: HttpClient
    ) {}

    public get<T>(url: ApiRoute, params?: {[key: string]: string}): Observable<T> {
        return this.http.get<ApiResponse<T>>(params ? Object.keys(params).reduce(((p, c) => p.replace('{'+c+'}', params[c])), this.apiBase + url) : this.apiBase + url)
            .pipe(switchMap(response => {
                if (response.success) {
                    return of(response.data);
                } else {
                    return throwError(() => new Error('Failed to GET with status ' + response.status + ': ' + response.response));
                }
            }))
    }

    public post<T>(url: ApiRoute, body: any, params?: {[key: string]: string}): Observable<T> {
        return this.http.post<ApiResponse<T>>(params ? Object.keys(params).reduce(((p, c) => p.replace('{'+c+'}', params[c])), this.apiBase + url) : this.apiBase + url, body)
            .pipe(switchMap(response => {
                if (response.success) {
                    return of(response.data);
                } else {
                    return throwError(() => new Error('Failed to POST with status ' + response.status + ': ' + response.response));
                }
            }))
    }

    public delete<T>(url: ApiRoute, params?: {[key: string]: string}): Observable<null> {
        return this.http.delete<ApiResponse<T>>(params ? Object.keys(params).reduce(((p, c) => p.replace('{'+c+'}', params[c])), this.apiBase + url) : this.apiBase + url)
            .pipe(switchMap(response => {
                if (response.success) {
                    return of(null);
                } else {
                    return throwError(() => new Error('Failed to DELETE with status ' + response.status + ': ' + response.response));
                }
            }))
    }

}

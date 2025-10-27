import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { ApiRoute } from './api.routes';
import _ from 'lodash';

export interface ApiResponse<T> {
    data: T,
    status: number,
    response: string,
    success: boolean
}

const defaultErrorHandler = {
    500: (response: string) => new Error("The server responded with an error. ("+response+")"),
    501: (response: string) => new Error("The server is currently unresponsive. Try again later. ("+response+")"),
    400: (response: string) => new Error("The client has sent a bad request. ("+response+")"),
    403: (response: string) => new Error("You do not have permission."),
    404: (response: string) => new Error("The requested resource has not been found."),
    default: (response: string) => new Error("An error has occured."),
}

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private apiBase = 'api';

    constructor(
        private http: HttpClient
    ) {}

    public get<T>(url: ApiRoute, params: {[key: string]: string}, errorHandler?: {[key: number]: (response: string) => Error}): Observable<T> {
        return this.http.get<ApiResponse<T>>(params ? Object.keys(params).reduce(((p, c) => p.replace('{'+c+'}', params[c])), this.apiBase + url) : this.apiBase + url)
            .pipe(map(x => x.data))
            .pipe(catchError((err: HttpErrorResponse) => {
                const handler = _.merge(_.cloneDeep(defaultErrorHandler), errorHandler)
                throw handler[err.status](err.error.response);
            }))
    }

    public post<T>(url: ApiRoute, body: any, params: {[key: string]: string}, errorHandler?: {[key: number]: (response: string) => Error}): Observable<T> {
        return this.http.post<ApiResponse<T>>(params ? Object.keys(params).reduce(((p, c) => p.replace('{'+c+'}', params[c])), this.apiBase + url) : this.apiBase + url, body)
            .pipe(map(x => x.data))
            .pipe(catchError((err: HttpErrorResponse) => {
                const handler = _.merge(_.cloneDeep(defaultErrorHandler), errorHandler)
                throw handler[err.status](err.error.response);
            }))
    }

    public delete<T>(url: ApiRoute, params: {[key: string]: string}, errorHandler?: {[key: number]: (response: string) => Error}): Observable<T> {
        return this.http.delete<ApiResponse<T>>(params ? Object.keys(params).reduce(((p, c) => p.replace('{'+c+'}', params[c])), this.apiBase + url) : this.apiBase + url)
            .pipe(map(x => x.data))
            .pipe(catchError((err: HttpErrorResponse) => {
                const handler = _.merge(_.cloneDeep(defaultErrorHandler), errorHandler)
                throw handler[err.status](err.error.response);
            }))
    }
    
    public put<T>(url: ApiRoute, body: any, params: {[key: string]: string}, errorHandler?: {[key: number]: (response: string) => Error}): Observable<T> {
        return this.http.put<ApiResponse<T>>(params ? Object.keys(params).reduce(((p, c) => p.replace('{'+c+'}', params[c])), this.apiBase + url) : this.apiBase + url, body)
            .pipe(map(x => x.data))
            .pipe(catchError((err: HttpErrorResponse) => {
                const handler = _.merge(_.cloneDeep(defaultErrorHandler), errorHandler)
                throw handler[err.status](err.error.response);
            }))
    }

}

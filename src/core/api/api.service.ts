import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { catchError, map, Observable, tap } from 'rxjs';
import { ApiRoute } from './api.routes';
import _ from 'lodash';

export interface ApiResponse<T> {
    data: T,
    status: number,
    response: string,
    success: boolean
}

export type ApiParams = {[key: string]: string};

export type ApiErrorHandler = {[key: number]: (response: string) => Error};

const defaultErrorHandler: ApiErrorHandler = {
    500: (response: string) => new Error("The server responded with an error. ("+response+")"),
    503: (response: string) => new Error("The server is currently unresponsive. Try again later. ("+response+")"),
    400: (response: string) => new Error("The client has sent a bad request. ("+response+")"),
    403: (response: string) => new Error("You do not have permission."),
    404: (response: string) => new Error("The requested resource has not been found."),
}

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private apiBase = 'api';

    constructor(
        private http: HttpClient
    ) {}

    public get<T>(url: ApiRoute, params: ApiParams, errorHandler?: ApiErrorHandler): Observable<T> {
        return this.http.get<ApiResponse<T>>(this.apiBase + this.applyApiParameters(url, params))
            .pipe(catchError((httpError: HttpErrorResponse) => {throw this.extractResponseFromHttpError(httpError)}))
            .pipe(tap(x => { if (!x.success) { throw x }}))
            .pipe(catchError((erroredResponse: ApiResponse<void>) => {throw this.catchErroredResponse(erroredResponse, errorHandler)}))
            .pipe(map(x => x.data))
    }

    public post<T>(url: ApiRoute, body: any, params: ApiParams, errorHandler?: ApiErrorHandler): Observable<T> {
        return this.http.post<ApiResponse<T>>(this.apiBase + this.applyApiParameters(url, params), body)
            .pipe(catchError((httpError: HttpErrorResponse) => {throw this.extractResponseFromHttpError(httpError)}))
            .pipe(tap(x => { if (!x.success) { throw x }}))
            .pipe(catchError((erroredResponse: ApiResponse<void>) => {throw this.catchErroredResponse(erroredResponse, errorHandler)}))
            .pipe(map(x => x.data))
    }

    public delete<T>(url: ApiRoute, params: ApiParams, errorHandler?: ApiErrorHandler): Observable<T> {
        return this.http.delete<ApiResponse<T>>(this.apiBase + this.applyApiParameters(url, params))
            .pipe(catchError((httpError: HttpErrorResponse) => {throw this.extractResponseFromHttpError(httpError)}))
            .pipe(tap(x => { if (!x.success) { throw x }}))
            .pipe(catchError((erroredResponse: ApiResponse<void>) => {throw this.catchErroredResponse(erroredResponse, errorHandler)}))
            .pipe(map(x => x.data))
    }
    
    public put<T>(url: ApiRoute, body: any, params: ApiParams, errorHandler?: ApiErrorHandler): Observable<T> {
        return this.http.put<ApiResponse<T>>(this.apiBase + this.applyApiParameters(url, params), body)
            .pipe(catchError((httpError: HttpErrorResponse) => {throw this.extractResponseFromHttpError(httpError)}))
            .pipe(tap(x => { if (!x.success) { throw x }}))
            .pipe(catchError((erroredResponse: ApiResponse<void>) => {throw this.catchErroredResponse(erroredResponse, errorHandler)}))
            .pipe(map(x => x.data))
    }

    // Angular throws HttpErrorResponse if any status of 4xx or 5xx is returned.
    // We wish to work with the response that we get, as it has information of the error.
    // If there is no response from the server, then we interpret the HttpErrorResponse as one, using its data.
    private extractResponseFromHttpError(erroredResponse: HttpErrorResponse) {
        return {
            data: erroredResponse.error?.data ?? null,
            status: erroredResponse.error?.status ?? erroredResponse.status,
            response: erroredResponse.error?.response ?? "No response",
            success: erroredResponse.error?.success ?? false
        }
    }

    // We do not believe HttpErrorResponse, only our own ApiResponse.
    // In some cases (such as proxies), HTTP headers might get mangled, and an error could be returned with 200 OK headers.
    // Thus, we take the status given in the ApiResponse as the only source of truth.
    private catchErroredResponse(erroredResponse: ApiResponse<void>, errorHandler?: {[key: number]: (response: string) => Error}) {
        const handler = _.merge(_.cloneDeep(defaultErrorHandler), errorHandler)
        const handlerFn = handler[erroredResponse.status] ?? ((response) => "An unknown error has occured. ("+response+")");
        return handlerFn(erroredResponse.response);
    }

    private applyApiParameters<T>(url: ApiRoute, params: ApiParams): string {
        return (params ? Object.keys(params).reduce(((p, c) => p.replace('{'+c+'}', params[c])), url) : url);
    }

}

export namespace Auth {
    
    export interface LoginRequest {
        name: string,
        password: string
    }

    export interface RegisterRequest {
        name: string,
        password: string
    }

    export type UserId = string;

}
import { computed, effect, Injectable, signal, Signal } from "@angular/core";
import { ApiService } from "../api/api.service";
import { ApiRoute } from "../api/api.routes";
import { catchError, Observable, tap } from "rxjs";
import { Auth } from "./auth";

@Injectable({ providedIn: 'root' })
export class AuthService {

    private userId = signal<Auth.UserId | null | undefined>(undefined);

    constructor(private apiService: ApiService) {
        apiService.get<Auth.UserId>(ApiRoute.WHOAMI, {})
            .pipe(tap(this.userId.set))
            .subscribe();
    }

    public updateUserId(userId: Auth.UserId): void {
        this.userId.set(userId);
    }

    public getUserId(): Signal<Auth.UserId | null | undefined> {
        return this.userId.asReadonly();
    }

    public isLoggedIn(): Signal<boolean> {
        return computed(() => this.userId() != null);
    }

    public login(loginRequest: Auth.LoginRequest): Observable<void> {
        return this.apiService.post<void>(
            ApiRoute.LOGIN,
            loginRequest,
            {},
            ({
                400: (err) => new Error("Invalid request: "+err),
                401: (err) => new Error("Wrong name/password")
            })
        )
            .pipe(tap(x => this.userId.set(loginRequest.name)));
    }

    public register(registerRequest: Auth.RegisterRequest): Observable<void> {
        return this.apiService.post<void>(
            ApiRoute.REGISTER,
            registerRequest,
            {},
            ({
                400: (err) => new Error("Invalid request: "+err),
                409: (err) => new Error("Username already taken")
            })
        )
    }

    public logoff(): Observable<void> {
        return this.apiService.post<void>(
            ApiRoute.LOGOFF,
            {},
            {}
        )
            .pipe(tap(x => this.userId.set(null)));
    }
}
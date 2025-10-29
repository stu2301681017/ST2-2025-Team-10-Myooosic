import { computed, Injectable, signal, Signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Suggestion } from '../../core/Suggestion';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../core/api/api.service';
import { ApiRoute } from '../../core/api/api.routes';
import { catchError, EMPTY, map, Observable, takeUntil, tap } from 'rxjs';
import { loading, Loading, LoadingSource, loadingSource } from '../../core/loading';
import { AuthService } from '../../core/auth/auth.service';

@Injectable()
export class ResultsService {

    private results = signal<LoadingSource<Suggestion>[]>([], { equal: () => false }); // force updates
    private latestError = signal<Error | undefined>(undefined);
    private atLeastOneLoaded = signal<boolean>(false);
    private latestQuery = signal<string | undefined>(undefined);

    constructor(
        private api: ApiService,
        private auth: AuthService
    ) {
    }

    public hasAtLeastOneLoaded(): Signal<boolean> {
        return this.atLeastOneLoaded.asReadonly();
    }

    public suggestNew(prompt: string, amount: number = 1): void {
        for (let i = 0; i < amount; i++) {
            
            let newIndex: number = -1;
            this.results.update(results => {
                newIndex = results.push(loadingSource()) - 1;
                return results;
            })
            this.reSuggest(prompt, newIndex);
        }
    }

    public reSuggest(prompt: string, index: number): void {

        this.latestQuery.set(prompt);
        this.results.update(x => { x[index] = loadingSource(); return x});

        let snapshot = this.results()[index];
        this.api.get<Suggestion>(ApiRoute.SUGGESTION_SINGLE, {prompt})
            .pipe(tap(suggestion => {
                if (this.results()[index] != snapshot) {
                    // something changed the suggestion, such as a reset. abort
                    return;
                }
                this.results.update(results => {
                    results[index].value = suggestion;
                    results[index].isLoading = false;
                    return results;
                })
                this.atLeastOneLoaded.set(true);
            }))
            .pipe(catchError(err => {
                if (this.results()[index] != snapshot) {
                    // something changed the suggestion, such as a reset. abort
                    return EMPTY;
                }
                this.results.update(results => {
                    results[index].error = err
                    results[index].isLoading = false;
                    return results;
                });
                this.latestError.set(err);
                return EMPTY;
            }))
            .subscribe();
    }

    public reset(): void {
        this.results.set([]);
        this.latestError.set(undefined);
    }

    public getLatestError(): Signal<Error | undefined> {
        return this.latestError.asReadonly();
    }

    public getResultsAmount(): Signal<number> {
        return computed(() => this.results().length)
    }

    public getSuggestionByIndex(index: Signal<number | undefined>): Loading<Suggestion> {
        return loading(            
            computed(() => { const vIndex = index(); return vIndex != undefined ? this.results()[vIndex].value : undefined }),
            computed(() => { const vIndex = index(); return vIndex != undefined ? this.results()[vIndex].error : undefined }),
            computed(() => { const vIndex = index(); return vIndex != undefined ? this.results()[vIndex].isLoading : true }),
        );
    }

    public save(): void {
        let suggestions = this.results().filter(x => x.isLoading == false).map(x =>{
            return {
                identifier:
                {
                    name: x.value?.song.name,
                    author: x.value?.song.author
                },
                reason: x.value?.reason
            }
        });
        this.api.post(ApiRoute.PERSISTENCE, {
            prompt: { query: this.latestQuery() },
            suggestions
        }, {})
            .subscribe();
    }

}

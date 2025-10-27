import { computed, Injectable, signal, Signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Suggestion } from '../../core/Suggestion';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../core/api/api.service';
import { ApiRoute } from '../../core/api/api.routes';
import { catchError, EMPTY, map, Observable, tap } from 'rxjs';
import { loading, Loading, LoadingSource, loadingSource } from '../../core/loading';

@Injectable()
export class ResultsService {

    private results = signal<LoadingSource<Suggestion>[]>([]);
    private latestError = signal<Error | undefined>(undefined);

    constructor(
        private api: ApiService
    ) {
        
    }

    public suggestNew(prompt: string, amount: number = 1): void {
        for (let i = 0; i < amount; i++) {
            let newIndex: number = -1;
            this.results.update(results => {
                newIndex = results.push(loadingSource());
                return results;
            })
            this.reSuggest(prompt, newIndex);
        }
    }

    public reSuggest(prompt: string, index: number): void {
        this.api.get<Suggestion>(ApiRoute.SUGGESTION_SINGLE, {prompt})
            .pipe(tap(suggestion => {
                this.results.update(results => {
                    results[index].value = suggestion;
                    results[index].isLoading = false;
                    return results;
                })
            }))
            .pipe(catchError(err => {
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
    }

    public getLatestError(): Signal<Error | undefined> {
        return this.latestError.asReadonly();
    }

    public getResultsAmount(): Signal<number> {
        return computed(() => this.results().length)
    }

    public getSuggestionByIndex(index: Signal<number | undefined>): Loading<Suggestion> {
        const vindex = index();
        return loading(            
            computed(() => vindex ? this.results()[vindex].value : undefined),
            computed(() => vindex ? this.results()[vindex].error : undefined),
            computed(() => vindex ? this.results()[vindex].isLoading : true)
        );
    }

}

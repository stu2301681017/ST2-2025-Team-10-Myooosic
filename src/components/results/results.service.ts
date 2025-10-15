import { computed, Injectable, signal, Signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Suggestion } from '../../core/Suggestion';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../core/api/api.service';
import { ApiRoute } from '../../core/api/api.routes';
import { map, Observable } from 'rxjs';
import { Song } from '../../core/Song';
import { Loading } from '../../core/loading';

@Injectable()
export class ResultsService {

    private results = rxResource({
        params: () => this.prompt(),
        stream: ({params}) => this.api.post<Suggestion[]>(ApiRoute.SUGGESTIONS, params)
    })
    private prompt = signal<string | null | undefined>(undefined).asReadonly();

    constructor(
        private api: ApiService
    ) {}

    public followPrompt(prompt: Signal<string | null | undefined>): void {
        this.prompt = prompt;
    }

    public getResultsAmount(): Loading<number> {
        return {
            value: computed(() => {
                if (this.results.hasValue()) {
                    return this.results.value().length;
                }
                return undefined;
            }),
            isLoading: this.results.isLoading,
            hasValue: computed(() => this.results.hasValue()),
            error: this.results.error
        }
    }

    public getResultByIndex(index: Signal<number | undefined>): Loading<Suggestion> {
        this.results.status
        return {
            value: computed(() => {
                if (this.results.hasValue()) {
                    const i = index();
                    return i ? this.results.value()[i] : undefined
                }
                return undefined;
            }),
            isLoading: this.results.isLoading,
            hasValue: computed(() => this.results.hasValue()),
            error: this.results.error
        };
    }

}

import { computed, Injectable, signal, Signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Suggestion } from '../../core/Suggestion';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../core/api/api.service';
import { ApiRoute } from '../../core/api/api.routes';
import { map, Observable } from 'rxjs';
import { loading, Loading } from '../../core/loading';

@Injectable()
export class ResultsService {

    private results = rxResource({
        params: () => {
            const prompt = this.prompt();
            return prompt ? { prompt } : undefined
        },
        stream: ({params}) => this.api.get<Suggestion[]>(ApiRoute.SUGGESTIONS, params)
    })
    private prompt = signal<string | undefined>(undefined).asReadonly();

    constructor(
        private api: ApiService
    ) {}

    public followPrompt(prompt: Signal<string | undefined>): void {
        this.prompt = prompt;
    }

    public getResultsAmount(): Loading<number> {
        
        return loading(
            computed(() => {
                if (this.results.hasValue()) {
                    return this.results.value().length;
                }
                return undefined;
            }),
            this.results.error,
            this.results.isLoading
        );
    }

    public getResultByIndex(index: Signal<number | undefined>): Loading<Suggestion> {
        this.results.status
        return loading(
            computed(() => {
                if (this.results.hasValue()) {
                    const i = index();
                    return i ? this.results.value()[i] : undefined
                }
                return undefined;
            }),
            signal(undefined),
            this.results.isLoading
        );
    }

}

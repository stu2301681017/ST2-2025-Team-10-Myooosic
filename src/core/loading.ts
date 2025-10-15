import { Signal } from "@angular/core";

export interface Loading<T> {
    value: Signal<T | undefined>,
    hasValue: Signal<boolean>,
    isLoading: Signal<boolean>,
    error: Signal<Error | undefined>
}
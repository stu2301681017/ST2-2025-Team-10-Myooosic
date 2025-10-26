import { computed, ResourceRef, Signal } from "@angular/core";

export interface Loading<T> {
    value: Signal<T | undefined>,
    hasValue: Signal<boolean>,
    hasError: Signal<boolean>,
    isLoading: Signal<boolean>,
    error: Signal<Error | undefined>
}

export function loading<T>(value: Signal<T | undefined>, error: Signal<Error | undefined>, isLoading: Signal<boolean>): Loading<T> {
    return {
        value,
        hasValue: computed(() => value() !== undefined && error() === undefined && isLoading() == false),
        isLoading,
        hasError: computed(() => error() !== undefined && isLoading() == false),
        error
    }
}
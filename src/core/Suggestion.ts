import { Song } from "./Song";

export interface Suggestion {
    song: Song,
    prompt: string,
    reason: string
}
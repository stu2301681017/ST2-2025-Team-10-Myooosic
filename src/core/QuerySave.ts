import { Song } from "./Song"

export interface QuerySave {
    prompt: { query: string },
    suggestions: {
        song: Song,
        prompt: string,
        reason: string
    }[]
}
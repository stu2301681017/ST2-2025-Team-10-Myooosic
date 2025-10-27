export enum ApiRoute {
    // GET(string): Returns suggestions for songs for the query given in the string. 
    SUGGESTIONS = "/query/{prompt}",
    SUGGESTION_SINGLE = "/query/single/{prompt}"
}
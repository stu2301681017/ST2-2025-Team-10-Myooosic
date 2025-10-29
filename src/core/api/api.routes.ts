export enum ApiRoute {
    SUGGESTIONS = "/query/{prompt}",
    SUGGESTION_SINGLE = "/query/single/{prompt}",

    LOGIN = "/login",
    LOGOFF = "/logoff",
    WHOAMI = "/whoami",
    REGISTER = "/register",

    PERSISTENCE = "/query/save"


}
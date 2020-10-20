export enum RouteEnum {
    login = "/login",
    principal = "/principal"
}

class RouteManager {
    public changeRoute(destination: RouteEnum, parameters?: any) : void {
        window.location.href = destination;
    }
};

export default new RouteManager();
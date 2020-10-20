import ArchitectureExceptionInformation from "../resources/dto/ArchitectureExceptionInformation";
import UserAuthorizationDTO from "../resources/dto/UserAuthorizationDTO";
import UserLoginBean from "../resources/dto/UserLoginBean";
import userAuthorizationResource from "../resources/UserAuthorizationResource";
import routeManager, { RouteEnum } from "./RouteManager";
import {IResourceCallback} from "../resources/RestResource";

export interface LoginInfo {
    userName : string;
    password: string;
    callback?: IResourceCallback<UserAuthorizationDTO, ArchitectureExceptionInformation>;
};

class ContextManager {
    public login(loginInfo: LoginInfo) : void {
        let loginData = new UserLoginBean(loginInfo.userName, loginInfo.password);

        userAuthorizationResource.login(loginData, {
            onError: (error: ArchitectureExceptionInformation) => {
                loginInfo.callback?.onError(error);
            },
            onSuccess: (success: UserAuthorizationDTO) => {
                this.loginSuccess(success);
                loginInfo.callback?.onSuccess(success);
            }
        });
    }

    private loginSuccess(success: UserAuthorizationDTO) {
        routeManager.changeRoute(RouteEnum.principal);
    }
};

export default new ContextManager();
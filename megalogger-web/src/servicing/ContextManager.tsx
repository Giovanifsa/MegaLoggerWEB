import ArchitectureExceptionInformation from "../resources/dto/ArchitectureExceptionInformation";
import UserAuthorizationDTO from "../resources/dto/UserAuthorizationDTO";
import UserLoginBean from "../resources/dto/UserLoginBean";
import userAuthorizationResource from "../resources/UserAuthorizationResource";
import routeManager, { RouteEnum } from "./RouteManager";
import {IResourceCallback} from "../resources/RestResource";
import UserDTO from "../resources/dto/UserDTO";
import Locale from "../translations/locale/Locale";
import { getLocaleDefinition } from "../translations/Translator";

export interface LoginInfo {
    userName : string;
    password: string;
    callback?: IResourceCallback<UserAuthorizationDTO, ArchitectureExceptionInformation>;
};

class ContextManager {
    public currentUser?: UserDTO;
    public currentLocale: Locale;

    constructor() {
        this.currentLocale = getLocaleDefinition("PT_BR");
    }

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
        this.currentUser = success.user;

        //routeManager.changeRoute(RouteEnum.principal);
    }
};

export default new ContextManager();
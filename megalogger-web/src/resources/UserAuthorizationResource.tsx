import IActionCallback from "../common/IActionCallback";
import ArchitectureExceptionInformation from "./dto/ArchitectureExceptionInformation";
import UserAuthorizationDTO from "./dto/UserAuthorizationDTO";
import UserLoginBean from "./dto/UserLoginBean";
import RestResource from "./RestResource";

class UserAuthorizationResource extends RestResource {
    protected baseURL: string = this.getBaseURL() + "/systemuserauthorization";

    public login(loginData: UserLoginBean, callback: IActionCallback<UserAuthorizationDTO, ArchitectureExceptionInformation>) {
        const loginURL = this.baseURL + "/login";
        
        this.POST(loginURL, loginData, callback);
    }
};

export default new UserAuthorizationResource();
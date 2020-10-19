import ArchitectureExceptionInformation from "../resources/dto/ArchitectureExceptionInformation";
import UserAuthorizationDTO from "../resources/dto/UserAuthorizationDTO";
import UserLoginBean from "../resources/dto/UserLoginBean";
import userAuthorizationResource from "../resources/UserAuthorizationResource";

class ContextManager {
    public login(userName : string, password: string) : void {
        console.log("teste");

        let loginData = new UserLoginBean(userName, password);

        userAuthorizationResource.login(loginData, {
            onError: this.loginError,
            onSuccess: this.loginSuccess
        });
    }

    private loginError(error: ArchitectureExceptionInformation) {
        console.log("Oporra!!!" + error.message);
    }

    private loginSuccess(success: UserAuthorizationDTO) {
        console.log("Logou!!!" + success.authorization);
    }
};

export default new ContextManager();
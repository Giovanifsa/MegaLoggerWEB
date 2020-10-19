import DTO from "./DTO";

export default class UserLoginBean extends DTO {
    public userName: string;
    public password: string;

    constructor(userName: string, password: string) {
        super();
        
        this.userName = userName;
        this.password = password;
    }
};
import UserDTO from "./UserDTO";

export default interface UserAuthorizationDTO {
    idUserAuthorization: number;
    user: UserDTO;
    authorization: string;
    expirationDate: Date;
};
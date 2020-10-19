import UserDTO from "./UserDTO";

export default interface UserAuthorizationDTO {
    idUserAuthorization: number;
    userDTO: UserDTO;
    authorization: string;
    expirationDate: Date;
};
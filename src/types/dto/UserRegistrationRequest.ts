import type { Gender } from "../general/GenderType";

export interface UserRegistrationRequest {
    userName : string;
    password : string;
    email : string;
    name : string;
    lastName : string;
    dateOfBirth : Date;
    height : number;
    gender : Gender;
}
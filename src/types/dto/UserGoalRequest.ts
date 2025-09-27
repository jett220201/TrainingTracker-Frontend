export interface UserGoalRequest {
    id? : number;
    description : string;
    targetValue : number;
    goalType : number;
    goalDirection : number;
    goalDate : string;
}
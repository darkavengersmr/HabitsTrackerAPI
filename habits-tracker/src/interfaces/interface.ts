import { Request } from "express"

export interface IHabit {    
    title: string
    category: string
    tracker: {
        [key: string]: number
    }
}

export interface ITracker {        
    tracker: {
        [key: string]: number
    }
}

export interface IJwtToken {
    token: string
}

export interface IRequestWithUserInfo extends Request {
    user: {
        username: string
        email: string
        id: string
    }    
}
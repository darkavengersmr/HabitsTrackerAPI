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
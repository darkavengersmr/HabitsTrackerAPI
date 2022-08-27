export class UpdateHabitDto {
    user: number
    title: string
    category: string
    tracker: {
        [key: string]: number
    }
}
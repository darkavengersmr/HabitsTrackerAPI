export class CreateHabitDto {
    user: number
    title: string
    category: string
    tracker: {
        [key: string]: number
    }
}
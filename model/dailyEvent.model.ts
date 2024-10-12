export interface DailyEvent{
    idEvent: number | string;
    userid: number | string;
    daysOfWeek:string;
    startTime:string;
    endTime:string;
    title:string
    description:string;
    priority:string;
    color : string;
}
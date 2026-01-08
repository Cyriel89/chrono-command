export interface ClockModel {
    id: number;
    name: string;
    room: string;
    status: string;
    timeShift: number; 
    createdAt: string;
    manualOffset: number;
    alarmInterval: number;
}
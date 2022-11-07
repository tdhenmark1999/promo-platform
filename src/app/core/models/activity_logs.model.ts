export interface ActivityLogs {
    activityName:string;
    activityDate:string;
}

export class ActivityLogsStateModel {
    activity_logs!: ActivityLogs[] | undefined;
    isActivityLogsLoading!:boolean | any;
}
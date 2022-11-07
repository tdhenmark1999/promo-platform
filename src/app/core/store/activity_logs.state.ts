import { Action, Selector, State, StateContext } from "@ngxs/store";
import { catchError, tap, throwError } from 'rxjs';

import { ActivityLogs } from './../models/activity_logs.model';
import { ActivityLogsService } from './../../services/activity-logs.service';
import { ActivityLogsStateModel } from "../models/activity_logs.model";
import { Injectable } from "@angular/core";
import { getActivityLogs } from './activity_logs.actions';

@State<ActivityLogsStateModel>({
    name:'activity_logs',
    defaults:{
        activity_logs:undefined,
        isActivityLogsLoading:undefined
    }
})


@Injectable()
export class ActivityLogsState {

    @Selector()
    static getActivityLogs(state:ActivityLogsStateModel){
        return state.activity_logs
    }

    constructor(private activityLogsService:ActivityLogsService){

    }

    @Action(getActivityLogs)
    getActivityLogs({patchState}: StateContext<ActivityLogsStateModel>,{ id }: getActivityLogs){
        patchState({isActivityLogsLoading:true})
        return this.activityLogsService.getActivityLogs(id).pipe(
            tap((result:ActivityLogs[])=>{
                patchState({
                    activity_logs:result['response']
                })
            }),
            catchError((err) => {
                return throwError(() => new Error(err));
            })
        )
    }

}
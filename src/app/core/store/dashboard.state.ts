import { CampaignService } from './../../services/campaign.service';
import { getAllDashboardData, getDashboardDataPerPage, DeleteDashboardData } from './dashboard.action';
import { Injectable } from "@angular/core";
import { Action, Select, Selector, State, StateContext, Store } from "@ngxs/store";
import { DashboardService } from "src/app/services/dashboard.service";
import { Dashboard, DashboardStateModel } from "../models/dashboard.model";
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { patch, append, removeItem, insertItem, updateItem } from '@ngxs/store/operators';


@State<DashboardStateModel>({
    name:'dashboard',
    defaults:{
        dashboard_data!:undefined,
        dashboard_datas:[],
        isDashboardLoading:undefined,
        totalPages: undefined,
        itemsPerPage: undefined,
        currentPage: undefined,
        searchText: undefined,
        pageSize:undefined,
        isDashboardPerPageLoading: undefined,
        numberOfRecords: undefined,
        isCampaignTableEmpty: undefined,
        search: undefined,
        service: undefined,
        status: 0
    }
})

@Injectable()
export class DashboardState {

    @Selector()
    static getAllDashboardData(state:DashboardStateModel){
        return state.dashboard_datas
    }

    @Selector()
    static getTotalPages(state:DashboardStateModel){
        return state.totalPages
    }

    @Selector()
    static getDashboardDataPerPage(state:DashboardStateModel){
        return state.itemsPerPage
    }

    @Selector()
    static getCurrentPage(state:DashboardStateModel){
        return state.currentPage
    }

    @Selector()
    static getNumberOfRecords(state: DashboardStateModel){
        return state.numberOfRecords
    }

    @Selector()
    static getPageSize(state:DashboardStateModel){
        return state.pageSize
    }

    @Selector()
    static getIsCampaignTableEmpty(state:DashboardStateModel){
        return state.isCampaignTableEmpty
    }

    @Selector()
    static getSearchKey(state: DashboardStateModel){
        return state.search
    }

    @Selector()
    static getService(state: DashboardStateModel){
        return state.service
    }

    @Selector()
    static getStatus(state: DashboardStateModel){
        return state.status
    }

    constructor(private store:Store,private dashboardService:DashboardService,private campaignService:CampaignService){}


    @Action(DeleteDashboardData)
    deleteDashboardData(ctx:StateContext<DashboardStateModel>,{id}: DeleteDashboardData){
        return this.campaignService.deleteCampaignInfo(id).pipe(
            tap((result:any)=>{
                ctx.setState(patch({
                    dashboard_datas:removeItem<Dashboard>(dashboard_datas => dashboard_datas?.fld_CampaignId == id)
                }))
            }),catchError((err)=> {
                return throwError(()=> new Error(err))
            })
        )

    }
    
    @Action(getAllDashboardData)
    getAllDashboardData({patchState}: StateContext<DashboardStateModel>,{} :getAllDashboardData){
        patchState({isDashboardLoading:true})
        return this.dashboardService.getAllDashboardData().pipe(
            tap((result:Dashboard[])=>{
                if(result['response'].length != 0){
                    patchState({
                        dashboard_datas:result['response'].sort(
                          (a: any,b: any) =>
                            new Date(b.fld_DateCreated).getTime() - new Date(a.fld_DateCreated).getTime() ||
                            b.fld_Status - a.fld_Status
                        ),
                        isDashboardLoading:false
                    })
                }
            }),
            catchError((err)=>{
                return throwError(()=> new Error(err))
            })
        )
    }

    @Action(getDashboardDataPerPage)
    getDashboardDataPerPage({patchState}: StateContext<DashboardStateModel>,
      {search, pageNumber, status, service} : getDashboardDataPerPage){
        patchState({isDashboardPerPageLoading:true})
        let hasFilter = true;
        if(
          (search == null || search == undefined || search == '') &&
          (!status || status == 0 ) &&
          (service == null || service == undefined || service == '')
          ) {
          hasFilter = false;
        }
        if(pageNumber == null || pageNumber == undefined){
          pageNumber = '';
        }
        if(search == null || search == undefined){
          search = '';
        }
        if(!status || status == undefined){
          status = 0;
        }
        if(service == null || service == undefined){
          service = '';
        }
        return this.dashboardService.getDashboardDataPerPage(search, pageNumber, status, service).pipe(
            tap((result:any)=>{
                patchState({
                    dashboard_datas:result['response'],
                    itemsPerPage:result['itemsPerPage'],
                    currentPage:result['currentPage'],
                    totalPages:result['numberOfRecords'],
                    isDashboardPerPageLoading:false,
                    pageSize:result['pageSize'],
                    numberOfRecords: result['numberOfRecords'],
                    isCampaignTableEmpty:
                      !hasFilter && result['numberOfRecords'] == 0 ? true : false,
                    search: search,
                    service: service,
                    status: status
                })
            }),
            catchError((err)=>{
                return throwError(()=> new Error(err))
            })
        )
    }

}
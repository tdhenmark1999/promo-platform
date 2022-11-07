import { Action, Selector, State, StateContext } from '@ngxs/store';
import { TypesModel, TypesStateModel } from '../models/type.model';
import { catchError, tap, throwError } from 'rxjs';
import {
  createTypeInfo,
  getAllTypes,
  getTransactionTypeInfo,
  updateRulesType,
} from './type.action';

import { Injectable } from '@angular/core';
import { TypesService } from 'src/app/services/types.service';

@State<TypesStateModel>({
  name: 'type',
  defaults: {
    type: undefined,
    types: [],
  },
})


@Injectable()
export class TypeState {
  @Selector()
  static getAllType(state: TypesStateModel) {
    return state.types;
  }

  @Selector()
  static getTypeInfo(state: TypesStateModel) {
    return state.type;
  }

  constructor(private typeService: TypesService) {}

  @Action(getAllTypes)
  getAllTypes({ patchState }: StateContext<TypesStateModel>, {}: getAllTypes) {
    return this.typeService.getType().pipe(
      tap((result: any) =>
        patchState({
          types: result['response'],
        })
      ),
      catchError((err) => {
        return throwError(() => new Error(err));
      })
    );
  }

  @Action(createTypeInfo)
  createTypeInfo({ patchState }: StateContext<any>,{ payload }: createTypeInfo) {
    return this.typeService.createRulesTypes(payload).pipe(
      tap((result: any) => {}),
      catchError((err) => {
        return throwError(() => new Error(err));
      })
    );
  }

  @Action(getTransactionTypeInfo)
  getTransactionTypeInfo({ patchState }: StateContext<TypesStateModel>,{ id }: getTransactionTypeInfo) {
    return this.typeService.getTransactionTypeInfo(id).pipe(
      tap((result: TypesModel) => {
        patchState({
          type: result['response'],
        });
      }),
      catchError((err) => {
        return throwError(() => new Error(err));
      })
    );
  }

  @Action(updateRulesType)
  updateRulesTransaction({ patchState }: StateContext<any>,{ payload }: updateRulesType) {
    return this.typeService.updateRulesType(payload).pipe(
      tap((result: any) => {}),
      catchError((err) => {
        return throwError(() => new Error(err));
      })
    );
  }
  
}

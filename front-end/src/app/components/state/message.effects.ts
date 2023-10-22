import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import {
  catchError,
  concatMap,
  exhaustMap,
  map,
  mergeMap,
  switchMap,
  take,
} from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { EmptyAction, ShowAlert } from './message.actions';

@Injectable()
export class MessageEffects {
  constructor(
    private action$: Actions,
    private messageService: MessageService
  ) {}

  _ShowAlert = createEffect(() =>
    this.action$.pipe(
      ofType(ShowAlert),
      exhaustMap((action) => {
        return of(
          this.messageService.add({
            severity: action.severity,
            summary: action.summary,
            detail: action.detail,
            life: action.life,
          })
        ).pipe(
          map(() => {
            return EmptyAction();
          })
        );
      })
    )
  );
}

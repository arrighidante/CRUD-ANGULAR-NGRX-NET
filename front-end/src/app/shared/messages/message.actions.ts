import { createAction, props } from '@ngrx/store';

// severity: 'success';
//     summary: 'Hecho';
//     detail: 'Productos Eliminados';
//     life: 3000;

export const ShowAlert = createAction(
  '[Message] Show alert',
  props<{
    severity: string;
    summary: string;
    detail: string;
    life: 3000;
  }>()
);

export const EmptyAction = createAction('[Message] Empty action');

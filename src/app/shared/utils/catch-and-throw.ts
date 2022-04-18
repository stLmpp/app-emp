import { catchError, isObservable, Observable, OperatorFunction, throwError } from 'rxjs';

export const catchAndThrow = <T>(callback: (error: any) => any): OperatorFunction<T, T> =>
  catchError((err: any) => {
    const ret = callback(err);
    if (isObservable(ret)) {
      return ret as Observable<any>;
    } else {
      return throwError(() => err);
    }
  });

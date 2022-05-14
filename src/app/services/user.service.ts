import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../models/user';
import { UserCreateDto } from '../models/user-create.dto';
import { UserUpdateDto } from '../models/user-update.dto';
import { UserWithValues } from '../models/user-with-values';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private readonly httpClient: HttpClient) {}

  readonly path = '/user';

  getAllWithValues(): Observable<UserWithValues[]> {
    return this.httpClient.get<UserWithValues[]>(`${this.path}/values`);
  }

  create(dto: UserCreateDto): Observable<User> {
    return this.httpClient.post<User>(this.path, dto);
  }

  update(id: string, dto: UserUpdateDto): Observable<User> {
    return this.httpClient.patch<User>(`${this.path}/${id}`, dto);
  }

  delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.path}/${id}`);
  }

  exists(id: string, exclude?: string[]): Observable<boolean> {
    const params = new HttpParams({ fromObject: { exclude: exclude ?? [] } });
    return this.httpClient.get<boolean>(`${this.path}/${id}/exists`, { params });
  }

  getById(idUser: string): Observable<User> {
    return this.httpClient.get<User>(`${this.path}/${idUser}`);
  }
}

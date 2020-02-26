import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class AppSettingsService {
  public getBaseUrl(): string {
    return environment.baseUrl;
  }

  public getLoginUrl(locationHref: string): string {
    return environment.loginUrl + locationHref;
  }

}

export const SETTINGS_PROVIDERS = [
  { provide: AppSettingsService, useClass: AppSettingsService }
];
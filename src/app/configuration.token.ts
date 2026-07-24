import { InjectionToken } from "@angular/core";
import { IApplicationConfiguration } from "../interfaces/IApplicationConfiguration";

export const applicationConfiguration: InjectionToken<IApplicationConfiguration> = new InjectionToken<IApplicationConfiguration>('конфигурация приложения');

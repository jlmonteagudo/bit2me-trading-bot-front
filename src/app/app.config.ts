import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  RouterOutlet,
  provideRouter,
  withComponentInputBinding,
} from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { appRoutes } from './app.routes';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { provideToastr } from 'ngx-toastr';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withComponentInputBinding()),
    RouterOutlet,
    provideHttpClient(),
    provideAnimations(),
    provideToastr({
      timeOut: 5000,
      positionClass: 'toast-bottom-center',
      closeButton: true,
      progressBar: true,
    }),
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideDatabase(() => getDatabase()),
      AngularFireModule.initializeApp(environment.firebase)
    ),
  ],
};

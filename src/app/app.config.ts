import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { RouterOutlet, provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { appRoutes } from './app.routes';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { ToastrModule } from 'ngx-toastr';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    RouterOutlet,
    provideAnimations(),
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideDatabase(() => getDatabase()),
      AngularFireModule.initializeApp(environment.firebase),
      ToastrModule.forRoot({
        timeOut: 15000, // 15 seconds
        closeButton: true,
        progressBar: true,
      })
    ),
  ],
};

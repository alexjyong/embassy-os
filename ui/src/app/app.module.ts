import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ErrorHandler } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouteReuseStrategy } from '@angular/router'
import { IonicModule, IonicRouteStrategy, IonNav } from '@ionic/angular'
import { Drivers } from '@ionic/storage'
import { IonicStorageModule } from '@ionic/storage-angular'
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { ApiService } from './services/api/embassy-api.service'
import { PatchDbServiceFactory } from './services/patch-db/patch-db.factory'
import { ConfigService } from './services/config.service'
import { QrCodeModule } from 'ng-qrcode'
import { OSWelcomePageModule } from './modals/os-welcome/os-welcome.module'
import { MarkdownPageModule } from './modals/markdown/markdown.module'
import { PatchDbService } from './services/patch-db/patch-db.service'
import { LocalStorageBootstrap } from './services/patch-db/local-storage-bootstrap'
import { SharingModule } from './modules/sharing.module'
import { FormBuilder } from '@angular/forms'
import { GenericInputComponentModule } from './modals/generic-input/generic-input.component.module'
import { AuthService } from './services/auth.service'
import { GlobalErrorHandler } from './services/global-error-handler.service'
import { MockApiService } from './services/api/embassy-mock-api.service'
import { LiveApiService } from './services/api/embassy-live-api.service'

const { mocks } = require('../../config.json')

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot({
      storeName: '_embassykv',
      dbKey: '_embassykey',
      name: '_embassystorage',
      driverOrder: [Drivers.LocalStorage, Drivers.IndexedDB],
    }),
    QrCodeModule,
    OSWelcomePageModule,
    MarkdownPageModule,
    GenericInputComponentModule,
    SharingModule,
  ],
  providers: [
    FormBuilder,
    IonNav,
    Storage,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: ApiService,
      useClass: mocks.enabled ? MockApiService : LiveApiService,
    },
    {
      provide: PatchDbService,
      useFactory: PatchDbServiceFactory,
      deps: [ConfigService, ApiService, LocalStorageBootstrap, AuthService],
    },
    { provide: ErrorHandler, useClass: GlobalErrorHandler},
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class AppModule { }




import { UserProfileModule } from './pages/user-profile/user-profile.module';
import { CommonService } from './shared/services/common.service';
import { TodoListModule } from './pages/todo-list/todo-list.module';
import { NotificationModule } from './pages/notification/notification.module';
import { UserProfileRoutingModule } from './pages/user-profile/user-profile-routing.module';
import { DeleteNoteModule } from './pages/delete-note/delete-note.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { vi_VN } from 'ng-zorro-antd/i18n';
import { registerLocaleData, CommonModule } from '@angular/common';
import vi from '@angular/common/locales/vi';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { AuthInterceptor } from './auth/auth.interceptor';
import { NoteRoutingModule } from './pages/note/note-routing.module';
import { JwtModule } from '@auth0/angular-jwt';
import { TranslateLoader, TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TodoListRoutingModule } from './pages/todo-list/todo-list-routing.module';

registerLocaleData(vi);
export function tokenGetter(){
  return localStorage.getItem("token");
}
export function httpTranslateLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NoteRoutingModule,
    DeleteNoteModule,
    UserProfileRoutingModule,
    NotificationModule,
    TodoListRoutingModule,
    TodoListModule,
    UserProfileModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:5000", "localhost:5001", "192.168.1.17:45456"],
        disallowedRoutes: []
      }
    })
  ],
  providers: [
    {
      provide: [NZ_I18N],
      useValue: vi_VN,
    },
    {
    provide: [HTTP_INTERCEPTORS],
    multi: true,
    useClass: AuthInterceptor },
    CommonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

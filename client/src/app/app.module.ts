import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserService } from './services/user.service';
import { HttpModule } from '@angular/http';
import { UserComponent } from './user/user.component';
import { ToastrModule } from 'ngx-toastr';
import { EventService } from './services/event.service';
import { BaseService } from './services/base.service';
import { FilteruserPipe } from './pipes/filteruser.pipe';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    FilteruserPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    })
  ],
  providers: [UserService, EventService, BaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }

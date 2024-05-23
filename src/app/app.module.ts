import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ChatComponent } from './chat/chat.component'
import { ChatService } from '../services/ChatService'
import { NavbarComponent } from "./navbar/navbar.component";
import {NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap'; 

@NgModule({
    declarations: [
        AppComponent,
        ChatComponent
    ],
    providers: [ChatService],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        NavbarComponent,
        NgbCollapseModule
    ]
})
export class AppModule { }

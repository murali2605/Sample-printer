import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import {NativeScriptFormsModule} from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import {NativeScriptRouterModule} from "nativescript-angular/router";

import { AppComponent } from "./app.component";
import { Bluetoothservice } from "./services/bluetooth.service";

@NgModule({
    declarations: [AppComponent,],
    bootstrap: [AppComponent],
    imports: [NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptHttpModule,
        NativeScriptRouterModule],
    schemas: [NO_ERRORS_SCHEMA],
     providers:[Bluetoothservice],
    entryComponents:[]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComplaintRoutingModule } from './complaint-routing.module';
import {InputTextModule} from "primeng/inputtext";
import {DropdownModule} from "primeng/dropdown";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ButtonModule} from "primeng/button";
import {ReactiveFormsModule} from "@angular/forms";
import {TableModule} from "primeng/table";
import {ToggleButtonModule} from "primeng/togglebutton";
import {MultiSelectModule} from "primeng/multiselect";
import {MessagesModule} from "primeng/messages";
import {MessageModule} from "primeng/message";
import {Ripple} from "primeng/ripple";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DialogModule} from "primeng/dialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {ComplaintComponent} from "./complaint.component";


@NgModule({
    declarations: [ComplaintComponent],
    imports: [
        CommonModule,
        ComplaintRoutingModule,
        InputTextModule,
        DropdownModule,
        InputTextareaModule,
        ButtonModule,
        ReactiveFormsModule,
        TableModule,
        ToggleButtonModule,
        MultiSelectModule,
        MessagesModule,
        MessageModule,
        Ripple,
        ConfirmDialogModule,
        DialogModule,
    ],
    providers: [MessageService, ConfirmationService]
})
export class ComplaintModule { }

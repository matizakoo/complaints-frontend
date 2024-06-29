import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Category} from "../category/category";
import {CategoryService} from "../category/category.service";
import {ContractorService} from "../contractor/contractor.service";
import {Contractor} from "../contractor/contractor";
import {Provider} from "../provider/provider";
import {ProviderService} from "../provider/provider.service";
import {DropdownChangeEvent} from "primeng/dropdown";
import {Complaint} from "./complaint";
import {ComplaintService} from "./complaint.service";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {InfoDTO} from "../../../info-dto";
import {Message} from "primeng/api";
import {MessagesconfService} from "../../../messagesconf.service";

interface expandedRows {
    [key: string]: boolean;
}

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
})
export class ComplaintComponent implements OnInit{
    myForm: FormGroup;
    complaints: Complaint[] = [];
    categories: Category[] = [];
    contractors: Contractor[] = [];
    providers: Provider[] = [];
    complaintDialog: boolean;
    selectedCategory: Category;
    selectedContractor: Contractor;
    selectedProvider: Provider;
    complaint: Complaint;
    statusCode: number;
    msgs: Message[] = [];

    expandedRows: expandedRows = {};


    constructor(private fb: FormBuilder,
                private categoryService: CategoryService,
                private contractorService: ContractorService,
                private providerService: ProviderService,
                private complaintService: ComplaintService,
                private messageConf: MessagesconfService) {}

    ngOnInit(): void {
        this.myForm = this.fb.group({
            factureId: ['', [Validators.required, Validators.minLength(3)]],
            dateOfReport: ['', [Validators.required, Validators.minLength(3)]],
            dateOfPurchase: ['', [Validators.required, Validators.minLength(3)]],
            productCode: ['', [Validators.required, Validators.minLength(3)]],
            contractorEntity: [''],
            categoryEntity: [''],
            providerEntity: [''],
            dateOfReportAnswer: [{value: '', disabled: true}, [Validators.required, Validators.minLength(3)]],
            username: [''],
            surname: [''],
            phoneNumber: [''],
            email: ['']
        });

        this.getCategories();
        this.getContractors();
        this.getProviders();
        this.getAllComplaints();
    }

    getAllComplaints(): void {
        this.complaintService.getComplaints().subscribe({
            next: (complaintsList: Complaint[]) => {
                this.complaints = complaintsList;
            },
            error: (err) => {
                console.error('Error fetching categories', err);
            }
        });
    }

    openAddComplaintModal(): void {
        this.complaintDialog = true;
    }

    public onSubmit() : void {
        console.log('test: ' +this.myForm.get('factureId').value)
        console.log('test: ' +this.myForm.get('dateOfReport').value)
        console.log('test: ' +this.myForm.get('dateOfPurchase').value)
        console.log('test: ' +this.myForm.get('productCode').value)

        this.myForm.get('contractorEntity').setValue("")
        this.myForm.get('categoryEntity').setValue("")

        // console.log('test: ' +this.myForm.get('contractorEntity').value)
        // console.log('test: ' +this.myForm.get('category').value)
        // console.log('test: ' +this.myForm.get('providerEntity').value)
        console.log('test: ' +this.myForm.get('dateOfReportAnswer').value)

        console.log('test: ' +this.myForm.get('username').value)
        console.log('test: ' +this.myForm.get('surname').value)
        console.log('test: ' +this.myForm.get('phoneNumber').value)
        console.log('test: ' +this.myForm.get('email').value)

        this.complaint = new Complaint(
            this.myForm.get('productCode').value,
            this.myForm.get('dateOfReport').value,
            this.myForm.get('dateOfReportAnswer').value,
            this.selectedProvider,
            this.selectedContractor,
            this.selectedCategory,
            this.myForm.get('dateOfPurchase').value,
            this.myForm.get('factureId').value,
            this.myForm.get('username').value,
            this.myForm.get('surname').value,
            this.myForm.get('phoneNumber').value,
            this.myForm.get('email').value,
            null)

        console.log(this.complaint)
        this.getFormValidationErrors();

        if (this.myForm.valid) {
            this.complaintService.createComplaint(this.complaint).subscribe(
                (response: HttpResponse<InfoDTO>) => {
                    this.statusCode = response.status;
                    this.msgs = this.messageConf.getMessage(this.statusCode);
                    if (response.body && response.body.info) {
                        this.msgs.push({ severity: 'info', summary: 'Info', detail: response.body.info });
                    }
                },
                (error: HttpErrorResponse) => {
                    this.statusCode = error.status;
                    if (error.error && error.error.info) {
                        this.msgs.push({ severity: 'error', summary: 'Error', detail: error.error.info });
                    } else {
                        this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Unexpected error occurred' });
                    }
                }
            );

            this.myForm.reset();
            this.getAllComplaints();
        } else {
            console.log('xxx')
            this.msgs = this.messageConf.getMessage(404);
            this.complaintDialog = true;
        }
    }

    getFormValidationErrors() {
        Object.keys(this.myForm.controls).forEach(key => {
            const controlErrors = this.myForm.get(key).errors;
            if (controlErrors != null) {
                Object.keys(controlErrors).forEach(keyError => {
                    console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
                });
            }
        });
    }

    updateResponseDate(): void {
        const reportDate = this.myForm.get('dateOfReport').value;
        if (reportDate) {
            const responseDate = new Date(reportDate);
            responseDate.setDate(responseDate.getDate() + 14);
            this.myForm.get('dateOfReportAnswer').setValue(responseDate);
        }
    }

    getCategories(): void {
        this.categoryService.getCategories().subscribe({
            next: (categories: Category[]) => {
                this.categories = categories;
            },
            error: (err) => {
                console.error('Error fetching categories', err);
            }
        });
    }

    getContractors(): void {
        this.contractorService.getCategories().subscribe({
            next: (contractors: Contractor[]) => {
                this.contractors = contractors;
            },
            error: (err) => {
                console.error('Error fetching categories', err);
            }
        });
    }

    getProviders(): void {
        this.providerService.getCategories().subscribe({
            next: (providers: Provider[]) => {
                this.providers = providers;
            },
            error: (err) => {
                console.error('Error fetching categories', err);
            }
        });
    }

    onCategoryChange(event: any) {
        this.selectedCategory = event.value;
    }

    onContractorChange(event: any) {
        this.selectedContractor = event.value;
    }

    onProviderChange(event: any) {
        this.selectedProvider = event.value;
    }


}

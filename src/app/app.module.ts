import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import ptBr from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { ToastrModule } from 'ngx-toastr';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ChartsModule } from 'ng2-charts';
import 'chartjs-plugin-colorschemes';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TableComponent } from './components/dashboard/table/table.component';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import { InvoicePreviewComponent } from './components/upload/invoice-preview/invoice-preview.component';
import { PaymentPreviewComponent } from './components/upload/payment-preview/payment-preview.component';
import {
  TransporDocumentPreviewComponent,
} from './components/upload/transpor-document-preview/transpor-document-preview.component';
import { UploadStepperComponent } from './components/upload/upload-stepper/upload-stepper.component';
import { UploaderComponent } from './components/upload/uploader/uploader.component';
import { TransportDocumentUpdateComponent } from './components/dashboard/table/transport-document-update/transport-document-update.component';
import { UnlockComponent } from './components/dashboard/table/unlock/unlock.component';
import { DeleteComponent } from './components/dashboard/table/delete/delete.component';
import { PaymentCardComponent } from './components/dashboard/payment-card/payment-card.component';
import { FilterComponent } from './components/dashboard/filter/filter.component';
import { PaymentStatusComponent } from './components/dashboard/payment-status/payment-status.component';
import { TimelineComponent } from './components/dashboard/timeline/timeline.component';
import { PreviewPdfComponent } from './components/dashboard/table/preview-pdf/preview-pdf.component';
import { ConfigComponent } from './components/config/config.component';


// Para trabalhar com formulários no Angular 12
// Para realizar requisições HTTP
// Imports para componentes do Angular Material
// Componentes do projeto
registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    DashboardComponent,
    HeaderComponent,
    UploadStepperComponent,
    UploaderComponent,
    TransporDocumentPreviewComponent,
    InvoicePreviewComponent,
    PaymentPreviewComponent,
    TableComponent,
    TransportDocumentUpdateComponent,
    UnlockComponent,
    DeleteComponent,
    PaymentCardComponent,
    FilterComponent,
    PaymentStatusComponent,
    TimelineComponent,
    PreviewPdfComponent,
    ConfigComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    // Forms
    FormsModule,
    ReactiveFormsModule,
    // Requisições http
    HttpClientModule,
    // Angular Material
    MatFormFieldModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatTableModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatStepperModule,
    MatFileUploadModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTooltipModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ChartsModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      closeButton: true,
      progressBar: true,
    }),
  ],
  providers: [{ provide: LOCALE_ID, useValue: "pt" }],
  bootstrap: [AppComponent],
})
export class AppModule {}

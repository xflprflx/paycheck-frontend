import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NavComponent } from "./components/nav/nav.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { UploadStepperComponent } from "./components/upload/upload-stepper/upload-stepper.component";
import { ConfigComponent } from "./components/config/config.component";

const routes: Routes = [
  {
    path: "", component: NavComponent, children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "register", component: UploadStepperComponent },
      { path: "config", component: ConfigComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

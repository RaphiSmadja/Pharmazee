import {RouterModule, Routes} from '@angular/router';
import {SignupComponent} from './auth/signup/signup.component';
import {SigninComponent} from './auth/signin/signin.component';
import {HomeComponent} from './home/home.component';
import {FourOhFourComponent} from './four-oh-four/four-oh-four.component';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {MenuComponent} from './menu/menu.component';
import {FooterComponent} from './footer/footer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './auth/auth.service';
import {UserService} from './auth/user.service';
import {PharmacyService} from './pharmacy/pharmacy.service';
import {HttpClientModule} from '@angular/common/http';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { PharmacyDetailComponent } from './pharmacy-detail/pharmacy-detail.component';
import { SectionDetailComponent } from './section-detail/section-detail.component';
import { HomeSectionComponent } from './home-section/home-section.component';
import { CatalogComponent } from './catalog/catalog.component';
import { AgmCoreModule } from '@agm/core';
import { MessageComponent } from './message/message.component';
import {RadioButtonModule} from 'primeng/radiobutton';
import {FieldsetModule} from 'primeng/fieldset';

// primeNG
import {AccordionModule} from 'primeng/accordion';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/components/common/messageservice';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AdminComponent } from './admin/admin.component';
import {CardModule} from 'primeng/card';
import {GMapModule} from 'primeng/gmap';
import {ButtonModule} from 'primeng/button';
import {RatingModule} from 'primeng/rating';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import {PaginatorModule} from 'primeng/paginator';
import {DataViewModule} from 'primeng/dataview';
import { BucketComponent } from './bucket/bucket.component';
import {SpinnerModule} from 'primeng/spinner';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import {PasswordModule} from 'primeng/password';
import { ChartModule } from 'primeng/chart';
import { AdminStatComponent } from './admin/admin-stat/admin-stat.component';
import {RoleGuardService} from './auth/role-guard.service';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentComponent } from './payment/payment.component';
import {PanelModule} from 'primeng/panel';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { PharmacyOrdersComponent } from './pharmacy-orders/pharmacy-orders.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { CreationProductComponent } from './pharmacy/creation-product/creation-product.component';
import {EditorModule} from 'primeng/editor';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {SliderModule} from 'primeng/slider';
import {FileUploadModule} from 'primeng/fileupload';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import {TableModule} from 'primeng/table';
import {ConfirmDialogModule, DialogModule, InputMaskModule, InputSwitchModule, MenubarModule} from 'primeng/primeng';
import { AdminPharmaciesComponent } from './admin-pharmacies/admin-pharmacies.component';
import {SidebarModule} from 'primeng/sidebar';
import { PharmacyStatComponent } from './pharmacy/pharmacy-stat/pharmacy-stat.component';
import { CreationSectionComponent } from './pharmacy/creation-section/creation-section.component';
import {LightboxModule} from 'primeng/lightbox';
import {GalleriaModule} from 'primeng/galleria';
import {CheckboxModule} from 'primeng/checkbox';
import {TabMenuModule} from 'primeng/tabmenu';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {MenuItem} from 'primeng/api';
import { FavoritePharmacyComponent } from './favorite-pharmacy/favorite-pharmacy.component';
import { FavoriteProductComponent } from './favorite-product/favorite-product.component';
import { OrderComponent } from './pharmacy/order/order.component';
import {GuardService} from './auth/guard.service';
import { PrescriptionComponent } from './pharmacy/prescription/prescription.component';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import { SuccessPaymentComponent } from './success-payment/success-payment.component';
import { CreatePharmacyComponent } from './create-pharmacy/create-pharmacy.component';

const appRoutes: Routes = [
  /*canActivate: [AuthGuardService]*/
  {path: 'home', component: AppComponent},
  {path: 'auth/signup', component: SignupComponent},
  {path: 'auth/signin', component: SigninComponent},
  {path: 'checkout', component: PaymentComponent},
  {path: 'create-product', component: CreationProductComponent},
  {path: 'admin-stat', component: AdminStatComponent, canActivate: [RoleGuardService], data: {expectedRole: 3},
   /* children: [
      {path: 'dashboard', component: [AdminComponent]},
      {path: 'stat', component: [AdminStatComponent]},
    ]*/},
  {path: 'admin-users', component: AdminUsersComponent},
  {path: 'admin-pharmacies', component: AdminPharmaciesComponent},
  {path: 'create-pharmacy', component: CreatePharmacyComponent},
  {path: 'home', component: AppComponent},
  {path: 'bucket', component: BucketComponent},
  {path: 'checkout', component: PaymentComponent},
  {path: 'admin', component: AdminComponent, canActivate: [RoleGuardService], data: {expectedRole: 3},
    children: [
      {path: 'users', component: AdminUsersComponent},
      {path: 'stat', component: AdminStatComponent},
      {path: 'pharmacies', component: AdminPharmaciesComponent}
    ]
  },
  {path: 'pharmacy', component: PharmacyComponent, canActivate: [RoleGuardService], data: {expectedRole: 2},
    children: [
      {path: 'stat', component: PharmacyStatComponent},
      {path: 'product', component: CreationProductComponent},
      {path: 'order', component: PharmacyOrdersComponent},
      {path: 'section', component: CreationSectionComponent},
      {path: 'prescription', component: PrescriptionComponent},
      {path: 'orders', component: OrderComponent},
    ]
  },
  {
    path: 'user', component: PharmacyComponent, canActivate: [GuardService],
    children: [
      {path: 'detail', component: UserDetailComponent},
      {path: 'order', component: UserOrdersComponent},
      {path: 'favorite-pharmacies', component: FavoritePharmacyComponent},
      {path: 'favorite-product', component: FavoriteProductComponent},
    ]
  },
  {path: 'pharmacy/:id', component: PharmacyDetailComponent},
  {path: 'product/:id', component: ProductDetailComponent},
  {path: 'catalog/:id', component: CatalogComponent},
  {path: 'order-detail/:id', component: OrderDetailComponent, canActivate: [GuardService]},
  {path: 'success-payment', component: SuccessPaymentComponent, canActivate: [GuardService]},
  {path: '', component: HomeComponent},
  {path: 'not-found', component: FourOhFourComponent},
  {path: '**', redirectTo: '/not-found'},
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    HomeComponent,
    SignupComponent,
    SigninComponent,
    FourOhFourComponent,
    PharmacyComponent,
    PharmacyDetailComponent,
    SectionDetailComponent,
    HomeSectionComponent,
    CatalogComponent,
    MessageComponent,
    AdminComponent,
    ProductDetailComponent,
    BucketComponent,
    AdminStatComponent,
    OrderDetailComponent,
    CheckoutComponent,
    PaymentComponent,
    UserOrdersComponent,
    PharmacyOrdersComponent,
    UserDetailComponent,
    CreationProductComponent,
    AdminUsersComponent,
    AdminPharmaciesComponent,
    PharmacyStatComponent,
    CreationSectionComponent,
    FavoritePharmacyComponent,
    FavoriteProductComponent,
    OrderComponent,
    PrescriptionComponent,
    SuccessPaymentComponent,
    CreatePharmacyComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AccordionModule,
    ToastModule,
    CardModule,
    ButtonModule,
    RatingModule,
    PaginatorModule,
    GMapModule,
    DataViewModule,
    SpinnerModule,
    VirtualScrollerModule,
    PasswordModule,
    TabMenuModule,
    ChartModule,
    EditorModule,
    AngularFontAwesomeModule,
    InputTextareaModule,
    FileUploadModule,
    DropdownModule,
    SliderModule,
    InputTextModule,
    SidebarModule,
    LightboxModule,
    GalleriaModule,
    CheckboxModule,
    MessagesModule,
    MessageModule,
    RadioButtonModule,
    FieldsetModule,
    PanelModule,
    OverlayPanelModule,
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAluR-Cxqam-hzuMfqWpZD2NR29U81Um7E'
    }),
    TableModule,
    ConfirmDialogModule,
    InputSwitchModule,
    MenubarModule,
    DialogModule,
    InputMaskModule
  ],
  providers: [
    AuthService, RoleGuardService, GuardService, MessageService, UserService, PharmacyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

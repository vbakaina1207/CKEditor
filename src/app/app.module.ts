import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResultComponent } from './result/result.component';
import { EditComponent } from './edit/edit.component';
import { TableComponent } from './table/table.component';
import { SafeHtmlPipe } from './shared/pipes/safe-html.pipe';


@NgModule({
  declarations: [								
    AppComponent,
      ResultComponent,
      EditComponent,
      TableComponent,
      SafeHtmlPipe
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

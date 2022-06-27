import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS} from '@angular/material/radio';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {TextFieldModule} from '@angular/cdk/text-field';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
const MaterialComponents = [MatInputModule,MatCardModule,MatToolbarModule,MatButtonModule,MatIconModule,MatSelectModule,MatAutocompleteModule,TextFieldModule,MatRadioModule,MatTableModule,MatDialogModule]

@NgModule({
  declarations: [],
  imports: [
    MaterialComponents
  ],
  exports:[
    MaterialComponents
  ],

  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
}]
})
export class MaterialModule { }

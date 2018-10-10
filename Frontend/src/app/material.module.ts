import { NgModule } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';

import {
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    MatCardModule,
    MatDialogModule,
} from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatListModule,
        MatSidenavModule,
        MatCardModule,
        MatDialogModule,
        MatTooltipModule,
        MatMenuModule
    ],
    exports: [
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatListModule,
        MatSidenavModule,
        MatCardModule,
        MatDialogModule,
        MatTooltipModule,
        MatMenuModule
    ]
})

export class MaterialModule {
}

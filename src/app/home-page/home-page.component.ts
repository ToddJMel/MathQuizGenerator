import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'
import { RulesDialogComponent } from '../rules-dialog/rules-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home-page',
  imports: [MatDialogModule,MatFormFieldModule,MatInputModule,MatIconModule,MatTooltipModule,MatButtonModule,RouterModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  //Loads the rules-dialog component which is a "pop up" window for displaying the rules
  constructor(public dialog: MatDialog) {}
  
  //When called, opens the rules-dialog component in a window 400px wide
  openRulesDialog(): void {
    this.dialog.open(RulesDialogComponent, {
      width: '400px'
    });
  }
}

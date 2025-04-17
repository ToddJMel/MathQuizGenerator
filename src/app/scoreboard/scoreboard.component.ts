import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoreManager } from '../services/score-manager';
import { RouterModule } from '@angular/router';

@Component({
  imports: [CommonModule, RouterModule],
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {
  message: string = '';
  scores: number[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.message = this.route.snapshot.queryParamMap.get('message') || '';
    this.scores = ScoreManager.getInstance().getScores();
  }

  //Clear the scores from local storage and then reinitialize the Scoreboard component
  clearScores(): void{
    ScoreManager.getInstance().clearScores();
    //Clears the message from the URL ('message')
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { message: null },
      queryParamsHandling: 'merge' //Keep other existing query params
    }).then(()=>{ //Wait for URL to be updated before reinitializing 
    this.ngOnInit();
    });
  }
}

import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { QuizComponent } from './quiz/quiz.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent }, //Default route
    { path: 'quiz/:difficulty', component: QuizComponent }, //Route with difficulty as a parameter
    { path: 'scoreboard', component: ScoreboardComponent }, //Scoreboard route
    { path: '**', redirectTo: '' } //Catch all fallback routing to home
  ];
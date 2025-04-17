import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizManager } from '../services/quiz-manager';
import { ScoreManager } from '../services/score-manager';
import { Question } from '../models/question';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  imports:[RouterModule, NgIf, FormsModule],
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css',
})

export class QuizComponent implements OnInit {
  quizManager = new QuizManager();
  question!: Question;
  userAnswer: number = 0;
  resultMessage = '';
  isSubmitting: boolean = false;

  constructor(private route: ActivatedRoute, private router:Router) {}

  //When quiz component initialized, gets the difficulty from initialization (buttons) and sets that difficulty. Defaults to easy.
  ngOnInit(): void {
    const difficulty = this.route.snapshot.paramMap.get('difficulty');
    this.quizManager.difficulty = difficulty || 'easy';
    this.loadQuestion();
  }

  //Loads a new question from quizManager class and resets resultMessage
  loadQuestion() {
    this.question = this.quizManager.generateQuestion();
    this.resultMessage = '';
  }

  //Uses QuizManager Class to ValidateAnswer on userAnswer and provides Correct or Wrong feedback. Resets userAnswer to 0 and has a timeout to reload Question
  submitAnswer() {  
    this.isSubmitting = true; //Block buttons
    const correct = this.quizManager.validateAnswer(this.userAnswer);
    this.resultMessage = correct ? 'Correct!' : 'Wrong!';
  
    if (this.quizManager.wrongAnswerCount >= 3) {
      this.resultMessage = "Three Strikes, You're Out!";
      setTimeout(() => {this.endQuiz();}, 2000);//2 second delay to display mesage before endQuiz() is called
    } else {
      setTimeout(() => {
        this.loadQuestion();
        this.isSubmitting = false; //Re-enable buttons
      }, 1000);//1 second delay before loading next question
    }
  
    this.userAnswer = 0;
  }
  

  //Subtracts 1 from user score for skipping, and loads a new question
  skipQuestion() {
    this.isSubmitting = true;
    this.resultMessage = "Skipping...";
    setTimeout(() => {
      this.quizManager.score--;
      this.loadQuestion();
      this.isSubmitting = false; //Re-enable buttons
    }, 1000);//1 second delay before loading next question
  }

  //Ends the quiz, saving the score to localStorage
  endQuiz() {
    this.isSubmitting = true;
    ScoreManager.getInstance().saveScore(this.quizManager.getScore());
    this.isSubmitting = false;
    this.router.navigate(['scoreboard'], { queryParams: { message: 'Game Over!' }})
  }
}
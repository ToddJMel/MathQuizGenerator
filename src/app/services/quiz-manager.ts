import { Question } from '../models/question';

export class QuizManager {
  difficulty: string = 'easy';
  score: number = 0;
  wrongAnswerCount: number = 0;
  private questions: Question[] = [];
  private currentQuestion!: Question;

  generateQuestion(): Question {
    let operand1 = this.randomInt(1, 10);
    let operand2 = this.randomInt(1, 10);
    let operator = '+';
    
    if (this.difficulty === 'medium') {
      operator = ['+', '-', '*'][this.randomInt(0, 2)];
    } else if (this.difficulty === 'hard') {
      operator = ['+', '-', '*', '/'][this.randomInt(0, 3)];
    }

    const correctAnswer = this.calculateAnswer(operand1, operand2, operator);
    this.currentQuestion = new Question(operand1, operand2, operator, correctAnswer);
    this.questions.push(this.currentQuestion);

    return this.currentQuestion;
  }

  //Checks if answer isCorrect and if it is score++ else wrongAnswerCount++ (3 wrong answers ends quiz)
  validateAnswer(input: number): boolean {
    const isCorrect = this.currentQuestion.checkAnswer(input);
    if (isCorrect) {
      this.score++; 
    }
    else {
      this.wrongAnswerCount++;
    }
    return isCorrect;
  }

  getScore(): number {
    return this.score;
  }

  resetQuiz(): void {
    this.score = 0;
    this.questions = [];
  }

  private randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private calculateAnswer(a: number, b: number, op: string): number {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return Math.floor(a / b); // Keep integer
      default: return 0;
    }
  }
}

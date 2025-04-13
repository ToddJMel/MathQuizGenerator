import { Question } from '../models/question';

export class QuizManager {
  difficulty: string = 'easy';
  score: number = 0;
  wrongAnswerCount: number = 0;
  private questions: Question[] = [];
  private currentQuestion!: Question;

  generateQuestion(): Question {
    //Default number ranges and available operators (default is easy difficulty)
    let operand1 = this.randomInt(1, 10);
    let operand2 = this.randomInt(1, 10);
    let operator = '+';
    
    //Changes the available operators and number ranges for different difficulties
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

  //Checks if answer isCorrect and if it is score++ else wrongAnswerCount++ (3 wrong answers ends quiz) uses the question model checkAnswer method
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

  //Returns the current score for this instance of quizManager service
  getScore(): number {
    return this.score;
  }

  //Resets the score and array of questions (used on quiz end, may add user enabled reset as well)
  resetQuiz(): void {
    this.score = 0;
    this.questions = [];
  }

  //Used to generate operators for questions, uses min and max values instead of just random number because these numbers can change with difficulty selection
  private randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  //Used in the generateQuestion method to calculate the constant correctAnswer for the generated question based on the ranomized operators for that question
  private calculateAnswer(a: number, b: number, op: string): number {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return Math.floor(a / b); //Keep integer
      default: return 0;
    }
  }
}

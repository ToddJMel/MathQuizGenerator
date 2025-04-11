export class Question {
    constructor(
      public operand1: number,
      public operand2: number,
      public operator: string,
      public correctAnswer: number
    ) {}
  
    getQuestionText(): string {
      return `${this.operand1} ${this.operator} ${this.operand2}`;
    }
  
    checkAnswer(input: number): boolean {
      return input === this.correctAnswer;
    }
  }
  
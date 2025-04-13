export class Question {
    constructor(
      public operand1: number,
      public operand2: number,
      public operator: string,
      public correctAnswer: number
    ) {}
  
    //returns the string value of the question (ex: 1 + 2 becomes "1 + 2")
    getQuestionText(): string {
      return `${this.operand1} ${this.operator} ${this.operand2}`;
    }
  
    //checks the value inputted to this method against correctAnswer and returns True if it is the same and False if it is not
    checkAnswer(input: number): boolean {
      return input === this.correctAnswer;
    }
  }
  
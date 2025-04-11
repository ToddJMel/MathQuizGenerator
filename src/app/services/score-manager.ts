export class ScoreManager {
  private static instance: ScoreManager;
  scores: number[] = [];

  private constructor() {
    this.loadScores(); //Load from localStorage when instance is created
  }

  static getInstance(): ScoreManager {
    if (!ScoreManager.instance) {
      ScoreManager.instance = new ScoreManager();
    }
    return ScoreManager.instance;
  }

  saveScore(score: number): void {
    this.scores.push(score);
    this.saveToLocalStorage(); //Save to localStorage whenever a score is added
  }

  getScores(): number[] {
    return this.scores;
  }

  clearScores(): void {
    this.scores = [];
    localStorage.removeItem('quizScores');
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('quizScores', JSON.stringify(this.scores));
  }

  private loadScores(): void {
    const storedScores = localStorage.getItem('quizScores');
    if (storedScores) {
      this.scores = JSON.parse(storedScores);
    }
  }
}

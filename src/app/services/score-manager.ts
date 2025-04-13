export class ScoreManager {
  private static instance: ScoreManager;
  scores: number[] = [];

  private constructor() {
    this.loadScores(); //Load from localStorage when instance is created
  }

  //Returns the current instance of the ScoreManager class, creates a new one if one does not exist
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

  //Returns the array of scores saved
  getScores(): number[] {
    return this.scores;
  }

  //Clears all scores from the localStorage 
  clearScores(): void {
    this.scores = [];
    localStorage.removeItem('quizScores');
  }

  //Saves the scores to localStorage for data persistence (local storage can only store strings hence JSON.stringify)
  private saveToLocalStorage(): void {
    localStorage.setItem('quizScores', JSON.stringify(this.scores));
  }

  //Retrieves the scores currently stored in localStorage and updates this array of scores with those scores
  private loadScores(): void {
    const storedScores = localStorage.getItem('quizScores');
    if (storedScores) {
      this.scores = JSON.parse(storedScores);
    }
  }
}

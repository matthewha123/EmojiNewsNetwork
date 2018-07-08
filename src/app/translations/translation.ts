export class Translation {
	text: string;
	score: number;
	user: string;
	date: string;

	constructor(text: string, score: number, user: string, date: string) {
		this.text = text;
		this.score = score;
		this.user = user;
		this.date = date;
	}
}
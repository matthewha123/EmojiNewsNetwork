export class Translation {
	txt: string;
	score: number;
	user: string;
	date: string;

	constructor(text: string, score: number, user: string, date: string) {
		this.txt = text;
		this.score = score;
		this.user = user;
		this.date = date;
	}
}
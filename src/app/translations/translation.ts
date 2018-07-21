export class Translation {
	id: number;
	txt: string;
	score: number;
	usr: string;
	date: string;

	constructor(id: number, text: string, score: number, user: string, date: string) {
		this.id = id;
		this.txt = text;
		this.score = score;
		this.usr = user;
		this.date = date;
	}
}
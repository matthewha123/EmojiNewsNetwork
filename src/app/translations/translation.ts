export class Translation {
	id: number;
	txt: string;
	score: number;
	usr: string;
	uid: number;
	date: string;
	hl_id: number;

	constructor(id: number, text: string, score: number, user: string, uid: number, date: string, hl_id: number) {
		this.id = id;
		this.txt = text;
		this.score = score;
		this.usr = user;
		this.uid = uid;
		this.date = date;
		this.hl_id = hl_id;
	}
}
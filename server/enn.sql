DROP DATABASE IF EXISTS enn;
CREATE DATABASE enn;

\c enn;

CREATE TABLE headlines (
	ID SERIAL PRIMARY KEY,
	txt TEXT,
	publisher TEXT,
	url TEXT
);

INSERT INTO headlines (txt, publisher, url)
	VALUES ('Trump Dead After Suffocating On Burger', 'New York Times', 'https://news.ycombinator.com/'),
			('Koko dead :(', 'Washington Post', 'reddit.com'),
			('What Stays on Facebook and What Goes? The Social Network Cannot Answer', 'testNews', 'testNews.com')
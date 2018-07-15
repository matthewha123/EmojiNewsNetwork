DROP TABLE IF EXISTS enn;
DROP DATABASE IF EXISTS enn;
CREATE DATABASE enn;

\c enn;

CREATE TABLE headlines (
	ID SERIAL PRIMARY KEY,
	hl_text TEXT,
	publisher TEXT,
	url TEXT
);

INSERT INTO headlines (hl_text, publisher, url)
	VALUES ('Trump Dead After Suffocating On Burger', 'New York Times', 'https://news.ycombinator.com/')
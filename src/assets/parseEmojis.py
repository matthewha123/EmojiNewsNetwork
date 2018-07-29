import json, pprint

categories_dict = {}

with open("emojis.json", encoding="utf8") as f:
	emoji_dict = json.load(f)

ordered_emojis = list(emoji_dict.keys())
with open('orderEmojis.json', 'w') as outfile:
	json.dump(ordered_emojis, outfile, indent=4, separators=(',', ': '))

for emoji_name in ordered_emojis:
	if categories_dict.get(emoji_dict[emoji_name]['category']) == None:
		categories_dict[emoji_dict[emoji_name]['category']] = [emoji_name]
	else:
		categories_dict[emoji_dict[emoji_name]['category']].append(emoji_name)

with open('emojiCategories.json', 'w') as outfile:
	json.dump(categories_dict, outfile,indent=4, separators=(',', ': '))

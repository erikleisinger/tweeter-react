INSERT INTO users(name, avatar, handle)
VALUES('Newton', 'https://i.imgur.com/73hZDYK.png', 'SirIsaac'),
('Descartes', 'https://i.imgur.com/nlhLi3I.png', 'rd'),
('User_default', 'https://i.imgur.com/73hZDYK.png', 'def_user');

INSERT INTO tweets(user_id, tweet_text, date_posted)
VALUES(1,
'If I have seen further it is by standing on the shoulders of giants',
CURRENT_TIMESTAMP),
(2, 
'Je pense , donc je suis',
CURRENT_TIMESTAMP);
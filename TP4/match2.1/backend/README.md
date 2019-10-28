# Endpoints:

/api/login	POST	{ username: xxxx, password: ppp }
                Response: { username, games }

/api/user	POST	{ username: xxx, password: ppp, email: eee }

/api/searchUsers	GET 	params: 
                                games: lista de id de juegos
                                username: username
                Response: { [ {username1, game1}, ... ] }

/api/game	GET	array json:  { id: nnn, name }




	npm i @vue/cli -g
	vue create match2



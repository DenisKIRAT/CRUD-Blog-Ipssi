
# PROJET CRUD BLOG - NODE JS

## Présentation

Le projet est une API d'un blog fait en Node JS. Le site utilisé pour la base de données et le rendu final est https://render.com/.

Postman est l'application utilisé pour tester l'API.

## Installation

Voici toutes les commandes utilisés pour réaliser ce projet :

Installer les dépendances
```bash 
$ pnpm init
$ pnpm install
```

- ` pnpm dev ` : permet de lancer/run le projet sur un navigateur web

#### Ajout de toutes les dépendances
- ` pnpm add express ` : Installer la dépendance express
- ` pnpm add dotenv ` : Installer le module dotenv qui charge les variables d'environnement d'un fichier .env dans process.env
- ` pnpm add jsonwebtoken bcrypt ` : Installer la dépendance JsonWebToken bcrypt qui va encrypter le token
- ` pnpm add express ` : Installer la dépendance express





## Routes

Créer un utilisateur (USER) 
```
POST /signUp
```

Se connecter (USER) 
```
POST /signIn
```

Récupérer ses informations (USER) 
```
GET /api/user
```

Récupérer les informations d'un utilisateur (USER) 
```
GET /api/user/:uuid
```

Modifier ses informations (USER) 
```
PATCH /api/user
```

Supprimer un utilisateur (USER) 
```
DELETE /api/user/:uuid
```

---  

Récupérer tout ses posts (POST) 
```
GET /api/posts
```

Récupérer un seul de ses posts (POST) 
```
GET /api/post/:uuid
```

Modifier ses posts (POST) 
```
PATCH /api/post/:uuid
```

Supprimer un post (POST) 
```
DELETE /api/post/:uuid
```

---  

Récupérer tous ses commentaires (COMMENT) 
```
GET /api/comments
```

Récupérer tous les commentaires d'un utilisateur (COMMENT / :uuid d'un utilisateur) 
```
GET /api/comments/:uuid
```

Récupérer un commentaire (COMMENT / :uuid d'un commentaire) 
```
GET /api/comment/:uuid
```

Modifier ses informations (COMMENT) 
```
PATCH /api/comment
```

Supprimer un utilisateur (COMMENT) 
```
DELETE /api/comment/:uuid
```


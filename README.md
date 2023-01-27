
# PROJET CRUD BLOG - NODE JS

## Présentation

Le projet est une API d'un blog fait en Node JS. Le site utilisé pour la base de données et le rendu final est https://render.com/.

Postman est l'application utilisé pour tester l'API.

Voici le lien de notre projet : LIEN DU SITE 

## Installation

Voici toutes les commandes utilisés pour réaliser ce projet :

- Installer les dépendances

```bash 
$ pnpm init
$ pnpm install
```

- ` pnpm dev ` : permet de lancer/run le projet sur un navigateur web

#### Ajout de toutes les dépendances
- ` pnpm add express ` : Installer la dépendance express
- ` pnpm add dotenv ` : Installer le module dotenv qui charge les variables d'environnement d'un fichier .env dans process.env
- ` pnpm add jsonwebtoken bcrypt ` : Installer la dépendance JsonWebToken bcrypt qui permet d'encrypter le token
- ` pnpm add express-validator ` : Installer la dépendance express-validator qui est un middleware utilisé pour valider les données transmises 
- ` pnpm install nodemon ` : Installer le package nodemon qui permet de rédemarrer une application Node.js automatiquement
- ` pnpm add prisma --save-dev ` : Installer l'ORM prisma 
- ` pnpm install typescript --save-dev ` : Installer le langage de programmation TypeScript
- ` pnpm install ts-node --save-dev ` : Installer la dépendance ts-node qui permet de transformer du TypeScript en JavaScript
- ` pnpm install typescript --save-dev ` : Installer le langage de programmation TypeScript

#### Ajout de toutes les packages de définitions de type
- ` pnpm install @types/node ` : Installer le package contenant les définitions de type pour Node.js
- ` pnpm install @types/bcrypt ` : Installer le package contenant les définitions de type pour bcrypt
- ` pnpm install @types/express ` : Installer le package contenant les définitions de type pour express.js
- ` pnpm install @types/express-validator ` : Installer le package contenant les définitions de type pour express-validator
- ` pnpm install @types/jsonwebtoken ` : Installer le package contenant les définitions de type pour le jsonwebtoken
- ` pnpm install @types/lodash.merge ` : Installer le package contenant les définitions de type pour lodash.merge

#### Commandes Prisma 
- ` pnpm prisma init ` : permet d'initialiser un ORM 
- ` pnpm prisma format ` : permet de formater le schema.prisma, donc les modèles
- ` pnpm prisma generate ` : permet de générer le client prisma
- ` pnpm prisma migrate dev ` : permet mettre à jour les données dans la base de données
 

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


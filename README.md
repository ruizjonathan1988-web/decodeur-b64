# Décodeur Reddit B64

Application web installable (PWA) qui repère les chaînes base64 dans un subreddit, un post Reddit ou un texte collé, les décode (jusqu'à 3 couches, standard ou url-safe) et liste celles qui contiennent un lien `http(s)://` ou `magnet:`.

## Utilisation

Ouvre la page GitHub Pages du dépôt, puis « Ajouter à l'écran d'accueil » dans Chrome pour l'installer.

- **Depuis Reddit** : nom du sub (`IPTV_ZONENEW`) ou URL complète d'un post (`…/comments/…`). Option pour scanner aussi les commentaires.
- **Texte collé** : colle n'importe quel texte, le décodage se fait entièrement en local.
- Export : copie des liens, copie CSV, téléchargement CSV.

## Accès OAuth

Si Reddit renvoie 403 en anonyme, crée une app de type **installed app** sur https://www.reddit.com/prefs/apps et colle son Client ID dans le volet « Accès OAuth ». Aucun secret n'est nécessaire ; l'identifiant reste dans le navigateur.

## Limites

Les liens de partage courts (`/s/xxxx`) ne se résolvent pas toujours depuis un navigateur à cause du CORS : ouvre-les et colle l'URL complète.

## Partage depuis Android

Une fois l'app installée (« Ajouter à l'écran d'accueil »), elle apparaît dans le menu Partager. Sélectionne le texte d'un post Reddit, Partager, Décodeur B64 : les liens s'affichent directement. Si le partage ne contient que l'adresse du post, sélectionne le texte lui-même.

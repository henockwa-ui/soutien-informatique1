# Tickets de soutien

Mini-application Web en français pour gérer des demandes de soutien informatique de niveau 1.

- Ajouter une demande avec un sujet, une description facultative et une priorité.
- Filtrer les demandes urgentes encore ouvertes.
- Marquer une demande comme résolue, puis la rouvrir au besoin.
- Retrouver les demandes après avoir rechargé la page dans le même navigateur.

## Lancer le projet

Ouvrir `index.html` dans un navigateur récent. Le projet utilise HTML, CSS et JavaScript, sans installation de dépendances. Si ton navigateur bloque le stockage pour les fichiers locaux, lance `python -m http.server 8000` depuis ce dossier et ouvre [localhost:8000](http://localhost:8000).

Les tickets sont stockés dans le navigateur avec `localStorage`. Chaque navigateur dispose de ses propres données. Utilise des exemples fictifs pour la démonstration.

## Essayer le filtre

1. Créer une demande urgente intitulée « Imprimante inaccessible ».
2. Créer une demande normale intitulée « Installer une mise à jour ».
3. Sélectionner « Urgentes et non résolues ». Seule la première demande s’affiche.
4. Marquer cette demande comme résolue. Elle apparaît maintenant dans le filtre « Résolues ».
5. Recharger la page pour vérifier que la résolution est conservée.

## Déposer sur GitHub

Créer un dépôt public nommé `soutien-informatique`, puis téléverser les quatre fichiers de ce dossier à la racine du dépôt. Le lien de la page du dépôt donne accès au code et à ce guide.

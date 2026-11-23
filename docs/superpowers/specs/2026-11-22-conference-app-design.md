# Conception — Conference App

## Intention

Créer une page d’accueil Angular 21 modulaire pour le Prosit 1, réutiliser les six fragments HTML/CSS fournis et démontrer le data-binding, le contrôle de flux natif, les directives et les pipes.

## Approches

- **Composants standalone — retenu** : chaque section possède son template et ses styles ; composition déclarative dans `App`, sans routage ni service inutiles.
- **Composant unique — écarté** : mélange toutes les responsabilités et ne répond pas à l’objectif de modularité.
- **Architecture avec routage et services — écartée** : aucun écran supplémentaire ni accès distant n’est demandé.

## Conception retenue

- `App` assemble `Header`, `NavBar`, `ProfileUser`, `FriendsList`, `NotificationList`, `ConferenceList` et `Footer`.
- Les fragments fournis déterminent le contenu et l’apparence des sections ; une grille CSS organise les cartes.
- `ConferenceList` contient l’interface typée `Conference`, les données et les comportements de recherche et d’inscription.
- Seules les conférences à venir sont affichées ; la recherche par titre est partielle et insensible à la casse.
- `@if`/`@else` couvrent liste vide et recherche sans résultat ; `@for` parcourt les résultats.
- `uppercase` et `date` formatent l’affichage ; `ngClass` applique vert (au moins 10 places), orange (1 à 9) ou rouge (0).
- `[(ngModel)]` gère la recherche ; `(click)` incrémente les participants ; `[disabled]` et une garde TypeScript empêchent de dépasser la capacité.
- Les dates sont présentées en français ; les données de démonstration couvrent les trois états des boutons.

## Hors périmètre

Backend, persistance, authentification, routage et ajout/édition de conférences.

## Vérification

Tests unitaires des comportements de la liste, compilation de production et inspection de la page réelle dans un navigateur.

# Conference App — Prosit 1

Application **Angular 21** de gestion des conférences : page d’accueil composée de sections indépendantes et liste interactive de conférences à venir.

## Lancer le projet

Prérequis : Node.js 22 et npm 12.2.3.

```bash
npm install
npm start
```

Ouvrir `http://localhost:4200`.

```bash
npm test -- --watch=false  # tests unitaires
npm run build              # build de production dans dist/conference-app
```

## Organisation en composants

`App` assemble sept composants standalone, chacun responsable de son template et de ses styles :

- `Header` : identité de l’application ;
- `NavBar` : navigation entre les sections ;
- `ProfileUser` : informations utilisateur ;
- `FriendsList` : liste des amis ;
- `NotificationList` : notifications ;
- `ConferenceList` : données et interactions des conférences ;
- `Footer` : pied de page.

Ce découpage permet de modifier, tester ou réutiliser une section sans toucher aux autres. Il évite un template racine volumineux et facilite le travail simultané de plusieurs développeurs.

## Mécanismes Angular utilisés

| Mécanisme | Exemple dans le projet | Intérêt |
|---|---|---|
| Interpolation | `{{ conference.title }}` | Afficher une valeur TypeScript dans le HTML. |
| Property binding | `[disabled]="remainingPlaces(conference) === 0"` | Faire dépendre une propriété HTML de l’état du composant. |
| Event binding | `(click)="register(conference)"` | Réagir à une action utilisateur. |
| Two-way binding | `[(ngModel)]="searchTerm"` | Synchroniser le champ de recherche et la propriété `searchTerm`. |
| Contrôle de flux `@if` | États vide et recherche sans résultat | Afficher le contenu adapté à une condition. |
| Contrôle de flux `@for` | Parcours de `filteredConferences` | Générer une carte par conférence, avec `track conference.id`. |
| Directive `NgClass` | `[ngClass]="registrationClass(conference)"` | Appliquer la classe CSS correspondant à la disponibilité. |
| Pipe `uppercase` | `conference.title \| uppercase` | Afficher le titre en majuscules sans modifier la donnée. |
| Pipe `date` | `conference.date \| date:'dd MMMM yyyy'` | Formater la date en français sans modifier sa valeur. |

## Comportement de la liste

L’interface `Conference` définit `id`, `title`, `description`, `date`, `place`, `maxParticipants` et `nbParticipants`. Les données de démonstration sont déclarées dans `ConferenceList`.

- Seules les conférences du jour ou à venir sont affichées.
- La recherche accepte une partie du titre, ignore la casse et supprime les espaces périphériques.
- Une liste sans données et une recherche sans résultat affichent deux messages distincts.
- Chaque clic sur **S’inscrire** ajoute un participant.
- Le bouton est désactivé à capacité maximale et la méthode `register` empêche également tout dépassement.

| Places restantes | Classe | Couleur |
|---|---|---|
| 10 ou plus | `available` | Vert |
| De 1 à 9 | `limited` | Orange |
| 0 | `full` | Rouge, inscription désactivée |

## Vérifications

Les tests couvrent la composition de la page, les dates passées et du jour, la recherche, les seuils de couleur, le clic d’inscription, la capacité maximale, les pipes et les messages d’état vide.

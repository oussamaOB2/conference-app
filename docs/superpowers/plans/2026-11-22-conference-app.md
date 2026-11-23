# Conference App Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construire la page d’accueil Angular 21 modulaire et la liste interactive de conférences décrites par le Prosit 1.

**Architecture:** Application Angular standalone sans routage. `App` compose sept composants de présentation ; `ConferenceList` possède ses données typées et ses comportements, sans service ni backend.

**Tech Stack:** Angular 21, TypeScript, HTML/CSS, FormsModule, contrôle de flux natif, pipes Angular, tests unitaires Angular.

**Spec:** `docs/superpowers/specs/2026-11-22-conference-app-design.md`

## Global Constraints

- Utiliser Angular 21 et des composants standalone.
- Réutiliser le contenu et les styles des fichiers `header.txt`, `navBar.txt`, `profile-user.txt`, `friends-list.txt`, `notification-list.txt` et `footer.txt`.
- Définir `Conference` avec `id`, `title`, `description`, `date`, `place`, `maxParticipants`, `nbParticipants`.
- Ne pas ajouter de framework CSS, backend, routeur ou persistance.
- Toute inscription est bornée par `maxParticipants`.

## Review Focus

- Une conférence à exactement 10 places restantes reste verte ; à 9 elle devient orange — test des seuils dans la tâche 2.
- Une conférence complète reste rouge et ne peut plus enregistrer de participant, même par appel direct à la méthode — test de capacité dans la tâche 2.
- La recherche ignore casse et espaces périphériques et accepte un titre partiel — test de filtrage dans la tâche 2.
- Une conférence passée ne figure pas dans les résultats ; la journée courante reste éligible — test de dates dans la tâche 2.
- Une liste initialement vide et une recherche sans résultat produisent des messages différents — test de rendu dans la tâche 2.

---

### Task 1: Socle Angular et sections indépendantes

**Files:**
- Create: `src/app/header/*`, `src/app/nav-bar/*`, `src/app/profile-user/*`, `src/app/friends-list/*`, `src/app/notification-list/*`, `src/app/footer/*`
- Create: `src/app/app.ts`, `src/app/app.html`, `src/app/app.css`, `src/app/app.config.ts`, `src/main.ts`, `src/styles.css`
- Test: `src/app/app.spec.ts`

**Interfaces:**
- Produces: composants standalone `Header`, `NavBar`, `ProfileUser`, `FriendsList`, `NotificationList`, `Footer` avec les sélecteurs `app-header`, `app-nav-bar`, `app-profile-user`, `app-friends-list`, `app-notification-list`, `app-footer`.
- Produces: `App`, dont le template compose les six sections et réserve l’emplacement `app-conference-list`.

- [ ] **Step 1: Scaffold Angular 21 et écrire le test de composition**
Créer l’application avec Angular CLI 21, sans routeur, avec CSS et tests. Dans `app.spec.ts`, rendre `App` et vérifier la présence des six sélecteurs de sections.

- [ ] **Step 2: Vérifier l’échec initial**
Exécuter `npm test -- --watch=false` ; le test échoue parce que les composants ne sont pas encore définis.

- [ ] **Step 3: Implémenter les six composants et leur composition**
Créer un composant standalone par fragment fourni, avec template et style séparés. Configurer la locale française et composer les sections dans `App` avec une grille responsive.

- [ ] **Step 4: Vérifier le socle**
Exécuter `npm test -- --watch=false` et `npm run build` ; tests et compilation réussissent.

- [ ] **Step 5: Commit**
```bash
git add src docs package.json package-lock.json angular.json tsconfig*.json .gitignore
git commit -m "feat: structure la page d'accueil en composants"
```

### Task 2: Liste de conférences et comportements

**Files:**
- Create: `src/app/conference-list/conference.ts`
- Create: `src/app/conference-list/conference-list.ts`, `conference-list.html`, `conference-list.css`
- Test: `src/app/conference-list/conference-list.spec.ts`

**Interfaces:**
- Consumes: locale française et emplacement de composition de la tâche 1.
- Produces: `ConferenceList`, sélecteur `app-conference-list`, propriété `conferences: Conference[]`, propriété `searchTerm: string`, accesseur `filteredConferences: Conference[]`, méthodes `remainingPlaces(conference: Conference): number`, `registrationClass(conference: Conference): 'available' | 'limited' | 'full'`, `register(conference: Conference): void`.

- [ ] **Step 1: Écrire les tests comportementaux et de rendu**
Couvrir : exclusion des dates passées, inclusion de la date du jour ; recherche partielle insensible à la casse et aux espaces ; seuils 10/9/0 ; incrément unitaire ; refus de dépasser la capacité ; titres en majuscules et dates formatées ; messages liste vide/recherche vide.

- [ ] **Step 2: Vérifier l’échec initial**
Exécuter `npm test -- --watch=false` ; les tests échouent parce que `ConferenceList` n’existe pas.

- [ ] **Step 3: Implémenter le modèle et le composant**
Définir les données de démonstration à venir couvrant les trois couleurs. Implémenter filtrage, calcul des places et inscription bornée. Utiliser `@if`, `@else`, `@for`, `[(ngModel)]`, `[ngClass]`, `[disabled]`, `(click)`, `uppercase` et `date:'dd MMMM yyyy'`.

- [ ] **Step 4: Vérifier le composant**
Exécuter `npm test -- --watch=false` ; tous les tests passent sans modifier les attentes pour épouser l’implémentation.

- [ ] **Step 5: Commit**
```bash
git add src/app/conference-list
git commit -m "feat: ajoute la liste interactive des conférences"
```

### Task 3: Intégration visuelle et documentation pédagogique

**Files:**
- Modify: `src/app/app.ts`, `src/app/app.html`, `src/app/app.css`, `src/styles.css`
- Create: `README.md`

**Interfaces:**
- Consumes: `ConferenceList` et les six composants de sections.
- Produces: page d’accueil complète et instructions de lancement/explication des mécanismes Angular.

- [ ] **Step 1: Intégrer la liste et finaliser les styles**
Ajouter `app-conference-list` à `App`, harmoniser largeurs, espacements, cartes et responsive sans remplacer les styles fournis.

- [ ] **Step 2: Documenter l’exercice**
Dans `README.md`, indiquer installation/lancement/tests et expliquer composants, interpolation, property/event/two-way binding, `@if`/`@for`, `ngClass`, pipes et règles de couleur.

- [ ] **Step 3: Vérifier compilation et comportements**
Exécuter `npm test -- --watch=false` puis `npm run build` ; les deux réussissent.

- [ ] **Step 4: Inspecter la page réelle**
Lancer `npm start`, ouvrir la page dans un navigateur, vérifier toutes les sections, les trois couleurs, la recherche et l’incrémentation jusqu’à la capacité. Corriger uniquement les écarts constatés et refaire la vérification ciblée.

- [ ] **Step 5: Commit**
```bash
git add src README.md docs
git commit -m "docs: explique les mécanismes Angular du prosit"
```

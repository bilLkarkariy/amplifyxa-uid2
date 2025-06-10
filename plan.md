## TASK 1 — Résumé : à quoi sert **`amplifyxa/uid2`**

`amplifyxa/uid2` est **une mini-lib JavaScript/TypeScript privée** qui :

* **Génère et valide** des identifiants UID2 (hash déterministe e-mail / téléphone) conformes à la spéc IAB.
* **Gère la rotation des “salt buckets”** (1/365ᵉ chaque jour) afin de maintenir la sécurité sans casser les correspondances existantes.
* Offre une **API ultra-simple** (`hash()`, `verify()`, `rotateSalts()`) destinée aux services AmplifyXA pour :

  * créer l’ID déterministe dès qu’un e-mail est capturé ;
  * “ancrer” les probas Splink et la couche graph ;
  * échanger des IDs avec les partenaires ad-tech compatibles UID2.

> Objectif : être **fonctionnel en < 5 jours**, sans protobuf, sans over-engineering — juste le hashing, la rotation et une CI propre.

---

## TASK 2 — Plan d’implémentation & de déploiement **rapide et efficace**

| #      | Tâche                    | Détails clés                                                                                                            | Output attendu                 | Responsable |
| ------ | ------------------------ | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------ | ----------- |
| **0**  | **Kick-off & repo**      | `gh repo create amplifyxa/uid2 --private`<br>init Node 18 + PNPM, ESLint, Prettier, Husky                               | repo privé prêt                | Tech Lead   |
| **1**  | **Spec minimaliste**     | README : but, API 3 fonctions, contrat inputs/outputs, pas de chiffrement token (hors scope MVP)                        | README v0.1                    | TL + BE     |
| **2**  | **Implé “hash()”**       | Algo : `uid2 = base64url(SHA256(salt[i] + lower(email.trim())))` <br>`salt[i]` ∈ 1 000 000 buckets                      | `src/hash.ts` + unit tests     | BE1         |
| **3**  | **Implé “verify()”**     | Rejouer le hachage avec le salt bucket courant ± (retro-compat 1 an)                                                    | `src/verify.ts` + tests        | BE1         |
| **4**  | **Salt store JSON**      | `salts/current.json` → map bucket→salt (32 B). Script `generateSalts.ts` pour regen 1/365                               | Fichier + script CLI           | BE2         |
| **5**  | **Cron de rotation**     | GitHub Action “Rotate salts daily” :<br>• run script<br>• PR auto + tag patch                                           | `.github/workflows/rotate.yml` | DevOps      |
| ~~**6**~~  | **CLI rapide**           | `npx uid2 hash you@mail.com` • `verify` • `rotate`                                                                      | Done (`bin/uid2.js`)           | BE2         |
| ~~**7**~~  | **Tests & lint**         | Jest : 100 % branches core · ESLint airbnb · Prettier                                                                   | Green                          | QA          |
| ~~**8**~~  | **CI Build**             | GH Action `ci.yml` operational                                                                                          | Badge passing                  | DevOps      |
| ~~**9**~~  | **Versioning & release** | Semantic-release configured                                                                                            | Auto-tag + changelog           | TL          |
| ~~**10**~~ | **Distribution**         | Git URL dependency string ready                                                                                        | Installable                    | DevOps      |
| ~~**11**~~ | **Security sweep**       | eslint-plugin-security, `npm audit` clean                                                                               | Rapport OK                     | Sec-Eng     |
| ~~**12**~~ | **Docs flash**           | README & auto CHANGELOG present                                                                                         | Doc v1                         | FE/Docs     |

### Timeline éclair

| Jour | Livrable principal                                     |
| ---- | ------------------------------------------------------ |
| J1   | Repo + README + plan validé                            |
| J2   | hash(), verify() + tests                               |
| J3   | Salt store + CLI + CI “test”                           |
| J4   | Rotation cron + release `v0.1.0`                       |
| J5   | Intégration dans **AmplifyXA Gateway** (PR dépendance) |

> **Coût** : 2 dev backend + 1 DevOps ≈ **25 h** cumulées.
> **Gain** : ancrages UID2 dispos pour tous les autres chantiers dès la fin de la semaine.

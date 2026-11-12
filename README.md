# Learning App

Oppimispäiväkirjasovellus (React, TypeScript, Express ja MariaDB).

## Sivut ja komponentit

* **Sivut (`src/pages/`):**
  * `HomePage.tsx`: Etusivu, josta pääsee siirtymään merkintöihin.
  * `EntriesPage.tsx`: Näyttää lomakkeen ja listan kaikista merkinnöistä.
* **Komponentit (`src/components/`):**
  * `Navbar.tsx`: Yläpalkin navigaatio (`Home` ja `Entries` -linkit).
  * `EntryForm.tsx`: Lomake uuden merkinnän lisäämiseen.
  * `LearningEntryCard.tsx`: Yksittäisen merkinnän kortti.

## Sovelluskerrokset

1. **Frontend (React):** Näyttää käyttöliittymän ja hoitaa sivujen reitityksen.
2. **Backend (Express):** Vastaanottaa pyynnöt, tarkistaa syötteet ja keskustelee tietokannan kanssa.
3. **Tietokanta (MariaDB):** Tallentaa merkinnät pysyvästi `entries`-tauluun.

## Frontend- vs. Backend-reitit

* **Frontend-reitit (React Router):** Vaihtavat näkymää selaimessa ilman sivun uudelleenlatausta (`/` ja `/entries`).
* **Backend-reitit (API):** Käsittelevät tietokantapyyntöjä palvelimella (`GET /api/entries` hakee merkinnät ja `POST /api/entries` tallentaa uuden).

## Miksi REST sopii tähän sovellukseen?

REST on selkeä ja kevyt tapa siirtää JSON-dataa selaimen ja palvelimen välillä standardeilla HTTP-metodeilla (`GET` ja `POST`), ja se pitää käyttöliittymän ja palvelimen selkeästi erillään.

## Tilanhallinta ja pysyvä tallennus (Submission 6)

* **Paikallinen tila (Local state – `useState`):** Lomakkeen syötekentät (`EntryForm.tsx`) pidetään lomakkeen omassa tilassa, koska niitä ei tarvita muualla ennen lähetystä.
* **Jaettu tila (Shared state – Zustand):** Merkintälista (`entries`) ja `setEntries` ovat Zustand-storessa (`src/store/useEntriesStore.ts`), josta sivut voivat lukea ne helposti.
* **Pysyvä tallennus (MariaDB):** Lomake lähettää tiedot `POST`-kutsulla MariaDB-tietokantaan ja päivittää listan `GET`-kutsulla, joten merkinnät säilyvät myös sivun päivityksen jälkeen.
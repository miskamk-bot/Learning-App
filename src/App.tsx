import { LearningEntry } from './LearningEntry';

function App() {
  return (
    <div>
      <h1>Miska Koivuniemi</h1>

      <LearningEntry
        otsikko="Eka merkintä"
        kuvaus="Opettelin tekemään komponentin."
        aihe="React"
      />

      <LearningEntry
        otsikko="Toka merkintä"
        kuvaus="Lisäsin tyypit propseille."
        aihe="TypeScript"
      />
    </div>
  );
}

export default App;
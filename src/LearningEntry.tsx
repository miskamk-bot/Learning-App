type Props = {
  otsikko: string;
  kuvaus: string;
  aihe: string;
};

export function LearningEntry(props: Props) {
  return (
    <div>
      <h3>{props.otsikko}</h3>
      <p>{props.kuvaus}</p>
      <p>Aihe: {props.aihe}</p>
    </div>
  );
}
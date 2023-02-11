import { useState, useRef, useEffect } from "react";
import "./style.css";

type Props = {
  types: string;
  onChange: (items: Array<string>) => void;
};

export const FileUploader = ({ types, onChange }: Props): JSX.Element => {
  const [active, setActive] = useState<boolean>(false);
  const [invalid, setInvalid] = useState<boolean>(false);
  const [selected, setSelected] = useState<Array<string>>([]);

  const input = useRef(null);

  const getStyle = (): string =>
    [active && "active", invalid && "invalid"].join(" ");

  // metto la classe active quando si rileva il drag sull'elemento
  const onDragEnter = (evt: any) => {
    evt.preventDefault();
    evt.stopPropagation();
    setActive(true);
  };

  // quando si trascina fuori dal componente tolgo la classe active e invalid
  const onDragLeave = (evt: any) => {
    evt.preventDefault();
    evt.stopPropagation();
    setActive(false);
    setInvalid(false);
  };

  // mentre si trascina verifichiamo:
  // 1. che gli oggetti trascinati siano file
  // 2. che abbiano un'estensione compatibile con quella settata dal parent
  // se la condizione fallisce, settiamo lo stato invalid
  const onDragOver = (evt: any) => {
    evt.preventDefault();
    evt.stopPropagation();
    evt.dataTransfer.dropEffect = "copy";

    const files: Array<File> = [...evt.dataTransfer.items].filter(
      (e: DataTransferItem) => e.kind === "file"
    );
    const allowedTypes: Array<string> = types
      .split(",")
      .map((e: string) => e.trim().replace(".", ""));
    const typeCheck = files
      .map((file: File) => file.type)
      .filter(
        (fileType: string) =>
          allowedTypes.filter((type: string) =>
            fileType.toLowerCase().includes(type)
          ).length > 0
      );
    setInvalid(typeCheck.length !== files.length);
  };

  // al drop, se i file trascinati non risultano invalid, converto la FileList del dataTransfer in un array
  const onDrop = (evt: any) => {
    evt.preventDefault();
    evt.stopPropagation();
    setInvalid(false);
    setActive(false);

    if (!invalid) {
      const files: Array<File> = [...evt.dataTransfer.files];
      updateData(files);
    }
  };

  // dopo una selezione dalla modale nativa converto la FileList in un array
  const selectFromInput = (evt: any) => {
    const current = input.current as unknown as HTMLInputElement;
    const files: Array<File> = [...(current.files as FileList)];
    updateData(files);
  };

  // trasformo l'array di file in uno di stringhe con solo il nome e aggiorno lo stato
  const updateData = (files: Array<File>) => {
    const names: Array<string> = files.map((e: File) => e.name);
    setSelected(names);
  };

  // il button che al click che trigghera l'input type file nascosto
  const triggerInput = () => (input.current as unknown as HTMLElement).click();

  // svuoto la selezione del componente
  const onReset = () => setSelected([]);

  // quando i selected cambiano, notifico il parent
  useEffect(() => {
    onChange(selected);
  }, [selected]);

  return (
    <section
      id="dnd"
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={getStyle()}
    >
      <h3>Droppa qui zio!</h3>
      <button onClick={triggerInput}>
        seleziona dal piccì (ma io sono solo un button)
      </button>

      <input
        multiple
        type="file"
        accept={types}
        onChange={selectFromInput}
        ref={input}
      />

      {selected.length > 0 && (
        <ul>
          {selected.map(
            (e: string, i: number): JSX.Element => (
              <li key={i}>{e}</li>
            )
          )}
        </ul>
      )}

      {selected.length !== 0 && <button onClick={onReset}>Reset</button>}
    </section>
  );
};

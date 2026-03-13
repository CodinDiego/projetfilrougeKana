import CharacterCard from "./CharacterCard";

export default function StudyMode({ script, kanaData }) {
    const characters = kanaData.map((kana) => ({
        character: script === "hiragana" ? kana.hiragana : kana.katakana,
        romanji: kana.romanji,
        key: kana.romanji + kana.row,
    }));

    return (
        <div className="study-mode">
            <div className="kana-grid">
                {characters.map((item) => (
                    <CharacterCard
                        key={item.key}
                        character={item.character}
                        romanji={item.romanji}
                    />
                ))}
            </div>
        </div>
    );
}

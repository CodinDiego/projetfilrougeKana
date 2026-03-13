import CharacterCard from "./CharacterCard";

export default function CharacterGrid({ characters, title }) {
    return (
        <section className="kana-section">
            <div className="section-header">
                <h2 className="section-title">{title}</h2>
                <div className="section-line" />
            </div>
            <div className="kana-grid">
                {characters.map((item, index) => (
                    <CharacterCard
                        key={`${item.character}-${index}`}
                        character={item.character}
                        romanji={item.romanji}
                    />
                ))}
            </div>
        </section>
    );
}

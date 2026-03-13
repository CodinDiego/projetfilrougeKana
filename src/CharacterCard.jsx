export default function CharacterCard({ character, romanji }) {
    return (
        <div className="kana-card">
            <span className="kana-char">{character}</span>
            <span className="kana-romanji">{romanji}</span>
        </div>
    );
}

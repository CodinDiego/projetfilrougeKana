import { useState } from "react";
import { kanaData } from "./data/kana";
import StudyMode from "./StudyMode";
import QuizMode from "./QuizMode";
import "./App.css";

export default function App() {
    const [mode, setMode] = useState("study"); // 'study' | 'quiz'
    const [script, setScript] = useState("hiragana"); // 'hiragana' | 'katakana'

    const switchMode = (newMode) => {
        setMode(newMode);
    };

    return (
        <div className="app">
            {/* Decorative background */}
            <div className="bg-circle bg-circle-1" />
            <div className="bg-circle bg-circle-2" />
            <header className="app-header">
                <p className="app-subtitle">Apprentissage du Japonais-Kana</p>
            </header>

            {/* ── Controls bar ── */}
            <div className="controls-bar">
                {/* Mode toggle */}
                <div className="mode-toggle">
                    <button
                        className={`mode-btn${mode === "study" ? " mode-btn--active" : ""}`}
                        onClick={() => switchMode("study")}
                    >
                        <span className="mode-btn-icon"></span>
                        Étude
                    </button>
                    <button
                        className={`mode-btn${mode === "quiz" ? " mode-btn--active" : ""}`}
                        onClick={() => switchMode("quiz")}
                    >
                        <span className="mode-btn-icon"></span>
                        Quiz
                    </button>
                </div>

                {/* Script selector */}
                <div className="script-toggle">
                    <button
                        className={`script-btn${script === "hiragana" ? " script-btn--active" : ""}`}
                        onClick={() => setScript("hiragana")}
                    >
                        <span className="script-btn-jp">あ</span>
                        Hiragana
                    </button>
                    <button
                        className={`script-btn${script === "katakana" ? " script-btn--active" : ""}`}
                        onClick={() => setScript("katakana")}
                    >
                        <span className="script-btn-jp">ア</span>
                        Katakana
                    </button>
                </div>
            </div>

            {/* ── Main content ── */}
            <main className="app-main">
                {mode === "study" && (
                    <StudyMode script={script} kanaData={kanaData} />
                )}
                {mode === "quiz" && (
                    <QuizMode key={script} script={script} kanaData={kanaData} />
                )}
            </main>

            <footer className="app-footer">
                頑張ってください — Bonne chance dans votre apprentissage
            </footer>
        </div>
    );
}

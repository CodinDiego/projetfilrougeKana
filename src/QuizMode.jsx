import { useState, useEffect, useCallback } from "react";

function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

export default function QuizMode({ script, kanaData }) {
    const [queue, setQueue] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState("");
    const [score, setScore] = useState({ correct: 0, total: 0 });
    const [feedback, setFeedback] = useState(null); // null | 'correct' | 'incorrect'
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [finished, setFinished] = useState(false);
    const [shake, setShake] = useState(false);

    // Init / reset queue on script change
    const initQuiz = useCallback(() => {
        setQueue(shuffle(kanaData));
        setCurrentIndex(0);
        setUserAnswer("");
        setScore({ correct: 0, total: 0 });
        setFeedback(null);
        setFinished(false);
    }, [kanaData]);

    useEffect(() => {
        // pour lancer le quizz
        initQuiz();
    }, [script, initQuiz]);

    const currentKana = queue[currentIndex];
    if (!currentKana) return null;

    const displayChar =
        script === "hiragana" ? currentKana.hiragana : currentKana.katakana;

    const goNext = () => {
        const nextIndex = currentIndex + 1;
        if (nextIndex >= queue.length) {
            setFinished(true);
        } else {
            setCurrentIndex(nextIndex);
            setUserAnswer("");
            setFeedback(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (feedback !== null) return; // already answered, wait for next

        const isCorrect =
            userAnswer.toLowerCase().trim() === currentKana.romanji.toLowerCase();

        setScore((prev) => ({
            correct: prev.correct + (isCorrect ? 1 : 0),
            total: prev.total + 1,
        }));
        setCorrectAnswer(currentKana.romanji);
        setFeedback(isCorrect ? "correct" : "incorrect");

        if (!isCorrect) {
            setShake(true);
            setTimeout(() => setShake(false), 500);
        }

        setTimeout(goNext, 1400);
    };

    const percent =
        score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;
    const progress = queue.length > 0 ? (currentIndex / queue.length) * 100 : 0;

    if (finished) {
        return (
            <div className="quiz-finished">
                <div className="quiz-finished-icon">
                    {percent >= 80 ? "🎌" : percent >= 50 ? "📖" : "🔄"}
                </div>
                <h2 className="quiz-finished-title">Quiz terminé !</h2>
                <div className="quiz-finished-score">
                    <span className="quiz-score-big">{score.correct}</span>
                    <span className="quiz-score-sep">/</span>
                    <span className="quiz-score-total">{score.total}</span>
                </div>
                <p className="quiz-finished-percent">{percent}% de réussite</p>
                <p className="quiz-finished-msg">
                    {percent >= 80
                        ? "Excellent ! Vous maîtrisez ces kana."
                        : percent >= 50
                            ? "Bon travail ! Continuez à pratiquer."
                            : "Continuez l'entraînement, vous progresserez !"}
                </p>
                <button className="quiz-restart-btn" onClick={initQuiz}>
                    Recommencer le quiz
                </button>
            </div>
        );
    }

    return (
        <div className="quiz-mode">
            {/* Progress bar */}
            <div className="quiz-progress-bar">
                <div
                    className="quiz-progress-fill"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Header score */}
            <div className="quiz-header">
                <div className="quiz-counter">
                    <span className="quiz-counter-current">{currentIndex + 1}</span>
                    <span className="quiz-counter-sep">/</span>
                    <span className="quiz-counter-total">{queue.length}</span>
                </div>
                <div className="quiz-score-display">
                    <span className="quiz-score-correct">{score.correct}</span>
                    <span className="quiz-score-label"> correct{score.correct > 1 ? "s" : ""}</span>
                    {score.total > 0 && (
                        <span className="quiz-score-pct"> · {percent}%</span>
                    )}
                </div>
            </div>

            {/* Character display */}
            <div className={`quiz-character-wrap${shake ? " shake" : ""}`}>
                <div
                    className={`quiz-character-card${
                        feedback === "correct"
                            ? " card-correct"
                            : feedback === "incorrect"
                                ? " card-incorrect"
                                : ""
                    }`}
                >
                    <span className="quiz-char">{displayChar}</span>
                    {feedback === "incorrect" && (
                        <span className="quiz-reveal">{correctAnswer}</span>
                    )}
                </div>
            </div>

            {/* Feedback message */}
            {feedback && (
                <div className={`quiz-feedback quiz-feedback--${feedback}`}>
                    {feedback === "correct" ? (
                        <>✓ Correct !</>
                    ) : (
                        <>✗ Incorrect — c'était <strong>{correctAnswer}</strong></>
                    )}
                </div>
            )}

            {/* Input form */}
            <form className="quiz-form" onSubmit={handleSubmit}>
                <input
                    className={`quiz-input${feedback ? " input-locked" : ""}`}
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Tapez le rōmaji…"
                    autoFocus
                    disabled={!!feedback}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                />
                <button
                    className="quiz-submit-btn"
                    type="submit"
                    disabled={!!feedback || userAnswer.trim() === ""}
                >
                    Valider
                </button>
            </form>


        </div>
    );
}

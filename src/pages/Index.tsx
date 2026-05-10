import { useState, useEffect, useRef } from "react";

const FLOWER_BG = "https://cdn.ezst.app/projects/05fad545-e8d9-4923-8d67-4051f498d74c/files/8554659e-b7ac-4a78-8f2b-004302007e73.jpg";
const BOUQUET_IMG = "https://cdn.ezst.app/projects/05fad545-e8d9-4923-8d67-4051f498d74c/files/d4ddd111-9099-4748-a1a0-9e3f475aa58d.jpg";
const PASSWORD = "0828";

type Screen = "welcome" | "password" | "gifts" | "bouquet";

const petals = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 8,
  duration: 6 + Math.random() * 6,
  size: 18 + Math.random() * 28,
  emoji: ["🌸", "🌺", "🌹", "🌷", "💮"][Math.floor(Math.random() * 5)],
}));

export default function Index() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [password, setPassword] = useState("");
  const [shake, setShake] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [letterVisible, setLetterVisible] = useState(false);
  const [showBouquet, setShowBouquet] = useState(false);
  const [bouquetVisible, setBouquetVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (screen === "welcome") {
      const timer = setTimeout(() => setScreen("password"), 4200);
      return () => clearTimeout(timer);
    }
  }, [screen]);

  useEffect(() => {
    if (screen === "password") {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [screen]);

  const handlePasswordInput = (val: string) => {
    const clean = val.replace(/\D/g, "").slice(0, 4);
    setPassword(clean);
    if (clean.length === 4) {
      if (clean === PASSWORD) {
        setTimeout(() => setScreen("gifts"), 400);
      } else {
        setShake(true);
        setTimeout(() => {
          setShake(false);
          setPassword("");
        }, 700);
      }
    }
  };

  const openBouquet = () => {
    setShowBouquet(true);
    setTimeout(() => setBouquetVisible(true), 50);
  };

  const closeBouquet = () => {
    setBouquetVisible(false);
    setTimeout(() => setShowBouquet(false), 500);
  };

  const openLetter = () => {
    setShowLetter(true);
    setTimeout(() => setLetterVisible(true), 50);
  };

  const closeLetter = () => {
    setLetterVisible(false);
    setTimeout(() => setShowLetter(false), 400);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-rose-950">
      {/* Falling petals always visible */}
      <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
        {petals.map((p) => (
          <div
            key={p.id}
            className="absolute top-0"
            style={{
              left: `${p.left}%`,
              fontSize: `${p.size}px`,
              animation: `petalFall ${p.duration}s ${p.delay}s infinite linear`,
              opacity: 0,
            }}
          >
            {p.emoji}
          </div>
        ))}
      </div>

      {/* ── WELCOME SCREEN ── */}
      {screen === "welcome" && (
        <div className="relative z-20 flex min-h-screen flex-col items-center justify-center">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${FLOWER_BG})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-rose-950/40 via-rose-900/25 to-rose-950/70" />
          <div className="relative z-10 flex flex-col items-center gap-5 px-8 text-center">
            <p
              className="welcome-text font-cormorant italic text-rose-100/80 text-lg tracking-[0.5em] uppercase"
              style={{ animationDelay: "0.1s" }}
            >
              With All My Love
            </p>
            <h1
              className="welcome-text font-cormorant text-white leading-none"
              style={{
                animationDelay: "0.6s",
                fontSize: "clamp(5rem, 18vw, 13rem)",
                fontWeight: 300,
                fontStyle: "italic",
                textShadow: "0 4px 60px rgba(180,30,60,0.7), 0 0 100px rgba(220,60,80,0.25)",
                letterSpacing: "-0.02em",
              }}
            >
              Happy
            </h1>
            <h2
              className="welcome-text font-cormorant font-bold text-rose-100 leading-none"
              style={{
                animationDelay: "1s",
                fontSize: "clamp(3.5rem, 12vw, 9rem)",
                textShadow: "0 2px 24px rgba(180,30,60,0.6)",
                letterSpacing: "0.08em",
              }}
            >
              Mother's Day
            </h2>
            <p
              className="welcome-text font-cormorant italic text-rose-300/70 text-2xl mt-4"
              style={{ animationDelay: "1.9s", letterSpacing: "0.2em" }}
            >
              🌸 ～ ♥ ～ 🌸
            </p>
          </div>
        </div>
      )}

      {/* ── PASSWORD SCREEN ── */}
      {screen === "password" && (
        <div className="relative z-20 flex min-h-screen flex-col items-center justify-center">
          <div
            className="absolute inset-0 bg-cover bg-center scale-110"
            style={{
              backgroundImage: `url(${FLOWER_BG})`,
              filter: "blur(6px) brightness(0.45)",
            }}
          />
          <div className="absolute inset-0 bg-rose-950/40" />

          <div
            className={`relative z-10 flex flex-col items-center gap-7 rounded-3xl border border-rose-300/20 bg-white/10 px-8 py-12 backdrop-blur-md shadow-2xl screen-enter ${shake ? "pw-shake" : ""}`}
            style={{ maxWidth: 380, width: "90%", boxShadow: "0 24px 64px rgba(100,0,30,0.5)" }}
          >
            <div className="text-center">
              <p className="text-5xl">🔐</p>
              <h2
                className="font-cormorant font-bold text-white leading-none mt-3"
                style={{
                  fontSize: "clamp(2.2rem, 8vw, 3.5rem)",
                  textShadow: "0 2px 16px rgba(0,0,0,0.5)",
                  letterSpacing: "0.04em",
                }}
              >
                Enter the Password
              </h2>
              <p className="mt-3 font-cormorant italic text-rose-300/75 text-lg">
                Hint: Mom's birthday
              </p>
            </div>

            <div className="flex gap-4">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-bold text-white transition-all duration-200"
                  style={{
                    background: password[i] ? "rgba(251,113,133,0.25)" : "rgba(255,255,255,0.12)",
                    border: password[i] ? "2px solid rgba(251,113,133,0.8)" : "2px solid rgba(253,164,175,0.25)",
                    boxShadow: password[i] ? "0 0 20px rgba(251,113,133,0.35)" : "none",
                  }}
                >
                  {password[i] ? "●" : ""}
                </div>
              ))}
            </div>

            <input
              ref={inputRef}
              type="tel"
              className="absolute opacity-0 w-1 h-1 pointer-events-none"
              value={password}
              onChange={(e) => handlePasswordInput(e.target.value)}
              maxLength={4}
              inputMode="numeric"
            />

            <div className="grid grid-cols-3 gap-3 w-full">
              {[1,2,3,4,5,6,7,8,9,"",0,"⌫"].map((key, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (key === "⌫") handlePasswordInput(password.slice(0, -1));
                    else if (key !== "") handlePasswordInput(password + String(key));
                  }}
                  className={`h-14 rounded-2xl font-caveat text-2xl font-semibold transition-all duration-150 ${key === "" ? "pointer-events-none opacity-0" : "active:scale-90 hover:brightness-125"}`}
                  style={{
                    background: key === "" ? "transparent" : "rgba(255,255,255,0.12)",
                    color: key === "⌫" ? "rgba(251,113,133,0.95)" : "white",
                    border: key === "" ? "none" : "1px solid rgba(255,255,255,0.15)",
                  }}
                >
                  {key}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── GIFTS SCREEN ── */}
      {screen === "gifts" && (
        <div className="relative z-20 flex min-h-screen flex-col items-center justify-center">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${FLOWER_BG})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-rose-950/65 via-rose-900/50 to-rose-950/80" />

          <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center w-full max-w-md">
            <div className="screen-enter" style={{ animationDelay: "0s" }}>
              <p className="font-cormorant italic text-rose-300/70 text-xl tracking-[0.3em]">🌸 ～ ♥ ～ 🌸</p>
              <h1
                className="font-cormorant font-bold text-white mt-2 leading-none"
                style={{
                  fontSize: "clamp(3rem, 11vw, 5.5rem)",
                  textShadow: "0 4px 32px rgba(180,30,60,0.8)",
                  letterSpacing: "-0.01em",
                }}
              >
                Thank You, Mom
              </h1>
              <p className="font-cormorant italic text-rose-200/70 text-xl mt-2 tracking-wider">
                Choose your gift
              </p>
            </div>

            <div className="flex flex-col gap-4 w-full">
              {[
                { icon: "💐", label: "Bouquet", sub: "A carnation arrangement for you", delay: "0.25s", action: "bouquet" },
                { icon: "💌", label: "Letter", sub: "A message from Kochan", delay: "0.5s", action: "letter" },
              ].map((gift) => (
                <div
                  key={gift.action}
                  className="screen-enter"
                  style={{ animationDelay: gift.delay }}
                >
                  <button
                    onClick={() => {
                      if (gift.action === "letter") openLetter();
                      if (gift.action === "bouquet") openBouquet();
                    }}
                    className="group w-full rounded-3xl border border-rose-300/25 bg-white/10 px-6 py-5 backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:scale-105 active:scale-100 text-left flex items-center gap-5"
                    style={{ boxShadow: "0 8px 32px rgba(180,30,60,0.25)" }}
                  >
                    <span className="text-5xl">{gift.icon}</span>
                    <div className="flex-1">
                      <p className="font-cormorant font-bold text-white text-3xl leading-none">{gift.label}</p>
                      <p className="font-cormorant italic text-rose-200/60 text-base mt-0.5">{gift.sub}</p>
                    </div>
                    <span className="font-caveat text-2xl text-rose-300/50 group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── BOUQUET MODAL ── */}
      {showBouquet && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center"
          onClick={closeBouquet}
          style={{ background: "rgba(20,0,8,0.75)", backdropFilter: "blur(8px)" }}
        >
          <div
            className="relative w-full flex flex-col items-center pb-10"
            onClick={(e) => e.stopPropagation()}
            style={{
              transform: bouquetVisible ? "translateY(0)" : "translateY(100%)",
              opacity: bouquetVisible ? 1 : 0,
              transition: "all 0.55s cubic-bezier(0.34,1.4,0.64,1)",
            }}
          >
            {/* Message ribbon */}
            <div
              className="relative z-10 mb-[-24px] rounded-2xl px-8 py-3 text-center shadow-xl"
              style={{
                background: "linear-gradient(135deg, #be123c, #e11d48)",
                boxShadow: "0 8px 32px rgba(190,18,60,0.5)",
              }}
            >
              <p className="font-cormorant font-bold text-white text-2xl tracking-wide">
                With love, always 💕
              </p>
            </div>

            {/* Bouquet image — pops out from bottom */}
            <div
              className="relative"
              style={{
                transform: bouquetVisible ? "scale(1) rotate(-4deg)" : "scale(0.6) rotate(-4deg)",
                transition: "transform 0.65s cubic-bezier(0.34,1.56,0.64,1) 0.1s",
                filter: "drop-shadow(0 -24px 48px rgba(220,60,80,0.4)) drop-shadow(0 8px 32px rgba(0,0,0,0.5))",
              }}
            >
              <img
                src={BOUQUET_IMG}
                alt="カーネーションの花束"
                className="w-72 rounded-full md:w-96"
                style={{
                  border: "4px solid rgba(255,200,210,0.3)",
                  boxShadow: "0 -8px 60px rgba(230,80,100,0.35)",
                }}
              />
              {/* Sparkles */}
              {["✨","💫","⭐","✨","💕"].map((s, i) => (
                <span
                  key={i}
                  className="absolute text-2xl"
                  style={{
                    top: `${[10,5,20,35,15][i]}%`,
                    left: `${[-8, 85, -12, 88, 45][i]}%`,
                    opacity: bouquetVisible ? 1 : 0,
                    transform: bouquetVisible ? "scale(1)" : "scale(0)",
                    transition: `all 0.4s ease ${0.4 + i * 0.1}s`,
                  }}
                >
                  {s}
                </span>
              ))}
            </div>

            <button
              onClick={closeBouquet}
              className="mt-4 font-cormorant italic text-rose-200/50 text-base hover:text-rose-200 transition-colors tracking-wider"
            >
              Tap to close
            </button>
          </div>
        </div>
      )}

      {/* ── LETTER MODAL ── */}
      {showLetter && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={closeLetter}
          style={{ background: "rgba(20,0,8,0.88)", backdropFilter: "blur(10px)" }}
        >
          <div
            className="relative w-full max-w-lg rounded-3xl px-8 py-10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "linear-gradient(145deg, #fff9fa 0%, #ffeef3 60%, #fff5f7 100%)",
              transform: letterVisible ? "scale(1) translateY(0)" : "scale(0.88) translateY(32px)",
              opacity: letterVisible ? 1 : 0,
              transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
              maxHeight: "88vh",
              overflowY: "auto",
            }}
          >
            <button
              onClick={closeLetter}
              className="absolute top-4 right-5 text-rose-400 hover:text-rose-600 text-3xl font-light leading-none transition-colors"
            >
              ×
            </button>

            <div className="flex flex-col gap-5">
              <div className="text-center">
                <p className="text-5xl">💌</p>
                <p className="font-caveat text-4xl font-bold text-rose-700 mt-2">ママへ</p>
                <div className="w-20 h-px bg-rose-200 mx-auto mt-3" />
              </div>

              <div className="font-cormorant text-rose-900/85 text-lg leading-relaxed space-y-3"
                style={{ fontStyle: "italic" }}>
                <p>母の日おめでとう。</p>
                <p>日本にいたら直接花を渡したかったけど、今は難しいからウェブサイトを作ってみたよ。</p>
                <p>いつも遠くから応援してくれてありがとう。感謝してるよ。</p>
                <p>早く家に帰って手料理が食べたいな。</p>
                <p>後２ヶ月がんばるね！</p>
                <p>ママも疲れすぎないようにお仕事頑張って、楽しいことたくさんしてね。</p>
              </div>

              <div className="text-right mt-2">
                <div className="w-20 h-px bg-rose-200 ml-auto mb-3" />
                <p className="font-caveat text-2xl text-rose-600 font-semibold">こっちゃんより 🌸</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
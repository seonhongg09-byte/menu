import { useMemo, useState } from "react";
import { PreferenceForm, Preferences } from "./components/PreferenceForm";
import { RecommendationResult } from "./components/RecommendationResult";
import { recommendMenu } from "./logic/recommendMenu";

export function App() {
  const [preferences, setPreferences] = useState<Preferences>({
    category: "any",
    spicyLevel: "any",
    type: "any"
  });

  const [rerollKey, setRerollKey] = useState(0);

  const recommendation = useMemo(
    () => recommendMenu(preferences, rerollKey),
    [preferences, rerollKey]
  );

  const handleRecommend = (nextPreferences: Preferences) => {
    setPreferences(nextPreferences);
    setRerollKey((k) => k + 1);
  };

  const handleReroll = () => {
    setRerollKey((k) => k + 1);
  };

  return (
    <div className="page">
      <header className="page-header">
        <h1 className="page-title">오늘의 메뉴 추천</h1>
        <p className="page-subtitle">
          점심/저녁 메뉴가 고민될 때, 간단한 선호만 고르고 추천을 받아보세요.
        </p>
      </header>

      <main className="page-main">
        <section className="card">
          <PreferenceForm preferences={preferences} onSubmit={handleRecommend} />
        </section>

        <section className="card">
          <RecommendationResult
            recommendation={recommendation}
            onReroll={handleReroll}
          />
        </section>
      </main>
    </div>
  );
}


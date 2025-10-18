"use client";

import { useState } from "react";

type Preferences = {
  allergies?: string;
  dislikes?: string;
  timePerMeal?: string;
  budget?: string;
  servings?: number;
};

type MealPlan = {
  week: Array<{
    day: string;
    meals: {
      breakfast: string;
      lunch: string;
      dinner: string;
      calories?: number;
      ingredients?: string[];
    };
  }>;
};

export default function Page() {
  const [prefs, setPrefs] = useState<Preferences>({ servings: 2 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [plan, setPlan] = useState<MealPlan | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPlan(null);
    try {
      const resp = await fetch("/api/mealplan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ preferences: prefs }),
      });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const data = (await resp.json()) as MealPlan;
      setPlan(data);
    } catch (err: any) {
      setError(err?.message ?? "生成に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12, marginBottom: 24 }}>
        <div>
          <label>アレルギー/除外食材</label>
          <input
            type="text"
            placeholder="例: 卵, 乳, そば"
            value={prefs.allergies ?? ""}
            onChange={(e) => setPrefs({ ...prefs, allergies: e.target.value })}
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        <div>
          <label>苦手な料理/好み</label>
          <input
            type="text"
            placeholder="例: 辛いものを避ける、魚多め"
            value={prefs.dislikes ?? ""}
            onChange={(e) => setPrefs({ ...prefs, dislikes: e.target.value })}
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <label>1食の目安時間</label>
            <input
              type="text"
              placeholder="例: 20分"
              value={prefs.timePerMeal ?? ""}
              onChange={(e) => setPrefs({ ...prefs, timePerMeal: e.target.value })}
              style={{ width: '100%', padding: 8 }}
            />
          </div>
          <div>
            <label>1日の予算</label>
            <input
              type="text"
              placeholder="例: 1500円"
              value={prefs.budget ?? ""}
              onChange={(e) => setPrefs({ ...prefs, budget: e.target.value })}
              style={{ width: '100%', padding: 8 }}
            />
          </div>
        </div>
        <div>
          <label>人数</label>
          <input
            type="number"
            min={1}
            value={prefs.servings ?? 2}
            onChange={(e) => setPrefs({ ...prefs, servings: Number(e.target.value) })}
            style={{ width: 120, padding: 8 }}
          />
        </div>
        <div>
          <button type="submit" disabled={loading} style={{ padding: '10px 16px' }}>
            {loading ? '生成中…' : '1週間の献立を生成'}
          </button>
        </div>
      </form>

      {error && (
        <p style={{ color: 'crimson' }}>エラー: {error}</p>
      )}

      {plan && (
        <section style={{ display: 'grid', gap: 12 }}>
          {plan.week.map((d, i) => (
            <article key={i} style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 12 }}>
              <h3 style={{ marginTop: 0 }}>{d.day}</h3>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                <li><strong>朝:</strong> {d.meals.breakfast}</li>
                <li><strong>昼:</strong> {d.meals.lunch}</li>
                <li><strong>夜:</strong> {d.meals.dinner}</li>
                {typeof d.meals.calories === 'number' && (
                  <li><strong>推定カロリー:</strong> {d.meals.calories} kcal</li>
                )}
              </ul>
              {d.meals.ingredients?.length ? (
                <details style={{ marginTop: 8 }}>
                  <summary>材料</summary>
                  <ul style={{ margin: 0, paddingLeft: 18 }}>
                    {d.meals.ingredients.map((ing, j) => <li key={j}>{ing}</li>)}
                  </ul>
                </details>
              ) : null}
            </article>
          ))}
        </section>
      )}
    </div>
  );
}


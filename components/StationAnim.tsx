import s from "./Estacoes.module.css";

/**
 * Mini-animações por estação (SVG). O estado renderizado é o estado "final" legível;
 * as timelines em Estacoes.tsx animam a partir dele (gsap.from / fromTo) só com transform/opacity.
 */
export default function StationAnim({ n }: { n: number }) {
  switch (n) {
    case 1:
      return (
        <svg viewBox="0 0 200 120" className={s.anim} data-anim="quiz" aria-hidden="true">
          {[0, 1].map((k) => (
            <g key={k} transform={`translate(${k === 0 ? 40 : 120} 0)`}>
              <rect x="0" y="70" width="40" height="40" rx="4" className={k === 0 ? s.fM : s.fT} opacity=".25" />
              <rect x="6" y="64" width="28" height="8" rx="2" fill="#2c2150" />
              <ellipse cx="20" cy="62" rx="13" ry="7" className={`${s.buzzer} ${k === 0 ? s.fM : s.fT}`} data-k={k} />
              <text x="20" y="96" textAnchor="middle" className={s.svgMono}>
                EQUIPA {k === 0 ? "A" : "B"}
              </text>
            </g>
          ))}
          {[0, 1, 2].map((k) => (
            <text key={k} x={70 + k * 30} y={34 - (k % 2) * 8} className={`${s.q} ${s.svgDisplay}`} textAnchor="middle">
              ?
            </text>
          ))}
        </svg>
      );
    case 2:
      return (
        <svg viewBox="0 0 200 120" className={s.anim} data-anim="canta" aria-hidden="true">
          {Array.from({ length: 22 }, (_, k) => (
            <rect
              key={k}
              x={12 + k * 8}
              y={20}
              width="5"
              height="70"
              rx="1.5"
              className={`${s.bar} ${k % 3 === 0 ? s.fM : k % 3 === 1 ? s.fT : s.fY}`}
              style={{ transform: `scaleY(${0.25 + ((k * 37) % 70) / 100})` }}
            />
          ))}
          <line x1="10" y1="90.5" x2="190" y2="90.5" stroke="#cfc5ec" strokeOpacity=".4" />
          <text x="100" y="112" textAnchor="middle" className={`${s.stop} ${s.svgDisplay}`}>
            ♪ … E AGORA?
          </text>
        </svg>
      );
    case 3:
      return (
        <svg viewBox="0 0 200 120" className={s.anim} data-anim="macaca" aria-hidden="true">
          {Array.from({ length: 9 }, (_, k) => (
            <rect key={k} x={10 + k * 20.4} y="70" width="18" height="18" rx="2" fill="none" stroke="#f3ecff" strokeOpacity=".7" strokeWidth="1.4" strokeDasharray="3 2" />
          ))}
          <circle cx="0" cy="0" r="6" className={`${s.tokA} ${s.fM}`} transform="translate(89 64)" />
          <circle cx="0" cy="0" r="6" className={`${s.tokB} ${s.fT}`} transform="translate(111 64)" />
          {["✊", "✋", "✌"].map((h, k) => (
            <text key={k} x={70 + k * 30} y="40" textAnchor="middle" className={s.hand}>
              {h}
            </text>
          ))}
        </svg>
      );
    case 4:
      return (
        <svg viewBox="0 0 200 120" className={s.anim} data-anim="tazos" aria-hidden="true">
          {[4, 3, 2, 1].flatMap((count, row) =>
            Array.from({ length: count }, (_, k) => {
              const x = 118 + k * 16 + row * 8;
              const y = 92 - row * 18;
              return <path key={`${row}-${k}`} className={s.cup} d={`M${x} ${y} h14 l-2 16 h-10 z`} />;
            })
          )}
          <line x1="110" y1="108.5" x2="196" y2="108.5" stroke="#cfc5ec" strokeOpacity=".5" />
          <g className={s.disc}>
            <ellipse cx="22" cy="66" rx="9" ry="9" className={s.fY} />
            <ellipse cx="22" cy="66" rx="4" ry="4" fill="#0f0a24" opacity=".4" />
          </g>
          <text x="22" y="100" textAnchor="middle" className={s.svgMono}>
            10 COPOS
          </text>
        </svg>
      );
    case 5:
      return (
        <svg viewBox="0 0 200 120" className={s.anim} data-anim="mimica" aria-hidden="true">
          {["Power Rangers", "Friends", "Dragon Ball", "Titanic"].map((t, k) => (
            <g key={t} className={s.card} transform={`translate(${30 + k * 38} 58) rotate(${-12 + k * 8})`}>
              <rect x="-17" y="-26" width="34" height="50" rx="3" fill="#f3ecff" />
              <rect x="-17" y="-26" width="34" height="8" rx="3" className={k % 2 ? s.fT : s.fM} />
              <text x="0" y="4" textAnchor="middle" className={s.cardTxt}>
                {t.split(" ").map((w, i) => (
                  <tspan key={i} x="0" dy={i === 0 ? 0 : 7}>
                    {w}
                  </tspan>
                ))}
              </text>
            </g>
          ))}
          <text x="100" y="114" textAnchor="middle" className={`${s.shh} ${s.svgMono}`}>
            SÓ GESTOS · SEM SOM · 3 TENTATIVAS
          </text>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 200 120" className={s.anim} data-anim="grito" aria-hidden="true">
          {[0, 1, 2, 3].map((p) => {
            const cls = [s.fM, s.fT, s.fY, s.fP][p];
            const y = 18 + p * 24;
            return (
              <g key={p}>
                <line x1="88" y1={y + 8} x2="112" y2={y + 8} className={s.pairLine} />
                <g className={s.pairL} transform={`translate(60 ${y})`}>
                  <rect width="28" height="16" rx="3" className={cls} />
                  <text x="14" y="11.5" textAnchor="middle" className={s.pairTxt}>
                    !!!
                  </text>
                </g>
                <g className={s.pairR} transform={`translate(112 ${y})`}>
                  <rect width="28" height="16" rx="3" className={cls} />
                  <text x="14" y="11.5" textAnchor="middle" className={s.pairTxt}>
                    !!!
                  </text>
                </g>
              </g>
            );
          })}
        </svg>
      );
  }
}

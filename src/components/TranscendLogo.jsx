// TranscendLogo.jsx — Official Transcend Group of Institutions Logo
// Renders the exact shield + wordmark inline as SVG (no font dependency)

const TranscendLogo = ({ height = 70, className = '' }) => {
  const aspectRatio = 2.65; // width:height ratio of the original logo
  const width = height * aspectRatio;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 530 200"
      width={width}
      height={height}
      className={className}
      aria-label="Transcend Group of Institutions"
      role="img"
    >
      {/* ── Shield emblem ─────────────────────────────── */}
      <g transform="translate(6, 4)">
        {/* Outer shield border (white fill so inner shape shows on dark bg) */}
        <path
          d="M18 14
             C18 14 158 14 158 14
             C158 14 168 80 88 172
             C8  80  18  14 18  14 Z"
          fill="white"
          stroke="#2b2980"
          strokeWidth="10"
          strokeLinejoin="round"
        />

        {/* Inner solid shield */}
        <path
          d="M32 28
             C32 28 144 28 144 28
             C144 28 152 85 88 160
             C24 85 32 28 32 28 Z"
          fill="#2b2980"
        />

        {/* Ornate calligraphic T ─ constructed from paths so no font needed */}
        {/* Crossbar */}
        <path
          d="M44 65
             Q52 55 62 60
             L114 60
             Q124 55 132 65
             L128 80
             Q120 70 112 72
             L98 72
             L98 140
             Q98 152 106 156
             L112 156
             L112 168
             L64 168
             L64 156
             L70 156
             Q78 152 78 140
             L78 72
             L64 72
             Q56 70 48 80 Z"
          fill="white"
        />

        {/* Decorative curl at top of T crossbar */}
        <path
          d="M88 62 Q78 42 68 50 Q62 56 70 60"
          fill="none"
          stroke="white"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M88 62 Q98 42 108 50 Q114 56 106 60"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Bottom serif on stem */}
        <path
          d="M72 160 Q78 168 88 168 Q98 168 104 160"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>

      {/* ── Wordmark ─────────────────────────────────── */}

      {/* "TRANSCEND" — spaced serif caps using SVG text with embedded font stack */}
      <text
        x="192"
        y="95"
        fill="#2b2980"
        fontSize="62"
        fontWeight="800"
        fontFamily="'Palatino Linotype', 'Palatino', 'Book Antiqua', 'Times New Roman', Georgia, serif"
        letterSpacing="3"
      >
        TRANSCEND
      </text>

      {/* "Group of Institutions" */}
      <text
        x="194"
        y="155"
        fill="#2b2980"
        fontSize="40"
        fontWeight="600"
        fontFamily="'Palatino Linotype', 'Palatino', 'Book Antiqua', 'Times New Roman', Georgia, serif"
        letterSpacing="0.5"
      >
        Group of Institutions
      </text>
    </svg>
  );
};

export default TranscendLogo;

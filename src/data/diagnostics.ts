/**
 * src/data/diagnostics.ts
 * ─────────────────────────────────────────────────────
 * Shared data for the four Meridian diagnostic services
 * (brief Section 5.4). Each page reads its entry from
 * here and renders via DiagnosticTemplate.astro.
 *
 * Hero summary lines are verbatim from the brief.
 * "What we test" lists and longer-form body copy were
 * marked [COPY TO COME] — written here in Meridian voice
 * per brief Section 2.4: plain-spoken, no marketing
 * language, no exclamation marks.
 */

export interface DiagnosticService {
  slug: string;
  name: string;
  summary: string;
  price: string;
  tests: string[];
  whyParas: string[];
  whoFor: string;
}

export const diagnostics: DiagnosticService[] = [
  {
    slug: "executive-assessment",
    name: "Executive Assessment",
    summary: "A full-day diagnostic that finds what your annual GP check-up misses.",
    price: "Included in all memberships. £3,500 as a one-off.",
    tests: [
      "Cardiac CT angiography with calcium scoring (CACS)",
      "Advanced lipid sub-fractionation — ApoB, Lp(a), oxidised LDL",
      "Continuous glucose monitoring across a working week",
      "Overnight sleep architecture study",
      "Cognitive baseline battery — speed, memory, executive function",
      "Full body composition by DEXA",
      "VO2 max and metabolic flexibility assessment",
      "Advanced inflammatory panel — hs-CRP, IL-6, fibrinogen",
      "Full thyroid panel — TSH, T3, T4, rT3, antibodies",
      "Hormonal baseline — testosterone, diurnal cortisol, DHEA-S",
      "Vitamin and mineral profile — D, B12, ferritin, omega-3 index",
      "HbA1c, fasting insulin, HOMA-IR",
      "Comprehensive liver and kidney function",
    ],
    whyParas: [
      "Most senior professionals reach forty-five having had perhaps four or five formal medical reviews in their adult life — each lasting twenty minutes, each centred on a basic blood panel that was designed in 1970. The blind spots are not edge cases. They are the things that actually end careers: silent cardiovascular calcification, the early metabolic dysfunction that precedes type-2 diabetes by a decade, the sleep-stage collapse that drives cognitive drift, and the inflammatory drift that quietly raises every other variable.",
      "A single day with the right diagnostic stack catches the slow-moving variables and gives your physician a baseline they can intervene against. Without that baseline, every subsequent appointment is a guess.",
    ],
    whoFor:
      "Senior professionals in their late thirties through to early sixties who have not had a structured diagnostic workup since their last insurance medical, and who suspect — usually correctly — that the standard private GP check-up is not enough.",
  },
  {
    slug: "longevity-screening",
    name: "Longevity Screening",
    summary: "Catch decline at the cellular level, years before it becomes clinical.",
    price: "Included in Performance and Executive memberships. £4,500 as a one-off.",
    tests: [
      "Biological age testing via DNA methylation (Horvath, GrimAge)",
      "Telomere length measurement",
      "Advanced lipid sub-fractionation — ApoB, Lp(a)",
      "Continuous glucose monitoring",
      "Comprehensive metabolic panel — fasting insulin, HOMA-IR",
      "Sex hormone and growth hormone axis panel",
      "Cardiac CT angiography with calcium scoring",
      "Advanced inflammatory markers — hs-CRP, IL-6, homocysteine",
      "Bone density assessment (DEXA)",
      "VO2 max and grip strength",
      "Vitamin, mineral, and omega-3 index profile",
      "Apolipoprotein E genotype",
    ],
    whyParas: [
      "Longevity medicine is not a wellness brand. It is a discipline that treats biological ageing as a tractable variable — measurable, modifiable, and worth intervening against in the decade before any clinical disease appears. The single biggest determinant of how the next thirty years of your life feel is the trajectory of variables that are already drifting in your forties.",
      "Screening catches that drift while it is cheap to reverse. The interventions that work in a fifty-year-old with mildly elevated ApoB and a fasting insulin of 12 are well-understood, low-cost, and well-tolerated. The interventions available to the same patient ten years later, with established disease, are none of those things.",
    ],
    whoFor:
      "Members in their forties and fifties who want a structured view of their biological trajectory and are willing to act on early signal. Particularly suited to founders and executives with a family history of cardiometabolic, cognitive, or oncological decline.",
  },
  {
    slug: "performance-optimisation",
    name: "Performance Optimisation",
    summary: "Engineer sleep, recovery, and cognition the way professional athletes do.",
    price: "Included in Performance and Executive memberships. £3,800 as a one-off.",
    tests: [
      "VO2 max and lactate threshold under graded exercise",
      "Resting metabolic rate and substrate utilisation",
      "Body composition (DEXA) — fat, lean mass, regional distribution",
      "Overnight sleep architecture study with HRV overlay",
      "Multi-day HRV and recovery-load monitoring",
      "Cognitive performance battery under sustained load",
      "Diurnal cortisol pattern across three days",
      "Testosterone, free testosterone, IGF-1",
      "Continuous glucose monitoring across a working week",
      "Iron studies, ferritin, B12, omega-3 index",
      "Inflammatory and recovery markers — CK, LDH, hs-CRP",
      "Structured lifestyle and training audit",
    ],
    whyParas: [
      "Elite sport has spent thirty years engineering performance with the seriousness of an engineering discipline. The same evidence base translates well to senior professionals running on six hours of sleep, twelve-hour cognitive days, and chronic travel — but very few private practices apply it.",
      "Performance optimisation at Meridian focuses on the variables that actually move the needle: sleep architecture (not just hours), HRV-led recovery (not just rest days), cognitive performance under load (not just intelligence on a good day), and metabolic flexibility (not just calorie counts). The result is a specific protocol for your body and your week, not a generic wellness plan.",
    ],
    whoFor:
      "Founders, executives, and high-performing professionals who already train, already eat reasonably well, and want measurable returns on the time and energy they already invest in their health. Particularly suited to people whose output depends on cognitive performance under sustained load.",
  },
  {
    slug: "mental-wellness",
    name: "Mental Wellness",
    summary: "High-performance stress medicine — without the wellness clichés.",
    price: "6 sessions included in Performance and Executive memberships. £450 per session as a one-off.",
    tests: [
      "Structured psychiatric assessment with a senior clinician",
      "Comprehensive stress hormone panel — diurnal cortisol, DHEA-S",
      "Overnight sleep architecture study",
      "Inflammatory markers — hs-CRP, IL-6",
      "Full thyroid panel",
      "B12, folate, vitamin D, magnesium, omega-3 index",
      "Multi-day HRV monitoring",
      "Continuous glucose monitoring with mood overlay",
      "Cognitive performance battery under load",
      "Detailed history of sleep, stimulants, alcohol, and recovery",
      "Validated screening instruments — PHQ-9, GAD-7, ISI, PSS",
    ],
    whyParas: [
      "Senior professional populations carry a specific cluster of high-functioning mental health patterns — anxiety presenting as drive, depression presenting as exhaustion, burnout presenting as detachment, and substance use presenting as routine. None of these tend to look like the textbook cases on which most NHS pathways are calibrated.",
      "Treating them well requires two things at once: a senior clinician who recognises the pattern early, and a willingness to look at the physiological substrate as seriously as the psychological one. Cortisol curves, sleep architecture, inflammation, and metabolic state are not separate from how you feel — they are part of the mechanism.",
    ],
    whoFor:
      "Members navigating chronic stress, sleep difficulty, burnout patterns, or anxiety that is not severe enough to require crisis intervention but is severe enough to be affecting work and relationships. Confidentiality is treated as the default, not an option.",
  },
];

export const findService = (slug: string): DiagnosticService | undefined =>
  diagnostics.find((d) => d.slug === slug);

export const relatedServices = (slug: string): DiagnosticService[] =>
  diagnostics.filter((d) => d.slug !== slug);

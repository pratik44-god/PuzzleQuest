// export type CinematicChapter = {
//   chapter: string;
//   title: string;
//   subtitle: string;
// };

// export const PIRATES_LAST_MAP_VIDEOS = {
//   intro: "/hunts/pirates-last-map/videos/intro.mp4",

//   transition1:
//     "/hunts/pirates-last-map/videos/transition-1.mp4",

//   transition2:
//     "/hunts/pirates-last-map/videos/transition-2.mp4",

//   midCinematic:
//     "/hunts/pirates-last-map/videos/mid-cinematic.mp4",

//   final:
//     "/hunts/pirates-last-map/videos/final-scene.mp4",
// } as const;

// export const PIRATES_LAST_MAP_CHAPTERS: CinematicChapter[] = [
//   {
//     chapter: "CHAPTER I",
//     title: "THE MAP AWAKENS",
//     subtitle:
//       "Captain Vane left behind a secret that only the worthy can uncover.",
//   },
//   {
//     chapter: "CHAPTER II",
//     title: "THE ISLAND CALLS",
//     subtitle:
//       "The storm has passed, but something ancient waits beyond the horizon.",
//   },
//   {
//     chapter: "CHAPTER III",
//     title: "THE JUNGLE WAITS",
//     subtitle:
//       "Every path leads deeper into darkness. Every clue brings you closer.",
//   },
//   {
//     chapter: "CHAPTER IV",
//     title: "THE FINAL SECRET",
//     subtitle:
//       "The last door has opened. The truth is finally within reach.",
//   },
// ];

// export function getChapter(
//   index: number,
// ): CinematicChapter {
//   return (
//     PIRATES_LAST_MAP_CHAPTERS[index] ?? {
//       chapter: `CHAPTER ${index + 1}`,
//       title: "THE NEXT CLUE",
//       subtitle: "The journey continues.",
//     }
//   );
// }

// /*
//  * Pirate hunt contains exactly 5 questions.
//  *
//  * Question 1 → transition 1
//  * Question 2 → transition 2
//  * Question 3 → mid cinematic
//  * Question 4 → no video
//  * Question 5 → final scene
//  *
//  * The intro video is played before Question 1.
//  */
// export const PIRATE_QUESTION_VIDEOS: readonly (
//   | string
//   | undefined
// )[] = [
//   PIRATES_LAST_MAP_VIDEOS.transition1,
//   PIRATES_LAST_MAP_VIDEOS.transition2,
//   PIRATES_LAST_MAP_VIDEOS.midCinematic,
//   undefined,
//   PIRATES_LAST_MAP_VIDEOS.final,
// ];

// export function getTransitionVideo(
//   questionIndex: number,
// ): string | undefined {
//   if (
//     questionIndex < 0 ||
//     questionIndex >= PIRATE_QUESTION_VIDEOS.length
//   ) {
//     return undefined;
//   }

//   return PIRATE_QUESTION_VIDEOS[questionIndex];
// }

// export function getIntroVideo(): string {
//   return PIRATES_LAST_MAP_VIDEOS.intro;
// }

// export function getFinalVideo(): string {
//   return PIRATES_LAST_MAP_VIDEOS.final;
// }

export type CinematicChapter = {
  chapter: string;
  title: string;
  subtitle: string;
};

export const PIRATES_LAST_MAP_VIDEOS = {
  intro: "/hunts/pirates-last-map/videos/intro.mp4",

  transition1:
    "/hunts/pirates-last-map/videos/transition-1.mp4",

  transition2:
    "/hunts/pirates-last-map/videos/transition-2.mp4",

  midCinematic:
    "/hunts/pirates-last-map/videos/mid-cinematic.mp4",

  midCinematic2:
    "/hunts/pirates-last-map/videos/mid-cinematic-2.mp4",

  final:
    "/hunts/pirates-last-map/videos/final-scene.mp4",
} as const;

export const PIRATES_LAST_MAP_CHAPTERS: CinematicChapter[] = [
  {
    chapter: "CHAPTER I",
    title: "THE MAP AWAKENS",
    subtitle:
      "Captain Vane left behind a secret that only the worthy can uncover.",
  },
  {
    chapter: "CHAPTER II",
    title: "THE ISLAND CALLS",
    subtitle:
      "The storm has passed, but something ancient waits beyond the horizon.",
  },
  {
    chapter: "CHAPTER III",
    title: "THE JUNGLE WAITS",
    subtitle:
      "Every path leads deeper into darkness. Every clue brings you closer.",
  },
  {
    chapter: "CHAPTER IV",
    title: "THE FINAL SECRET",
    subtitle:
      "The last door has opened. The truth is finally within reach.",
  },
];

export function getChapter(
  index: number,
): CinematicChapter {
  return (
    PIRATES_LAST_MAP_CHAPTERS[index] ?? {
      chapter: `CHAPTER ${index + 1}`,
      title: "THE NEXT CLUE",
      subtitle: "The journey continues.",
    }
  );
}

/*
 * Pirate hunt:
 *
 * Intro
 *   ↓
 * Question 1
 *   ↓
 * Transition 1
 *   ↓
 * Question 2
 *   ↓
 * Transition 2
 *   ↓
 * Question 3
 *   ↓
 * Mid Cinematic
 *   ↓
 * Question 4
 *   ↓
 * Mid Cinematic 2
 *   ↓
 * Question 5
 *   ↓
 * Final Scene
 *   ↓
 * Complete
 *
 * NOTE:
 * final.mp4 is intentionally NOT part of this array.
 * It is played separately after Question 5 is solved.
 */
export const PIRATE_QUESTION_VIDEOS: readonly (
  | string
  | undefined
)[] = [
  PIRATES_LAST_MAP_VIDEOS.transition1,
  PIRATES_LAST_MAP_VIDEOS.transition2,
  PIRATES_LAST_MAP_VIDEOS.midCinematic,
  PIRATES_LAST_MAP_VIDEOS.midCinematic2,
];

export function getTransitionVideo(
  questionIndex: number,
): string | undefined {
  if (
    questionIndex < 0 ||
    questionIndex >= PIRATE_QUESTION_VIDEOS.length
  ) {
    return undefined;
  }

  return PIRATE_QUESTION_VIDEOS[questionIndex];
}

export function getIntroVideo(): string {
  return PIRATES_LAST_MAP_VIDEOS.intro;
}

export function getFinalVideo(): string {
  return PIRATES_LAST_MAP_VIDEOS.final;
}
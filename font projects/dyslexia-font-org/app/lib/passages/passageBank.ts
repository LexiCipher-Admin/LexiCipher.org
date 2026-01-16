/**
 * Reading Passage Bank for DyslexiaFont.org
 * 
 * Each passage is designed to be:
 * - 50-100 words in length
 * - Age-appropriate for the target reading level
 * - Culturally neutral
 * - Free of sensitive topics (violence, politics, religion, etc.)
 * 
 * Passages rotate to prevent memorization during testing.
 */

export interface Passage {
  id: string;
  text: string;
  wordCount: number;
  readingLevel: "3rd" | "5th" | "8th";
  category: "nature" | "science" | "everyday" | "adventure";
}

/**
 * 3rd Grade Reading Level Passages (~50-70 words)
 * Flesch-Kincaid Grade Level: 2.5-3.5
 */
export const grade3Passages: Passage[] = [
  {
    id: "3rd-nature-01",
    text: "The little bird sat on a branch near my window. It had bright blue feathers and a small orange beak. Every morning, it would sing a happy song. I liked to watch it hop from branch to branch. Sometimes it would fly away, but it always came back to the same tree.",
    wordCount: 54,
    readingLevel: "3rd",
    category: "nature",
  },
  {
    id: "3rd-nature-02",
    text: "Butterflies are amazing insects. They start as tiny eggs, then become caterpillars. After eating lots of leaves, they make a cocoon. Inside, something wonderful happens. When they come out, they have beautiful wings! Some butterflies fly very far to find warm places in winter.",
    wordCount: 47,
    readingLevel: "3rd",
    category: "nature",
  },
  {
    id: "3rd-everyday-01",
    text: "Making pancakes is fun. First, you mix flour, eggs, and milk in a big bowl. Stir it until it looks smooth. Then a grown-up helps pour the batter onto a hot pan. When you see bubbles, it is time to flip! Add some fruit on top and enjoy your breakfast.",
    wordCount: 52,
    readingLevel: "3rd",
    category: "everyday",
  },
  {
    id: "3rd-science-01",
    text: "The moon changes shape in the sky. Sometimes it looks like a big round ball. Other times it looks like a banana. This happens because the sun lights up different parts of the moon as it moves. It takes about a month to see all the shapes.",
    wordCount: 50,
    readingLevel: "3rd",
    category: "science",
  },
  {
    id: "3rd-adventure-01",
    text: "Sam found a map in the old box. It showed a path through the park to a big oak tree. She followed the dotted line past the swings and the pond. Under the tree, she found a small tin box. Inside were pretty rocks and a note that said make a wish.",
    wordCount: 55,
    readingLevel: "3rd",
    category: "adventure",
  },
];

/**
 * 5th Grade Reading Level Passages (~60-80 words)
 * Flesch-Kincaid Grade Level: 4.5-5.5
 */
export const grade5Passages: Passage[] = [
  {
    id: "5th-nature-01",
    text: "Coral reefs are often called the rainforests of the ocean. These underwater structures are home to thousands of different species, from tiny shrimp to large sea turtles. The coral itself is actually made up of small animals called polyps. They build hard shells around themselves, and over time, these shells create the massive reef structures we see today.",
    wordCount: 60,
    readingLevel: "5th",
    category: "nature",
  },
  {
    id: "5th-science-01",
    text: "When water freezes, something unusual happens. Unlike most liquids, water actually expands as it becomes ice. This is why ice floats on water instead of sinking. This property is essential for life on Earth. In cold winters, the floating ice acts like a blanket, keeping the water below from freezing solid and protecting fish and other creatures living there.",
    wordCount: 65,
    readingLevel: "5th",
    category: "science",
  },
  {
    id: "5th-everyday-01",
    text: "Learning to ride a bicycle takes practice and patience. At first, balancing can feel impossible, and many people fall several times. The key is to keep your eyes looking forward, not down at the ground. Once you find your balance, your body starts to remember the feeling. This is called muscle memory, and it is why people say you never forget how to ride a bike.",
    wordCount: 71,
    readingLevel: "5th",
    category: "everyday",
  },
  {
    id: "5th-adventure-01",
    text: "The old lighthouse had stood on the cliff for over a hundred years. Maria climbed the winding staircase, counting each of the ninety-three steps. At the top, she could see for miles across the ocean. The lighthouse keeper had shown her how the huge light once guided ships safely through foggy nights. Now it was a museum, but it still felt magical.",
    wordCount: 68,
    readingLevel: "5th",
    category: "adventure",
  },
  {
    id: "5th-nature-02",
    text: "Honeybees communicate through dance. When a bee finds flowers with good nectar, it returns to the hive and performs a waggle dance. The direction it faces shows where the flowers are located. The length of the dance tells other bees how far away the food source is. This amazing system helps the whole colony find food efficiently.",
    wordCount: 60,
    readingLevel: "5th",
    category: "nature",
  },
];

/**
 * 8th Grade Reading Level Passages (~70-100 words)
 * Flesch-Kincaid Grade Level: 7.5-8.5
 */
export const grade8Passages: Passage[] = [
  {
    id: "8th-science-01",
    text: "The human brain contains approximately 86 billion neurons, each capable of forming thousands of connections with other neurons. This intricate network processes information faster than any computer ever built. Scientists have discovered that the brain continues to form new neural pathways throughout our lives, a phenomenon called neuroplasticity. This means that learning new skills, studying different subjects, or even changing habits can physically reshape the structure of our brains.",
    wordCount: 73,
    readingLevel: "8th",
    category: "science",
  },
  {
    id: "8th-nature-01",
    text: "Migration patterns in birds demonstrate remarkable navigational abilities. Arctic terns travel approximately 44,000 miles annually between the Arctic and Antarctic, the longest migration of any animal. Scientists believe birds use multiple methods to navigate, including the position of the sun, the Earth's magnetic field, and even star patterns at night. Some species can detect ultraviolet light invisible to humans, which may help them identify landmarks during their journeys.",
    wordCount: 72,
    readingLevel: "8th",
    category: "nature",
  },
  {
    id: "8th-everyday-01",
    text: "The development of written language transformed human civilization. Before writing, knowledge could only be passed down through spoken words, limiting how much information could be preserved accurately. The invention of writing systems allowed people to record laws, scientific discoveries, and stories for future generations. Today, digital technology has accelerated this process exponentially. More written content is created every day than existed in entire centuries of the ancient world.",
    wordCount: 74,
    readingLevel: "8th",
    category: "everyday",
  },
  {
    id: "8th-adventure-01",
    text: "Deep beneath the ocean's surface lies a world largely unexplored by humans. The Mariana Trench, the deepest known point on Earth, descends nearly seven miles below sea level. At these extreme depths, the pressure is crushing, the darkness absolute, and yet life persists. Scientists have discovered organisms adapted to survive without sunlight, drawing energy from chemical reactions in hydrothermal vents. These discoveries have expanded our understanding of where life can exist.",
    wordCount: 77,
    readingLevel: "8th",
    category: "adventure",
  },
  {
    id: "8th-science-02",
    text: "Optical illusions reveal fascinating aspects of how our brains process visual information. When we look at something, our eyes send signals to the brain, which interprets these signals based on past experiences and assumptions. Sometimes these assumptions lead to mistakes. The famous checker shadow illusion, for example, demonstrates how our brains automatically adjust for lighting conditions, causing us to perceive two identical squares as different colors.",
    wordCount: 70,
    readingLevel: "8th",
    category: "science",
  },
];

/**
 * Get all passages combined
 */
export const allPassages: Passage[] = [
  ...grade3Passages,
  ...grade5Passages,
  ...grade8Passages,
];

/**
 * Get a random passage for a specific reading level
 */
export function getRandomPassage(level: "3rd" | "5th" | "8th"): Passage {
  const levelPassages = allPassages.filter((p) => p.readingLevel === level);
  const randomIndex = Math.floor(Math.random() * levelPassages.length);
  return levelPassages[randomIndex];
}

/**
 * Get a random passage excluding previously shown IDs
 */
export function getUniquePassage(
  level: "3rd" | "5th" | "8th",
  excludeIds: string[]
): Passage | null {
  const available = allPassages.filter(
    (p) => p.readingLevel === level && !excludeIds.includes(p.id)
  );
  if (available.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * available.length);
  return available[randomIndex];
}

/**
 * Get passage count by level
 */
export function getPassageCount(level?: "3rd" | "5th" | "8th"): number {
  if (level) {
    return allPassages.filter((p) => p.readingLevel === level).length;
  }
  return allPassages.length;
}

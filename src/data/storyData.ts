export interface StoryChapter {
  id: string;
  number: string;
  title: string;
  date: string;
  description: string;
  image: string;
  accentColor: string;
}

export interface SweetThing {
  id: number;
  text: string;
  category: 'personality' | 'smile' | 'style' | 'moments';
}

export interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  caption: string;
  aspect: 'portrait' | 'square' | 'video';
}

export const storyChapters: StoryChapter[] = [
  {
    id: "beginning",
    number: "01",
    title: "In the Beginning, There Was Azeezah",
    date: "June 17, 2001",
    description: "Twenty-five years ago today, a spark of pure warmth and brilliance entered the world. From the start, your presence brought light to everyone around you. You've grown into a person of incredible depth, kindness, and unmatched grace.",
    image: "/images/portrait-1.png",
    accentColor: "from-amber-200 to-orange-100"
  },
  {
    id: "mind",
    number: "02",
    title: "A Mind Full of Wonders",
    date: "",
    description: "There's a quiet brilliance in how you look at the world. Whether you're pondering deep questions, or sharing a thoughtful observation, your intellect and curiosity make every with you interesting and worth it",
    image: "/images/portrait-2.png",
    accentColor: "from-emerald-100 to-teal-50"
  },
  {
    id: "joy",
    number: "03",
    title: "Infectious Laughter & Joy",
    date: "",
    description: "Your laughter is a melody that brightens the darkest days. It's a genuine, soul-stirring(big english hehe) joy that radiates outward, reminding everyone that life is beautiful, rich, and meant to be celebrated with people you love(me and youuu).",
    image: "/images/portrait-3.png",
    accentColor: "from-rose-100 to-peach-50"
  },
  {
    id: "shine",
    number: "04",
    title: "Shining Bright in Every Room",
    date: "",
    description: "You carry yourself with an elegance that is rare and captivating(as per stargirl nauuu). You don't just enter a room; you light it up(light of the world). Your poise, confidence, and warmth leaves an never easy to forget mark on everyone you encounter(who get mind to forget my baby???).",
    image: "/images/portrait-4.png",
    accentColor: "from-blue-100 to-indigo-50"
  },
  {
    id: "cozy",
    number: "05",
    title: "The Warmth of Our Moments",
    date: "",
    description: "At the end of the day, it's the quiet, cozy moments that mean the most(we no dey loud our own). Sitting on our bed, sharing warm smiles, and enjoying each other's presence. You are my safe space and my absolute favorite place to be(my home is youuuuu).",
    image: "/images/portrait-5.png",
    accentColor: "from-orange-200 to-terracotta-100"
  }
];

export const sweetThings: SweetThing[] = [
  { id: 1, text: "The way you carry yourself no matter what's happening is so inspiring.", category: "moments" },
  { id: 2, text: "Your smileeeee, best thing I like seeing with your dimples showing widely lmaooo", category: "smile" },
  { id: 3, text: "Nobody dress reach my babyyy", category: "style" },
  { id: 4, text: "The most kindest and sweetest person ever", category: "personality" },
  { id: 5, text: "Generous to the point of giving her last kobo out, we still dey fight about this one", category: "personality" },
  { id: 6, text: "my baby loves fela 2 and dj chicken(nobody should judge her only me)", category: "moments" },
  { id: 7, text: "Has the cutest voiceee, with her baby eyes lmaooo", category: "style" },
  { id: 8, text: "my baby loves cryingggg, good o, bad o, she'll even cry for you", category: "cry baby" },
  { id: 9, text: "soo appreciative, awwwn...she appreciates every little thing you do for her", category: "moments" },
  { id: 10, text: "my baby loves shoppingggg, her comfort space is shopping lmaoo", category: "shopping" },
  { id: 11, text: "Aduke mi loves her baby so muchh(hehehe das me das me)", category: "starboy" },
  { id: 12, text: "my baby sense of humor is something else lmfaoo, she sabi whine person", category: "comedian" },
  { id: 13, text: "No.1 hustler, she can do anything and everything to get what she wants", category: "ceo doings" },
  { id: 14, text: "my personal supporter, motivator, my best person, my comforttt", category: "supporter" },
  { id: 15, text: "my little amebo, she sabi everything and everyone(I didn't say this)", category: "amebo" },
  { id: 16, text: "nobody do tiktok video reach my babyyyy", category: "tiktok influencer" },
  { id: 17, text: "plenty things dey whine my baby, but walai dem no reachh", category: "survivor" },
  { id: 18, text: "my baby is so fineeeeeeeeeee, the prettiest, ever glowing baby", category: "most beautiful" },
  { id: 19, text: "here to remind you she loves her baby", category: "her baby" },
  { id: 20, text: "your attention to detail in everything you do is so admirable baby", category: "detail" },
  { id: 21, text: "The sweet morning texts that start the day on a beautiful note.", category: "moments" },
  { id: 22, text: "How you make everyone feel valued, celebrated, and deeply loved.", category: "personality" },
  { id: 23, text: "Your radiant, radiant smile that could outshine the sun.", category: "smile" },
  { id: 24, text: "Your playfulness and the childlike joy you bring to spontaneous outings.", category: "moments" },
  { id: 25, text: "The simple fact that you exist and make the world a much warmer, happier place.", category: "personality" }
];

export const galleryPhotos: GalleryPhoto[] = [
  {
    id: "photo-1",
    src: "https://res.cloudinary.com/dwbdylcas/video/upload/v1781618657/VIDEO-2026-06-08-14-55-14_w8tt9k.mp4",
    title: "Sweet Moments",
    caption: "my baby and me",
    aspect: "video"
  },
  {
    id: "photo-2",
    src: "https://res.cloudinary.com/dwbdylcas/video/upload/v1781618611/VIDEO-2026-05-03-09-00-47_jbtpag.mp4",
    title: "December",
    caption: "the day we metttt",
    aspect: "video"
  },
  {
    id: "photo-3",
    src: "https://res.cloudinary.com/dwbdylcas/video/upload/v1781618587/VIDEO-2026-04-28-17-25-51_ma7d61.mp4",
    title: "in our space",
    caption: "baby kabiru and kabiru",
    aspect: "video"
  },
  {
    id: "photo-4",
    src: "https://res.cloudinary.com/dwbdylcas/video/upload/v1781618587/VIDEO-2026-04-16-08-06-31_dj2vrj.mp4",
    title: "#hands",
    caption: "me and my shaylaa hands",
    aspect: "video"
  },
  {
    id: "photo-5",
    src: "https://res.cloudinary.com/dwbdylcas/image/upload/f_auto,q_auto/v1781510597/IMG_7288_pumnba.jpg",
    title: "Selfieeee",
    caption: "mirror selfie before we step out",
    aspect: "portrait"
  }
];

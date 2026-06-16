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
    date: "Autumn Notes",
    description: "There's a quiet brilliance in how you look at the world. Whether you're lost in the pages of a vintage book, pondering deep questions, or sharing a thoughtful observation, your intellect and curiosity make every conversation an adventure.",
    image: "/images/portrait-2.png",
    accentColor: "from-emerald-100 to-teal-50"
  },
  {
    id: "joy",
    number: "03",
    title: "Infectious Laughter & Joy",
    date: "Summer 2024",
    description: "Your laughter is a melody that brightens the darkest days. It's a genuine, soul-stirring joy that radiates outward, reminding everyone that life is beautiful, rich, and meant to be celebrated with open hearts.",
    image: "/images/portrait-3.png",
    accentColor: "from-rose-100 to-peach-50"
  },
  {
    id: "shine",
    number: "04",
    title: "Shining Bright in Every Room",
    date: "City Lights '24",
    description: "You carry yourself with an elegance that is rare and captivating. You don't just enter a room; you light it up. Your poise, confidence, and warmth leave an indelible mark on everyone you encounter.",
    image: "/images/portrait-4.png",
    accentColor: "from-blue-100 to-indigo-50"
  },
  {
    id: "cozy",
    number: "05",
    title: "The Warmth of Cozy Moments",
    date: "December 2023",
    description: "At the end of the day, it's the quiet, cozy moments that mean the most. Sitting by the fire, sharing warm smiles, and enjoying each other's presence. You are my safe harbor and my absolute favorite place to be.",
    image: "/images/portrait-5.png",
    accentColor: "from-orange-200 to-terracotta-100"
  }
];

export const sweetThings: SweetThing[] = [
  { id: 1, text: "The way you wrap your hands around a warm coffee mug to stay cozy.", category: "moments" },
  { id: 2, text: "Your infectious, nose-crinkling laugh that brightens the entire room.", category: "smile" },
  { id: 3, text: "Your immaculate sense of style that effortlessly blends retro and modern.", category: "style" },
  { id: 4, text: "The genuine kindness and empathy you show to every single person you meet.", category: "personality" },
  { id: 5, text: "How you get lost in books and tell stories with so much passion.", category: "personality" },
  { id: 6, text: "Your gentle, reassuring touch when someone is feeling down.", category: "moments" },
  { id: 7, text: "Your gorgeous curly hair that framing your beautiful smile.", category: "style" },
  { id: 8, text: "The cute way you squint your eyes when you're thinking deeply.", category: "smile" },
  { id: 9, text: "How you appreciate the little things in life, like cozy fireplaces and rainy afternoons.", category: "moments" },
  { id: 10, text: "Your determination and focus when you're working towards your goals.", category: "personality" },
  { id: 11, text: "The unique warmth and comfort of your tight, comforting hugs.", category: "moments" },
  { id: 12, text: "Your silly jokes that catch everyone off guard and make us double over.", category: "smile" },
  { id: 13, text: "The classic, elegant jewelry you select that always matches perfectly.", category: "style" },
  { id: 14, text: "Your capacity to listen deeply without judgment, making people feel truly heard.", category: "personality" },
  { id: 15, text: "The way you sing along softly to your favorite tunes when you think no one's listening.", category: "moments" },
  { id: 16, text: "Your brilliant mind that always comes up with fresh, creative perspectives.", category: "personality" },
  { id: 17, text: "How your eyes sparkle when you talk about things you love.", category: "smile" },
  { id: 18, text: "Your incredible grace under pressure, handling life with poise.", category: "personality" },
  { id: 19, text: "The scrapbook details you make time to keep, capturing memory by memory.", category: "moments" },
  { id: 20, text: "Your impeccable taste in music and movies that always hits the right chord.", category: "style" },
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
    title: "June Moments",
    caption: "A beautiful moment captured in June.",
    aspect: "video"
  },
  {
    id: "photo-2",
    src: "https://res.cloudinary.com/dwbdylcas/video/upload/v1781618611/VIDEO-2026-05-03-09-00-47_jbtpag.mp4",
    title: "May Days",
    caption: "Enjoying the warm spring sunshine in May.",
    aspect: "video"
  },
  {
    id: "photo-3",
    src: "https://res.cloudinary.com/dwbdylcas/video/upload/v1781618587/VIDEO-2026-04-28-17-25-51_ma7d61.mp4",
    title: "Spring Breezes",
    caption: "A quiet afternoon in late April.",
    aspect: "video"
  },
  {
    id: "photo-4",
    src: "https://res.cloudinary.com/dwbdylcas/video/upload/v1781618587/VIDEO-2026-04-16-08-06-31_dj2vrj.mp4",
    title: "April Walks",
    caption: "Warm smiles and sweet memories from mid-April.",
    aspect: "video"
  },
  {
    id: "photo-5",
    src: "https://res.cloudinary.com/dwbdylcas/image/upload/f_auto,q_auto/v1781510597/IMG_7288_pumnba.jpg",
    title: "Sweetheart Smile",
    caption: "A beautiful moment of pure joy.",
    aspect: "portrait"
  }
];

import { Post, Comment } from './types';

export const INITIAL_POSTS: Post[] = [
  {
    id: 'architecture-of-silence',
    title: 'The Architecture of Silence: Finding Focus in a Fragmented Era',
    excerpt: 'In an age where attention is the primary currency, we explore how intentional physical and digital spaces can reclaim our cognitive autonomy.',
    content: `Silence is no longer a natural state; it is a luxury to be engineered. In our modern era, the absence of sound has become an architectural challenge, a void that we must consciously construct within the frantic landscape of digital notifications and urban cacophony.

## The Spatiality of Thought

When we speak of deep work, we often focus on the temporal—the hours dedicated to a task. However, the spatial component is equally vital. The environment acts as a cognitive scaffold. A room with high ceilings and sparse furniture allows the mind to expand, to trace the edges of complex problems without the friction of visual clutter.

To build an architecture of silence is to create "negative space" in our schedules. It is the intentional removal of the non-essential to reveal the underlying structure of our best ideas. This is why the digital tools we use must reflect this minimalism—not adding to the noise, but providing a serene canvas for the soul to breathe.`,
    category: 'Philosophy',
    readingTime: '12 min read',
    authorName: 'Dr. Elias Thorne',
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAr3rmpRkxu2e4GQQo7Sxy-ks2kp7BM0Md7I81X4XYVIeZWcrjduwpOkuiMxttSmh3euyVO2JRPJlND6LhNPbT9FmD0BatENZC4w5vmzOHaH1hiS2P8HQ1viu_bwOoq4FpnoocgVj7Wlg29aRTYSe6Rdr0hXJSrPh3IOHomO7GgCycDHkj5HKMGmKqPRo4c7VyZkvIdr3IIQxxk5XLQ-hCCx69IO00t7kOj-afOhXhiX19k4b9G2dCF6iP8Rlh-2Lkw4jOE9mNJCdM',
    authorRole: 'Lead Philosopher',
    date: 'May 14, 2024',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3L7ZWP6PwyleWCsr1H16NArHON26qKSbHJQDJAs5P3xmwiD7hfZGTPGobVSAsSFfNdQUYSRCyCRoMQFxkehBifb7uc2zjXSsQ3h3XEUgl2PrDo0UZ9lmK6T2PBnp-6v3CD8hkvOrfQgdNKNYpcfvPeSfzfU1UdDzlIIo4dnikSiWjriR0Qyxn_l8kkNs4G-jMuPrJFWv6XQB8fdbGTdf9GJw8ntpdXNsyIbs4loig4zdkrqseXbeWz01N2Co7xygdOVnqTvwiFaY',
    likes: 1240,
    commentsCount: 48,
    tags: ['meditation', 'digital-detox', 'focus'],
    featured: true
  },
  {
    id: 'stoics-guide-to-noise',
    title: "The Stoic's Guide to Digital Noise",
    excerpt: 'How ancient wisdom provides the perfect framework for navigating the relentless stream of modern notifications and social pressure.',
    content: `We live in an open-door sensory dynamic where everything and everyone competes for state validation. Notifications have turned into cognitive taxation. But the ancient Stoics encountered a similar environment of noise in Rome — shouting merchants, clanging swords, political pandemonium. 

Their remedy was not isolated escapism, but the construction of an inner citadel. Senecan tranquility suggests that external vibrations can only disrupt the mind if we assign value to them. By treating digital signals as indifferent externals ('adiaphora'), we restore command over our mental field. No longer is a ping an urgent request; it is merely silicon dust.`,
    category: 'Philosophy',
    readingTime: '8 min read',
    authorName: 'Dr. Elias Thorne',
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAr3rmpRkxu2e4GQQo7Sxy-ks2kp7BM0Md7I81X4XYVIeZWcrjduwpOkuiMxttSmh3euyVO2JRPJlND6LhNPbT9FmD0BatENZC4w5vmzOHaH1hiS2P8HQ1viu_bwOoq4FpnoocgVj7Wlg29aRTYSe6Rdr0hXJSrPh3IOHomO7GgCycDHkj5HKMGmKqPRo4c7VyZkvIdr3IIQxxk5XLQ-hCCx69IO00t7kOj-afOhXhiX19k4b9G2dCF6iP8Rlh-2Lkw4jOE9mNJCdM',
    authorRole: 'Lead Philosopher',
    date: 'Oct 24, 2024',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-lO_76gi4TQo8NTu54JDeQoD2xOCRZDjNBIE6yt_LLjPwIAg9Om03lZ6O-SOYcoYk4yKqiwgqjLhMQIvqH7hVpKs6IbgBow4FhDKYsWeGPNHz5v7fC2BGagE-Nfiom3CC5n1m9lai3tJOhKJei1JkK1rnGBcWpzyX5Bwww32fDL-TBD_OT5fEefnec88A7IiS105fwS4Kq3wleeb1L-5hg9MvNaiArsMiA_oOY03v-zpAoTNGTUTeS2rOqAhfmZqHPxr35yhNGXU',
    likes: 852,
    commentsCount: 22,
    tags: ['stoicism', 'philosophy', 'mindset']
  },
  {
    id: 'less-but-better',
    title: 'Less, but Better: The Essentialist Library',
    excerpt: 'Curation as an act of rebellion. Why owning fewer books might lead to a deeper understanding of the world around us.',
    content: `Our shelves are frequently monuments to intentions we will never fulfill. In the race to ingest information, we have substituted volume for processing depth. Curation is the ultimate form of physical and mental resistance. 

By scaling down to an essentialist library — books that are foundational, challenging, and evergreen — we give ourselves the space to participate in active contemplation. Instead of skimming a thousand summaries, devouring a single great thinker over several months creates pathways of permanent cognitive scaffolding.`,
    category: 'Minimalism',
    readingTime: '6 min read',
    authorName: 'Sarah Jenkins',
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC43bq9P7RjhJ0-1G9m4r0OS2I9nqSTQuYl3ODO9YmzGsWSX3nj7PTrpRMZLVv9XQkhlnipPcanZrKIdcmO8KBI9ys33FQa_Qcsa5FuANLmmrwZieIO1Jam2h8MmZDJGr-TJ-ZHCD90G0lLMLDDeXKogsrBXWDrtxFUpmjW_cgkqoHHXByBVR8gjclDTotxtlEY1Mu-zs0ipuXxxDNLDN7bo41MKjbAyYUDYAxss7e8reTLP0E2WxBxyf25fXjGN-Sa_lIm1WPH2pM',
    authorRole: 'Contributor',
    date: 'Oct 20, 2024',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBldwYpgmqwxJfT7UGnNzfGvBCT_8KGpDnXm9bE4w8RYYUW1xwxg3f3u02HO0dHZ_TT03amjz0po6iEODjzqU0SY2A_Etl5G-qqUXPew6qVXJo3MvVvU6Vu_apuiCT50NzCAtgwBfWUcJs10SrdGCa12nCThtj2M18wWc3zfOlapa5uSaGsKG7erCCzvbJcmg71ykh_5KZQbM6kV75eNopydqimzYKbtv6nV6sxo_Um5TigrZQ6eOn0gPTFuWLfIE94shJehE9w9lc',
    likes: 914,
    commentsCount: 15,
    tags: ['lifestyle', 'minimalism', 'curation']
  },
  {
    id: 'neurobiology-of-deep-reading',
    title: 'The Neurobiology of Deep Reading',
    excerpt: 'Exploring what happens to our neural pathways when we engage with long-form text versus rapid-fire digital snippets.',
    content: `When we scroll through web snippets, our visual cortex triggers standard processing networks designed for quick keyword triangulation. This works well for navigation but fundamentally starves our lateral prefrontal cortex.

Deep reading of sustained prose, on the other hand, is one of the most intense, full-brain workouts human beings have discovered. It activates mirror neural pathways, forces cognitive mapping, and recruits advanced semantic processing in order to generate rich mental imagery. Keeping this circuitry intact in an era of 15-second visual feeds is a modern developmental imperative.`,
    category: 'Cognitive Science',
    readingTime: '10 min read',
    authorName: 'Dr. Elias Thorne',
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAr3rmpRkxu2e4GQQo7Sxy-ks2kp7BM0Md7I81X4XYVIeZWcrjduwpOkuiMxttSmh3euyVO2JRPJlND6LhNPbT9FmD0BatENZC4w5vmzOHaH1hiS2P8HQ1viu_bwOoq4FpnoocgVj7Wlg29aRTYSe6Rdr0hXJSrPh3IOHomO7GgCycDHkj5HKMGmKqPRo4c7VyZkvIdr3IIQxxk5XLQ-hCCx69IO00t7kOj-afOhXhiX19k4b9G2dCF6iP8Rlh-2Lkw4jOE9mNJCdM',
    authorRole: 'Lead Philosopher',
    date: 'Oct 15, 2024',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_gZ929_dv256232e4szoFnYFx2UwATDGCbpdWywq9OoNYA0iV_fXdvHDpaiLZ9yR2gI_YQ75zRJlGa7fNfLL9e7NIDxMy72O4UuxKhvatvnIVjle93v7i8JtdffxtIDH4l_n4JY_WsOPjZbTXxinajai_lPm7u1gUZnRniLbwvy4GbZ4FMOqrQAfGW15OmYWUFaYh9KrmaT4JDuHUswnlNRSdhLWClVPfMO2YNnSTf--rWON0wkwY_8O6qGVmRVwBWzcSlh8SGL4',
    likes: 1105,
    commentsCount: 31,
    tags: ['cognition', 'neuroscience', 'focus']
  },
  {
    id: 'echoes-of-the-unseen',
    title: 'Echoes of the Unseen: How Ambient Design Shapes Our Inner Lives',
    excerpt: 'A meditation on the subtle environmental cues that guide our moods, thoughts, and creative rhythms without ever demanding attention.',
    content: `The architecture of our surroundings is never truly silent. Light, color, texture, and sound all compose an ambient orchestra that either harmonizes with or disrupts our internal state.

When we tune our design choices to the psychology of presence, we create spaces that feel as if they were built not only for practical use, but for the quiet cultivation of attention. This practice is an invitation to notice the unnoticed and to honor the atmosphere as a living, shaping force.

In a world of constant interruption, the unseen echoes of design can become the most powerful guardians of thought.`,
    category: 'Digital Cultures',
    readingTime: '7 min read',
    authorName: 'Maya Patel',
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3L7ZWP6PwyleWCsr1H16NArHON26qKSbHJQDJAs5P3xmwiD7hfZGTPGobVSAsSFfNdQUYSRCyCRoMQFxkehBifb7uc2zjXSsQ3h3XEUgl2PrDo0UZ9lmK6T2PBnp-6v3CD8hkvOrfQgdNKNYpcfvPeSfzfU1UdDzlIIo4dnikSiWjriR0Qyxn_l8kkNs4G-jMuPrJFWv6XQB8fdbGTdf9GJw8ntpdXNsyIbs4loig4zdkrqseXbeWz01N2Co7xygdOVnqTvwiFaY',
    authorRole: 'Cultural Strategist',
    date: 'Nov 1, 2024',
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    likes: 628,
    commentsCount: 18,
    tags: ['design', 'environment', 'culture']
  },
  {
    id: 'future-of-slow-knowledge',
    title: 'The Future of Slow Knowledge in a Fast Consumption Age',
    excerpt: 'Why the next revolution in learning is not more data, but more time, attention, and space for deep synthesis.',
    content: `The quantity of information available to us has exploded, but our ability to digest lasting meaning has not kept pace.

Slow knowledge is about recalibrating our relationship with learning—it is the intentional act of letting ideas ferment rather than forcing them to churn through a conveyor belt of quick takes.

This article explores how cultures, institutions, and daily rituals can protect the slow, generative work of real understanding.`,
    category: 'Minimalism',
    readingTime: '9 min read',
    authorName: 'Renzo Arboleda',
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAr3rmpRkxu2e4GQQo7Sxy-ks2kp7BM0Md7I81X4XYVIeZWcrjduwpOkuiMxttSmh3euyVO2JRPJlND6LhNPbT9FmD0BatENZC4w5vmzOHaH1hiS2P8HQ1viu_bwOoq4FpnoocgVj7Wlg29aRTYSe6Rdr0hXJSrPh3IOHomO7GgCycDHkj5HKMGmKqPRo4c7VyZkvIdr3IIQxxk5XLQ-hCCx69IO00t7kOj-afOhXhiX19k4b9G2dCF6iP8Rlh-2Lkw4jOE9mNJCdM',
    authorRole: 'Education Designer',
    date: 'Oct 28, 2024',
    coverImage: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1c?auto=format&fit=crop&w=1200&q=80',
    likes: 502,
    commentsCount: 12,
    tags: ['learning', 'education', 'slow-living']
  },
  {
    id: 'digital-sabbath-blueprint',
    title: 'Digital Sabbath Blueprint: Design Your Offline Pause',
    excerpt: 'A practical guide to building a weekly ritual that restores calm and reconnects you with your most creative work.',
    content: `The notion of a Sabbath is ancient, but its digital adaptation is urgently modern.

When we declare a regular pause from screens, we create a container for presence, reflection, and creative restoration. This blueprint walks through how to design the ritual, what to protect, and why it matters for the quality of everything you produce.

Once the digital sabbath becomes a practiced rhythm, the rest of the week begins to feel clearer and more intentional.`,
    category: 'Philosophy',
    readingTime: '8 min read',
    authorName: 'Naomi Li',
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC43bq9P7RjhJ0-1G9m4r0OS2I9nqSTQuYl3ODO9YmzGsWSX3nj7PTrpRMZLVv9XQkhlnipPcanZrKIdcmO8KBI9ys33FQa_Qcsa5FuANLmmrwZieIO1Jam2h8MmZDJGr-TJ-ZHCD90G0lLMLDDeXKogsrBXWDrtxFUpmjW_cgkqoHHXByBVR8gjclDTotxtlEY1Mu-zs0ipuXxxDNLDN7bo41MKjbAyYUDYAxss7e8reTLP0E2WxBxyf25fXjGN-Sa_lIm1WPH2pM',
    authorRole: 'Wellness Editor',
    date: 'Oct 22, 2024',
    coverImage: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1200&q=80',
    likes: 734,
    commentsCount: 27,
    tags: ['ritual', 'wellbeing', 'mindfulness']
  },
  {
    id: 'the-lost-art-of-handwriting',
    title: 'The Lost Art of Handwriting in an Inbox World',
    excerpt: 'A reflective essay on why pen, paper, and slow notation still matter for clarity of thought and emotional memory.',
    content: `Digital text is efficient, but it often sacrifices the experience of discovery.

Handwriting invites us to slow down, to feel the motion of ideas shaping on the page, and to remember not only what we wrote—but how we wrote it.

This piece investigates why the tactile act of putting ink to paper remains one of the most powerful tools for thinking well in an inbox-driven age.`,
    category: 'Literature',
    readingTime: '6 min read',
    authorName: 'Aisha Coleman',
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3L7ZWP6PwyleWCsr1H16NArHON26qKSbHJQDJAs5P3xmwiD7hfZGTPGobVSAsSFfNdQUYSRCyCRoMQFxkehBifb7uc2zjXSsQ3h3XEUgl2PrDo0UZ9lmK6T2PBnp-6v3CD8hkvOrfQgdNKNYpcfvPeSfzfU1UdDzlIIo4dnikSiWjriR0Qyxn_l8kkNs4G-jMuPrJFWv6XQB8fdbGTdf9GJw8ntpdXNsyIbs4loig4zdkrqseXbeWz01N2Co7xygdOVnqTvwiFaY',
    authorRole: 'Essayist',
    date: 'Oct 18, 2024',
    coverImage: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80',
    likes: 487,
    commentsCount: 9,
    tags: ['writing', 'memory', 'creativity']
  },
  {
    id: 'city-lights-and-mindful-walks',
    title: 'City Lights and Mindful Walks: Reclaiming Presence in Urban Life',
    excerpt: 'A journey through city rituals that turn ordinary movement into a deliberate, renewing practice.',
    content: `Walking through the city is often a means of transit. But it can also be a ritual of attention.

When we choose routes intentionally, notice the rhythm of our footsteps, and tune into the architecture around us, the city becomes a living meditation.

This essay offers prompts and reflections for transforming urban commutes into moments of quiet replenishment.`,
    category: 'Digital Cultures',
    readingTime: '7 min read',
    authorName: 'Maya Patel',
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3L7ZWP6PwyleWCsr1H16NArHON26qKSbHJQDJAs5P3xmwiD7hfZGTPGobVSAsSFfNdQUYSRCyCRoMQFxkehBifb7uc2zjXSsQ3h3XEUgl2PrDo0UZ9lmK6T2PBnp-6v3CD8hkvOrfQgdNKNYpcfvPeSfzfU1UdDzlIIo4dnikSiWjriR0Qyxn_l8kkNs4G-jMuPrJFWv6XQB8fdbGTdf9GJw8ntpdXNsyIbs4loig4zdkrqseXbeWz01N2Co7xygdOVnqTvwiFaY',
    authorRole: 'Cultural Strategist',
    date: 'Oct 11, 2024',
    coverImage: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
    likes: 391,
    commentsCount: 11,
    tags: ['urban', 'mindfulness', 'ritual']
  },
  {
    id: 'small-plates-big-ideas',
    title: 'Small Plates, Big Ideas: The Culture of Shared Thought',
    excerpt: 'How conversation, food, and communal ritual can unlock creative collaboration in a distracted era.',
    content: `There is a special alchemy when ideas are shared across a table.

The act of passing small plates, leaning into the conversation, and making room for other voices invites a different quality of thinking—one that is more generative, empathic, and alive.

This essay explores the rituals behind shared meals and how they can become catalysts for new perspectives.`,
    category: 'Philosophy',
    readingTime: '8 min read',
    authorName: 'Naomi Li',
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC43bq9P7RjhJ0-1G9m4r0OS2I9nqSTQuYl3ODO9YmzGsWSX3nj7PTrpRMZLVv9XQkhlnipPcanZrKIdcmO8KBI9ys33FQa_Qcsa5FuANLmmrwZieIO1Jam2h8MmZDJGr-TJ-ZHCD90G0lLMLDDeXKogsrBXWDrtxFUpmjW_cgkqoHHXByBVR8gjclDTotxtlEY1Mu-zs0ipuXxxDNLDN7bo41MKjbAyYUDYAxss7e8reTLP0E2WxBxyf25fXjGN-Sa_lIm1WPH2pM',
    authorRole: 'Wellness Editor',
    date: 'Oct 7, 2024',
    coverImage: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1200&q=80',
    likes: 468,
    commentsCount: 14,
    tags: ['conversation', 'community', 'culture']
  },
  {
    id: 'language-of-minimalist-design',
    title: 'The Language of Minimalist Design: Beyond White Space',
    excerpt: 'A closer look at how restraint, rhythm, and quiet form a visual vocabulary that supports thoughtful living.',
    content: `Minimalism is often mistaken for emptiness when it is actually a language of subtraction.

By choosing what remains, we create visual sentences that can be read, felt, and lived. Good design does not shout—it invites the viewer to slow down and participate.

This article unpacks the principles that make minimalist spaces feel alive rather than sterile.`,
    category: 'Minimalism',
    readingTime: '6 min read',
    authorName: 'Sarah Jenkins',
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC43bq9P7RjhJ0-1G9m4r0OS2I9nqSTQuYl3ODO9YmzGsWSX3nj7PTrpRMZLVv9XQkhlnipPcanZrKIdcmO8KBI9ys33FQa_Qcsa5FuANLmmrwZieIO1Jam2h8MmZDJGr-TJ-ZHCD90G0lLMLDDeXKogsrBXWDrtxFUpmjW_cgkqoHHXByBVR8gjclDTotxtlEY1Mu-zs0ipuXxxDNLDN7bo41MKjbAyYUDYAxss7e8reTLP0E2WxBxyf25fXjGN-Sa_lIm1WPH2pM',
    authorRole: 'Contributor',
    date: 'Oct 2, 2024',
    coverImage: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    likes: 553,
    commentsCount: 20,
    tags: ['design', 'minimalism', 'aesthetics']
  },
  {
    id: 'sleep-as-a-creative-ritual',
    title: 'Sleep as a Creative Ritual: Reclaiming Night for Thought',
    excerpt: 'A deep dive into how intentional evening routines protect the generative edges of our working day.',
    content: `Sleep is not simply rest; it is the stage where our experiences organize into insight.

When we treat the night as a ritual space for unplugging and preparation, our creative systems become stronger and more reliable.

This essay explores the practical design of evening rituals that support imagination, resilience, and mental clarity.`,
    category: 'Cognitive Science',
    readingTime: '9 min read',
    authorName: 'Dr. Elias Thorne',
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAr3rmpRkxu2e4GQQo7Sxy-ks2kp7BM0Md7I81X4XYVIeZWcrjduwpOkuiMxttSmh3euyVO2JRPJlND6LhNPbT9FmD0BatENZC4w5vmzOHaH1hiS2P8HQ1viu_bwOoq4FpnoocgVj7Wlg29aRTYSe6Rdr0hXJSrPh3IOHomO7GgCycDHkj5HKMGmKqPRo4c7VyZkvIdr3IIQxxk5XLQ-hCCx69IO00t7kOj-afOhXhiX19k4b9G2dCF6iP8Rlh-2Lkw4jOE9mNJCdM',
    authorRole: 'Lead Philosopher',
    date: 'Sep 28, 2024',
    coverImage: 'https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?auto=format&fit=crop&w=1200&q=80',
    likes: 808,
    commentsCount: 23,
    tags: ['sleep', 'creativity', 'ritual']
  },
  {
    id: 'archipelago-of-reading',
    title: 'An Archipelago of Reading: Building a Seasonal Literary Practice',
    excerpt: 'How to shape your reading life around themes, seasons, and the slow accumulation of insight.',
    content: `A reading practice is most nourishing when it is organized like an archipelago—connected islands of attention spaced by time and care.

This essay offers a seasonal framework for reading that balances intensity with rest, curiosity with depth, and novelty with continuity.

The goal is not to finish more books, but to let books finish you.`,
    category: 'Literature',
    readingTime: '7 min read',
    authorName: 'Aisha Coleman',
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3L7ZWP6PwyleWCsr1H16NArHON26qKSbHJQDJAs5P3xmwiD7hfZGTPGobVSAsSFfNdQUYSRCyCRoMQFxkehBifb7uc2zjXSsQ3h3XEUgl2PrDo0UZ9lmK6T2PBnp-6v3CD8hkvOrfQgdNKNYpcfvPeSfzfU1UdDzlIIo4dnikSiWjriR0Qyxn_l8kkNs4G-jMuPrJFWv6XQB8fdbGTdf9GJw8ntpdXNsyIbs4loig4zdkrqseXbeWz01N2Co7xygdOVnqTvwiFaY',
    authorRole: 'Essayist',
    date: 'Sep 24, 2024',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80',
    likes: 362,
    commentsCount: 8,
    tags: ['reading', 'books', 'practice']
  },
  {
    id: 'listening-to-the-metropolis',
    title: 'Listening to the Metropolis: Sound, Silence, and the City Mind',
    excerpt: 'An exploration of how urban soundscapes shape attention and the subtle art of hearing your environment well.',
    content: `The city can feel like noise, but it is also a symphony of lived detail.

This essay considers how listening with care can turn urban life into a source of composure instead of distraction, and how sound design can support a more mindful city mind.

From train stations to kitchen corners, the city teaches us what it means to be present through sound.`,
    category: 'Digital Cultures',
    readingTime: '8 min read',
    authorName: 'Renzo Arboleda',
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAr3rmpRkxu2e4GQQo7Sxy-ks2kp7BM0Md7I81X4XYVIeZWcrjduwpOkuiMxttSmh3euyVO2JRPJlND6LhNPbT9FmD0BatENZC4w5vmzOHaH1hiS2P8HQ1viu_bwOoq4FpnoocgVj7Wlg29aRTYSe6Rdr0hXJSrPh3IOHomO7GgCycDHkj5HKMGmKqPRo4c7VyZkvIdr3IIQxxk5XLQ-hCCx69IO00t7kOj-afOhXhiX19k4b9G2dCF6iP8Rlh-2Lkw4jOE9mNJCdM',
    authorRole: 'Education Designer',
    date: 'Sep 20, 2024',
    coverImage: 'https://images.unsplash.com/photo-1469594292607-7bd27f43d67f?auto=format&fit=crop&w=1200&q=80',
    likes: 421,
    commentsCount: 17,
    tags: ['urban', 'sound', 'awareness']
  }
];

export const INITIAL_COMMENTS: Record<string, Comment[]> = {
  'architecture-of-silence': [
    {
      id: 'c1',
      authorName: 'Elena Vance',
      authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC43bq9P7RjhJ0-1G9m4r0OS2I9nqSTQuYl3ODO9YmzGsWSX3nj7PTrpRMZLVv9XQkhlnipPcanZrKIdcmO8KBI9ys33FQa_Qcsa5FuANLmmrwZieIO1Jam2h8MmZDJGr-TJ-ZHCD90G0lLMLDDeXKogsrBXWDrtxFUpmjW_cgkqoHHXByBVR8gjclDTotxtlEY1Mu-zs0ipuXxxDNLDN7bo41MKjbAyYUDYAxss7e8reTLP0E2WxBxyf25fXjGN-Sa_lIm1WPH2pM',
      authorRole: 'Creative Director',
      text: "This resonates deeply. I find that my most profound insights always arrive during my long, silent walks in the evening. The 'void' isn't empty; it's a reservoir.",
      time: '2 hours ago',
      likes: 24,
      replies: [
        {
          id: 'c1-1',
          authorName: 'David Chen',
          authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxl9Wh_cn48HknmDbcGxpcPZsOCPxpzGEVUpACiLr1dLmePlRtVBSpVnwS8idetAPPDRQ4eqKBFVpKmJwoluflcZHWTaNyskXPxH7BTq6jCVLp6eaNSMpW4-vVDoP6vs1CvqNxfcMDIm-cXq_l1sgC-zJnMJmDU_Yw2lAHh8U8KLI8gjU6WE1IXDWGQZrDPOpv_lAUCJIPBqhi9P5xRliWuVHOLsVOEpbZ8Q6rG3s_0BOBHeH5hTN2WA9zuF4K_XXw-kco6LThFE0',
          authorRole: 'Junior Researcher',
          text: 'Exactly. The reservoir metaphor is perfect. We are currently draining it faster than we can refill it.',
          time: '1 hour ago',
          likes: 12
        }
      ]
    },
    {
      id: 'c2',
      authorName: 'Marcus Aurelius',
      authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAr3rmpRkxu2e4GQQo7Sxy-ks2kp7BM0Md7I81X4XYVIeZWcrjduwpOkuiMxttSmh3euyVO2JRPJlND6LhNPbT9FmD0BatENZC4w5vmzOHaH1hiS2P8HQ1viu_bwOoq4FpnoocgVj7Wlg29aRTYSe6Rdr0hXJSrPh3IOHomO7GgCycDHkj5HKMGmKqPRo4c7VyZkvIdr3IIQxxk5XLQ-hCCx69IO00t7kOj-afOhXhiX19k4b9G2dCF6iP8Rlh-2Lkw4jOE9mNJCdM',
      text: 'Everywhere, at each moment, you have the option to be content with your current situation, to treat those with you with supreme fairness, and to process your current thoughts so that nothing unwanted slides in.',
      time: '6 hours ago',
      likes: 72,
      replies: []
    }
  ]
};

export const CATEGORIES = ['All Essays', 'Philosophy', 'Digital Cultures', 'Cognitive Science', 'Literature', 'Minimalism'];

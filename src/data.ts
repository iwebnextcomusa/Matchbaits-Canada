import { Product, BlogPost, Testimonial, FAQItem } from "./types";

export const PRODUCTS: Product[] = [
  // Groundbait
  {
    id: "gb-1",
    name: "Premium Method Mix - Sweet Maple & Maize",
    category: "Groundbait",
    description: "Our flagship heavy-binding method mix. Formulated with rich Canadian maple meal, crushed hemp, and sweet biscuit base. Creates a slow-exploding cloud on the lake bed that carp and tench can't resist.",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=600",
    rating: 4.8,
    reviewsCount: 34,
    features: ["Heavy-binding for long-distance casting", "Rich maple cloud attraction", "100% natural organic grains", "Tested extensively in Southern Ontario lakes"],
    stock: 25,
    reviews: [
      { id: "r-1", author: "Marc L. from Barrie", rating: 5, comment: "Absolutely dominated the carp at Lake Simcoe with this. Will buy a 5kg sack next time!", date: "2026-05-12" },
      { id: "r-2", author: "Sarah T. from London", rating: 4, comment: "Very good breakdown rate. Stays on the feeder perfectly.", date: "2026-06-02" }
    ]
  },
  {
    id: "gb-2",
    name: "Dark Monster Carp Active Mix",
    category: "Groundbait",
    description: "A dark, highly potent fishmeal-based groundbait designed for clear-water venues or high-pressure wild rivers. Loaded with high-protein marine extracts, amino acids, and salt. Blends perfectly into dark lake beds.",
    price: 15.49,
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=600",
    rating: 4.9,
    reviewsCount: 22,
    features: ["Low-visibility dark formula", "High amino fishmeal content", "Perfect for wild St. Lawrence river carping", "Rich in pre-digested proteins"],
    stock: 18,
    reviews: [
      { id: "r-3", author: "David K. from Cornwall", rating: 5, comment: "Unbeatable on the St. Lawrence. The dark colour keeps the fish feeding confidently without spooking.", date: "2026-06-18" }
    ]
  },
  {
    id: "gb-3",
    name: "Active Sweet Coconut Feed Mix",
    category: "Groundbait",
    description: "An explosive, active, light groundbait. Perfect for cage feeders, cupping, or balling in. Packed with toasted coconut meal, crushed seeds, and active particles that rise and fall to pull fish down from mid-water.",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=600",
    rating: 4.6,
    reviewsCount: 15,
    features: ["High vertical activity", "Intense milky coconut aroma", "Great for mixed lakes (carp, bream, chub)", "Fast breakdown rate"],
    stock: 30,
    reviews: []
  },

  // Pellets
  {
    id: "pl-1",
    name: "Marine Halibut Feed Pellets (6mm)",
    category: "Pellets",
    description: "Premium marine halibut pellets packed with refined fish oils, high-quality fishmeal, and soluble fish proteins. Slow breakdown (approx. 2-4 hours) makes them outstanding for pre-baiting or as a carpet feed.",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1541959003-76140019204c?auto=format&fit=crop&q=80&w=600",
    rating: 4.7,
    reviewsCount: 41,
    features: ["High oil content for warm water leakage", "Uniform size for consistent feeding", "Rich in Omega-3 and amino acids", "Excellent pre-baiting choice"],
    stock: 50,
    reviews: [
      { id: "r-4", author: "Robert P. from Peterborough", rating: 5, comment: "Simple, highly effective feed. Combined with some liquid booster, it holds fish in the area all day.", date: "2026-04-29" }
    ]
  },
  {
    id: "pl-2",
    name: "Robin Red Amino Feed Pellets (4mm)",
    category: "Pellets",
    description: "Infused with the legendary Haith's Robin Red® attractant. These bright reddish pellets leak spicy pepper extract, soluble sugars, and powerful amino acids. Highly digestible and effective all year round.",
    price: 11.49,
    image: "https://images.unsplash.com/photo-1499591934245-40b55745b905?auto=format&fit=crop&q=80&w=600",
    rating: 5.0,
    reviewsCount: 29,
    features: ["Original Haith's Robin Red® inside", "Instant leakage in cold waters", "Highly digestible all-season feed", "Great addition to PVA bag presentations"],
    stock: 40,
    reviews: [
      { id: "r-5", author: "Chris M. from Ottawa", rating: 5, comment: "Hands down the best pellets. Even works in early spring when other baits are ignored.", date: "2026-05-30" }
    ]
  },

  // Boilies
  {
    id: "bo-1",
    name: "Strawberry Cream High-Leakage Boilies (15mm)",
    category: "Boilies",
    description: "A gorgeous, sweet, birdfood-based boilie formulated with active milk proteins, natural yeast, and an ultra-sweet strawberry extract. Ideal for quick sessions where instant attraction is key.",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1611095790444-1dfa4825a5a2?auto=format&fit=crop&q=80&w=600",
    rating: 4.8,
    reviewsCount: 56,
    features: ["Vibrant red visual attraction", "Active birdfood & milk protein base", "Shelf-life stabilized with organic preserves", "Rapid scent dispersion"],
    stock: 20,
    reviews: [
      { id: "r-6", author: "Jonathan G. from Toronto", rating: 5, comment: "Bagged a personal best 34lb mirror carp using these in the Grand River. Magnificent bait!", date: "2026-06-11" }
    ]
  },
  {
    id: "bo-2",
    name: "Garlic & Spicy Squid Monster Boilies (18mm)",
    category: "Boilies",
    description: "A heavy, stinky, fishmeal boilie that specimen carp hunt for. Loaded with squid meal, krill powder, garlic extract, and pure robin red. Excellent for overnight campaigns on major Canadian river systems.",
    price: 19.49,
    image: "https://images.unsplash.com/photo-1517462964-21fdcec3f25b?auto=format&fit=crop&q=80&w=600",
    rating: 4.9,
    reviewsCount: 38,
    features: ["Stinky, highly-stimulating squid extract", "Heavy fishmeal base for big specimen selection", "Hardened coat to resist pest fish", "Loaded with natural minerals and salts"],
    stock: 15,
    reviews: [
      { id: "r-7", author: "Tyler W. from Hamilton", rating: 5, comment: "Extremely stinky, exactly what big carp want. Catches on the Grand River are up 50% since I switched to these.", date: "2026-07-01" }
    ]
  },

  // Hookbait
  {
    id: "hb-1",
    name: "Pineapple Fever Pop-Ups (12mm)",
    category: "Hookbait",
    description: "Ultra-buoyant, high-visibility yellow pop-ups. Glazed with double-strength butyric acid and pineapple esters. Remains fully buoyant for over 48 hours. Perfect for Chod, Ronnie, or Hinged Stiff rigs.",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=600",
    rating: 4.9,
    reviewsCount: 47,
    features: ["Superb long-term buoyancy", "Double-strength Butyric Acid additive", "Bright yellow high-visibility visual trigger", "Includes a free booster shot of oil"],
    stock: 35,
    reviews: [
      { id: "r-8", author: "Kevin B. from Windsor", rating: 5, comment: "Unbelievably buoyant. Sat on a Ronnie rig all night and caught a 28lber at dawn.", date: "2026-06-25" }
    ]
  },
  {
    id: "hb-2",
    name: "Amino Krill Balanced Wafters (14mm)",
    category: "Hookbait",
    description: "Critically balanced hookbaits designed to sink slowly under the weight of a standard size 6 or 4 hook. Leaks dense krill proteins and orange visual dye. Trick even the spookiest, most cautious of big river fish.",
    price: 14.49,
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=600",
    rating: 4.7,
    reviewsCount: 19,
    features: ["Critically balanced for featherweight presentation", "Infused with pure soluble krill extract", "Durable skin resists crayfish and gobies", "Perfect for bait-carpet styling"],
    stock: 22,
    reviews: []
  },

  // Liquid Attractants
  {
    id: "la-1",
    name: "Monster Crab Amino Booster Syrup (500ml)",
    category: "Liquid Attractants",
    description: "A thick, PVA-friendly booster liquid. Highly soluble in water, creating an intense feeding stream of aminos and fish oil from the bottom up. Perfect for glazing boilies, soaking pellets, or mixing groundbait.",
    price: 11.99,
    image: "https://images.unsplash.com/photo-1541959003-76140019204c?auto=format&fit=crop&q=80&w=600",
    rating: 4.8,
    reviewsCount: 31,
    features: ["100% PVA Friendly - won't dissolve bags", "Dense, heavy syrup clings to baits", "Loaded with multi-amino compound", "Intense Monster Crab fragrance"],
    stock: 28,
    reviews: [
      { id: "r-9", author: "Dave S. from Kingston", rating: 5, comment: "I coat my method feeders in this syrup before casting. The bait cloud is incredibly concentrated.", date: "2026-05-09" }
    ]
  },
  {
    id: "la-2",
    name: "Pure Salmon Oil concentrated (250ml)",
    category: "Liquid Attractants",
    description: "Premium cold-pressed Atlantic salmon oil. Rich in energy and critical lipids. It floats up through the water column, drawing carp and other predator fish down from all depths. Excellent summer booster.",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1499591934245-40b55745b905?auto=format&fit=crop&q=80&w=600",
    rating: 4.6,
    reviewsCount: 14,
    features: ["100% pure cold-pressed Salmon Oil", "Creates a distinct slick on the water surface", "Ideal for warm-water summer angling", "Packed with high-calorie lipids"],
    stock: 19,
    reviews: []
  },

  // Fishing Accessories
  {
    id: "ac-1",
    name: "Heavy-Duty Baiting Tool & Needle Kit",
    category: "Fishing Accessories",
    description: "A comprehensive 4-piece baiting set including a heavy latch needle, fine hair needle, boilie drill, and splicing needle. Designed with heavy-duty ergonomic rubber handles to survive tough bait drillings.",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1517462964-21fdcec3f25b?auto=format&fit=crop&q=80&w=600",
    rating: 4.5,
    reviewsCount: 52,
    features: ["4 essential baiting tools in one pack", "Ergonomic high-grip green handles", "Stainless steel rust-resistant shafts", "Excellent for boilies, pellets, and nuts"],
    stock: 60,
    reviews: [
      { id: "r-10", author: "Mike J. from Mississauga", rating: 4, comment: "Good sturdy tools, the latch is reliable and hasn't bent yet on hard boilies.", date: "2026-06-12" }
    ]
  },
  {
    id: "ac-2",
    name: "Super-Mesh PVA system with Plunger",
    category: "Fishing Accessories",
    description: "An elite 7-meter anti-ladder PVA mesh system. Supplied in a dry-storage protective tube with a customized wooden double-ended plunger. Perfect for making neat bait sticks, pellet bags, and compact presentation feeds.",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1611095790444-1dfa4825a5a2?auto=format&fit=crop&q=80&w=600",
    rating: 4.9,
    reviewsCount: 23,
    features: ["7 meters of premium, tight-knit PVA", "Includes heavy-duty double-ended plunger", "Supplied in a waterproof float tube", "Melts completely clean with zero residue"],
    stock: 25,
    reviews: []
  },

  // Terminal Tackle
  {
    id: "tt-1",
    name: "Teflon Curved Shank Specimen Hooks (Size 6, Pack of 10)",
    category: "Terminal Tackle",
    description: "Tough-as-nails carbon steel Hooks treated with a stealthy anti-glare Teflon coating. Curvature optimized for perfect mechanical rotation and solid mouth-holds. Chemically sharpened needle points.",
    price: 6.99,
    image: "https://images.unsplash.com/photo-1517462964-21fdcec3f25b?auto=format&fit=crop&q=80&w=600",
    rating: 4.9,
    reviewsCount: 65,
    features: ["Surgical chemically sharpened needle points", "Anti-reflective stealthy Teflon coating", "Forged double-strength high-carbon wire", "Sizes optimized for Hair and Ronnie rigs"],
    stock: 100,
    reviews: [
      { id: "r-11", author: "Garry H. from Niagara", rating: 5, comment: "Sharpest hooks on the Canadian market. Extremely durable and stay sharp even on stony river beds.", date: "2026-05-22" }
    ]
  },
  {
    id: "tt-2",
    name: "Safety Lead Clip & Tail Rubber Pack (Stealth Silt, 15 sets)",
    category: "Terminal Tackle",
    description: "Professional safety lead release system. Styled in a stealthy silt colourway to melt into river and lake beds. Ensures lead ejects safely if caught in heavy weed or snags, protecting the fish.",
    price: 8.49,
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=600",
    rating: 4.8,
    reviewsCount: 16,
    features: ["15 safety lead clips and tail rubbers per pack", "Silt green camouflage coloration", "Optimized release friction force", "Durable medical-grade polymer"],
    stock: 80,
    reviews: []
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-1",
    title: "Best Carp Fishing Tips in Ontario: Hooking Giants",
    slug: "best-carp-fishing-tips-ontario",
    category: "Tips",
    summary: "Southern Ontario rivers and lakes hold massive wild carp. Learn the tactics, baits, and pre-baiting strategies used by the pros to land 30lb+ specimens.",
    content: `Ontario has earned a reputation as one of the finest carp angling destinations in North America, yet many local anglers walk right past these hard-fighting giants. If you want to bag a personal best in the Grand River, St. Lawrence River, or Kawartha Lakes, success starts with understanding wild carp behavior and bait chemistry.

### 1. Location is Key
Wild river carp are highly nomadic. Look for:
- Slack-water bays adjacent to fast currents
- Overhanging willows and deep pools
- Shallow bays in late spring where water warms first

### 2. The Power of Pre-Baiting
Unlike pressurized European lakes, Canadian carp are wild and highly responsive to massive food carpets.
- Pre-bait your swim 24 to 48 hours before your session.
- Use a blend of **Marine Halibut Pellets (6mm)**, crushed corn, and boiled hemp.
- This creates a massive scent corridor that pulls fish from miles downriver and keeps them rooted in your spot.

### 3. Hair-Rig Presentation
Never hook your bait directly. A standard Hair Rig keeps the hook completely exposed, ensuring that when the carp sucks in the bait and attempts to eject it, the hook catches the bottom lip perfectly. Combine a size 6 **Teflon Curved Shank Hook** with a critically balanced wafter or a **Pineapple Fever Pop-Up** for a flawless presentation.`,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=600",
    author: "Dan Calado, Head Consultant",
    date: "2026-06-15",
    readTime: "5 min read",
    tags: ["Carp Fishing", "Ontario Lakes", "Baiting Strategy", "Hair Rig"]
  },
  {
    id: "blog-2",
    title: "Choosing the Right Bait: Sweet vs. Fishmeal",
    slug: "choosing-right-bait-sweet-vs-fishmeal",
    category: "Tactics",
    summary: "Struggling to decide between a sweet aroma or a smelly fishmeal profile? This breakdown explains how water temperature and season govern bait choices.",
    content: `It is the age-old angling question: Should you feed sweet, fruity flavors or rich, oily fishmeals? Making the wrong choice can lead to a silent indicator and a frustrating day on the bank. Let's break down the science of bait leakage and fish digestion to make your decision simple.

### Sweet Birdfood & Fruit Aromas
Fruity, sweet baits (like **Strawberry Cream Boilies** or **Active Sweet Coconut Mix**) rely on highly soluble ester-based flavorings. 
- **Solubility:** Esters disperse rapidly in cold water.
- **Seasonality:** Outstanding in spring, late autumn, and winter.
- **Digestion:** Highly digestible. Fish can eat sweet birdfoods continuously without getting full or sluggish.

### Fishmeal & Spicy Seafood Profiles
Oily, rich baits (like **Garlic & Spicy Squid Monster Boilies** and **Halibut Pellets**) rely on heavy lipids, marine proteins, and oils.
- **Solubility:** Oils coagulate in cold water, trapping the scent. However, in warm summer water, they create an incredibly powerful, rising oil slick.
- **Seasonality:** Peak summer to early autumn.
- **Selectivity:** Specimen fish crave high-protein oils. If you are targeted by small nuisance fish, switching to a hard, smelly fishmeal boilie will select for the larger carp and catfish.`,
    image: "https://images.unsplash.com/photo-1541959003-76140019204c?auto=format&fit=crop&q=80&w=600",
    author: "Dan Calado",
    date: "2026-05-10",
    readTime: "4 min read",
    tags: ["Bait Science", "Boilies", "Summer Fishing", "Carp Advice"]
  },
  {
    id: "blog-3",
    title: "Spring Fishing Guide: Ontarian Shallow Warm-ups",
    slug: "spring-fishing-guide-ontario",
    category: "Guides",
    summary: "As winter ice melts, fish wake up sluggish but hungry. Here is where to find them and how to stimulate quick bites without overfeeding.",
    content: `Spring is an exciting time on Ontario's waterways, but early season angling requires a refined touch. Water temperatures hovering between 4°C and 10°C mean that a fish's metabolism is still slow. 

### Focus on Shallow Bays
In spring, the sun is your greatest asset.
- Look for shallow, windward bays (less than 5 feet deep).
- Northern shores receive the most sunlight and warm up fastest.
- Even a 1°C difference in water temperature can draw hundreds of fish into the shallows.

### Scale Down Your Feed
Because metabolism is slow, fish fill up very quickly.
- Do not dump massive amounts of bait in.
- Use highly active, fast-dissolving feeds like **Active Sweet Coconut Groundbait** mixed with a few **Robin Red 4mm Pellets**.
- High-visibility single hookbaits like a **Pineapple Fever Pop-Up** on a Ronnie Rig are perfect. The bright yellow color triggers an aggressive curiosity bite even if the fish isn't actively hunting for food.`,
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=600",
    author: "Marcus Vance",
    date: "2026-04-05",
    readTime: "6 min read",
    tags: ["Spring Fishing", "Feeder Tactics", "Ontario Guides", "Pop-Ups"]
  },
  {
    id: "blog-4",
    title: "Summer Fishing Guide: Capitalizing on the Peak",
    slug: "summer-fishing-guide-ontario",
    category: "Guides",
    summary: "Warm water means active feeding, high metabolisms, and fast-moving fish. Learn how to feed aggressively to hold massive schools in your swim.",
    content: `When summer hits Ontario, the angling season enters top gear. Metabolic rates peak, meaning carp, catfish, and tench are feeding heavily. If you do not feed enough, schools of hungry fish will sweep through your spot, clean up your bait in minutes, and move on.

### Feed Heavily and Aggressively
Summer is the time for high-volume baiting.
- Mix heavy, high-feed groundbaits like **Premium Method Mix** with equal parts soaked corn and **Marine Halibut Pellets**.
- Create a large, dense bait carpet of at least 1-2kg to start, and top up after every fish you land.
- Use thick liquid attractants like **Monster Crab Amino Booster Syrup** to glaze your free offerings. The heavy syrup binds to the lake bed and ensures a long-lasting food scent is constantly leaking.

### Chase the Oxygen
During hot summer days, water oxygen levels can drop. Look for fast-moving water, weir pools, river bends, or areas swept by a steady breeze. Deep channels (10-15ft) hold cooler, more oxygenated water during mid-day heat.`,
    image: "https://images.unsplash.com/photo-1499591934245-40b55745b905?auto=format&fit=crop&q=80&w=600",
    author: "Dan Calado",
    date: "2026-07-02",
    readTime: "5 min read",
    tags: ["Summer Fishing", "Heavy Baiting", "River Angling", "Booster Syrup"]
  },
  {
    id: "blog-5",
    title: "Fall Fishing Strategies: The Autumn Pre-Winter Feed",
    slug: "fall-fishing-strategies-ontario",
    category: "Tactics",
    summary: "Autumn is specimen season. Fish are feeding desperately to build fat reserves for the long Canadian winter. Master these high-energy setups.",
    content: `Autumn is widely considered by experienced specimen hunters to be the absolute best time of year to catch the biggest fish in the lake. As water temperatures start to dip, carp, bass, and pike go on a massive feeding spree.

### High Energy, High Nutrition
In the fall, fish are seeking maximum calories.
- Baits high in proteins and fats are supreme.
- Feed whole and crushed **Garlic & Spicy Squid Boilies** boosted with **Pure Salmon Oil**.
- Salmon oil creates an incredible slick, and garlic is a legendary cold-water stimulant that triggers feeding sensors in muddy, falling leaves.

### Follow the Warm Winds
Pay close attention to wind direction. A warm southerly wind pushing against a bank will concentrate the warmer surface water and floating food particles, drawing heavy-feeding fish right into the margins. Don't be afraid to fish shallow water (3-4 feet) late into November if the wind is blowing warm!`,
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=600",
    author: "Tyler Wayne",
    date: "2026-10-12",
    readTime: "5 min read",
    tags: ["Fall Fishing", "Specimen Hunting", "Garlic Squid", "Salmon Oil"]
  },
  {
    id: "blog-6",
    title: "Winter Fishing Advice: Navigating Ice and Flow",
    slug: "winter-fishing-advice-ontario",
    category: "Guides",
    summary: "Fishing doesn't stop when the ice forms. Discover key safety, bait choices, and ice-fishing strategies for deep-winter Ontarian action.",
    content: `Canadian winters are legendary, and for many, it means swapping the rod pod for an ice drill and a heated hut. Ice fishing is an Ontario tradition, but navigating cold water currents requires precision and strict safety protocols.

### Stealth and Slow Metabolism
Under the ice, fish are highly grouped and extremely slow-moving.
- **Find the deep pools:** In small lakes, fish will gather in the deepest basins where water sits at a stable 4°C.
- **Keep bait microscopic:** Use light fluorocarbon lines, tiny hooks, and highly soluble aromas.
- Glazing small pellets in **Robin Red liquid** or using a tiny amount of active **Sweet Coconut Groundbait** down the ice hole is a great way to wake up sluggish fish without overfeeding.`,
    image: "https://images.unsplash.com/photo-1517462964-21fdcec3f25b?auto=format&fit=crop&q=80&w=600",
    author: "Marcus Vance",
    date: "2026-01-20",
    readTime: "5 min read",
    tags: ["Winter Fishing", "Ice Fishing", "Cold Water", "Stealth Tactics"]
  },
  {
    id: "blog-7",
    title: "Beginner Fishing Tips: Your First Time on the Bank",
    slug: "beginner-fishing-tips-ontario",
    category: "Tips",
    summary: "New to angling? Don't let complex rigs scare you off. Here is a simple, foolproof guide to gear, baits, and landing your first fish.",
    content: `Walking into a tackle shop can be intimidating. With thousands of hooks, lines, weights, and baits, it's easy to feel overwhelmed. Fortunately, catching your first Canadian freshwater fish doesn't require complex setups or expensive gear. Here is the ultimate beginner's checklist.

### Keep It Simple: The Float Rig
A simple float rig is the best way to learn. It allows you to visualize exactly when a fish bites, keeps your bait off snaggy bottom beds, and catches everything from panfish and perch to bass and small carp.
- **The Rod:** A 6ft or 7ft medium-action spinning rod is highly versatile.
- **The Line:** 8lb monofilament is strong enough for surprises but light enough to cast easily.
- **The Bait:** While worms are classic, a small pellet or canned sweetcorn on a hair-rigged collar will ensure you catch quality fish without constantly being bothered by tiny panfish. Try using **Active Sweet Coconut Feed Mix** balled around your sinker to draw fish to your bait.`,
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=600",
    author: "Sarah Thomas",
    date: "2026-03-01",
    readTime: "4 min read",
    tags: ["Beginners", "Float Fishing", "Basic Rigs", "Sweetcorn Baits"]
  },
  {
    id: "blog-8",
    title: "How to Catch Bigger Carp: Selectivity Secret",
    slug: "how-to-catch-bigger-carp",
    category: "Tactics",
    summary: "Tired of catching 5lb stockies? Discover the specific rig adjustments and bait selections required to target Ontario's massive, wise river monsters.",
    content: `Every Ontario angler has felt the frustration of feeding a swim beautifully, only to have small panfish, bullheads, or small stocky carp devour the hookbait before a specimen can find it. If you want to break the 25lb or 30lb barrier, you must make your bait highly selective.

### 1. Increase Boilie Size
Small baits equal small fish. If you fish a 10mm bait, anything with a mouth can swallow it.
- Upgrade your hookbait to a **18mm Garlic & Spicy Squid Boilie** or even double 15mm **Strawberry Cream Boilies** on a single hair.
- This creates a massive physical obstacle that panfish and small carp simply cannot fit into their mouths, leaving the bait intact for the lake monsters.

### 2. De-activate Your Feed
Active, fizzy groundbaits draw thousands of small fish. Specimen carp hate chaotic, crowded swims filled with hyperactive panfish.
- Feed heavy, dormant particles like whole large boilies, giant maize, and large maple peas.
- This quiet, motionless feed carpet encourages wise, massive fish to move in confidently and feed in peace.`,
    image: "https://images.unsplash.com/photo-1611095790444-1dfa4825a5a2?auto=format&fit=crop&q=80&w=600",
    author: "Dan Calado, Head Consultant",
    date: "2026-06-28",
    readTime: "6 min read",
    tags: ["Specimen Carp", "Large Boilies", "Selectivity", "River Monsters"]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t-1",
    name: "Arthur Pendelton",
    location: "Kitchener, ON",
    role: "Tournament Angler",
    text: "Matchbaits Canada has completely transformed my tournament results. The Sweet Maple Method Mix binds beautifully, casts like a bullet, and the carp count has tripled in my sessions. Outstanding quality!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: "t-2",
    name: "Genevieve Roche",
    location: "Cornwall, ON",
    role: "St. Lawrence River Guide",
    text: "The Garlic & Spicy Squid Boilies are an absolute weapon on the St. Lawrence River. Nuisance fish ignore them, but the giant river wild commons hunt them down like crazy. I never guide without a few bags.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: "t-3",
    name: "Robert 'Bob' Jenkins",
    location: "Peterborough, ON",
    role: "Carp Passionate",
    text: "As an old-school angler, I was skeptical of modern fancy attractants. But after trying the Amino Krill Wafters and Robin Red Pellets, I am a believer. Caught a 31lb mirror carp on my first afternoon!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150"
  }
];

export const FAQS: FAQItem[] = [
  {
    category: "Products",
    question: "What is the shelf life of your boilies and hookbaits?",
    answer: "Our shelf-life boilies and pop-ups are formulated with completely fish-safe organic salts and preservatives, giving them a shelf life of up to 18 months when stored in a cool, dry place out of direct sunlight."
  },
  {
    category: "Products",
    question: "Are your attractants and baits safe for the environment?",
    answer: "Yes, 100%. Matchbaits Canada strictly utilizes fully digestible, natural food-grade ingredients, grains, seeds, minerals, and proteins. We use zero toxic chemicals or artificial hardeners, ensuring the long-term health of Canadian fisheries."
  },
  {
    category: "Delivery & Store",
    question: "Do you have a physical storefront in North York?",
    answer: "Currently, our headquarters in North York serves as our manufacturing center and administrative hub. We operate primarily as a fast-shipping e-commerce supplier and distribute through partner tackle shops across Ontario."
  },
  {
    category: "Angling Tips",
    question: "I'm a complete beginner. What bait package should I start with?",
    answer: "We highly recommend starting with our 'Sweet Coconut Feed Mix' and a tub of 'Pineapple Fever Pop-Ups'. It's a sweet, highly visual combination that is easy to present and works exceptionally well for mixed coarse fish and carp without requiring complex rigs."
  },
  {
    category: "Delivery & Store",
    question: "How long does shipping take within Canada?",
    answer: "For Ontario residents, delivery is typically 1-2 business days. For the rest of Canada (BC, Alberta, Quebec, Maritimes), shipping usually takes 3-5 business days via Canada Post or UPS."
  }
];

// --- DATA DICTIONARIES ---
const CONSUMABLES = {
    pot_i1: { id: 'pot_i1', name: 'Minor Potion', type: 'instant', val: 0.20, cost: 0, icon: '🧪', desc: 'Instantly heals 20% HP' },
    pot_i2: { id: 'pot_i2', name: 'Health Potion', type: 'instant', val: 0.40, cost: 0, icon: '⚗️', desc: 'Instantly heals 40% HP' },
    pot_i3: { id: 'pot_i3', name: 'Major Potion', type: 'instant', val: 0.80, cost: 0, icon: '💖', desc: 'Instantly heals 80% HP' },
    pot_r1: { id: 'pot_r1', name: 'Minor Regen', type: 'regen', val: 0.20, cost: 0, icon: '🌱', desc: 'Heals 20% over 5 turns' },
    pot_r2: { id: 'pot_r2', name: 'Regen Potion', type: 'regen', val: 0.40, cost: 0, icon: '🌿', desc: 'Heals 40% over 5 turns' },
    pot_r3: { id: 'pot_r3', name: 'Major Regen', type: 'regen', val: 0.80, cost: 0, icon: '🌳', desc: 'Heals 80% over 5 turns' },
    food_d1: { id: 'food_d1', name: 'Roasted Salmon', type: 'buff_dmg', val: 1.20, cost: 0, icon: '🍣', desc: '+20% Dmg (5 turns)' },
    food_d2: { id: 'food_d2', name: 'Smoked Bass', type: 'buff_dmg', val: 1.40, cost: 0, icon: '🐟', desc: '+40% Dmg (5 turns)' },
    food_d3: { id: 'food_d3', name: 'Spicy Pike', type: 'buff_dmg', val: 1.80, cost: 0, icon: '🌶️', desc: '+80% Dmg (5 turns)' },
    food_df1: { id: 'food_df1', name: 'Trout Skewer', type: 'buff_def', val: 0.80, cost: 0, icon: '🍢', desc: '-20% Dmg Taken (5 turns)' },
    food_df2: { id: 'food_df2', name: 'Tuna Steak', type: 'buff_def', val: 0.60, cost: 0, icon: '🥩', desc: '-40% Dmg Taken (5 turns)' },
    food_df3: { id: 'food_df3', name: 'Carp Soup', type: 'buff_def', val: 0.20, cost: 0, icon: '🍲', desc: '-80% Dmg Taken (5 turns)' }
};

const RECIPES_ALCHEMIST = [{ id: 'pot_i1', herb: 'herb_red', herbAmt: 1, gold: 5 }, { id: 'pot_i2', herb: 'herb_red', herbAmt: 3, gold: 15 }, { id: 'pot_i3', herb: 'herb_red', herbAmt: 10, gold: 40 }, { id: 'pot_r1', herb: 'herb_blue', herbAmt: 1, gold: 5 }, { id: 'pot_r2', herb: 'herb_blue', herbAmt: 3, gold: 15 }, { id: 'pot_r3', herb: 'herb_blue', herbAmt: 10, gold: 40 }];
const RECIPES_CHEF = [{ id: 'food_d1', fish: 'fish_1', fishAmt: 2, gold: 5 }, { id: 'food_d2', fish: 'fish_3', fishAmt: 2, gold: 15 }, { id: 'food_d3', fish: 'fish_5', fishAmt: 2, gold: 40 }, { id: 'food_df1', fish: 'fish_2', fishAmt: 2, gold: 5 }, { id: 'food_df2', fish: 'fish_4', fishAmt: 2, gold: 15 }, { id: 'food_df3', fish: 'fish_6', fishAmt: 2, gold: 40 }];

const MAT_PRICES = { ench_common: 5, ench_rare: 15, ench_epic: 40, ench_legendary: 100, herb_red: 5, herb_blue: 5, fish_1: 3, fish_2: 3, fish_3: 6, fish_4: 6, fish_5: 10, fish_6: 15, soul_pebbles: 15, pot_i1: 2, pot_i2: 5, pot_i3: 10, pot_r1: 2, pot_r2: 5, pot_r3: 10, food_d1: 3, food_d2: 6, food_d3: 12, food_df1: 3, food_df2: 6, food_df3: 12 };
const MAT_ICONS = { ench_common: '⚪', ench_rare: '🔵', ench_epic: '🟣', ench_legendary: '🟡', herb_red: '🌺', herb_blue: '💠', fish_1: '🐟', fish_2: '🐠', fish_3: '🐡', fish_4: '🦈', fish_5: '🦑', fish_6: '🦀', soul_pebbles: '🔮' };
const MAT_NAMES = { ench_common: 'Normal Core', ench_rare: 'Rare Core', ench_epic: 'Epic Core', ench_legendary: 'Legendary Core', herb_red: 'Crimson Herb', herb_blue: 'Azure Herb', fish_1: 'Salmon', fish_2: 'Trout', fish_3: 'Bass', fish_4: 'Tuna', fish_5: 'Pike', fish_6: 'Carp', soul_pebbles: 'Soul Pebble' };
// Populate MAT_ICONS & NAMES with consumables
Object.values(CONSUMABLES).forEach(c => {
    if(!MAT_ICONS[c.id]) MAT_ICONS[c.id] = c.icon;
    if(!MAT_NAMES[c.id]) MAT_NAMES[c.id] = c.name;
});

// --- BURGLAR USABLE ITEMS ---
// These items are purchased from the Burglar, stored in globalProgression.usableItems,
// and can be equipped to usable slots. They have per-battle cooldowns.
const USABLE_ITEMS = {
    usb_bomb:        { id: 'usb_bomb',        name: 'Bomb',         icon: '💣', price: 50,  cooldown: 2,  desc: '30% HP damage to target',                    effectType: 'bomb' },
    usb_medicine:    { id: 'usb_medicine',    name: 'Medicine',     icon: '💊', price: 10,  cooldown: 0,  desc: 'Reflect bleed/poison/burn to enemy (1 turn)', effectType: 'medicine' },
    usb_knife:       { id: 'usb_knife',       name: 'Knife',        icon: '🔪', price: 50,  cooldown: 0,  desc: '10% HP damage + 2 bleed stacks',             effectType: 'knife' },
    usb_darkness:    { id: 'usb_darkness',    name: 'Darkness',     icon: '🌑', price: 50,  cooldown: 5,  desc: 'Enemy 15% miss chance (3 turns, no stack)',   effectType: 'darkness',    immuneToCDR: true },
    usb_curse:       { id: 'usb_curse',       name: 'Curse',        icon: '☠️', price: 100, cooldown: 4,  desc: 'Prevents 100% healing for 1 turn',           effectType: 'curse',       immuneToCDR: true },
    usb_ice_block:   { id: 'usb_ice_block',   name: 'Ice Block',    icon: '🧊', price: 50,  cooldown: 5,  desc: 'Reduce incoming damage 50% for 1 turn',      effectType: 'ice_block' },
    usb_mirror:      { id: 'usb_mirror',      name: 'Mirror Shard', icon: '🪞', price: 100, cooldown: 8,  desc: 'Reflect 100% damage for 1 turn',             effectType: 'mirror' },
    usb_distraction: { id: 'usb_distraction', name: 'Distraction',  icon: '🎭', price: 100, cooldown: 10, desc: 'Enemies attack themselves for 1 turn',       effectType: 'distraction' },
    usb_bud_butt:    { id: 'usb_bud_butt',    name: 'Mud Butt',     icon: '💩', price: 20,  cooldown: 0,  desc: 'Deals 10% HP damage to ALL enemies',         effectType: 'bud_butt' }
};

// Burglar item pool list (for invasion random drops etc.)
const BURGLAR_ITEM_POOL = Object.keys(USABLE_ITEMS);

// --- PET DATA ---
const PET_DATA = [
    { id: 'pet_00', name: 'Whiskers',    emoji: '🐱' },
    { id: 'pet_01', name: 'Nibbles',     emoji: '🐭' },
    { id: 'pet_02', name: 'Sprout',      emoji: '🌱' },
    { id: 'pet_03', name: 'Pebble',      emoji: '🪨' },
    { id: 'pet_04', name: 'Mochi',       emoji: '🍡' },
    { id: 'pet_05', name: 'Biscuit',     emoji: '🍪' },
    { id: 'pet_06', name: 'Pudding',     emoji: '🍮' },
    { id: 'pet_07', name: 'Clover',      emoji: '🍀' },
    { id: 'pet_08', name: 'Marshmallow', emoji: '🤍' },
    { id: 'pet_09', name: 'Gizmo',       emoji: '⚙️' },
    { id: 'pet_10', name: 'Bubbles',     emoji: '🫧' },
    { id: 'pet_11', name: 'Twinkle',     emoji: '✨' },
    { id: 'pet_12', name: 'Fluffy',      emoji: '🐑' },
    { id: 'pet_13', name: 'Doodle',      emoji: '🎨' },
    { id: 'pet_14', name: 'Noodles',     emoji: '🍜' },
    { id: 'pet_15', name: 'Buttons',     emoji: '🔘' },
    { id: 'pet_16', name: 'Sugarcane',   emoji: '🎋' },
    { id: 'pet_17', name: 'Snuggles',    emoji: '🐻' },
    { id: 'pet_18', name: 'Pumpkin',     emoji: '🎃' },
    { id: 'pet_19', name: 'Stardust',    emoji: '💫' },
    { id: 'pet_20', name: 'Pickle',      emoji: '🥒' },
    { id: 'pet_21', name: 'Waffle',      emoji: '🧇' },
    { id: 'pet_22', name: 'Toffee',      emoji: '🍬' },
    { id: 'pet_23', name: 'Zigzag',      emoji: '⚡' },
    { id: 'pet_24', name: 'Mocha',       emoji: '☕' },
    { id: 'pet_25', name: 'Tangerine',   emoji: '🍊' },
    { id: 'pet_26', name: 'Maple',       emoji: '🍁' },
    { id: 'pet_27', name: 'Coconut',     emoji: '🥥' },
    { id: 'pet_28', name: 'Boba',        emoji: '🧋' },
    { id: 'pet_29', name: 'Caramel',     emoji: '🍯' },
    { id: 'pet_30', name: 'Pistachio',   emoji: '🫘' },
    { id: 'pet_31', name: 'Sorbet',      emoji: '🍧' },
    { id: 'pet_32', name: 'Cheddar',     emoji: '🧀' },
    { id: 'pet_33', name: 'Pretzel',     emoji: '🥨' },
    { id: 'pet_34', name: 'Mango',       emoji: '🥭' },
    { id: 'pet_35', name: 'Papaya',      emoji: '🫐' },
    { id: 'pet_36', name: 'Peanut',      emoji: '🥜' },
    { id: 'pet_37', name: 'Cinnamon',    emoji: '🫙' },
    { id: 'pet_38', name: 'Pepper',      emoji: '🫑' },
    { id: 'pet_39', name: 'Truffle',     emoji: '🍄' },
    { id: 'pet_40', name: 'Hazel',       emoji: '🦔' },
    { id: 'pet_41', name: 'Bramble',     emoji: '🌿' },
    { id: 'pet_42', name: 'Fern',        emoji: '🌾' },
    { id: 'pet_43', name: 'Thistle',     emoji: '🌻' },
    { id: 'pet_44', name: 'Willow',      emoji: '🌊' },
    { id: 'pet_45', name: 'Mossy',       emoji: '🪴' },
    { id: 'pet_46', name: 'Acorn',       emoji: '🌰' },
    { id: 'pet_47', name: 'Dewdrop',     emoji: '💧' },
    { id: 'pet_48', name: 'Petal',       emoji: '🌸' },
    { id: 'pet_49', name: 'Sunny',       emoji: '☀️' },
    { id: 'pet_50', name: 'Moonbeam',    emoji: '🌙' },
    { id: 'pet_51', name: 'Aurora',      emoji: '🌌' },
    { id: 'pet_52', name: 'Comet',       emoji: '☄️' },
    { id: 'pet_53', name: 'Nebula',      emoji: '🌀' },
    { id: 'pet_54', name: 'Eclipse',     emoji: '🌑' },
    { id: 'pet_55', name: 'Solstice',    emoji: '🌅' },
    { id: 'pet_56', name: 'Glacier',     emoji: '🏔️' },
    { id: 'pet_57', name: 'Ember',       emoji: '🔥' },
    { id: 'pet_58', name: 'Breeze',      emoji: '💨' },
    { id: 'pet_59', name: 'Thunder',     emoji: '⛈️' },
    { id: 'pet_60', name: 'Velvet',      emoji: '🎀' },
    { id: 'pet_61', name: 'Cobalt',      emoji: '💎' },
    { id: 'pet_62', name: 'Prism',       emoji: '🔮' },
    { id: 'pet_63', name: 'Quartz',      emoji: '💠' },
    { id: 'pet_64', name: 'Opal',        emoji: '🌀' },
    { id: 'pet_65', name: 'Jasper',      emoji: '🟤' },
    { id: 'pet_66', name: 'Coral',       emoji: '🪸' },
    { id: 'pet_67', name: 'Pearl',       emoji: '🦪' },
    { id: 'pet_68', name: 'Amber',       emoji: '🍂' },
    { id: 'pet_69', name: 'Obsidian',    emoji: '⬛' },
    { id: 'pet_70', name: 'Topaz',       emoji: '💛' },
    { id: 'pet_71', name: 'Garnet',      emoji: '🔴' },
    { id: 'pet_72', name: 'Sapphire',    emoji: '🔵' },
    { id: 'pet_73', name: 'Citrine',     emoji: '🟡' },
    { id: 'pet_74', name: 'Zephyr',      emoji: '🌬️' },
    { id: 'pet_75', name: 'Rascal',      emoji: '😈' },
    { id: 'pet_76', name: 'Chomper',     emoji: '👾' },
    { id: 'pet_77', name: 'Teapot',      emoji: '🫖' },
    { id: 'pet_78', name: 'Mittens',     emoji: '🧤' },
    { id: 'pet_79', name: 'Jellybean',   emoji: '🟣' },
    { id: 'pet_80', name: 'Fuzzy',       emoji: '🐾' },
    { id: 'pet_81', name: 'Dinky',       emoji: '🦖' },
    { id: 'pet_82', name: 'Pompom',      emoji: '🎊' },
    { id: 'pet_83', name: 'Squishy',     emoji: '🐙' },
    { id: 'pet_84', name: 'Squeaky',     emoji: '🐣' },
    { id: 'pet_85', name: 'Dazzle',      emoji: '🌟' },
    { id: 'pet_86', name: 'Bonbon',      emoji: '🍭' },
    { id: 'pet_87', name: 'Nifty',       emoji: '🎯' },
    { id: 'pet_88', name: 'Ziggy',       emoji: '🦋' },
    { id: 'pet_89', name: 'Sparkle',     emoji: '🎇' },
    { id: 'pet_90', name: 'Scamp',       emoji: '🦊' },
    { id: 'pet_91', name: 'Ruffles',     emoji: '🦃' },
    { id: 'pet_92', name: 'Whumpy',      emoji: '🐘' },
    { id: 'pet_93', name: 'Grumbles',    emoji: '🐻‍❄️' },
    { id: 'pet_94', name: 'Boingo',      emoji: '🐇' },
    { id: 'pet_95', name: 'Wobble',      emoji: '🐧' },
    { id: 'pet_96', name: 'Snoot',       emoji: '🐊' },
    { id: 'pet_97', name: 'Chonk',       emoji: '🐮' },
    { id: 'pet_98', name: 'Flopsy',      emoji: '🐰' },
    { id: 'pet_99', name: 'Puddles',     emoji: '🦆' }
];

const EQUIP_SLOTS = ['head', 'shoulders', 'chest', 'arms', 'waist', 'legs', 'boots', 'necklace', 'ring1', 'ring2', 'ring3', 'ring4', 'weapon', 'cape'];
const RARITIES = ['common', 'rare', 'epic', 'legendary', 'mythic'];
const RARITY_MULTS = { common: 1, rare: 2, epic: 5, legendary: 10, mythic: 30 };

// CLASSES & SKILLS
const CLASSES = {
    warrior: { 
        name: 'Warrior', icon: '⚔️', avatar: '🤺', baseHp: 50, baseDmg: 10,
        skills: [
            { name: 'Slash', type: 'attack', mult: 1, cd: 0, color: 'bg-gray-700', desc: 'Base damage' },
            { name: 'Cleave', type: 'attack', mult: 1, effect: { bleed: true, turns: 5 }, cd: 5, color: 'bg-red-700', desc: 'Dmg + 1% Max HP Bleed (5t)' },
            { name: 'Ruthless Bash', type: 'attack', mult: 1.05, effect: { bleed: true, turns: 5, chance: 0.50 }, cd: 7, color: 'bg-orange-700', desc: 'Base dmg + 5%, 50% bleed chance' },
            { name: 'Weapon Throw', type: 'attack', mult: 1, effect: { bleed: true, turns: 5 }, cd: 5, color: 'bg-stone-600', desc: 'Dmg + Bleed stack' },
            { name: 'Whirlwind', type: 'attack', mult: 0.33, hits: 3, effect: { defDown: 0.01, bleed: true, turns: 5 }, cd: 6, color: 'bg-gray-600', desc: '3x hits, reduce def 1%, +1 bleed stack' },
            { name: 'Knockout', type: 'attack', mult: 1.02, effect: { defDown: 0.03 }, self_effect: { defUp: 0.05, turns: 3 }, cd: 6, color: 'bg-yellow-700', desc: 'Dmg + 2%, reduce enemy def 3%, +5% self def' },
            { name: 'Stomp', type: 'attack', mult: 1, effect: { healBlock: 1 }, self_effect: { healPct: 0.05 }, cd: 7, color: 'bg-stone-800', desc: 'Dmg, Heal block 1t, +5% Self-Heal' },
            { name: 'Soul Remover', type: 'attack', mult: 1, hits: 3, target: 'random', self_effect: { defDown: 0.15, turns: 2 }, cd: 8, color: 'bg-purple-800', desc: '3x random hits. -15% self def (2t)' },
            { name: 'Eruption', type: 'buff', mult: 0, self_effect: { regenPct: 0.20, turns: 2, dmgUp: 0.03, dmgUpTurns: 3 }, cd: 10, color: 'bg-red-600', desc: 'Regen 20% HP/t (2t), +3% Dmg (3t)' },
            { name: 'Def Up', type: 'buff', mult: 0, self_effect: { defUp: 0.50, turns: 3, blockHit: true, blockChance: 0.50, blockTurns: 3 }, cd: 8, color: 'bg-blue-700', desc: '+50% Def (3t), 50% block hit (3t)' }
        ]
    },
    mage: {
        name: 'Mage', icon: '🪄', avatar: '🧙‍♂️', baseHp: 35, baseDmg: 25,
        skills: [
            { name: 'Blast', type: 'attack', mult: 1, cd: 0, color: 'bg-blue-700', desc: 'Base damage' },
            { name: 'Fireball', type: 'attack', mult: 1.02, cd: 4, color: 'bg-red-600', desc: 'Base dmg + 2%' },
            { name: 'Ice Shower', type: 'attack', mult: 0.34, hits: 3, target: 'all', cd: 6, color: 'bg-cyan-600', desc: '3x 34% dmg to ALL' },
            // Fire Path Skills (Indices 3, 4, 5)
            { name: 'FireLazer', type: 'attack', mult: 1.03, effect: { defDown: 0.05, turns: 3 }, cd: 5, color: 'bg-orange-600', desc: 'Base + 3%, -5% Def (3t)' },
            { name: 'Fire Shield', type: 'buff', mult: 0, self_effect: { fireShield: true, turns: 3 }, cd: 5, color: 'bg-red-500', desc: 'Reflect 1% dmg & burn attackers' },
            { name: 'Meteor Blast', type: 'attack', mult: 1.15, hits: 2, cd: 8, color: 'bg-orange-800', desc: '2x hits of Base + 15% dmg' },
            // Ice Path Skills (Indices 6, 7, 8)
            { name: 'Ice Spike', type: 'attack', mult: 1.05, effect: { stunChance: 0.20 }, cd: 5, color: 'bg-blue-400', desc: 'Base + 5%, 20% chance to stun' },
            { name: 'Ice Shield', type: 'buff', mult: 0, self_effect: { iceShield: true, turns: 3 }, cd: 5, color: 'bg-cyan-500', desc: '-50% dmg taken (3t)' },
            { name: 'Ice Fists', type: 'attack', special: 'hpPctDmg', hpPctDmg: 0.30, cd: 6, color: 'bg-blue-600', desc: 'Deals 30% of target HP' }
        ]
    },
    paladin: {
        name: 'Paladin', icon: '🔨', avatar: '🛡️', baseHp: 60, baseDmg: 15,
        skills: [
            { name: 'Strike', type: 'attack', mult: 1, cd: 0, color: 'bg-gray-700', desc: 'Base damage' },
            { name: 'Iron Shield', type: 'buff', mult: 0, self_effect: { reflect: 0.50, reflectTurns: 1, regenPct: 0.10, turns: 2 }, cd: 5, color: 'bg-gray-500', desc: 'Reflect 50% dmg (1t), Heal 10% HP/t (2t)' },
            { name: 'Swinging Hammer', type: 'attack', mult: 1.05, effect: { stunChance: 1.0 }, cd: 8, color: 'bg-yellow-600', desc: '+5% dmg, stun 1t' },
            { name: 'Thirsty', type: 'buff', mult: 0, self_effect: { healPct: 0.30, defUp: 0.30, turns: 2, reflect: 0.60, reflectTurns: 1 }, cd: 8, color: 'bg-green-700', desc: 'Heal 30%, +30% Def (2t), Reflect 60% (1t)' },
            { name: 'Shield Explosion', type: 'buff', mult: 0, self_effect: { doubleDamageTaken: true, reflect: 1.00, reflectTurns: 1, turns: 1 }, cd: 7, color: 'bg-red-800', desc: 'Take 2x dmg, Reflect 100% dmg taken (1t)' },
            { name: 'Hammered', type: 'attack', mult: 2, target: 'all', cd: 6, color: 'bg-orange-600', desc: '2x base dmg to ALL enemies' },
            { name: 'Dash Charge', type: 'attack', mult: 1.05, self_effect: { dodgeTurns: 2 }, cd: 7, color: 'bg-cyan-700', desc: '+5% dmg, dodge 2t' },
            { name: 'Overhead Hit', type: 'attack', mult: 1, effect: { stunChance: 1.0 }, cd: 7, color: 'bg-stone-700', desc: 'Base dmg, stun 1t' },
            { name: 'Lose Control', type: 'attack', mult: 1.02, self_effect: { healPct: 0.30, reflect: 2.00, reflectTurns: 1 }, cd: 10, color: 'bg-purple-800', desc: '+2% dmg, Heal 30%, Reflect 200% (1t)' }
        ]
    },
    ninja: {
        name: 'Ninja', icon: '🌟', avatar: '🥷', baseHp: 30, baseDmg: 30,
        skills: [
            { name: 'Shuriken Hit', type: 'attack', mult: 1, cd: 0, color: 'bg-gray-600', desc: 'Base damage' },
            { name: 'Face Kick', type: 'attack', mult: 1.06, cd: 5, color: 'bg-orange-500', desc: '+6% dmg' },
            { name: 'Throw', type: 'attack', mult: 1.01, effect: { stunChance: 1.0 }, cd: 8, color: 'bg-yellow-500', desc: '+1% dmg, stun 1t' },
            { name: 'Poison Shuriken', type: 'attack', mult: 1.03, effect: { poison: true, poisonTurns: 2 }, cd: 6, color: 'bg-green-600', desc: '+3% dmg, Poison (2t)' },
            { name: 'Shuriken Rain', type: 'attack', mult: 1.10, target: 'all', effect: { poison: true, poisonTurns: 2 }, cd: 9, color: 'bg-green-800', desc: '+10% dmg to ALL, Poison all' },
            { name: 'Backhand Slap', type: 'attack', mult: 1.01, effect: { stunChance: 1.0, stunTurns: 3, defDown: 0.10 }, cd: 11, color: 'bg-red-700', desc: '+1% dmg, stun 3t, -10% def' },
            { name: 'Smoke Bomb', type: 'buff', mult: 0, special: 'smokeBomb', cd: 9, color: 'bg-gray-500', desc: 'Dodge 3t, Poison & dmg all enemies' },
            { name: 'Huge Shuriken', type: 'attack', mult: 1.50, cd: 8, color: 'bg-yellow-400', desc: '+50% dmg' },
            { name: 'Kunai Swarm', type: 'attack', mult: 0.10, hits: 9, target: 'random', effect: { poison: true, poisonTurns: 3, poisonStacks: 1 }, self_effect: { dmgBuff: 0.10, turns: 3 }, cd: 10, color: 'bg-purple-600', desc: '9x 10% dmg hits, +1 Poison stack, +10% dmg to poisoned (3t)' }
        ]
    },
    cleric: {
        name: 'Cleric', icon: '⛪', avatar: '⛪', baseHp: 25, baseDmg: 10,
        skills: [
            { name: 'Hug', type: 'attack', mult: 1, cd: 0, color: 'bg-pink-700', desc: 'Deal base damage' },
            { name: 'Deadly Kiss', type: 'attack', mult: 1.01, cd: 5, color: 'bg-pink-500', desc: 'Base +1% dmg, heal 2% life', self_effect: { healPct: 0.02 } },
            { name: 'Dizzy', type: 'attack', mult: 1.05, cd: 7, color: 'bg-purple-500', desc: 'Base +5%, heal buff 10% (5t), 2 poison', effect: { poisonStacks: 2, poisonTurns: 5 }, self_effect: { healingBuff: 0.10, turns: 5 } },
            { name: 'Heal', type: 'heal', mult: 0, cd: 10, color: 'bg-green-500', desc: 'Full HP heal, +10% dmg', self_effect: { fullHeal: true, dmgBuff: 0.10, turns: 999 } },
            { name: 'Mud', type: 'debuff', mult: 0, cd: 10, color: 'bg-yellow-800', desc: '50% skip (3t), +30% dmg taken', effect: { skipChance: 0.50, skipTurns: 3, dmgTaken: 0.30, dmgTakenTurns: 3 } },
            { name: 'Re Alive', type: 'buff', mult: 0, cd: 0, color: 'bg-yellow-400', desc: 'Revive at 50% HP, +30% dmg (1x)', self_effect: { reAlive: true }, special: 'reAlive' },
            { name: 'Infection', type: 'attack', mult: 1, cd: 7, color: 'bg-green-800', desc: 'Base dmg + 5 bleed + 1 burn + 2 poison', effect: { bleedStacks: 5, bleedTurns: 3, burnStacks: 1, burnTurns: 3, poisonStacks: 2, poisonTurns: 3 } },
            { name: 'Hot Water', type: 'attack', mult: 1.03, cd: 7, color: 'bg-orange-600', desc: 'Base +3%, 1 burn stack', effect: { burnStacks: 1, burnTurns: 3 } },
            { name: 'Scratch', type: 'attack', mult: 1.03, cd: 6, color: 'bg-red-600', desc: 'Base +3%, 2 bleed stacks', effect: { bleedStacks: 2, bleedTurns: 3 } }
        ]
    },
    archer: {
        name: 'Archer', icon: '🏹', avatar: '🏹', baseHp: 15, baseDmg: 40,
        skills: [
            { name: 'Arrow', type: 'attack', mult: 1, cd: 0, color: 'bg-gray-600', desc: 'Base damage' },
            { name: 'Fire Arrow', type: 'attack', mult: 1.05, effect: { burn: true, burnTurns: 7 }, cd: 5, color: 'bg-orange-600', desc: '+5% dmg, Burn (7t)' },
            { name: 'Poison Arrow', type: 'attack', mult: 1.07, effect: { poison: true, poisonTurns: 5 }, cd: 5, color: 'bg-green-600', desc: '+7% dmg, Poison (5t)' },
            { name: 'Arrow Rain', type: 'attack', mult: 1.05, target: 'all', cd: 7, color: 'bg-sky-700', desc: '+5% dmg to ALL enemies' },
            { name: 'Lazer Arrow', type: 'attack', mult: 1.25, cd: 10, color: 'bg-yellow-500', desc: '+25% dmg' },
            { name: 'Trap', type: 'attack', mult: 1.05, effect: { burn: true, burnTurns: 3, defDown: 0.01 }, cd: 8, color: 'bg-amber-700', desc: '+5% dmg, -1% def, Burn' },
            { name: 'Bandaid', type: 'buff', mult: 0, self_effect: { healPct: 0.20, dmgBoost: 0.15, dmgBoostTurns: 3 }, cd: 8, color: 'bg-pink-500', desc: 'Heal 20% HP, +15% dmg (3t)' },
            { name: 'Bear Trap', type: 'attack', mult: 1, effect: { stunChance: 1.0, stunTurns: 2 }, cd: 7, color: 'bg-red-800', desc: 'Stun 2 turns' },
            { name: 'Arrow Shield', type: 'buff', mult: 0, self_effect: { dmgReduction: 0.30, dmgReductionTurns: 5, reflect: 0.30, reflectTurns: 5 }, cd: 9, color: 'bg-blue-700', desc: '-30% dmg taken (5t), Reflect 30% (5t)' }
        ]
    }
};

// Specific Enemy Pools per mode
const ENEMIES_HUNT = [
    { name: 'Boar', avatar: '🐗', hpMult: 1.2, dmgMult: 0.8 }, { name: 'Wolf', avatar: '🐺', hpMult: 0.8, dmgMult: 1.2 }, { name: 'Bear', avatar: '🐻', hpMult: 1.5, dmgMult: 1.0 }, { name: 'Spider', avatar: '🕷️', hpMult: 0.7, dmgMult: 1.5 }, { name: 'Snake', avatar: '🐍', hpMult: 0.6, dmgMult: 1.8 }, { name: 'Treant', avatar: '🌲', hpMult: 1.8, dmgMult: 0.7 }, { name: 'Dire Bat', avatar: '🦇', hpMult: 0.6, dmgMult: 1.4 }, { name: 'Giant Toad', avatar: '🐸', hpMult: 1.3, dmgMult: 0.9 },
    { name: 'Dire Wolf', avatar: '🐺', hpMult: 1.0, dmgMult: 1.5 }, { name: 'Shadow Lynx', avatar: '🐱', hpMult: 0.7, dmgMult: 1.7 }, { name: 'Venomous Scorpion', avatar: '🦂', hpMult: 0.8, dmgMult: 1.6 }, { name: 'Thunder Elk', avatar: '🦌', hpMult: 1.6, dmgMult: 1.1 }, { name: 'Crystal Fox', avatar: '🦊', hpMult: 0.9, dmgMult: 1.3 }, { name: 'Sabertooth', avatar: '🐯', hpMult: 1.2, dmgMult: 1.4 }, { name: 'Giant Hawk', avatar: '🦅', hpMult: 0.6, dmgMult: 1.9 }, { name: 'Cave Troll', avatar: '👹', hpMult: 2.0, dmgMult: 0.8 },
    { name: 'Plague Rat', avatar: '🐀', hpMult: 0.5, dmgMult: 2.0 }, { name: 'Rock Lizard', avatar: '🦎', hpMult: 1.4, dmgMult: 0.9 }, { name: 'Poison Frog', avatar: '🐸', hpMult: 0.7, dmgMult: 1.6 }, { name: 'Storm Eagle', avatar: '🦅', hpMult: 0.8, dmgMult: 1.8 }, { name: 'Frost Rabbit', avatar: '🐰', hpMult: 0.6, dmgMult: 1.3 }, { name: 'Vine Creeper', avatar: '🌿', hpMult: 1.7, dmgMult: 0.6 }, { name: 'Mud Crab', avatar: '🦀', hpMult: 1.5, dmgMult: 0.7 }, { name: 'Wild Boar King', avatar: '🐗', hpMult: 2.2, dmgMult: 1.2 }, { name: 'Blood Hawk', avatar: '🦅', hpMult: 0.6, dmgMult: 2.1 }
];
const ENEMIES_PILLAGE = [
    { name: 'Peasant', avatar: '🧑‍🌾', hpMult: 0.8, dmgMult: 0.5 }, { name: 'Militia', avatar: '💂', hpMult: 1.0, dmgMult: 1.0 }, { name: 'Guard', avatar: '🛡️', hpMult: 1.5, dmgMult: 0.8 }, { name: 'Knight', avatar: '🤺', hpMult: 1.2, dmgMult: 1.2 }, { name: 'Bandit', avatar: '🦹', hpMult: 0.9, dmgMult: 1.1 }, { name: 'Rogue', avatar: '🗡️', hpMult: 0.7, dmgMult: 1.6 }, { name: 'Cultist', avatar: '🥷', hpMult: 0.8, dmgMult: 1.4 }, { name: 'Marauder', avatar: '🪓', hpMult: 1.4, dmgMult: 1.2 },
    { name: 'Thief', avatar: '🕵️', hpMult: 0.7, dmgMult: 1.5 }, { name: 'Dark Paladin', avatar: '⚔️', hpMult: 1.6, dmgMult: 1.3 }, { name: 'Mercenary', avatar: '🗡️', hpMult: 1.1, dmgMult: 1.3 }, { name: 'Pirate', avatar: '🏴‍☠️', hpMult: 1.0, dmgMult: 1.4 }, { name: 'Assassin', avatar: '🥷', hpMult: 0.6, dmgMult: 2.0 }, { name: 'War Cleric', avatar: '⛪', hpMult: 1.3, dmgMult: 1.0 }, { name: 'Berserker', avatar: '😤', hpMult: 1.0, dmgMult: 1.8 }, { name: 'Brigand', avatar: '🪝', hpMult: 0.9, dmgMult: 1.2 },
    { name: 'Dark Mage', avatar: '🧙', hpMult: 0.7, dmgMult: 1.9 }, { name: 'Enforcer', avatar: '👊', hpMult: 1.4, dmgMult: 1.1 }, { name: 'Witch Hunter', avatar: '🔫', hpMult: 1.1, dmgMult: 1.5 }, { name: 'Shadow Monk', avatar: '🥋', hpMult: 0.9, dmgMult: 1.6 }, { name: 'Warlord', avatar: '🏰', hpMult: 1.7, dmgMult: 1.2 }, { name: 'Gladiator', avatar: '🏛️', hpMult: 1.3, dmgMult: 1.4 }, { name: 'Crusader', avatar: '✝️', hpMult: 1.5, dmgMult: 1.1 }, { name: 'Death Knight', avatar: '💀', hpMult: 1.8, dmgMult: 1.3 }, { name: 'Inquisitor', avatar: '⚖️', hpMult: 1.2, dmgMult: 1.6 }
];
const ENEMIES_WORKSHOP = [
    { name: 'Construct', avatar: '🤖', hpMult: 1.0, dmgMult: 1.0 }, { name: 'Golem', avatar: '🗿', hpMult: 2.0, dmgMult: 0.5 }, { name: 'Mecha-Spider', avatar: '⚙️', hpMult: 0.8, dmgMult: 1.5 }, { name: 'Drone', avatar: '🛸', hpMult: 0.5, dmgMult: 2.0 }, { name: 'Mimic', avatar: '🧰', hpMult: 1.2, dmgMult: 1.5 }, { name: 'Sentry', avatar: '👁️', hpMult: 0.6, dmgMult: 1.8 }, { name: 'Automaton', avatar: '🦾', hpMult: 1.3, dmgMult: 0.8 },
    { name: 'Steam Engine', avatar: '🔧', hpMult: 1.8, dmgMult: 0.7 }, { name: 'Iron Maiden', avatar: '⚙️', hpMult: 1.5, dmgMult: 0.9 }, { name: 'Clockwork Knight', avatar: '🛡️', hpMult: 1.6, dmgMult: 1.0 }, { name: 'Plasma Drone', avatar: '🔋', hpMult: 0.6, dmgMult: 2.2 }, { name: 'War Machine', avatar: '🔩', hpMult: 2.2, dmgMult: 1.0 }, { name: 'Turret Bot', avatar: '🎯', hpMult: 0.7, dmgMult: 2.0 }, { name: 'Nano Swarm', avatar: '🔬', hpMult: 0.5, dmgMult: 1.8 }, { name: 'Mech Titan', avatar: '🤖', hpMult: 2.5, dmgMult: 1.2 }
];
const ENEMIES_DUNGEON = [
    { name: 'Alien Scout', avatar: '👽', hpMult: 0.9, dmgMult: 1.4 }, { name: 'Void Terror', avatar: '👾', hpMult: 1.5, dmgMult: 1.2 }, { name: 'UFO Swarm', avatar: '🛸', hpMult: 0.7, dmgMult: 0.9 }, { name: 'Mech-Warrior', avatar: '🤖', hpMult: 1.3, dmgMult: 1.3 }, { name: 'Cyborg Assassin', avatar: '🦾', hpMult: 1.0, dmgMult: 1.6 },
    { name: 'Nebula Wraith', avatar: '🌌', hpMult: 0.8, dmgMult: 1.7 }, { name: 'Star Parasite', avatar: '⭐', hpMult: 0.7, dmgMult: 1.5 }, { name: 'Void Walker', avatar: '🌑', hpMult: 1.1, dmgMult: 1.4 }, { name: 'Cosmic Horror', avatar: '🌀', hpMult: 1.4, dmgMult: 1.3 }, { name: 'Dark Matter Elemental', avatar: '💫', hpMult: 1.2, dmgMult: 1.5 }, { name: 'Space Leech', avatar: '🪱', hpMult: 0.8, dmgMult: 1.6 }, { name: 'Quantum Specter', avatar: '👻', hpMult: 0.6, dmgMult: 2.0 }, { name: 'Gravity Crusher', avatar: '⚫', hpMult: 2.0, dmgMult: 1.0 }, { name: 'Crystal Hivemind', avatar: '💎', hpMult: 1.6, dmgMult: 0.9 }, { name: 'Void Colossus', avatar: '🌊', hpMult: 2.3, dmgMult: 1.1 }
];
const ENEMIES_ISLAND_DEFENSE = [
    { name: 'Reef Crab', avatar: '🦀', hpMult: 1.2, dmgMult: 0.8 }, { name: 'Sea Serpent', avatar: '🐍', hpMult: 1.0, dmgMult: 1.4 }, { name: 'Tide Wraith', avatar: '👻', hpMult: 0.7, dmgMult: 1.6 }, { name: 'Shore Raider', avatar: '🏴‍☠️', hpMult: 1.0, dmgMult: 1.2 }, { name: 'Coral Golem', avatar: '🪸', hpMult: 2.0, dmgMult: 0.7 },
    { name: 'Kraken Scout', avatar: '🦑', hpMult: 0.9, dmgMult: 1.5 }, { name: 'Storm Gull', avatar: '🐦', hpMult: 0.5, dmgMult: 1.8 }, { name: 'Sandstorm Elemental', avatar: '🌪️', hpMult: 0.8, dmgMult: 1.7 }, { name: 'Tidal Shark', avatar: '🦈', hpMult: 1.3, dmgMult: 1.3 }, { name: 'Island Witch', avatar: '🧙', hpMult: 0.7, dmgMult: 2.0 },
    { name: 'Wave Rider', avatar: '🌊', hpMult: 1.1, dmgMult: 1.2 }, { name: 'Depth Horror', avatar: '🐙', hpMult: 1.5, dmgMult: 1.1 }, { name: 'Venomfin', avatar: '🐡', hpMult: 0.8, dmgMult: 1.6 }, { name: 'Beachhead Brute', avatar: '💪', hpMult: 1.8, dmgMult: 1.0 }, { name: 'Siren', avatar: '🧜', hpMult: 0.6, dmgMult: 2.1 }
];

const BOSS_TEMPLATES = {
    'hunting': [
        { name: 'Apex Predator', avatar: '🦁', hpMult: 3, dmgMult: 2 },
        { name: 'Ancient Bear', avatar: '🐻', hpMult: 4, dmgMult: 1.8 },
        { name: 'Forest Dragon', avatar: '🐉', hpMult: 3.5, dmgMult: 2.2 },
        { name: 'Thunder Titan', avatar: '⚡', hpMult: 5, dmgMult: 1.5 },
        { name: 'Shadowmane', avatar: '🦂', hpMult: 3, dmgMult: 2.5 }
    ],
    'pillage': [
        { name: 'Bandit King', avatar: '🤴', hpMult: 3, dmgMult: 2 },
        { name: 'Warlord General', avatar: '⚔️', hpMult: 4, dmgMult: 1.8 },
        { name: 'Dark Champion', avatar: '🏆', hpMult: 3.5, dmgMult: 2.2 },
        { name: 'Shadow Overlord', avatar: '👑', hpMult: 5, dmgMult: 1.5 },
        { name: 'Death Inquisitor', avatar: '💀', hpMult: 3, dmgMult: 2.5 }
    ],
    'workshop': [
        { name: 'Mecha-Overlord', avatar: '🤖', hpMult: 3, dmgMult: 2 },
        { name: 'Titan Golem', avatar: '🗿', hpMult: 5, dmgMult: 1.5 },
        { name: 'Omega Construct', avatar: '⚙️', hpMult: 4, dmgMult: 2 },
        { name: 'Core Destroyer', avatar: '💥', hpMult: 3.5, dmgMult: 2.3 },
        { name: 'Prime Automaton', avatar: '🦾', hpMult: 4.5, dmgMult: 1.8 }
    ],
    'dungeon': [
        { name: 'Void Emperor', avatar: '👾', hpMult: 4, dmgMult: 3 },
        { name: 'Cosmic Devourer', avatar: '🌌', hpMult: 5, dmgMult: 2.5 },
        { name: 'Nebula Titan', avatar: '🌀', hpMult: 4.5, dmgMult: 2.8 },
        { name: 'Quantum Overlord', avatar: '💫', hpMult: 6, dmgMult: 2 },
        { name: 'Dark Matter God', avatar: '⭐', hpMult: 5, dmgMult: 3 }
    ],
    'island_defense': [
        { name: 'Kraken Lord', avatar: '🐙', hpMult: 4, dmgMult: 2.5 },
        { name: 'Leviathan', avatar: '🦑', hpMult: 5, dmgMult: 2.2 },
        { name: 'Tidal Colossus', avatar: '🌊', hpMult: 4.5, dmgMult: 2.8 },
        { name: 'Reef Titan', avatar: '🦈', hpMult: 6, dmgMult: 2 },
        { name: 'Abyssal Dreadnought', avatar: '🐋', hpMult: 5, dmgMult: 3 }
    ]
};


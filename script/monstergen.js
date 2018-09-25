var MonsterName;
var MonsterDescription;
var HP;
var AC;
var STR;
var DEX;
var MIND;
var Attack;
var Special;
var ImgSrc;
var MainAdjective;

var MonTypes = ["Cat", "Rat", "Dolphin", "Shark", "Dragon", "Seagull", "Pigeon", "Raccoon", "Lich", "Zombie", "Skeleton", "Wolf", "Snake"];
MonTypes.sort();

// Populate the dropdown menu.
var TypeList = "";
var numTypes = MonTypes.length;
var i;
var ThisElement;
var TypeElement = document.getElementById("Types");
for (i = -1; i < numTypes; i++) {
    if (i < 0) {
        ThisElement = "Random";
    }
    else {
        ThisElement = MonTypes[i];
    }
    var newoption = document.createElement("option");
    newoption.value = ThisElement;
    newoption.text = ThisElement;
    TypeElement.appendChild(newoption);
}

// Run immediately, assuming random
generateMonster();

// Generation function
function generateMonster() {

    monLevel = Math.floor(document.getElementById("MonsterLevel").value);
    monType = TypeElement.value;

    // If random, choose an option
    if (monType === "Random") {
        monType = MonTypes[Math.floor(Math.random() * MonTypes.length)];
    }

    ImgSrc = "img/" + monType + ".png";
    var specialtype = "";
    // Adjectives
    if (monType === "Dragon") {
        adjectives = ["Red", "Blue", "Green", "Black", "White"];
        //specialtype="Breath weapon"
    }
    else {
        adjectives = ["Death", "Horned", "Flaming", "Demonic", "Angelic", "Catastrophic", "Amalgamated", "Capitalist"];
    }

    MainAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];

    MonsterName = MainAdjective + " " + monType;

    verb = ["oozes", "vibrates", "pulsates", "quivers", "slobbers", "growls", "sprints", "floats", "hovers", "roars", "gazes", "glares", "glows", "radiates"];
    descadjective = ["power", "undeath", "rage", "greed", "grace", "strength", "intensity", "flames", "frost", "heat", "cold"];
    eyeadjectives = ["glowing red", "darting", "piercing", "terrifying", "gigantic", "small", "spooky", "pulsating"];
    bodypart = ["eyes", "arms", "claws", "talons", "thighs", "legs", "ears", "nostrils", "teeth", "pecs", "udders", "hooves", "wings"];
    verb2 = ["is covered with", "bristles with", "a complete absence of", "a moderate amount of", "an above average amount of", "is overgrown with", "is carpetted with", "a spattering of", "is peppered with", "a faint hint of", "is adorned with"];
    dangerthing = ["spikes", "spines", "hair", "scales", "needles", "toxicity", "vitriol", "thermite", "pustules", "thorns", "horns", "extra limbs", "feathers", "vines"];

    //MonsterDescription="This " + MonsterName + " oozes with ultimate power. It has glowing red eyes and bristles with spikes.";
    MonsterDescription = "This " + MonsterName + " " + RandomElement(verb) + " with " + RandomElement(descadjective) + ". It has " + RandomElement(eyeadjectives) + " " + RandomElement(bodypart) + " and " + RandomElement(verb2) + " " + RandomElement(dangerthing) + ".";

    var StatArr = [Math.floor(13 + monLevel), Math.floor(10 + monLevel / 2), Math.floor(8 + monLevel / 4)];

    StatArr.sort(function (a, b) { return 0.5 - Math.random() });

    STR = StatArr[0];
    DEX = StatArr[1];
    MIND = StatArr[2];

    var STRmod = Math.floor((STR - 10) / 2);
    var DEXmod = Math.floor((DEX - 10) / 2);
    var MINDmod = Math.floor((MIND - 10) / 2);

    HP = Math.floor(monLevel * (3.5 + STRmod)) + " (" + monLevel + "d6";

    if (STRmod > 0) {
        HP += "+" + STRmod * monLevel;
    }
    else if (STRmod < 0) {
        HP += "-" + Math.abs(STRmod * monLevel);
    }
    HP += ")";

    AC = Math.floor(10 + DEXmod + monLevel / 2) + " (+" + Math.floor(monLevel / 2) + " armor, " + (DEXmod < 0 ? "-" : "+") + Math.abs(DEXmod) + " Dex)";

    if (MINDmod > STRmod && MINDmod > DEXmod) {
        Attack = "Magic bolt +" + Math.floor(MINDmod + monLevel) + " 1d6 + " + MINDmod;
    }
    else if (DEXmod > STRmod) {
        Attack = "Ranged +" + Math.floor(DEXmod + monLevel) + " 1d6";
        if (STRmod > 0) {
            Attack += " + " + STRmod;
        }
        else if (STRmod < 0) {
            Attack += " - " + Math.abs(STRmod);
        }
    }
    else {
        Attack = "Bite +" + Math.floor(STRmod + monLevel) + " 1d8 + " + STRmod;
    }

    //Special="Disease DC 16, 1d4 STR per day";
    let specialDC = 10 + Math.floor(monLevel);
    var specialoptions;
    // Dragons always have breath weapons!
    if (monType === "Dragon") {
        Special = "Breath weapon DC " + (specialDC + STRmod) + ", " + monLevel + "d6 damage";
    }
    else {
        if (monLevel > 10*Math.random()) {
            //let specialoptions=["Breath weapon", "Poison", "Disease","Swallow whole", "Regeneration"];
            //Special = "sedf";
            let option = Math.floor(Math.random() * 4);
            switch (option) {
                default:
                // Straight up damage
                case 0:
                    specialoptions = ["Breath weapon", "Lightning bolt", "Fireball", "Sonic blast", "Constrict"];
                    Special = RandomElement(specialoptions) + " DC " + (specialDC + STRmod) + ", " + monLevel + "d6 damage";
                    break;
                // Negative health effect
                case 1:
                    specialoptions = ["Disease", "Poison", "Supernatural rot", "Withering grasp"];
                    Special = RandomElement(specialoptions) + " DC "
                        + (specialDC + STRmod) + ", " + Math.floor(monLevel / 4 + 1) + "d4 strength damage";
                    break;
                // Subjective status effect
                case 2:
                    specialoptions = ["Petrifying gaze", "Deafening screech", "Earthquake", "Swallow whole", "Lycanthropy"];
                    Special = RandomElement(specialoptions) + " DC " + (specialDC + STRmod);
                    break;
                // Inherent property
                case 3:
                    specialoptions = ["Regeneration " + monLevel, "Fast healing " + monLevel,
                        "Immune to fire", "Immune to cold", "Telepathic"];
                    Special = RandomElement(specialoptions);
                    break;
            }
        }
        else {
            Special="None."
        }
    }

    //ImgSrc="img/skeleton.png";

    // Fill in all of the values.
    document.getElementById("monsterName").innerHTML = MonsterName;
    document.getElementById("monsterDescription").innerHTML = MonsterDescription;
    document.getElementById("HP").innerHTML = "HP: " + HP;
    document.getElementById("AC").innerHTML = "AC: " + AC;
    document.getElementById("STR").innerHTML = "STR: " + STR + " (" + (STRmod >= 0 ? "+" : "") + STRmod + ")";
    document.getElementById("DEX").innerHTML = "DEX: " + DEX + " (" + (DEXmod >= 0 ? "+" : "") + DEXmod + ")";
    document.getElementById("MIND").innerHTML = "MIND: " + MIND + " (" + (MINDmod >= 0 ? "+" : "") + MINDmod + ")";
    document.getElementById("Attack").innerHTML = "Attack: " + Attack;
    document.getElementById("Special").innerHTML = "Special: " + Special;
    document.getElementById("MonsterImg").src = ImgSrc;
}

function RandomElement(thearr) {
    return thearr[Math.floor(Math.random() * thearr.length)];
}

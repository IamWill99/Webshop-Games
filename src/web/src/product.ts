import { LitElement, html, css, TemplateResult, CSSResult } from "lit";
import { customElement } from "lit/decorators.js";


// De Product interface definieert de structuur van een product object.
// Elk product heeft een naam, een URL van een afbeelding, een beschrijving, en een prijs.
// Dit wordt gebruikt om type-veiligheid te garanderen bij het werken met producten in de applicatie.

interface Product {
    name: string;
    imageUrl: string;
    description: string;
    price: string;
}



@customElement("product-root")
export class product extends LitElement {

    private currentPage: number = 1;
    private productsPerPage: number = 9; // Bijvoorbeeld, 9 producten per pagina

    public _userService: any;
    public _cartItemsCount: number | undefined;



  // Definieer en initialiseer de array met producten
  private products: Product[] = [

    {
        name: "Bomb squad: classroom crisis",
        imageUrl: "https://lucastars.hbo-ict.cloud/media/84c86ce53485454382fb2287e387fa9e/00000006000000000000000000000000.png",
        description: "Bomb squad: classroom crisis",
        price: "24.95"
    },


    {
        name: "Lost Memories: Quest of the Forgotten Knight",
        imageUrl: "https://lucastars.hbo-ict.cloud/media/7da176806505408c88b0d5f16f000a7b/00000006000000000000000000000000.png",
        description: "In a realm of magic and mystery, an unnamed protagonist sets out on a quest to find the lost damsel, aided by strange artifacts and unexpected allies. Through forests, caves, and cliffs, he uncovers fragments of his forgotten memories.",
        price: "24.95"
    },

   

    {
        name: "Metro 8",
        imageUrl: "https://lucastars.hbo-ict.cloud/media/f517798d34f14abcb65bee7386ef38dd/00000006000000000000000000000000.png",
        description: "In this game you find yourself in an exciting world of underground tunnels and subway stations. Armed with only your own wits and perseverance, you must navigate through a vast subway network. The game is a maze, with hidden paths, puzzles and obstacles that you must overcome to progress. As you explore deeper into the dark corridors, you will discover secrets and challenges that will test your skills. Do you dare to find the way and escape from this underground labyrinth?",
        price: "24.95"
    },


    {
        name: "The dragon-Slayer 3000",
        imageUrl: "https://lucastars.hbo-ict.cloud/media/aeb7eb3c542347b6830659a4e0d9885d/00000006000000000000000000000000.png",
        description: "In this game you go with one of the three characters with your party to defeat the dragon.Can you handle the danger?",
        price: "24.95"
    },
    

    {
        name: "Save The Future",
        imageUrl: "https://lucastars.hbo-ict.cloud/media/2626cba298e74c869dfabb1fe9f778b3/00000006000000000000000000000000.png",
        description: "Are you able to save the future of mankind?\n\nIf you like science, logical thinking and wine you should give it a go...",
        price: "24.95"
    },
    {
        name: "Murderous Mysteries",
        imageUrl: "https://lucastars.hbo-ict.cloud/media/3d97c66a0092447c93b1c04e63dd1988/00000006000000000000000000000000.png",
        description: "On a foggy day in London you, Sherkey Jones, investigate the murder of Jessica Smith in her family mansion. Suspects include her mother, father and brother. With your sharp mind you unravel clues hidden within the opulent home, determined to uncover the truth behind the tragedy.In this point-and-click detective game, you assume the role of Sherkey Jones a detective, investigating the murder of Jessica Smith in her family mansion. Through exploration, interaction with objects, puzzle-solving and finding clues. You wil unravel the truth behind the murder. Multiple endings may result from your choices. So choose carefully....",
        price: "24.95"
    },
    {
        name: "Masr",
        imageUrl: "https://lucastars.hbo-ict.cloud/media/9e25734d6c6a4b3d92308622e1522c76/00000006000000000000000000000000.png",
        description: "Masr - The dynasty of the future.",
        price: "24.95"
    },

    {
        name: "Journey To Wizard Academy",
        imageUrl: "https://lucastars.hbo-ict.cloud/media/3e6e6266e9784511bb4d999e854a9caa/00000006000000000000000000000000.png",
        description: "Explore the magical world of Harry's Wizarding Quest. As young wizard Harry, you must find a broom, a spell book, a wand and the magical invitation itself through enchanting rooms full of riddles and challenges to gain entry to the prestigious Wizard School. Do you dare to take this magical journey? For better results, play in full screen.",
        price: "24.95"
    },

    

    {
        name: "Breakout",
        imageUrl: "https://lucastars.hbo-ict.cloud/media/f8f2998c0bfc407cbfe46f367b3ab727/00000006000000000000000000000000.png",
        description: "Try to breakout whilst super hungry.",
        price: "24.95"
    },

    {
        name: "Terror Trial",
        imageUrl: "https://lucastars.hbo-ict.cloud/media/6918722fe0104049b27aa218c692a417/00000006000000000000000000000000.png",
        description: "Terror Trial is a terrifying house full of traps and dark secrets, where desperate travelers are trapped and can only escape by solving riddles before the clock ticks towards their doom. ",
        price: "24.95"
    },
    
    {
        name: "Tribus Forest",
        imageUrl: "https://lucastars.hbo-ict.cloud/media/acf305d75b7d4e0f8da3f966ee917707/00000006000000000000000000000000.jpeg",
        description: `Important, to play the game properly you must play it in full screen (at the top of the menu when the game is started). 
            With a sudden jolt, you wake up shivering you can't see anything. 
            A loud sound of the engine and the smell of gasoline fills the air around you. 
            But before you can even think, a loud *bing* occurs. 
            Your head slams against the rear of the trunk, you groan in pain while you drift unconscious. 
            Suddenly you wake up in the middle of a forest unknown to you and you get an eerie feeling from it. 
            You have to try to find your way out of here!`,
        price: "24.95"
    },
    
    {
        name: "DOORWAY OF DECEPTION",
        imageUrl: "https://lucastars.hbo-ict.cloud/media/12306551034f4d2ebeed526ffd193121/00000006000000000000000000000000.png",
        description: "Doorway of deception.Enter a world full of intrigue and hidden truths in Door of DeceptionHow to play Explore every nook and cranny: Carefully examine your surroundings to find hidden clues that will help you solve the puzzles. Use your mind: Combine clues and think logically to decipher the riddles you encounter. Unleash your creativity: Sometimes the solution is not always obvious. Think outside the box and use your imagination to move forward. Join the Journey Step into the shoes of an explorer and be surprised by the secrets that Door of Deception has to offer. Prepare for an adventure full of challenges, intrigue and unexpected twists. Do you dare to find out the truth?",
        price: "24.95"
    },

    {
        name: "Behind Closed Doors",
        imageUrl: "https://lucastars.hbo-ict.cloud/media/bcfc7fe72cd842489ae1f23a9bb75b24/00000006000000000000000000000000.png",
        description: `Step into the mystery of Behind Closed Doors as Jack, where the calm facade of Jack's life is shattered by a strange tension brewing within his own home. As he awakens to find his wife, Emily,
        acting peculiarly, he senses something amiss. With unanswered questions lingering, Jack delves into a gripping search through their home, uncovering clues hidden within each room. But as the puzzle pieces fall into place,
        he inches closer to a shocking revelation behind a secretive door. Will you dare to confront the truth, even if it means unraveling everything you thought you knew? Enjoy the game and remember to upvote it if you had a great time! Happy gaming, Enjoli :)`,
        price: "24.95"
    },

    {
        name: "Lost Signals",
        imageUrl: "https://lucastars.hbo-ict.cloud/media/96aacbc286ce4c5389214d2be9c1d037/00000006000000000000000000000000.png",
        description: "Embark a journey together with Mark and the captain of the spaceship that works under SPACE Y. Solve different kinds of puzzles while meeting new people in this text based story game! Experience whats happening through out the story and find new ways to solve problems. Unlock new chapters by solving puzzles and opening new rooms.Start again from your favorite part with the new chapter select function! We wish you the best of luck conquering ",
        price: "24.95"
    },
    
    

    {
        name: "In between Times",
        imageUrl: "https://lucastars.hbo-ict.cloud/media/52896ccab0d84d63b924167a0ba72d40/00000006000000000000000000000000.png",
        description: "In Between Times is een time-travel en detective-avonturengame waarin jij, als detective, door verschillende tijdperken reist, gebaseerd op echte historische locaties, om mysteries op te lossen. ",
        price: "24.95"
    },

    {
        name: "Game",
        imageUrl: "https://lucastars.hbo-ict.cloud/media/3369c097cc83459c91795ab0a79e96f4/00000006000000000000000000000000.png",
        description: "This is our game",
        price: "24.95"
    },
    
    {
        name: "Escape the Unseen",
        imageUrl: "https://lucastars.hbo-ict.cloud/media/9cb32af5b14249498649c208fe6e417d/00000006000000000000000000000000.png",
        description: "Trapped in five mysterious rooms, you must solve puzzles and find hidden clues to escape",
        price: "24.95"
    },

    {
        name: "Eternal Quest",
        imageUrl: "https://lucastars.hbo-ict.cloud/media/028a6097ac954df188cea4cd66bbde3f/00000006000000000000000000000000.png",
        description: "You are a king, but you have gone missing. The people of your empire no longer believe you are the real deal. To prove yourself you must defeat the mad king of the enemy empire, to free his people from his tyranny and to marry the damsel of that castle.",
        price: "24.95"
    },

    {
        name: "Lost Girl",
        imageUrl: "https://lucastars.hbo-ict.cloud/media/3fcbea3f2e3b4818ba8e1b0584550df0/00000006000000000000000000000000.png",
        description: "You are in a hotel with your girlfriend. When you go to the lobby for snacks and return to your room, you discover that your girlfriend is gone!!!",
        price: "24.95"
    },

    {
        name: "Djunkie Trails",
        imageUrl: "https://lucastars.hbo-ict.cloud/media/ce6fccf2eedc4be793b7a03446e5db0b/00000006000000000000000000000000.png",
        description: "In Djunkie Trails you play as a junkie who has ended up in rehab. And your goal is to escape rehab and find an income and place to stay. And the game is best played in full screen mode as otherwise the text may not be visible. And good luck and have fun playing!",
        price: "24.95"
    },

    {
        name: "Realm of the Kings",
        imageUrl: "https://lucastars.hbo-ict.cloud/media/f0ca66315c884437b1f552105c75c0a8/00000006000000000000000000000000.png",
        description: "Our game is a text based adventure game set in the Middle Ages where you play the role of someone from the Kingsguard. In order to test the game as best as possible, you will have to figure out where to go after reading the story in the first room. There are several ways to find the solution, but the easiest way is not to leave the room. After that it's basically just following the storyline and reading the text. When all this is done you can still fight the final boss, which is very difficult to defeat. To do this you can buy health potions to restore your health to have a better chance against the final boss.",
        price: "24.95"
    },
    
  

    {
        name: "The Cave of Magic",
        imageUrl: "https://lucastars.hbo-ict.cloud/media/a1817eb437324b71b233be41587d1d8d/00000006000000000000000000000000.png",
        description: "Introduction This is the cave of magic! Controls. Just click things. Get into the cave of magic, by any means necessary.",
        price: "24.95"
    },

    {
        name: "Realm of Enigma | Chronicles of Time",
        imageUrl: "https://lucastars.hbo-ict.cloud/media/0d30bd2354d64d8b908ed3c44b02e74e/00000006000000000000000000000000.png",
        description: "Introductie In Realm of Enigma ga je als Aric Stormrider op avontuur om het lot van een mysterieuze legendarische magir te ontrafelen! Tijdens je avontuur zullen er steeds meer karakters bij jouw avontuur aansluiten. We wensen jullie veel speel plezier! Team MediBit",
        price: "24.95"
    },

    {
        name: "Lost in Dissonance",
        imageUrl: "https://lucastars.hbo-ict.cloud/media/24b2a08e25ca4c87b21e332b182db68f/00000006000000000000000000000000.png",
        description: "Lost in Dissonance is an immersive text-based adventure game where your imagination sets the boundaries. In this game you are taken on a journey through an enigmatic world, where every choice can change the course of your story. As you navigate this world full of strange wonders and hidden dangers, your decisions will determine whether you remain lost in the dissonance or find the harmony to discover your way home.\nIn this game, you are the hero of your own story, with the power to shape the world around you through your choices and actions. Every path you take, every decision you make, has its own unique consequences, making your adventure different every time you play. Lost in Dissonance is not just a game; it's an invitation to explore an unknown world, test yourself against the challenges that arise, and ultimately unravel the mystery behind the dissonance. Are you ready to lose yourself in this adventure and discover what it really takes to be found again? Step inside Lost in Dissonance and let the adventure begin!",
        price: "24.95"
    },

    {
        name: "Oblivion",
        imageUrl: "https://lucastars.hbo-ict.cloud/media/3d82e7989db04709b6444d17ebab5df3/00000006000000000000000000000000.png",
        description: "Welcome to Oblivion, a point and click puzzle adventure game. In Oblivion, you start off waking up in a forest. You dont remember anything at all. You have to navigate your way through the forest to then find a piece of stone that opens a portal to the castle.Once you get to the castle entrance, you get more information about who you are and what happened. Afterwards you pass out, wake up in the throne room, get a quest from the king, and this is when the game actually starts.At this point you must navigate through the castle, going back and forth through the rooms to solve puzzles. At the end of each puzzle you get the opportinity to find a piece of a stone, 3 of which you'll need to unlock the hidden door. Behind here is the good ending! (Beware, there are a few bad endings aswell!) Enjoy!",
        price: "24.95"
    },

   

    {
        name: "Lost lands",
        imageUrl: "https://lucastars.hbo-ict.cloud/media/4b920de079414dec8df411e94f771bf0/00000006000000000000000000000000.png",
        description: "Lost lands A text-based game with a fun storyline and various functionality. Functionality: Save system. Authentication system. Separate inventory Nice storyline",
        price: "24.95"
    },

    {
        name: "The Ancient Quest of Infinity",
        imageUrl: "https://lucastars.hbo-ict.cloud/media/229f314470944332b2e5b14c948639a8/00000006000000000000000000000000.png",
        description: "Can you break the barrel?",
        price: "24.95"
    },

    {
        name: "On the run",
        imageUrl: "https://lucastars.hbo-ict.cloud/media/313c8fd459d4481e8b6cc05a5294e5f5/00000006000000000000000000000000.png",
        description: "Forge your fate Embark on a journey as a babysitter. While babysitting you encounter the most horrendous of things",
        price: "24.95"
    },

    {
        name: "Into The Shadows",
        imageUrl: "https://lucastars.hbo-ict.cloud/media/bcdbd5fb411244749e2ca67152d3b394/00000006000000000000000000000000.jpg",
        description: "Welcome to Into the Shadows, a gripping narrative text-based adventure game where you take on the role of Alex, A 34-year-old man, on a journey with his daughter, Emily. After a rough divorce, Alex and Emily look to reconnect with one another by going on a road trip visiting Alexs parents in the town called Havenwood.During the adventure you'll unravel mysteries, confront past mistakes, and navigate challenges that test the strength of your bond. Get ready for an immersive experience where every choice matters as you delve into the shadows of Alexs past. Are you prepared to face what lies ahead?",
        price: "24.95"
    },

    {
        name: "The Tower",
        imageUrl: "https://lucastars.hbo-ict.cloud/media/2b1fd6f0e0974b51987cdc371e247567/00000006000000000000000000000000.png",
        description: "In the Tower you go on an exciting adventure. You make your way through the tower by solving various puzzles and answering riddles. Will you manage to get the treasure?",
        price: "24.95"
    },

    
    {
        name: "Deep Clean",
        imageUrl: "https://lucastars.hbo-ict.cloud/media/39c81135eb484da68dae305124d2ba20/00000006000000000000000000000000.png",
        description: "Deep Clean is a game about a cleaner (Oscar) who accidentally falls into a dumpster. He then ends up in a secret laboratory deep underground. He must then escape through puzzles.",
        price: "24.95"
    },
    
    {
        name: "Kingdom Conquest",
        imageUrl: "https://lucastars.hbo-ict.cloud/media/c1a6ee35cdb4477e87643e7b4a1c9262/00000006000000000000000000000000.png",
        description: "You wake up behind bars, with no idea of what happened until one of the guards mentions that one of his friends is trapped in the forest.Upon hearing this, you begin to piece together what has occurred. In this story, you seek revenge on the person who captured us, with the friends you may meet along the way.",
        price: "24.95"
    },

    {
        name: "That Time I Got A Bad Grade On My Scorion Form And Built A Nuke From Scratch To Blow Up The School",
        imageUrl: "https://lucastars.hbo-ict.cloud/media/80d5a5c49df1423ea71dcb25faff50fe/00000006000000000000000000000000.png",
        description: "Story The title says it all! You just got a terrible assessment on your scorion form from the legally distinct HVB school. This results in a search throughout the school to find parts for the ultimate payback. After the opening sequence, the game is completely non-linear, you can visit all the rooms whenever you want and solve a scattered web of puzzles. Style In this classic text adventure game there are no fancy buttons and interfaces, you do everything with an autocomplete-assisted text prompt! Don't worry, we've built in a strong tutorial to explain some specific quirks of the UX. Good for you, you rascals.",
        price: "24.95"
    },

    {
        name: "Quest of Valor: The Towers Secret",
        imageUrl: "https://lucastars.hbo-ict.cloud/media/822513d3cbb74195bd8f021d0bf36bca/00000006000000000000000000000000.png",
        description: "Quest of Valor: The Towers Secret is a text-based adventure game. The objective of this game is to free the princess. You will have to fight against all sorts of bosses to get all of the 5 keys to unlock the final, and last room.",
        price: "24.95"
    },


    {
        name: "Escape!",
        imageUrl: "https://lucastars.hbo-ict.cloud/media/5a1f8a096ff042f98e7d3217b98f65a1/00000006000000000000000000000000.png",
        description: "Will you stay out of Bob and Laura's hands???",
        price: "24.95"
    },


    {
        name: "De Legende Van De Minotaurus",
        imageUrl: "https://lucastars.hbo-ict.cloud/media/9ea4b3ffaf1e4cd9889028fbee77ee6a/00000006000000000000000000000000.jpeg",
        description: "De Legende Van De Minotaurus",
        price: "24.95"
    },

    
    {
        name: "Ambigious Darkness",
        imageUrl: "https://lucastars.hbo-ict.cloud/media/8a3e37c0662b402486a203f502087f64/00000006000000000000000000000000.png",
        description: "The eerie stillness of Blackwood Manor PLAY IN FULL SCREEN",
        price: "24.95"
    },

    {
        name: "City of Shadows: McCarthys Confrontation",
        imageUrl: "https://lucastars.hbo-ict.cloud/media/91003cbe0cdb4f318577ce456b5b43c8/00000006000000000000000000000000.jpg",
        description: "City of Shadows: McCarthy's Confrontation! Play as veteran detective John Manny and his assistant William McCarthy as they pursue the Boston Mutilator serial killer to finally stop him.",
        price: "24.95"
    },

    {
        name: "Tanner de Virus Scanner",
        imageUrl: "https://lucastars.hbo-ict.cloud/media/328165035bc543ed851ea38e76053bf4/00000006000000000000000000000000.png",
        description: "Welcome to the Tanner the Virus Scanner game page! The game is a retro game that takes place in a computer, specifically its components (CPU, GPU, motherboard, RAM, hard drive, etc.). You play a text-based adventure game about a virus-scan warrior named Tanner, who has to work through a virus-infected computer to destroy all viruses and make the computer virus-free.",
        price: "24.95"
    },

    {
        name: "Knight Quest",
        imageUrl: "https://lucastars.hbo-ict.cloud/media/38aea6acacbf402596986385721ee44a/00000006000000000000000000000000.png",
        description: "A game in a medieval setting where you search for a princess.",
        price: "24.95"
    },

    


    {
        name: "Last Night at HvA",
        imageUrl: "https://lucastars.hbo-ict.cloud/media/2c99e2c371c04db09a45e1af2666384d/00000006000000000000000000000000.png",
        description: "Will you be able to get an Op Level? Solve the mysteries of the HvA and find out!",
        price: "24.95"
    },

    {
        name: "The Nutty Putty Cave",
        imageUrl: "https://giipuucoofuu33-pb3b2324.hbo-ict.cloud/",
        description: "Journey into Darkness consists of six levels, where the player must try to reach the end room using the items that John Edward Jones finds in the cave.",
        price: "24.95"
    },

    {
        name: "Escape or Die",
        imageUrl: "https://dev-zooqiizuuxoo43-pb3a2324.hbo-ict.cloud/",
        description: "",
        price: "24.95"
    },



    {
        name: "The Lords Journey to Ragnarok",
        imageUrl: "",
        description: "",
        price: "24.95"
    },

    {
        name: "Castle escape",
        imageUrl: "https://coozaatooyaa12-pb3a2324.hbo-ict.cloud/",
        description: "",
        price: "24.95"
    },




   
    
];

private cart: Map<Product, number> = new Map(); // Hier houden we het winkelwagentje bij

    public static styles: CSSResult = css`
        /* Voeg hier je CSS-stijlen toe voor de "Product Page"-pagina */

       /* Standaard stijlen */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Arial';
}

body {
    font-family: 'Inter', sans-serif;
    margin: 0;
    padding: 0;
}

.wrapper {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

/* Navigatiestijlen */
.navbar {
    background-color: #fff;
    padding: 10px 20px;
    display: flex;
    align-items: center;
}

.navbar-logo img {
    height: 50px;
}

.navbar-links {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
}

.navbar-links li {
    margin-right: 20px;
}

.navbar-links a {
    text-decoration: none;
    color: rgb(18, 26, 132);
    transition: color 0.3s ease;
}

.navbar-links a:hover {
    color: #ecae20;
}

.nav-search {
    margin-left: auto;
}

.search-bar {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
    transition: border-color 0.3s ease;
}

.search-bar:focus {
    outline: none;
    border-color: #ecae20;
}

/* Productsectiestijlen */
.product-section {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 20px;
}

.product {
    width: 30%;
    margin-bottom: 20px;
    background-color: #f9f9f9;
    padding: 10px;
    border-radius: 5px;
}

.product img {
    width: 100%;
    border-radius: 5px;
    margin-bottom: 10px;
}

.buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    margin-top: 10px;
}

.more-info-button,
.add-to-cart-button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 10px;
}

.more-info-button {
    background-color: rgb(18, 26, 132);
    color: #fff;
}

.add-to-cart-button {
    background-color: red;
    color: #fff;
    margin-top: 10px;
}

.add-to-cart-button:hover {
    background-color: #555;
}

/* Footerstijlen */
footer {
    background-color: rgb(18, 26, 132);
    color: #fff;
    padding: 20px;
    text-align: center;
}

.footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.footer-section {
    flex: 1;
    border-right: 1px solid white;
}

.footer-section ul {
    list-style: none;
    padding: 0;
}

.footer-section ul li {
    margin-bottom: 10px;
}

.footer-section ul li a {
    color: #ecae20;
}

.social-icons img {
    width: 40px;
    height: auto;
    margin-right: 10px;
}

.product-filter {
    list-style-type: none;
    padding: 0;
    margin: 20px 0;
    display: flex;
}

.filter-option {
    margin-right: 10px;
}

.filter-option a {
    text-decoration: none;
    padding: 5px 10px;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    color: rgb(18, 26, 132);
}

.filter-option a.selected {
    background-color: rgb(18, 26, 132);
    color: #fff;
}

.filter-option a:hover {
    background-color: #f0f0f0;
}

.product-description {
    display: none;
}

/* Media query voor tablets */
@media only screen and (max-width: 1024px) {
    .product {
        width: 45%;
    }

    .footer-section {
        flex-basis: 50%;
    }
}

/* Media query voor telefoons */
@media only screen and (max-width: 600px) {
    .product {
        width: 100%;
    }

    .footer-content {
        flex-direction: column;
    }

    .footer-section {
        flex: none;
        border-right: none;
        margin-bottom: 20px;
    }
}


a {
  text-decoration: none;
  display: inline-block;
  padding: 8px 16px;
}

a:hover {
  background-color: #ddd;
  color: black;
}

.previous {
  background-color: red;
  color: white
}

.next {
  background-color: red;
  color: white;
}

.round {
  border-radius: 50%;
}

    `;

    private addNextPageProducts(): void {
        const startIndex: number = this.currentPage * this.productsPerPage;
        const endIndex: number = startIndex + this.productsPerPage;
        const nextProducts: Product[] = this.products.slice(startIndex, endIndex);
        this.products = [...this.products, ...nextProducts];
    }

    

    private addToCart(product: Product): void {
        const currentQuantity:any = this.cart.get(product) || 0;
        this.cart.set(product, currentQuantity + 1); // Voeg één exemplaar van het product toe
    
        // Sla de inhoud van het winkelwagentje op in de sessie
        sessionStorage.setItem("cart", JSON.stringify(Array.from(this.cart.entries())));
    
        this.requestUpdate(); // Herbouw de weergave om de veranderingen te tonen
    }


    protected render(): TemplateResult {

        const startIndex: number = (this.currentPage - 1) * this.productsPerPage;
        const endIndex: number = startIndex + this.productsPerPage;
        const productsToShow: Product[] = this.products.slice(startIndex, endIndex);
        const totalPrice: any = Array.from(this.cart.entries()).reduce((total, [product, quantity]) => {
            return total + (parseFloat(product.price) * quantity);
        }, 0);
        const cartItems: any = Array.from(this.cart.entries()).map(([product, quantity]) => html`
        <li>${product.name} - € ${product.price} x ${quantity}
        <button @click=${(): any => this.removeFromCart(product)}> Remove </button>
    </li>
    `);
        // Navbar & Filters HTML

        return html`
            <div class="wrapper">
            <button onclick="window.location.href='index.html'">Back to Homepage</button>
                <nav class="navbar">
                    <div class="navbar-logo">
                        <a href="#">
                            <img src="/assets/img/logo.png" alt="Logo" class="logo">
                        </a>
                    </div>
                    <ul class="navbar-links">
                        <li><a href="product.html" class="selected">Games</a></li>
                        <li><a href="#">Merchandise</a></li>
                        <li><a href="#">News</a></li>
                    </ul>
                    <form class="nav-search">
                        <input type="text" placeholder="Search" class="search-bar">
                    </form>
                </nav>

                <ul class="product-filter">
                    <li><span class="filter-title">Filter: </span></li>
                    <li class="filter-option"><a href="#">Genre</a></li>
                    <li class="filter-option"><a href="#" class="selected">Rating</a></li>
                    <li class="filter-option"><a href="#">Name</a></li>
                    <li class="filter-option"><a href="#">Price</a></li>
                    <li class="filter-option"><a href="#">Offers</a></li>
                </ul>

                <section class="cart-section">
                <h2>Shoppingcart</h2>
                <ul>
                    ${cartItems}
                </ul>
                <p><strong>Total: € ${totalPrice.toFixed(2)}</strong></p>
                <button @click=${this.goToCheckout}>Order</button>
                <button @click=${this.emptyCart}>Empty cart</button>
            </section>
        <section class="product-section">
                    ${productsToShow.map(product => html`
                        <div class="product">
                            <img src="${product.imageUrl}" alt="${product.name}">
                            <div class="buttons">
                                <button class="more-info-button">More info</button>
                                <div class="product-details">
                                    <h3>${product.name}</h3>
                                    <br>
                                    <p class="product-description">${product.description}</p>
                                </div>
                                <div> 
                                    <span class="base-price">€ ${product.price}</span>
                                    <button class="add-to-cart-button" @click=${(): void => this.addToCart(product)}>In cart</button>
                                </div>
                            </div>
                        </div>
                    `)}
                </section>



                 <!-- Paginatieknoppen -->
                 <div class="pagination">
                    <a href="#" class="previous" @click=${this.navigateToPrevious}>&laquo; Previous</a>
                    <a href="#" class="next" @click=${this.navigateToNext}>Next &raquo;</a>
                </div>
            </div>
            </div>

            <footer>
                <div class="footer-content">


                    <!-- Footer content gaat hier -->
                    <div class="footer-section">
                        <h3>Contact</h3>
                        <ul>
                            <li>Adres: Amstelcampus, Wibautstraat 3b, 1091 GH Amsterdam</li>
                            <li>Telefoon: +31 6 12345678</li>
                            <li>E-mail: info@lucastart.nl</li>
                        </ul>
                    </div>

                    <div class="footer-section">
                        <h3>We are happy to help you</h3>
                        <ul>
                            <li><a href="/shipping">Shipping</a></li>
                            <li><a href="/returns">Returns</a></li>
                        </ul>
                    </div>

                    <div class="footer-section">
                        <h3>About Us</h3>
                        <ul>
                            <li><a href="/AboutUs">About us</a></li>
                        </ul>
                    </div>

                    <div class="footer-section">
                        <h3>Follow us</h3>
                        <ul class="social-icons">
                            <li>
                                <a href="#"><img src="/assets/img/fb.png" alt="Facebook" /></a>
                            </li>
                            <li>
                                <a href="#"><img src="/assets/img/insta.png" alt="Instagram" /></a>
                            </li>
                            <li>
                                <a href="#"><img src="/assets/img/x.png" alt="Twitter" /></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        `;
    }

    // Deze methode navigeert naar de vorige pagina met producten.
    // Het controleert eerst of de huidige pagina groter is dan 1.
    // Als dit het geval is, wordt de huidige pagina met 1 verminderd
    // en wordt de weergave opnieuw opgebouwd om de nieuwe pagina te tonen.

    private navigateToPrevious(): void {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.requestUpdate(); // Herbouw de weergave om de nieuwe pagina te tonen
        }
    }

    

    // Deze methode navigeert naar de volgende pagina met producten.
    // Het berekent eerst het totale aantal pagina's op basis van het aantal producten en producten per pagina.
    // Als de huidige pagina kleiner is dan het totale aantal pagina's,
    // wordt de huidige pagina met 1 verhoogd en worden de producten voor de nieuwe pagina toegevoegd.
    // Vervolgens wordt de weergave opnieuw opgebouwd om de nieuwe pagina te tonen.


    private navigateToNext(): void {
        const totalPages: number = 5; 
        Math.ceil(this.products.length / this.productsPerPage);
        if (this.currentPage < totalPages) {
            this.currentPage++;

             // Voeg nieuwe producten toe voordat je de weergave bijwerkt
             this.addNextPageProducts();

            this.requestUpdate(); // Herbouw de weergave om de nieuwe pagina te tonen
        }  else {
            // De huidige pagina is de laatste pagina, dus doe niets
            console.log("Dit is de laatste pagina. Kan niet verder gaan.");
        }

    }

    private emptyCart(): void {
        this.cart.clear(); // Maak het winkelwagentje leeg

        // Verwijder het winkelwagentje uit de sessie
        sessionStorage.removeItem("cart");
    
        this.requestUpdate(); // Herbouw de weergave om de veranderingen te tonen
    }
    
    private removeFromCart(product: Product): void {
        const currentQuantity: any = this.cart.get(product) || 0;
        if (currentQuantity > 1) {
            this.cart.set(product, currentQuantity - 1); // Verwijder één exemplaar van het product
        } else {
            this.cart.delete(product); // Verwijder het product volledig als er nog maar één exemplaar van is
        }
        sessionStorage.setItem("cart", JSON.stringify(Array.from(this.cart.entries())));
        
        this.requestUpdate(); // Herbouw de weergave om de veranderingen te tonen
    }

    private goToCheckout(): void {

        window.location.href = "checkOut"; // Navigeer naar de bestelpagina
    }

    protected firstUpdated(): void {
        const storedCart:any = sessionStorage.getItem("cart");
    if (storedCart) {
        this.cart = new Map(JSON.parse(storedCart));
        this.requestUpdate(); // Herbouw de weergave om de winkelwagen bij te werken
    }
        // eslint-disable-next-line @typescript-eslint/typedef
        const shadowRoot = this.shadowRoot;
        if (shadowRoot) {
            const moreInfoButtons: NodeListOf<HTMLButtonElement> | null = shadowRoot.querySelectorAll(".more-info-button");
    
            if (moreInfoButtons) {
                moreInfoButtons.forEach((button: HTMLButtonElement) => {
                    button.addEventListener("click", () => {
                        // eslint-disable-next-line @typescript-eslint/typedef
                        const productDetails = button.nextElementSibling;
                        if (productDetails) {
                            // eslint-disable-next-line @typescript-eslint/typedef
                            const productDescription = productDetails.querySelector(".product-description");
                            if (productDescription) {
                                // eslint-disable-next-line @typescript-eslint/typedef
                                const descriptionElement = productDescription as HTMLElement;
                                if (descriptionElement.style.display === "none" || !descriptionElement.style.display) {
                                    descriptionElement.style.display ="block";
                                } else {
                                    descriptionElement.style.display = "none";
                                }
                            }
                        }
                    });
                });
            }
        }
        
    }
 
    
}

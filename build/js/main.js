import { Loader } from './modules/loader.js';
import { Header } from './modules/header.js';
import { Reveal } from './modules/reveal.js';
import { Active } from './modules/scrollActive.js'; 
import { Spotlight } from './modules/spotlight.js';
import { Progress } from './modules/progressBar.js';

const header = Header();
Active(header);
Reveal();
Spotlight();
Progress();
Loader();

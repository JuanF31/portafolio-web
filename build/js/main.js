import { Loader } from './modules/loader.js';
import { Header } from './modules/header.js';
import { Reveal } from './modules/reveal.js';
import { Active } from './modules/scrollActive.js'; 
import { Spotlight } from './modules/spotlight.js';
import { Progress } from './modules/progressBar.js';
import { Writer } from './modules/textChange.js';
import { Top } from './modules/toTop.js';
import { Copy } from './modules/copy.js';

const header = Header();
Active(header);
Reveal();
Spotlight();
Progress();
Writer();
Top();
Copy();
Loader();

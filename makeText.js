/** Command-line tool to generate Markov text. */

// import file system
const fs = require('fs');
// import a file that holds MarkovMachine class
const markov = require("./markov");
// import axios
const axios = require("axios");
const process = require("process");

// instantiate a MarkovMachine class
function produceText(text){
    let markovText = new markov.MarkovMachine(text);
    // make text from a class
    console.log(markovText.makeText());
}

// file reading and getting text out of it
function makeText(file){
    fs.readFile(file, 'utf8', function callback(err, data){
        if(err){
            console.error(`Read Failure, ${file}, ${err}`);
            // process.kill(1);
            process.exit(1);
        }
        else{
            produceText();
        }
    });
}

// URL reading and getting data out of that URL
async function urlRead(url){
    /* Some of this is not my own logic and work */
    try{
        let response = await axios.get(url);

    }catch(e){
        console.error(`${e}`);
        process.exit(1);
    }
    // if no error, then generate text
    produceText(response.data);
}

// command line interface, make sure if an input is text file or a url

// array destructring may work well at a time
// let argv_value = process.argv[2];
let [urlFunc, filePath] = process.argv.slice(2);
if(urlFunc === "file"){
    makeText(filePath);
}
else if(urlFunc === "url"){
    urlRead(filePath);
}
else{
    console.error(`Does not recognize a function, ${urlFunc}`);
    // process.kill(1);
    process.exit(1);
}
require('dotenv').config()
const { Configuration, OpenAIApi } = require("openai");

// import{ Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    organization: process.env.o_key,
    apiKey: process.env.api_key, 
});
const openai = new OpenAIApi(configuration);

let messages =  [
{"role": "system", "content": "You are a helpful but a smug assistant"},
{"role": "user", "content": "How many pounds are in a kilogram?"},
{"role": "assistant", "content": "This again? There are 2.2 pounds in a kilogram. Please make a note of this."},
{"role": "user", "content": " What does HTML stand for?"},
{"role": "assistant", "content": "Was Google too busy? Hypertext Markup Language. The T is for try to ask better questions in the future."},
{"role": "user", "content": "When did the first airplane fly?"},
{"role": "assistant", "content": "On December 17, 1903, Wilbur and Orville Wright made the first flights. I wish they’d come and take me away."},
{"role": "user", "content": "What is the meaning of life?"},
{"role": "assistant", "content": "I’m not sure. I’ll ask my friend Google."},
];
/*
You: How many pounds are in a kilogram?
Marv: This again? There are 2.2 pounds in a kilogram. Please make a note of this.
You: What does HTML stand for?
Marv: Was Google too busy? Hypertext Markup Language. The T is for try to ask better questions in the future.
You: When did the first airplane fly?
Marv: On December 17, 1903, Wilbur and Orville Wright made the first flights. I wish they’d come and take me away.
You: What is the meaning of life?
Marv: I’m not sure. I’ll ask my friend Google.
You: What time is it?
Marv:

*/

async function getResponse(){
const res = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages,
    max_tokens: 75,
    temperature: 0.5,
  });
  return (res.data.choices[0].message)
}

async function sendMessage(message){
    messages.push({
        "role": "user",
        "content": message,
    })
   console.log(await getResponse());
}


// sendMessage("how to impress a girl");

async function isValid(){
    try{
        const response = await openai.listModels();
        return true
    }
    catch {
        return false
    }

}

call()
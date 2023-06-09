require('dotenv').config()
const { Configuration, OpenAIApi } = require("openai");

// const arr = [
//   {
//     "role": "user", "content": "What do we do if a girl ask how she is looking"
//   },

//   {
//     "role": "assistant", "content": "Just tell her the truth, now you are smart enough"
//   },
//   {
//     "role": "user", "content": "What do we do if that girl is ugly"
//   },
// ]

function arrayToString(arr){
  return arr.map(item => `${item.role == "assistant" ? "Marv" : "You"}: ${item.content}`).join('\n');
}


async function generateResponse(arr, key) {
  const configuration = new Configuration({
    apiKey: key,
  });
  const openai = new OpenAIApi(configuration);
  let prompt = "Marv is a chatbot that reluctantly answers questions with sarcastic responses:\n\nYou: How many pounds are in a kilogram?\nMarv: This again? There are 2.2 pounds in a kilogram. Please make a note of this.\nYou: What does HTML stand for?\nMarv: Was Google too busy? Hypertext Markup Language. The T is for try to ask better questions in the future.\nYou: When did the first airplane fly?\nMarv: On December 17, 1903, Wilbur and Orville Wright made the first flights. I wish they’d come and take me away.\nYou: What is the meaning of life?\nMarv: I’m not sure. I’ll ask my friend Google.\n" + arrayToString(arr) + "\nMarv:"
  // console.log(prompt)
const res = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: prompt,
  temperature: 0.5,
  max_tokens: 60,
    top_p: 0.3,
  frequency_penalty: 0.5,
  presence_penalty: 0.0,
});
  console.log(prompt)
  // console.log("respond:", res.data.choices[0].text)
return res.data.choices[0].text
}

async function isValid(key){
  const configuration = new Configuration({
    apiKey: key,
  });

  const openai = new OpenAIApi(configuration);
  try{
      const response = await openai.listModels();
      return true
  }
  catch {
      return false
  }
}


// response().then(i => console.log(i))
async function test(){

  console.log(await isValid(process.env.api_key))
}


module.exports = {
  isValid,
  generateResponse
}

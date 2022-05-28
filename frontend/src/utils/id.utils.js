// generate id using name
const text = "Pacific Institute of Technology";

const createId = (inputString) => {
  for (let i of inputString.split(" ")) {
    console.log(i[0]);
  }
};

createId(text);

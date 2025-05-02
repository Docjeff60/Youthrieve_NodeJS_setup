const express = require("express");

const app = express();

//Middleware: is the function that runs in the middle from the point when the request is made to the point
//where the API accepts the request.
//Body Parser
//middleware to parse JSON bodies
app.use(express.json());  //enables the backend to see whatever is passed 

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`server started running... ${PORT}`); 
});


const drugs = [

  { id: 1, name: "Amoxicillin", category: "Antibiotic", dosageMg: 500, isPrescriptionOnly: true, stock: 120, manufacturer: "Pfizer" },
 
  { id: 2, name: "Paracetamol", category: "Analgesic", dosageMg: 1000, isPrescriptionOnly: false, stock: 200, manufacturer: "GSK" },
 
  { id: 3, name: "Ibuprofen", category: "Analgesic", dosageMg: 400, isPrescriptionOnly: false, stock: 150, manufacturer: "Bayer" },
 
  { id: 4, name: "Chloroquine", category: "Antimalarial", dosageMg: 250, isPrescriptionOnly: true, stock: 80, manufacturer: "Sanofi" },
 
  { id: 5, name: "Ciprofloxacin", category: "Antibiotic", dosageMg: 500, isPrescriptionOnly: true, stock: 70, manufacturer: "Pfizer" },
 
  { id: 6, name: "Loratadine", category: "Antihistamine", dosageMg: 10, isPrescriptionOnly: false, stock: 160, manufacturer: "Novartis" },
 
  { id: 7, name: "Metformin", category: "Antidiabetic", dosageMg: 850, isPrescriptionOnly: true, stock: 140, manufacturer: "Teva" },
 
  { id: 8, name: "Artemether", category: "Antimalarial", dosageMg: 20, isPrescriptionOnly: true, stock: 60, manufacturer: "Roche" },
 
  { id: 9, name: "Aspirin", category: "Analgesic", dosageMg: 300, isPrescriptionOnly: false, stock: 180, manufacturer: "Bayer" },
 
  { id: 10, name: "Omeprazole", category: "Antacid", dosageMg: 20, isPrescriptionOnly: true, stock: 90, manufacturer: "AstraZeneca" },
 
  { id: 11, name: "Azithromycin", category: "Antibiotic", dosageMg: 250, isPrescriptionOnly: true, stock: 50, manufacturer: "Pfizer" },
 
  { id: 12, name: "Cetirizine", category: "Antihistamine", dosageMg: 10, isPrescriptionOnly: false, stock: 110, manufacturer: "Novartis" },
 
  { id: 13, name: "Insulin", category: "Antidiabetic", dosageMg: 100, isPrescriptionOnly: true, stock: 30, manufacturer: "Novo Nordisk" },
 
  { id: 14, name: "Artemisinin", category: "Antimalarial", dosageMg: 100, isPrescriptionOnly: true, stock: 50, manufacturer: "GSK" },
 
  { id: 15, name: "Codeine", category: "Analgesic", dosageMg: 30, isPrescriptionOnly: true, stock: 20, manufacturer: "Teva" },
 
  { id: 16, name: "Vitamin C", category: "Supplement", dosageMg: 500, isPrescriptionOnly: false, stock: 300, manufacturer: "Nature’s Bounty" },
 
  { id: 17, name: "Ranitidine", category: "Antacid", dosageMg: 150, isPrescriptionOnly: false, stock: 90, manufacturer: "Sanofi" },
 
  { id: 18, name: "Doxycycline", category: "Antibiotic", dosageMg: 100, isPrescriptionOnly: true, stock: 40, manufacturer: "Pfizer" },
 
  { id: 19, name: "Tramadol", category: "Analgesic", dosageMg: 50, isPrescriptionOnly: true, stock: 45, manufacturer: "Teva" },
 
  { id: 20, name: "Folic Acid", category: "Supplement", dosageMg: 5, isPrescriptionOnly: false, stock: 250, manufacturer: "Nature’s Bounty" }
 
 ];

//APIs

app.get("/", (req,res) => {
    res.json({message: "Welcome to my API"})
});


//QUESTION 1:
//1. GET /drugs/antibiotics
//Return all drugs where category is "Antibiotic".

app.get("/drugs/antibiotics", (request, response) => {
  const getAntibiotics = drugs.filter(drug => drug.category === "Antibiotic");
  
  response.json(getAntibiotics)
})





//QUESTION 2:
//2.GET /drugs/names
//Return an array of all drug names converted to lowercase.

app.get("/drugs/name_lowercase", (req, res) => {
  const getDrugsLowercase = drugs.map(drug => drug.name.toLowerCase());

  res.json(getDrugsLowercase)
})





//QUESTION 3:
//3.POST /drugs/by-category
//Accept a category in the body and return all drugs under that category.
//Example body: { "category": "Antibiotic" }

app.post("/drugs/by-category", (req, res) => {
  //extract the category from request body
  const thecategory = req.body.category;

  //filter drugs by the requested category
  const drugsbycategory = drugs.filter(drug => drug.category === thecategory);
  
  //return response with filtered drugs
  res.json({
    message: `Found ${drugsbycategory.length} drugs in category: ${thecategory}`,
    drugs: drugsbycategory
  })
})







//QUESTION 4:
//4.GET /drugs/names-manufacturers
//Return an array of objects showing each drug’s name and manufacturer.


app.get("/drugs/names-manufacturers", (req, res) => {
  const namesAndManuf = drugs.map((drug) => {
    return {
      name: drug.name,
      manufacturer: drug.manufacturer
    };
  });
  res.json(namesAndManuf)
});





//QUESTION 5:
//5.GET /drugs/prescription
//Return all drugs where isPrescriptionOnly is true.

app.get("/drugs/prescription", (req, res) => {
  const drugsWithPrescription = drugs.filter(drug => drug.isPrescriptionOnly === true);

  res.json({
    message: `Found ${drugsWithPrescription.length} prescription-only drugs`,
    drugs: drugsWithPrescription
  });
});








//QUESTION 6:
//6. GET /drugs/formatted
//Return a new array where each item is a string like:
//"Drug: [name] - [dosageMg]mg"

app.get("/drugs/formatted", (req, res) => {
  const drugDosage = drugs.map(drug => `Drug: ${drug.name} - ${drug.dosageMg}mg`);

  res.json(drugDosage)
})





//QUESTION 7:
//7.GET /drugs/low-stock
//Return all drugs where stock is less than 50.







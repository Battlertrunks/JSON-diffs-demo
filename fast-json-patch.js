import * as jsonpatch from 'fast-json-patch/index.mjs';
// import { applyOperation } from 'fast-json-patch/index.mjs';

let document = { firstName: "Albert", contactDetails: { phoneNumbers: [] } };

const patch = [
  { op: "replace", path: "/firstName", value: "Joachim" },
  { op: "add", path: "/lastName", value: "Wester" },
  { op: "add", path: "/contactDetails/phoneNumbers/0", value: { number: "555-123" }  }
];

document = jsonpatch.applyPatch(document, patch).newDocument;
console.log(document, document.contactDetails);

// ------------------------------------------------------------------------------------------------
// Watches for changes on the object and generates patches based on the changes on the object.

var observeDocument = { firstName: "Joachim", lastName: "Wester", contactDetails: { phoneNumbers: [ { number:"555-123" }] } };
var observer = jsonpatch.observe(observeDocument);
observeDocument.firstName = "Albert";
observeDocument.contactDetails.phoneNumbers[0].number = "123";
observeDocument.contactDetails.phoneNumbers.push({ number:"456" });
let observePatch = jsonpatch.generate(observer, true);

// Log of the changes ready to be generated into a patch
console.log('------------------------------------------------------------------------- \n Observe Demo:\n')
console.log(observePatch);
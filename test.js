let fields = ["username", "password", "role", "email"];
let place = ["Username?", "Password?", "Role?", "Email?"];

const inputCard = {
  $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
  type: "AdaptiveCard",
  version: "1.0",
  body: [
    {
      type: "TextBlock",
      text: "Please enter your details",
    },
    {
      type: "Input.Text",
      id: "firstName",
      placeholder: "What is your first name?",
    },
    {
      type: "Input.Text",
      id: "lastName",
      placeholder: "What is your last name?",
    },
    {
      type: "Input.Text",
      id: "email",
      placeholder: "What is your Email?",
    },
  ],
  actions: [
    {
      type: "Action.Submit",
      title: "Submit",
      data: {
        x: 13,
      },
    },
  ],
};
// {
//   "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
//   "type": "AdaptiveCard",
//   "version": "1.0",
//   "body": [
//     {
//       "type": "TextBlock",
//       "text": "Please enter your details"
//     },
//     {
//       "type": "Input.Text",
//       "id": "firstName",
//       "placeholder": "What is your first name?"
//     },
//     {
//       "type": "Input.Text",
//       "id": "lastName",
//       "placeholder": "What is your last name?"
//     },
//     {
//       "type": "Input.Text",
//       "id": "email",
//       "placeholder": "What is your Email?"
//     }

//   ],
//   "actions": [
//     {
//       "type": "Action.Submit",
//       "title": "Submit",
//       "data": {
//         "x": 13
//       }
//     }
//   ]
// }
const input = makeCard(fields, place);
function makeCard(fieldsArray, placeholdersArray) {
  const starttext = JSON.parse(`{
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "version": "1.0",
  "body": [
    {
      "type": "TextBlock",
      "text": "Please enter your details"
    },
    {
      "type": "Input.Text",
      "id": "firstName",
      "placeholder": "What is your first name?"
    },
    {
      "type": "Input.Text",
      "id": "lastName",
      "placeholder": "What is your last name?"
    },
    {
      "type": "Input.Text",
      "id": "email",
      "placeholder": "What is your Email?"
    }
 
  ],
  "actions": [
    {
      "type": "Action.Submit",
      "title": "Submit",
      "data": {
        "x": 13
      }
    }
  ]
}`);
  delete starttext.body[1];
  delete starttext.body[2];
  delete starttext.body[3];
  var i;
  for (i = 3; i < fieldsArray.length; i++) {
    starttext["body"].push({
      type: "Input.Text",
      id: fieldsArray[i],
      placeholder: placeholdersArray[i],
    });
  }
  console.log(starttext);
}

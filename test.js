module.exports = function makeCard(fieldsArray, placeholdersArray) {
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
  starttext.body.splice(1, starttext.body.length - 1);

  var i;
  for (i = 0; i < fieldsArray.length; i++) {
    starttext["body"].push({
      type: "Input.Text",
      id: fieldsArray[i],
      placeholder: placeholdersArray[i],
    });
  }
  console.log(starttext);
  return starttext;
};

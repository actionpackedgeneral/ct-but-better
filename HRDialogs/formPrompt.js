const { ActivityPrompt } = require("botbuilder-dialogs");

class FormPrompt extends ActivityPrompt {
  constructor(dialogId) {
    super(dialogId);
  }
  async onPrompt(context, array) {
    console.log(this);
    await context.sendActivity(array);
  }
  async validator() {
    return true;
  }
}
module.exports.FormPrompt = FormPrompt;

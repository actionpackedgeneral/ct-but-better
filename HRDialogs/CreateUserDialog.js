const {
  ComponentDialog,
  DialogTurnStatus,
  NumberPrompt,
  ChoicePrompt,
  TextPrompt,
  WaterfallDialog,
  ChoiceFactory,
  ListStyle,
} = require("botbuilder-dialogs");

class CreateUserDialog extends ComponentDialog {
  constructor(dialogId) {
    super(dialogId);
    let arr = ["rlamba", "HSS123456", "Developer", "d"];
    // Add control flow dialogs
    this.initialDialogId = "CreateUserWaterfall";
    this.addDialog(new TextPrompt("Username"));
    this.addDialog(new TextPrompt("Password"));
    this.addDialog(new TextPrompt("Role"));
    this.addDialog(new TextPrompt("Email"));

    this.addDialog(
      new WaterfallDialog("CreateUserWaterfall", [
        async (step) => {
          return await step.prompt("Username", "Please enter username?");
        },
        async (step) => {
          arr[0] = step.result;
          return await step.prompt("Password", "Password?");
        },
        async (step) => {
          arr[1] = step.result;
          return await step.prompt("Role", "Role?");
        },
        async (step) => {
          arr[2] = step.result;
          return await step.prompt("Email", "Email?");
        },
        async (step) => {
          arr[3] = step.result;
          let msg = `I have your mode of transport as ${arr[0]}`;
          msg += ".";
          var axios = require("axios");
          var btoa = require("btoa");
          let URL = `https://hss.cognitusconsulting.com:5200/sap/opu/odata/sap/ZCHAT_BOTS_SRV/CreateUserIdSet(JobRole=%27${arr[2]}%27,MailId=%27${arr[3]}%27)`;
          var config = {
            method: "get",
            url:
              "https://hss.cognitusconsulting.com:5200/sap/opu/odata/sap/ZCHAT_BOTS_SRV/CreateUserIdSet(JobRole='Developer',MailId='ramba@cognitus.one')",
            headers: {
              Authorization: "Basic " + btoa(`${arr[0]}:${arr[1]}`),
            },
          };
          let request = await axios.get(URL, config);
          // await step.context.sendActivity(`${JSON.stringify(request.body)}`);
          // console.log(JSON.stringify(request.data.d.UserExists));
          switch (JSON.stringify(request.data.d.UserExists)) {
            case '"X"':
              await step.context.sendActivity("User Already Exists");
              break;
            default:
              await step.context.sendActivity(request.data.d.UserExists);
              break;
          }
          return await step.endDialog();
        },
      ])
    );
  }
}
module.exports.CreateUserDialog = CreateUserDialog;

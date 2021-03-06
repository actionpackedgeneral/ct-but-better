const { ActivityHandler, CardFactory } = require("botbuilder");
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
var mc = (rmc = require("../test"));
const { FormPrompt } = require("./formPrompt");
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
    this.addDialog(new FormPrompt("fuck"));

    this.addDialog(
      new WaterfallDialog("CreateUserWaterfall", [
        // async (step) => {
        //   return await step.prompt("Username", "Please enter username?");
        // },
        // async (step) => {
        //   arr[0] = step.result;
        //   return await step.prompt("Password", "Password?");
        // },
        // async (step) => {
        //   arr[1] = step.result;
        //   return await step.prompt("Role", "Role?");
        // },
        async (step) => {
          let fields = ["username", "password", "role", "email"];
          let place = ["Username?", "Password?", "Role?", "Email?"];
          const inputCard = mc(fields, place);
          // const inputCard = {
          //   $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
          //   type: "AdaptiveCard",
          //   version: "1.0",
          //   body: [
          //     {
          //       type: "TextBlock",
          //       text: "Please enter your details",
          //     },
          //     {
          //       type: "Input.Text",
          //       id: "usrAPI",
          //       placeholder: "Username?",
          //     },
          //     {
          //       type: "Input.Text",
          //       id: "usrPas",
          //       placeholder: "Password?",
          //     },
          //     {
          //       type: "Input.Text",
          //       id: "Role",
          //       placeholder: "Role?",
          //     },
          //     {
          //       type: "Input.Text",
          //       id: "email",
          //       placeholder: "Email",
          //     },
          //   ],
          //   actions: [
          //     {
          //       type: "Action.Submit",
          //       title: "Submit",
          //       data: {
          //         x: 13,
          //       },
          //     },
          //   ],
          // };
          // arr[2] = step.result;

          if (step.context.activity.value) {
            // await step.context.sendActivity(
            //   `Name: ${step.context.activity.value.firstName}\n\n\n\nMobile Number: ${step.context.activity.value.lastName}\n\n\n\nEmail: ${step.context.activity.value.email}`
            // );
            let arr = [
              `${step.context.activity.value.usrAPI}`,
              `${step.context.activity.value.usrPas}`,
              `${step.context.activity.value.Role}`,
              `${step.context.activity.value.Email}`,
            ];

            arr[3] = step.result;
            let msg = `I have your mode of transport as ${arr[0]}`;
            msg += ".";
            var axios = require("axios");
            var btoa = require("btoa");
            let URL = `https://hss.cognitusconsulting.com:5200/sap/opu/odata/sap/ZCHAT_BOTS_SRV/CreateUserIdSet(JobRole=%27${arr[2]}%27,MailId=%27${arr[3]}%27)`;
            var config = {
              method: "get",
              url:
                "https://hss.cognitusconsulting.com:5200/sap/opu/odata/sap/ZCHAT_BOTS_SRV/CreateUserIdSet(JobRole='Developer',MailId='rlamba@cognitus.one')",
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
          }
          return await step.context.sendActivity({
            attachments: [CardFactory.adaptiveCard(inputCard)],
            inputHint: "expectingInput",
          });
        },
      ])
    );
  }
  // [Field1, Field2, Field3]
}
module.exports.CreateUserDialog = CreateUserDialog;

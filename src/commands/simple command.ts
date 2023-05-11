import type { CommandInteraction, Message } from "discord.js";
import {
  SimpleCommandMessage,
  SimpleCommandOption,
  SimpleCommandOptionType,
} from "discordx";
import { Discord, SimpleCommand, Slash } from "discordx";

@Discord()
export class Hello {
  @SimpleCommand()
  hi(command: SimpleCommandMessage): void {
    command.message.reply(`👋 ${command.message.member}`);
  }

  // make single handler for simple and slash command
  hello(command: CommandInteraction | Message): void {
    command.reply("World");
  }

  @SimpleCommand({ name: "hello" })
  simpleHello(command: SimpleCommandMessage): void {
    this.hello(command.message);
  }

  @Slash({ description: "hello", name: "hello" })
  slashHello(command: CommandInteraction): void {
    this.hello(command);
  }

  @SimpleCommand()
  async look(
    @SimpleCommandOption({ name: "name", type: SimpleCommandOptionType.String })
    username: string,
    command: SimpleCommandMessage
  ) {
    // check if the message is a reply
    if (command.message.type === 19) {
      if (!username) {
        command.message.reply("Please provide a username.");
        return;
      }
      command.message.delete();
      //The message that the user replied to
      const repliedMessage = await command.message.fetchReference();
      repliedMessage.reply(
        `Hey ${username}, ${command.message.member} thought you would be interested in this message :eyes:`
      );
    } else {
      command.message.reply("You didn't reply to a message.");
    }
  }
}

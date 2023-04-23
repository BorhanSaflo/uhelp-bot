import type { CommandInteraction, Message } from "discord.js";
import type { SimpleCommandMessage } from "discordx";
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
}

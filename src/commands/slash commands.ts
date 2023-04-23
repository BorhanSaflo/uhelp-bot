import type { CommandInteraction } from "discord.js";
import { Discord, Slash } from "discordx";

@Discord()
export class Commands {
  @Slash({ description: "Link To The Forum", name: "link" })
  async link(interaction: CommandInteraction): Promise<void> {
    await interaction.deferReply();
    interaction.editReply(
      `Hey ${interaction.user.username}, Here's the link to the forum: ${process.env.FORUM_LINK}`
    );
  }
}

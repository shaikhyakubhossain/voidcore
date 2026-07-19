export class ConversationTitleService {
  private static readonly MAX_LENGTH = 48;

  static generate(message: string): string {
    const title = message.replace(/\s+/g, " ").trim();

    if (title.length <= this.MAX_LENGTH) {
      return title;
    }

    return `${title.slice(0, this.MAX_LENGTH).trim()}...`;
  }
}

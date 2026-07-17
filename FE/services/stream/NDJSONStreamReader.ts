export class NDJSONStreamReader<T> {
  private readonly decoder = new TextDecoder();

  private buffer = "";

  async *read(
    reader: ReadableStreamDefaultReader<Uint8Array>,
  ): AsyncGenerator<T> {
    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      this.buffer += this.decoder.decode(value, {
        stream: true,
      });

      const lines = this.buffer.split("\n");

      this.buffer = lines.pop() ?? "";

      for (const line of lines) {
        if (!line.trim()) {
          continue;
        }

        yield JSON.parse(line) as T;
      }
    }

    if (this.buffer.trim()) {
      yield JSON.parse(this.buffer) as T;
    }
  }
}
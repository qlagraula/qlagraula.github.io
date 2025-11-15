import type { ShikiTransformer } from 'shiki';

const LANG_TO_FILENAME: Record<string, string> = {
  bash: 'Shell',
  css: 'CSS',
  html: 'HTML',
  js: 'JavaScript',
  json: 'JSON',
  plaintext: 'Plain Text',
  sh: 'Shell',
  shell: 'Shell',
  ts: 'TypeScript',
  tsx: 'TSX',
  typescript: 'TypeScript',
  yaml: 'YAML',
  zsh: 'Shell',
};

export function transformerCodeMetadata(): ShikiTransformer {
  return {
    pre(node) {
      const meta = this.options.meta?.__raw;

      if (meta == undefined) {
        const lang = this.options.lang;
        const defaultFilename = LANG_TO_FILENAME[lang];
        if (defaultFilename) {
          node.properties.dataFilename = defaultFilename;
        }
        return;
      }

      // If we have metadata, let's parse it
      const attributes = meta.split(/\s+/).filter(Boolean);
      const styles: string[] = [];
      let hasExplicitFilename = false;

      for (const attr of attributes) {
        const [key, value] = attr.split('=', 2);

        if (!key) {
          continue;
        }

        switch (key) {
          case 'file':
            node.properties.dataFilename = value;
            hasExplicitFilename = true;
            break;
          case 'start':
            styles.push(`--start-line: ${value}`);
            break;
          case 'numbers':
            this.addClassToHast(node, 'show-line-numbers');
            break;
        }
      }

      if (!hasExplicitFilename) {
        const lang = this.options.lang;
        const defaultFilename = LANG_TO_FILENAME[lang];
        if (defaultFilename) {
          node.properties.dataFilename = defaultFilename;
        }
      }

      if (styles.length > 0) {
        const existingStyle = (node.properties.style as string) || '';
        const separator =
          existingStyle && !existingStyle.endsWith(';') ? ';' : '';
        node.properties.style = existingStyle + separator + styles.join(';');
      }
    },
  };
}

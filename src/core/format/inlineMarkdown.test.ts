import { describe, it, expect } from 'vitest';
import { escapeHtml, multilineToHtml, inlineMarkdownToHtml } from './inlineMarkdown';

describe('inlineMarkdown', () => {
  it('escapes HTML entities', () => {
    expect(escapeHtml('<b>&"\'')).toBe('&lt;b&gt;&amp;&quot;&#x27;');
  });

  it('preserves newlines as <br>', () => {
    expect(multilineToHtml('a\nb')).toBe('a<br>b');
    expect(multilineToHtml('<x>\n&y')).toBe('&lt;x&gt;<br>&amp;y');
  });

  it('converts bold and italic after escaping', () => {
    expect(inlineMarkdownToHtml('**b** *i*')).toBe('<strong>b</strong> <em>i</em>');
  });

  it('combines markdown with newlines', () => {
    expect(inlineMarkdownToHtml('**a**\n*i*')).toBe('<strong>a</strong><br><em>i</em>');
  });

  it('does not let markdown smuggle raw HTML', () => {
    expect(inlineMarkdownToHtml('**<script>**')).toBe('<strong>&lt;script&gt;</strong>');
  });
});

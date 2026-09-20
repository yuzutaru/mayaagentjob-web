/**
 * Minimal inline-markdown formatter shared by the CV twin renderer
 * (`resumeTemplateRenderer.ts`) and the portfolio preview.
 *
 * Only bold (`**text**`) and italic (`*text*`) are supported. Input is
 * HTML-escaped first so the only markup in the output is the tags we inject —
 * user text can never smuggle raw HTML.
 *
 * `multilineToHtml` preserves line breaks for plain multiline fields (summary,
 * project/education descriptions) without enabling markdown there.
 *
 * Must stay byte-identical to `_multiline` / `_md_inline` in the backend
 * `resume_template_renderer.py`.
 */

export function escapeHtml(value: string | null | undefined): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

export function multilineToHtml(value: string | null | undefined): string {
  return escapeHtml(value).replace(/\n/g, '<br>');
}

export function inlineMarkdownToHtml(value: string | null | undefined): string {
  return multilineToHtml(value)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
}


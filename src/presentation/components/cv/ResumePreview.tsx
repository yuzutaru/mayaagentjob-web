import React, { useEffect, useMemo, useRef, useState } from 'react';
import { PortfolioProfile } from '../../../domain/entities/PortfolioContract';
import { renderResumeHtml } from './resumeTemplateRenderer';

// A4 @ 96dpi: 210mm x 297mm ≈ 794 x 1123 CSS px.
const PAPER_W = 794;
const PAPER_H = 1123;
const ASPECT = PAPER_H / PAPER_W;

interface ResumePreviewProps {
  templateId: string;
  profile: PortfolioProfile;
  className?: string;
  iframeTitle?: string;
}

/**
 * WYSIWYG resume preview. Renders the exact same HTML the backend sends to
 * WeasyPrint inside an isolated iframe (so template CSS cannot leak into the
 * host app), then scales the fixed A4 sheet to fit its container width.
 */
export const ResumePreview: React.FC<ResumePreviewProps> = ({
  templateId,
  profile,
  className = '',
  iframeTitle = 'Resume preview',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const update = () => setWidth(node.clientWidth || 0);
    update();
    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(update);
      ro.observe(node);
      return () => ro.disconnect();
    }
    return undefined;
  }, []);

  const html = useMemo(() => renderResumeHtml(templateId, profile), [templateId, profile]);

  const scale = width > 0 ? width / PAPER_W : 1;
  const height = width > 0 ? Math.round(width * ASPECT) : PAPER_H;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={width > 0 ? { height, aspectRatio: undefined } : undefined}
      data-testid={`resume-preview-${templateId}`}
    >
      <iframe
        title={iframeTitle}
        srcDoc={html}
        tabIndex={-1}
        style={{
          border: 0,
          width: PAPER_W,
          height: PAPER_H,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          background: '#fff',
        }}
      />
    </div>
  );
};

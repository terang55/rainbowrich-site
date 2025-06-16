'use client';

import React from 'react';
import { NotionBlock } from '@/lib/notion';

interface NotionRendererProps {
  blocks: NotionBlock[];
}

export default function NotionRenderer({ blocks }: NotionRendererProps) {
  const renderBlock = (block: NotionBlock) => {
    const { type, content, children, id } = block;

    // YouTube URL 감지 및 임베드 처리
    const isYouTubeUrl = (url: string) => {
      return url.includes('youtube.com') || url.includes('youtu.be');
    };

    const getYouTubeEmbedUrl = (url: string) => {
      const videoId = url.includes('youtu.be') 
        ? url.split('youtu.be/')[1]?.split('?')[0]
        : url.split('v=')[1]?.split('&')[0];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    };

    switch (type) {
      case 'heading_1':
        return (
          <h1 key={id} className="text-4xl font-bold mb-6 text-gray-900">
            {content}
          </h1>
        );
      case 'heading_2':
        return (
          <h2 key={id} className="text-3xl font-bold mb-4 text-gray-900">
            {content}
          </h2>
        );
      case 'heading_3':
        return (
          <h3 key={id} className="text-2xl font-bold mb-3 text-gray-900">
            {content}
          </h3>
        );
      case 'paragraph':
        if (!content.trim()) return <br key={id} />;
        return (
          <p key={id} className="mb-4 text-gray-700 leading-relaxed">
            <span dangerouslySetInnerHTML={{ __html: formatText(content) }} />
          </p>
        );
      case 'bulleted_list_item':
        return (
          <li key={id} className="mb-2 text-gray-700">
            <span dangerouslySetInnerHTML={{ __html: formatText(content) }} />
            {children && (
              <ul className="ml-6 mt-2">
                {children.map(renderBlock)}
              </ul>
            )}
          </li>
        );
      case 'numbered_list_item':
        return (
          <li key={id} className="mb-2 text-gray-700">
            <span dangerouslySetInnerHTML={{ __html: formatText(content) }} />
            {children && (
              <ol className="ml-6 mt-2">
                {children.map(renderBlock)}
              </ol>
            )}
          </li>
        );
      case 'quote':
        return (
          <blockquote key={id} className="border-l-4 border-blue-500 pl-4 py-2 mb-4 bg-blue-50 italic text-gray-700">
            <span dangerouslySetInnerHTML={{ __html: formatText(content) }} />
          </blockquote>
        );
      case 'callout':
        return (
          <div key={id} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <span dangerouslySetInnerHTML={{ __html: formatText(content) }} />
          </div>
        );
      case 'code':
        return (
          <pre key={id} className="bg-gray-100 rounded-lg p-4 mb-4 overflow-x-auto">
            <code className="text-sm">{content}</code>
          </pre>
        );
      case 'image':
        return (
          <div key={id} className="mb-6">
            <img 
              src={content} 
              alt="이미지" 
              className="max-w-full h-auto rounded-lg shadow-md"
            />
          </div>
        );
      case 'video':
        if (isYouTubeUrl(content)) {
          return (
            <div key={id} className="mb-6">
              <div className="relative w-full h-0 pb-[56.25%]">
                <iframe
                  src={getYouTubeEmbedUrl(content)}
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          );
        }
        return (
          <div key={id} className="mb-6">
            <video controls className="max-w-full h-auto rounded-lg">
              <source src={content} />
              브라우저가 비디오를 지원하지 않습니다.
            </video>
          </div>
        );
      case 'embed':
        if (isYouTubeUrl(content)) {
          return (
            <div key={id} className="mb-6">
              <div className="relative w-full h-0 pb-[56.25%]">
                <iframe
                  src={getYouTubeEmbedUrl(content)}
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          );
        }
        return (
          <div key={id} className="mb-6">
            <iframe 
              src={content} 
              className="w-full h-96 rounded-lg border"
              frameBorder="0"
            />
          </div>
        );
      case 'divider':
        return <hr key={id} className="my-8 border-gray-300" />;
      case 'toggle':
        return (
          <details key={id} className="mb-4">
            <summary className="cursor-pointer font-medium text-gray-900 hover:text-blue-600">
              {content}
            </summary>
            {children && (
              <div className="mt-2 ml-4">
                {children.map(renderBlock)}
              </div>
            )}
          </details>
        );
      default:
        return null;
    }
  };

  // 텍스트 포맷팅 (마크다운 스타일을 HTML로 변환)
  const formatText = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/~~(.*?)~~/g, '<del>$1</del>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">$1</code>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>');
  };

  // 연속된 리스트 아이템들을 그룹화
  const groupBlocks = (blocks: NotionBlock[]) => {
    const grouped: (NotionBlock | NotionBlock[])[] = [];
    let currentList: NotionBlock[] = [];
    let currentListType: string | null = null;

    blocks.forEach((block) => {
      if (block.type === 'bulleted_list_item' || block.type === 'numbered_list_item') {
        if (currentListType === block.type) {
          currentList.push(block);
        } else {
          if (currentList.length > 0) {
            grouped.push([...currentList]);
          }
          currentList = [block];
          currentListType = block.type;
        }
      } else {
        if (currentList.length > 0) {
          grouped.push([...currentList]);
          currentList = [];
          currentListType = null;
        }
        grouped.push(block);
      }
    });

    if (currentList.length > 0) {
      grouped.push([...currentList]);
    }

    return grouped;
  };

  const groupedBlocks = groupBlocks(blocks);

  return (
    <div className="prose prose-lg max-w-none">
      {groupedBlocks.map((item, index) => {
        if (Array.isArray(item)) {
          const listType = item[0].type;
          const ListComponent = listType === 'bulleted_list_item' ? 'ul' : 'ol';
          return (
            <ListComponent key={index} className="mb-4">
              {item.map(renderBlock)}
            </ListComponent>
          );
        } else {
          return renderBlock(item);
        }
      })}
    </div>
  );
} 
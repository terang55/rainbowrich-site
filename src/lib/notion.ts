import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

// Notion 클라이언트 초기화
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

export interface NotionBlock {
  id: string;
  type: string;
  content: string;
  children?: NotionBlock[];
}

// 페이지 데이터 가져오기
export async function getNotionPage(pageId: string): Promise<NotionBlock[]> {
  try {
    const response = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 100,
    });

    const blocks: NotionBlock[] = [];

    for (const block of response.results) {
      if ('type' in block) {
        const notionBlock = await processBlock(block as any);
        if (notionBlock) {
          blocks.push(notionBlock);
        }
      }
    }

    return blocks;
  } catch (error) {
    console.error('Notion API 오류:', error);
    return [];
  }
}

// 블록 처리 함수
async function processBlock(block: any): Promise<NotionBlock | null> {
  const { type, id } = block;

  let content = '';
  let children: NotionBlock[] = [];

  switch (type) {
    case 'paragraph':
      content = extractRichText(block.paragraph.rich_text);
      break;
    case 'heading_1':
      content = extractRichText(block.heading_1.rich_text);
      break;
    case 'heading_2':
      content = extractRichText(block.heading_2.rich_text);
      break;
    case 'heading_3':
      content = extractRichText(block.heading_3.rich_text);
      break;
    case 'bulleted_list_item':
      content = extractRichText(block.bulleted_list_item.rich_text);
      break;
    case 'numbered_list_item':
      content = extractRichText(block.numbered_list_item.rich_text);
      break;
    case 'quote':
      content = extractRichText(block.quote.rich_text);
      break;
    case 'callout':
      content = extractRichText(block.callout.rich_text);
      break;
    case 'toggle':
      content = extractRichText(block.toggle.rich_text);
      break;
    case 'code':
      content = extractRichText(block.code.rich_text);
      break;
    case 'image':
      if (block.image.type === 'external') {
        content = block.image.external.url;
      } else if (block.image.type === 'file') {
        content = block.image.file.url;
      }
      break;
    case 'video':
      if (block.video.type === 'external') {
        content = block.video.external.url;
      }
      break;
    case 'embed':
      content = block.embed.url;
      break;
    case 'divider':
      content = '---';
      break;
    default:
      return null;
  }

  // 자식 블록이 있는 경우 처리
  if (block.has_children) {
    try {
      const childResponse = await notion.blocks.children.list({
        block_id: id,
      });

      for (const childBlock of childResponse.results) {
        if ('type' in childBlock) {
          const childNotionBlock = await processBlock(childBlock as any);
          if (childNotionBlock) {
            children.push(childNotionBlock);
          }
        }
      }
    } catch (error) {
      console.error('자식 블록 처리 오류:', error);
    }
  }

  return {
    id,
    type,
    content,
    children: children.length > 0 ? children : undefined,
  };
}

// 리치 텍스트 추출
function extractRichText(richText: any[]): string {
  return richText
    .map((text) => {
      let content = text.plain_text;
      
      // 링크 처리
      if (text.href) {
        content = `[${content}](${text.href})`;
      }
      
      // 스타일 처리
      if (text.annotations.bold) {
        content = `**${content}**`;
      }
      if (text.annotations.italic) {
        content = `*${content}*`;
      }
      if (text.annotations.strikethrough) {
        content = `~~${content}~~`;
      }
      if (text.annotations.underline) {
        content = `<u>${content}</u>`;
      }
      if (text.annotations.code) {
        content = `\`${content}\``;
      }
      
      return content;
    })
    .join('');
}

// 페이지 제목 가져오기
export async function getPageTitle(pageId: string): Promise<string> {
  try {
    const page = await notion.pages.retrieve({ page_id: pageId });
    
    if ('properties' in page && page.properties.title) {
      const titleProperty = page.properties.title as any;
      if (titleProperty.title && titleProperty.title.length > 0) {
        return titleProperty.title[0].plain_text;
      }
    }
    
    return '제목 없음';
  } catch (error) {
    console.error('페이지 제목 가져오기 오류:', error);
    return '제목 없음';
  }
} 
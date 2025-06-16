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
  [key: string]: any;
}

export interface NotionPage {
  id: string;
  title: string;
  blocks: NotionBlock[];
}

// Notion 페이지 데이터 가져오기
export async function getNotionPage(pageId: string): Promise<NotionPage | null> {
  try {
    if (!process.env.NOTION_API_KEY) {
      console.log('Notion API key not found');
      return null;
    }

    console.log('Fetching page:', pageId);

    // 페이지 정보 가져오기
    const page = await notion.pages.retrieve({ page_id: pageId });
    
    // 페이지 제목 추출
    let title = 'Untitled';
    if ('properties' in page && page.properties) {
      const titleProperty = Object.values(page.properties).find(
        (prop: any) => prop.type === 'title'
      ) as any;
      
      if (titleProperty && titleProperty.title && titleProperty.title.length > 0) {
        title = titleProperty.title[0].plain_text;
      }
    }

    // 페이지 블록들 가져오기
    const blocks = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 100,
    });

    console.log('Fetched blocks:', blocks.results.length);
    console.log('First block:', blocks.results[0]);

    // 블록 데이터를 처리하여 렌더링 가능한 형태로 변환
    const processedBlocks = blocks.results.map((block: any) => {
      const processedBlock: NotionBlock = {
        id: block.id,
        type: block.type,
        content: extractContent(block),
        children: block.children || []
      };
      return processedBlock;
    });

    return {
      id: pageId,
      title,
      blocks: processedBlocks,
    };
  } catch (error) {
    console.error('Error fetching Notion page:', error);
    return null;
  }
}

// 블록에서 콘텐츠 추출하는 헬퍼 함수
function extractContent(block: any): string {
  const blockType = block.type;
  const blockData = block[blockType];
  
  if (!blockData) return '';
  
  // 텍스트가 있는 블록들 처리
  if (blockData.rich_text && Array.isArray(blockData.rich_text)) {
    return blockData.rich_text.map((text: any) => text.plain_text || '').join('');
  }
  
  // 이미지 블록 처리
  if (blockType === 'image') {
    if (blockData.external) {
      return blockData.external.url;
    } else if (blockData.file) {
      return blockData.file.url;
    }
  }
  
  // 비디오 블록 처리
  if (blockType === 'video') {
    if (blockData.external) {
      return blockData.external.url;
    } else if (blockData.file) {
      return blockData.file.url;
    }
  }
  
  // 임베드 블록 처리
  if (blockType === 'embed') {
    return blockData.url || '';
  }
  
  return '';
}

// 환경변수 확인 함수
export function checkNotionConfig(): boolean {
  return !!process.env.NOTION_API_KEY;
} 
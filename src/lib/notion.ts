import { Client } from '@notionhq/client';

// Notion 클라이언트 초기화
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export interface NotionBlock {
  id: string;
  type: string;
  content: string;
  children?: NotionBlock[];
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
        (prop: unknown) => (prop as { type: string }).type === 'title'
      ) as { title: { plain_text: string }[] } | undefined;
      
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
    const processedBlocks = blocks.results.map((block: unknown) => {
      const blockData = block as { id: string; type: string; children?: NotionBlock[] };
      const processedBlock: NotionBlock = {
        id: blockData.id,
        type: blockData.type,
        content: extractContent(block),
        children: blockData.children || []
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
function extractContent(block: unknown): string {
  const blockData = block as { 
    type: string; 
    [key: string]: {
      rich_text?: { plain_text: string }[];
      external?: { url: string };
      file?: { url: string };
      url?: string;
    } | string | undefined;
  };
  
  const blockType = blockData.type;
  const typeData = blockData[blockType];
  
  if (!typeData || typeof typeData === 'string') return '';
  
  // 텍스트가 있는 블록들 처리
  if (typeData.rich_text && Array.isArray(typeData.rich_text)) {
    return typeData.rich_text.map((text) => text.plain_text || '').join('');
  }
  
  // 이미지 블록 처리
  if (blockType === 'image') {
    if (typeData.external) {
      return typeData.external.url;
    } else if (typeData.file) {
      return typeData.file.url;
    }
  }
  
  // 비디오 블록 처리
  if (blockType === 'video') {
    if (typeData.external) {
      return typeData.external.url;
    } else if (typeData.file) {
      return typeData.file.url;
    }
  }
  
  // 임베드 블록 처리
  if (blockType === 'embed') {
    return typeData.url || '';
  }
  
  return '';
}

// 환경변수 확인 함수
export function checkNotionConfig(): boolean {
  return !!process.env.NOTION_API_KEY;
} 
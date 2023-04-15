import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';
import { TagResponse } from './tag';

export interface PostResponse {
  title: string;
  tags: TagResponse[];
  date: string;
  slug: string;
  id: string;
}

export type PostResult = Extract<
  QueryDatabaseResponse['results'][number],
  { properties: Record<string, unknown> }
>;

export type ExtractedValue<T, K, U> = T extends K
  ? Extract<U, { type: T }>
  : never;

type PropertyValueMap = PostResult['properties'];
type PropertyValue = PropertyValueMap[string];
type PropertyValueType = PropertyValue['type'];

export type ResultItem = PostResult & {
  properties: {
    Name: ExtractedValue<'title', PropertyValueType, PropertyValue>;
    Tags: ExtractedValue<'multi_select', PropertyValueType, PropertyValue>;
    Slug: {
      formula: {
        string: string;
      };
    };
  };
};

import {
  QueryDatabaseResponse,
  PageObjectResponse
} from '@notionhq/client/build/src/api-endpoints';

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface PostResponse {
  id: string;
  title: string;
  tags: Tag[];
  date: string;
}

export type PostResult = Extract<
  QueryDatabaseResponse['results'][number],
  { properties: Record<string, unknown> }
>;

type PropertyValueMap = PostResult['properties'];
type PropertyValue = PropertyValueMap[string];
type PropertyValueType = PropertyValue['type'];

export type ExtractedPropertyValue<T extends PropertyValueType> = Extract<
  PropertyValue,
  { type: T }
>;

export type ResultItem = PostResult & {
  properties: {
    Name: ExtractedPropertyValue<'title'>;
    Tags: ExtractedPropertyValue<'multi_select'>;
  };
};

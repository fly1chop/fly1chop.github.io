import { GetDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';
import { ExtractedValue } from './post';

export interface TagResponse {
  id: string;
  name: string;
  color: string;
}

type PropertyValueMap = GetDatabaseResponse['properties'];
type PropertyValue = PropertyValueMap[string];
type PropertyValueType = PropertyValue['type'];

export type TagResult = GetDatabaseResponse & {
  properties: {
    Tags: ExtractedValue<'multi_select', PropertyValueType, PropertyValue>;
  };
};

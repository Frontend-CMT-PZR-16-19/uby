import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import {courseType} from './courseType'
import {courseCategoryType} from './courseCategoryType'
import { eventType } from './eventType'
import { testimonialType } from './testimonialType'
import { campaignType } from './campaignType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, postType, authorType, courseType, courseCategoryType, eventType, campaignType, testimonialType],
}

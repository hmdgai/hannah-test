import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemaTypes';

const SINGLETON_TYPES = new Set(['siteSettings', 'trackingCodes', 'defaultSeo']);

export default defineConfig({
  name: 'hmdg-clinic',
  title: 'HMDG Clinic CMS',
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'placeholder',
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.listItem()
              .title('Tracking Codes')
              .id('trackingCodes')
              .child(
                S.document()
                  .schemaType('trackingCodes')
                  .documentId('trackingCodes')
              ),
            S.listItem()
              .title('Default SEO')
              .id('defaultSeo')
              .child(
                S.document()
                  .schemaType('defaultSeo')
                  .documentId('defaultSeo')
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => !SINGLETON_TYPES.has(item.getId() ?? '')
            ),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});

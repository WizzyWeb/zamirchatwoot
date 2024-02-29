import { buildPortalArticleURL, buildPortalURL } from '../portalHelper';

describe('PortalHelper', () => {
  describe('buildPortalURL', () => {
    it('returns the correct url', () => {
      window.chatwootConfig = {
        hostURL: 'https://app.mycodek.com',
        helpCenterURL: 'https://help.mycodek.com',
      };
      expect(buildPortalURL('handbook')).toEqual(
        'https://help.mycodek.com/hc/handbook'
      );
      window.chatwootConfig = {};
    });
  });

  describe('buildPortalArticleURL', () => {
    it('returns the correct url', () => {
      window.chatwootConfig = {
        hostURL: 'https://app.mycodek.com',
        helpCenterURL: 'https://help.mycodek.com',
      };
      expect(
        buildPortalArticleURL('handbook', 'culture', 'fr', 'article-slug')
      ).toEqual('https://help.mycodek.com/hc/handbook/articles/article-slug');
      window.chatwootConfig = {};
    });
  });
});

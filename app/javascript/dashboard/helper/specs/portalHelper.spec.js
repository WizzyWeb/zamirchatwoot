import { buildPortalArticleURL, buildPortalURL } from '../portalHelper';

describe('PortalHelper', () => {
  describe('buildPortalURL', () => {
    it('returns the correct url', () => {
      window.chatwootConfig = {
        hostURL: 'https://app.chatshippo.com',
        helpCenterURL: 'https://help.chatshippo.com',
      };
      expect(buildPortalURL('handbook')).toEqual(
        'https://help.chatshippo.com/hc/handbook'
      );
      window.chatwootConfig = {};
    });
  });

  describe('buildPortalArticleURL', () => {
    it('returns the correct url', () => {
      window.chatwootConfig = {
        hostURL: 'https://app.chatshippo.com',
        helpCenterURL: 'https://help.chatshippo.com',
      };
      expect(
        buildPortalArticleURL('handbook', 'culture', 'fr', 'article-slug')
      ).toEqual('https://help.chatshippo.com/hc/handbook/articles/article-slug');
      window.chatwootConfig = {};
    });
  });
});

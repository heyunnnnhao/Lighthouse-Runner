const { Audit: audit } = require('lighthouse');

class AllTextAudit extends audit {
  static get meta() {
    return {
      id: 'all-text',
      title: '所有文本',
      failureTitle: '获取文本失败',
      description: '获取网站上所有文本',
      requiredArtifacts: ['AllText'],
    };
  }

  static audit(artifacts) {
    const { AllText } = artifacts;

    return {
      score: 1,
      numericValue: AllText.length,
      scoreDisplayMode: 'binary',
      details: {
        type: 'table',
        headings: [{ key: 'text', itemType: 'text', text: 'TEXT' }],
        items: AllText.map((i) => {
          return {
            text: i,
          };
        }),
      },
    };
  }
}

module.exports = AllTextAudit;

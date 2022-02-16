const { Audit: audit } = require('lighthouse');
const { convert } = require('html-to-text');

class AllTextAudit extends audit {
  static get meta() {
    return {
      id: 'all-text',
      title: '所有文本',
      failureTitle: '获取文本失败',
      description: '获取网站上所有文本',
      requiredArtifacts: ['MainDocumentContent'],
    };
  }

  static audit(artifacts) {
    const { MainDocumentContent } = artifacts;
    const text = convert(MainDocumentContent, {
      wordwrap: 130,
    });
    console.log(text);
    return {
      score: null,
      details: MainDocumentContent,
    };
  }
}

module.exports = AllTextAudit;

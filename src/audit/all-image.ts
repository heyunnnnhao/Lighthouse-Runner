const { Audit } = require('lighthouse');

class AllImgAudit extends Audit {
  static get meta() {
    return {
      id: 'all-image',
      title: '所有图片',
      failureTitle: '获取图片失败',
      description: '获取网站上所有图片元素',
      requiredArtifacts: ['ImageElements'],
    };
  }

  static audit(artifacts): any {
    const { ImageElements } = artifacts;

    return {
      score: ImageElements.length > 0 ? 1 : 0,
      numericValue: ImageElements.length,
      scoreDisplayMode: 'number',
      details: {
        type: 'table',
        headings: [{ key: 'src', itemType: 'url', text: 'URL' }],
        items: ImageElements.map((i) => {
          return {
            src: i.src,
            displayedWidth: i.displayedWidth,
            displayedHeight: i.displayedHeight,
          };
        }),
      },
    };
  }
}

module.exports = AllImgAudit;

const { expect } = require('chai');
const sinon = require('sinon');
const cheerio = require('cheerio');

const getBrokenLinks = require('../../helpers/getBrokenLinks');

const anchor = '<a href="/link">Testing</a>';
const img = '<img src="/another-link.png">';
const span = '<span>Not a link</span>';
const anchorWithoutHref = '<a>Link</a>';

const getFile = tag => {
  const contents = `<div>${anchor}${tag}</div>`;
  return {
    path: '/health-care',
    contents,
    dom: cheerio.load(contents),
  };
};

describe('getBrokenLinks', () => {
  const detectAllLinksBroken = sinon.stub().returns(true);
  const detectAllLinksOkay = sinon.stub().returns(false);
  const buildOptions = {
    'drupal-address': '',
    'drupal-user': '',
    'drupal-password': '',
    'drupal-max-parallel-requests': 15,
    buildtype: 'localhost',
  };

  it('finds broken links', () => {
    const linkErrors = getBrokenLinks(
      getFile(img),
      [],
      buildOptions,
      detectAllLinksBroken,
    );
    expect(linkErrors).to.have.lengthOf(2);
  });

  it('does not detect non-links as a link', () => {
    const linkErrors = getBrokenLinks(
      getFile(span),
      [],
      buildOptions,
      detectAllLinksBroken,
    );
    expect(linkErrors).to.have.lengthOf(1);
    expect(linkErrors[0].html).to.be.equal(anchor);
  });

  it('does not detect valid links as broken', () => {
    const linkErrors = getBrokenLinks(
      getFile(img),
      [],
      buildOptions,
      detectAllLinksOkay,
    );
    expect(linkErrors).to.have.lengthOf(0);
  });

  it('skips anchors without an HREF attribute', () => {
    const linkErrors = getBrokenLinks(
      getFile(anchorWithoutHref),
      [],
      buildOptions,
      detectAllLinksBroken,
    );
    expect(linkErrors).to.have.lengthOf(1);
  });
});

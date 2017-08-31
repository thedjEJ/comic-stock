import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { mocha } from 'mocha';
import { expect } from 'chai';
import { renderComic } from './../views/IssueView';
const render = {
  creators: [],
  description:
    'As the Squadron gets closer to the answer—who is the cabal of alien races on Earth and what threat do they pose to the planet? – things get personal for Doctor Spectrum as she confronts the man who helped destroy her Earth and save her life...BLACK BOLT! Also, the Squadron’s Nighthawk vs. the Nighthawk of the Marvel Universe??',
  id: 55744,
  images: [],
  publicationDate: '2016-01-21T15:11:14Z',
  publisher: 'Marvel',
  publisherId: 0,
  seriesNumber: -1,
  stock: [],
  thumbnail: {
    path: 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available',
    extension: 'jpg',
    pathIncludingExtension:
      'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg',
  },
  title: 'Squadron Supreme (2015) #6',
};
const rendered = renderComic(render);

describe('main block', () => {
  it('renders without crashing', () => {
    TestUtils.renderIntoDocument(rendered);
  });
});

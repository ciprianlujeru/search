import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Hits,
  Stats,
  Pagination,
  RatingMenu,
  Highlight,
  Configure,
  connectSearchBox,
  connectRefinementList,
  RefinementList,
  DynamicWidgets,
} from 'react-instantsearch-dom';
import './App.css';

const searchClient = algoliasearch(
  'TEX0W26GEO',
  '29f4470676447569a28b8494bfed9f50'
);

export default function App() {
  return (
    <InstantSearch searchClient={searchClient} indexName="dev_restaurants">
      <Configure hitsPerPage={10} facets={['*']} maxValuesPerFacet={20} />
      <DynamicWidgets fallbackWidget={RefinementList}></DynamicWidgets>
      <Header />
      <section>
        <SearchBox2 />
        <Facets />
        <Results />
      </section>
    </InstantSearch>
  );
}

const Header = () => (
  <header>
    <a
      href="https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/react/"
      className="is-logo"
    >
      <img
        alt="React InstantSearch"
        src="https://res.cloudinary.com/hilnmyskv/image/upload/w_100,h_100,dpr_2.0//v1461180087/logo-instantsearchjs-avatar.png"
        width="40"
      />
    </a>
    <a href="./" className="logo">
      You
      <i className="fa fa-youtube-play" />
    </a>
    <SearchBox />
  </header>
);

const SearchBox = connectSearchBox(({ currentRefinement, refine }) => (
  <div className="searchbox-container">
    <div className="input-group">
      <input
        type="text"
        value={currentRefinement}
        onChange={e => refine(e.target.value)}
        autoComplete="off"
        className="form-control"
      />
      <span className="input-group-btn">
        <button className="btn btn-default">
          <i className="fa fa-search" />
        </button>
      </span>
    </div>
  </div>
));

const Facets = () => (
  <aside>
    <ul className="nav nav-list panel">
      <li>
        <a href="./">
          <i className="fa fa-home" /> Home
        </a>
      </li>
      <li className="separator" />
    </ul>
    <Panel title="Genres" id="genres">
      <RefinementListLinks attribute="dining_style" />
    </Panel>
    <Panel title="Rating" id="ratings">
      <RatingMenu attribute="rounded_stars_count" max={5} />
    </Panel>
  </aside>
);

const Panel = ({ title, children, id }) => (
  <div id={id}>
    <h5>
      <i className="fa fa-chevron-right" /> {title}
    </h5>
    {children}
  </div>
);

const Star = ({ active }) => (
  <span className={`star${active ? '' : '__empty'}`} />
);
const Stars = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; ++i) {
    stars.push(i <= rating);
  }
  return (
    <span className="stars">
      {stars.map((active, idx) => (
        <Star key={idx} active={active} />
      ))}
    </span>
  );
};
const Genre = ({ name }) => <span className="badge">{name}</span>;
const Genres = ({ genres }) => (
  <p className="genre">
    {genres.map((genre, idx) => (
      <Genre name={genre} key={idx} />
    ))}
  </p>
);

const Hit = hit => {
  const {
    image_url,
    rounded_stars_count,
    dining_style,
    payment_options,
  } = hit.hit;
  return (
    <div className="hit media">
      <div className="media-left">
        <div
          className="media-object"
          style={{ backgroundImage: `url(${image_url})` }}
        />
      </div>
      <div className="media-body">
        <h4 className="media-heading">
          <Highlight attribute="name" hit={hit.hit} />
          <Stars rating={rounded_stars_count} />
        </h4>
        <p className="year">{dining_style}</p>
        <Genres genres={payment_options} />
      </div>
    </div>
  );
};

const Results = connectSearchBox(() => (
  <article>
    <div id="stats" className="text-right text-muted">
      <Stats />
    </div>
    <hr />
    <div id="hits">
      <Hits hitComponent={Hit} />
    </div>
    <div id="pagination" className="text-center">
      <Pagination />
    </div>
  </article>
));

const RefinementListLinks = connectRefinementList(
  ({ items, refine, createURL }) => {
    const hitComponents = items.map(item => (
      <div className={item.isRefined ? ' active' : ''} key={item.label}>
        <a
          className="item"
          href={createURL(item.value)}
          onClick={e => {
            e.preventDefault();
            refine(item.value);
          }}
        >
          <span> {item.label}</span>
          <span className="badge pull-right">{item.count}</span>
        </a>
      </div>
    ));

    return <div className="nav nav-list">{hitComponents}</div>;
  }
);

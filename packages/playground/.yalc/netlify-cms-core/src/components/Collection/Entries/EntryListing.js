import PropTypes from 'prop-types';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from '@emotion/styled';
import Waypoint from 'react-waypoint';
import { Map } from 'immutable';
import { Cursor } from 'netlify-cms-lib-util';
import { selectFields, selectInferedField } from 'Reducers/collections';
import EntryCard from './EntryCard';

const CardsGrid = styled.ul`
  display: flex;
  flex-flow: row wrap;
  list-style-type: none;
  margin-left: -12px;
`;

export default class EntryListing extends React.Component {
  static propTypes = {
    collections: ImmutablePropTypes.iterable.isRequired,
    entries: ImmutablePropTypes.list,
    viewStyle: PropTypes.string,
    cursor: PropTypes.any.isRequired,
    handleCursorActions: PropTypes.func.isRequired,
  };

  hasMore = () => {
    return Cursor.create(this.props.cursor).actions.has('append_next');
  };

  handleLoadMore = () => {
    if (this.hasMore()) {
      this.props.handleCursorActions('append_next');
    }
  };

  inferFields = collection => {
    const titleField = selectInferedField(collection, 'title');
    const descriptionField = selectInferedField(collection, 'description');
    const imageField = selectInferedField(collection, 'image');
    const fields = selectFields(collection);
    const inferedFields = [titleField, descriptionField, imageField];
    const remainingFields =
      fields && fields.filter(f => inferedFields.indexOf(f.get('name')) === -1);
    return { titleField, descriptionField, imageField, remainingFields };
  };

  renderCardsForSingleCollection = () => {
    const { collections, entries, viewStyle } = this.props;
    const inferedFields = this.inferFields(collections);
    const entryCardProps = { collection: collections, inferedFields, viewStyle };
    return entries.map((entry, idx) => <EntryCard {...entryCardProps} entry={entry} key={idx} />);
  };

  renderCardsForMultipleCollections = () => {
    const { collections, entries } = this.props;
    return entries.map((entry, idx) => {
      const collectionName = entry.get('collection');
      const collection = collections.find(coll => coll.get('name') === collectionName);
      const collectionLabel = collection.get('label');
      const inferedFields = this.inferFields(collection);
      const entryCardProps = { collection, entry, inferedFields, collectionLabel };
      return <EntryCard {...entryCardProps} key={idx} />;
    });
  };

  render() {
    const { collections } = this.props;

    return (
      <div>
        <CardsGrid>
          {Map.isMap(collections)
            ? this.renderCardsForSingleCollection()
            : this.renderCardsForMultipleCollections()}
          {this.hasMore() && <Waypoint onEnter={this.handleLoadMore} />}
        </CardsGrid>
      </div>
    );
  }
}
